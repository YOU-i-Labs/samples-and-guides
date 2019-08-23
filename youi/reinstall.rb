#!/usr/bin/env ruby
###
# Copyright (c) You i Labs Inc.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.
#
###

require 'optparse'
require 'ostruct'

class ReinstallOptions
    def self.parse(args)
        options = OpenStruct.new
        options.config = "Debug"
        options.build_directory = nil
        options.target = nil
        options.app_name = "youi"
        options.start = false
        options.package = nil
        options.uninstall_first = false
        options.flavor = nil

        configurationList = ["Debug","Release"]

        options_parser = OptionParser.new do |opts|
            opts.on("-b", "--build_directory DIRECTORY", String,
                "(REQUIRED) The directory containing the built application.",
                "  (For Android builds, this must be the folder where the generated Android Studio project exists.",
                "  (For iOS builds, this will be the same build directory given to the 'generate.rb' and 'build.rb' scripts when they are run.)") do |directory|

                unless Dir.exist?(directory)
                    puts "ERROR: The given build directory '#{directory}' does not exist. Make sure you run the 'generate.rb' script first."
                    exit 1
                end

                options.build_directory = directory
            end

            opts.on("-c", "--config CONFIGURATION", String,
                "The configuration type #{configurationList} to install to the device.") do |config|
                if configurationList.any? { |s| s.casecmp(config)==0 }
                    options.config = config
                else
                    puts "ERROR: \"#{config}\" is an invalid configuration type."
                    puts opts
                    exit 1
                end
            end

            opts.on("-s", "--start",
                "Attempts to auto-start the application on the device after it has been installed.",
                "  (For iOS builds, the application will be launched with the LLDB debugger.)",
                "  (For Android builds, the application will be launched through an intent.)") do
                options.start = true
            end

            opts.on("-p", "--package_name PACKAGE", String,
                "The name of the package used by the application.",
                "  (Used by the iOS, tvOS and Tizen-NaCl platforms.)",
                "  (On iOS/tvOS if omitted, defaults to 'tv.youi.<project_name>'.)",
                "  (On Tizen-NaCl if omitted, defaults to '<Package ID>.<Project Name Lower>'.)") do |package|
                options.package = package
            end

            opts.on("--appname NAME",
                "The name of the .app folder.", String,
                "  (This argument is only required when using out of source builds on the iOS platform.)",
                "  (If omitted, defaults to the name of the folder this script exists in. This is usually the name of the project itself.)") do |app_name|
                options.app_name = app_name
            end

            opts.on("--flavor PRODUCT_FLAVOR",
                "The name of the Product Flavor to build and install to a connected device.", String,
                "  (Used by Android platforms.)",
                "  (Tells the build process to build the APK for a specific Product Flavor.)",
                "  (When the application has been configured to use Product Flavors, this argument is required.)") do |flavor|
                options.flavor = flavor
            end

            opts.on("-u", "--uninstall_first",
                "Uninstalls the application on the device before attempting to install the new application.") do
                options.uninstall_first = true
            end

            opts.on("-t", "--target TARGET_DEVICE",
                "Specifies the device that the app will be installed on.",
                "  (Only used for Tizen-NaCl this is the device serial which is the first column when running the 'sdb devices' command.)",
                "  (Defaults to the first connected device.)") do |target_device|
                options.target = target_device
            end

            opts.on_tail("-h", "--help", "Show usage and options list") do
                puts opts
                exit 1
            end
        end

        if args.count == 0
            puts options_parser
            exit 1
        end

        begin
            options_parser.parse!(args)
            mandatory = [ :build_directory ]
            missing = mandatory.select { |param| options[param].nil? }
            raise OptionParser::MissingArgument, missing.join(', ') unless missing.empty?

            options
        rescue OptionParser::ParseError => e
            puts e
            puts ""
            puts options_parser
            exit 1
        end
    end

    def self.reinstall(options)
        case RUBY_PLATFORM
        when /mswin|msys/i
            gradle_prefix = ""
            gradle_suffix = ".bat"
        else
            gradle_prefix = "./"
            gradle_suffix = ""
        end

        gradle_filename = File.join(options.build_directory, "project", "#{gradle_prefix}gradlew#{gradle_suffix}")
        if File.exist?(gradle_filename)
            options.build_directory = File.join(options.build_directory, "project")
            options.gradle_filename = gradle_filename
            options.gradle_prefix = gradle_prefix
            options.gradle_suffix = gradle_suffix

            ReinstallOptions.reinstall_android(options)
        else
            cache_file = File.join(options.build_directory, "CMakeCache.txt")
            unless File.exist?(cache_file)
                puts "The specified build directory '#{options.build_directory}' does not contain a generated CMake project."
                puts "Run generate.rb to create a project."
                abort
            end

            script_path = File.join(__dir__, "build.rb")
            unless system("ruby \"#{script_path}\" -b #{options.build_directory} -c #{options.config}")
                abort
            end

            cache_contents = File.read(cache_file)
            cmake_platform = ReinstallOptions.get_variable_from_cmake_cache_contents(cache_contents, "YI_PLATFORM")
            if cmake_platform.nil?
                puts "YI_PLATFORM variable not found in CMakeCache. Was a platform specified when generating?"
                abort
            end

            if cmake_platform.casecmp("ios") == 0
                options.os = "iphoneos"
                ReinstallOptions.reinstall_ios_tvos(options)
            elsif cmake_platform.casecmp("tvos") == 0
                options.os = "appletvos"
                ReinstallOptions.reinstall_ios_tvos(options)
            elsif cmake_platform.casecmp("tizen-nacl") == 0
                ReinstallOptions.reinstall_tizen_nacl(options, cache_contents)
            else
              puts "ERROR: Only iOS, tvOS and Android can use the reinstall.rb script."
              abort
            end
        end
    end

    def self.reinstall_android(options)
        Dir.chdir(options.build_directory) {
            unless options.flavor
                action_suffix = options.config
            else
                action_suffix = options.flavor.capitalize + options.config
            end

            if options.uninstall_first
                command = "#{options.gradle_prefix}gradlew#{options.gradle_suffix} uninstall#{action_suffix}"
                if system(command) == false
                    abort
                end
            end

            command = "#{options.gradle_prefix}gradlew#{options.gradle_suffix} install#{action_suffix}"

            if system(command) == false
                abort
            end

            if options.start
                command = "#{options.gradle_prefix}gradlew#{options.gradle_suffix} startApplication"
                if system(command) == false
                    abort
                end
            end
        }
    end

    def self.reinstall_ios_tvos(options)
        if options.package.nil?
            options.package = "tv.youi.youi"
        end

        base_path = File.join(options.build_directory, "#{options.config}-#{options.os}")
        bundle_pathname = File.join(base_path, "#{options.app_name}.app")

        unless Dir.exist?(bundle_pathname)
            puts "ERROR:"
            puts "The '#{options.app_name}.app' does not exist within '#{base_path}'."
            puts "Check the location of the .app that you are trying to deploy and make sure it has been built properly."
            puts ""
            puts "If the project has been built out of source, make sure to pass the application name using the '--appname' argument."
            abort
        end

        pid = Process.spawn("ios-deploy -V > /dev/null")
        Process.waitpid(pid)

        unless $?.exitstatus == 0
            puts "Installing the 'ios-deploy' tool with HomeBrew..."

            unless system("brew install ios-deploy")
                abort
            end
        end

        # Check for connected devices
        pid = Process.spawn("ios-deploy -c|grep Found")
        Process.waitpid(pid)

        unless $?.exitstatus == 0
            puts "---- No devices connected"
            abort
        end

        # Uninstalling the application from the device.
        if options.uninstall_first
            puts "Attempting to uninstall application with package name '#{options.package}' from device..."
            pid = Process.spawn("ios-deploy --uninstall_only -1 #{options.package}")
            Process.waitpid(pid)

            unless $?.exitstatus == 0
                abort
            end
        end

        # Installing the application to the device.
        command = "ios-deploy"
        command << " --bundle #{bundle_pathname}"

        if options.start
            command << " --debug"
        end

        pid = Process.spawn(command)
        Process.waitpid(pid)

        unless $?.exitstatus == 0
            abort
        end
    end

    def self.reinstall_tizen_nacl(options, cache_contents)
        tizen_sdk_home = ENV["TIZEN_SDK_HOME"]
        if tizen_sdk_home.nil?
            puts "TIZEN_SDK_HOME environment variable not found. Ensure that TIZEN_SDK_HOME is set to the path to Tizen Studio before running this script."
            abort
        end

        tizen_cli_command = File.join(tizen_sdk_home, "tools", "ide", "bin", "tizen")
        unless File.exist?(tizen_cli_command)
            # We might be on Windows
            tizen_cli_command = File.join(tizen_sdk_home, "tools", "ide", "bin", "tizen.bat")
        end

        unless File.exist?(tizen_cli_command)
            puts "Tizen Studio CLI command not found. Ensure that Tizen Studio is installed at '#{tizen_sdk_home}' and that the Native and Web CLI have been installed via the Tizen Studio Package Manager."
            abort
        end

        tizen_sdb_command = File.join(tizen_sdk_home, "tools", "sdb")
        unless File.exist?(tizen_sdb_command)
            # We might be on Windows
            tizen_sdb_command = File.join(tizen_sdk_home, "tools", "sdb.exe")
        end

        unless File.exist?(tizen_sdb_command)
            puts "Tizen Studio sdb command not found. Ensure that Tizen Studio is installed at '#{tizen_sdk_home}'."
            abort
        end

        cmake_project_name = ReinstallOptions.get_variable_from_cmake_cache_contents(cache_contents, "CMAKE_PROJECT_NAME")
        if cmake_project_name.nil?
            puts "Could not obtain cmake_project_name from CMakeCache. Ensure project is generated properly or specify the --package_name argument."
            abort
        end
        cmake_project_name_lower = cmake_project_name.downcase

        yi_output_filename = ReinstallOptions.get_variable_from_cmake_cache_contents(cache_contents, "YI_OUTPUT_FILENAME")
        if yi_output_filename.nil?
            yi_output_filename = cmake_project_name
        end

        path_to_app_wgt = File.join(options.build_directory, "#{yi_output_filename}-#{options.config}@#{options.config}.wgt")
        unless File.exist?(path_to_app_wgt)
            puts "Could not find packaged wgt at expeccted location '#{path_to_app_wgt}'. Did the build and package succeed?"
            abort
        end

        app_package_id = ReinstallOptions.get_variable_from_cmake_cache_contents(cache_contents, "YI_PACKAGE_ID")
        if app_package_id.nil?
            puts "Could not obtain YI_PACKAGE_ID from CMakeCache. Ensure YI_PACKAGE_ID was specified in CMake or specify the --package_name argument."
            abort
        end

        # sdb returns the following format:
        # List of devices attached
        # emulator-26101          device          t-1111-1
        device_listing = `#{tizen_sdb_command} devices`
        device_serials = nil
        if device_listing_scan = device_listing.scan(/^(\S+)\s+(\S+)\s+(\S+)$/m)
            device_serials = device_listing_scan.flatten
        end

        if device_serials.nil?
            puts "No devices connected. Ensure at least one device is connected before running this script. Use '#{tizen_sdb_command} connect <ip address>' to connect a device."
            abort
        end

        if options.target.nil?
            # Target not set default to the first connected device.
            options.target = device_serials[0]
        end

        unless device_serials.include?(options.target)
            puts "Specified target device #{options.target} is not connected. Use '#{tizen_sdb_command} connect <ip address>' to connect a device."
            abort()
        end

        if options.package.nil?
            options.package = "#{app_package_id}.#{cmake_project_name_lower}"
        end

        match = options.package.match(/[a-zA-Z]+\.[a-z]+/)
        if match.nil?
            puts "Invalid package name specified for Tizen-NaCl. Expecting something of the form: 'FmHXPQSBwZ.sampleapp'"
            abort
        end

        if options.uninstall_first
            puts "-----------------------------------------------------------"
            puts "Uninstalling #{options.package} from #{options.target}"
            puts "-----------------------------------------------------------"
            system("#{tizen_cli_command} uninstall -p #{options.package} -s #{options.target}")
        end

        puts "-------------------------------------------------------"
        puts "Installing #{options.package} on #{options.target}"
        puts "-------------------------------------------------------"
        system("#{tizen_cli_command} install -n #{path_to_app_wgt} -s #{options.target}")

        if options.start
            # Note: We try to run regardless of the install result because for some reason the command returns failure when the install was a success.
            puts "-------------------------------------------------------"
            puts "Launching #{options.package} on #{options.target}"
            puts "------------------------------------------------------"
            system("#{tizen_cli_command} run -p #{options.package} -s #{options.target}")
        end
    end

    def self.get_variable_from_cmake_cache_contents(cache_contents, variable_name)
        if match = cache_contents.match(/^#{variable_name}:[A-Z]+=(\S*)/i)
            variable_value = match.captures
            return variable_value[0]
        else
            return nil
        end
    end

end

options = ReinstallOptions.parse(ARGV)
ReinstallOptions.reinstall(options)
