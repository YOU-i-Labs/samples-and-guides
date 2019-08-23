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

class BuildOptions
    def self.parse(args)
        options = OpenStruct.new
        options.config = "Debug"
        options.build_directory = nil
        options.target = nil
        options.version = nil
        options.args = Array.new

        configurationList = ["Debug","Release"]

        options_parser = OptionParser.new do |opts|
            opts.on("-b", "--build_directory DIRECTORY", String,
                "(REQUIRED) The directory containing the generated project files that will be built.") do |directory|

                if !Dir.exist?(directory)
                    puts "ERROR: The given build directory '#{directory}' does not exist. The project must be generated before building. See generate.rb."
                    exit 1
                end

                options.build_directory = directory
            end

            opts.on("-c", "--config CONFIGURATION", String,
                "The configuration type #{configurationList} to build.",
                "  (This is only required for generators that do not support multiple configurations.)") do |config|
                if configurationList.any? { |s| s.casecmp(config)==0 }
                    options.config = config
                else
                    puts "ERROR: \"#{config}\" is an invalid configuration type."
                    puts opts
                    exit 1
                end
            end

            opts.on("-t", "--target TARGET", String,
                "The target to execute during the build.",
                "  (If omitted, the ALL_BUILD target will be used by CMake.)",
                "  Standard targets for a You.i Engine project:",
                "    CMake Built-in:",
                "      - ALL_BUILD: Executes all targets unless the target has explictly been excluded from ALL_BUILD.",
                "      - ZERO_CHECK: Runs the CMake generation.",
                "    You.i Engine:",
                "      - CopyAssets: Copies the assets from the project's AE assets directory to the location required by the platform for execution.",
                "      - CleanAssets: Cleans up the assets which were copied by the CopyAssets target.",
                "      - ProcessLocalizationData: Processes localization data for the project by generating the translation files required by the project.",
                "      - Package: Packages the application for the specific platform. This target is only available for platforms which require a packaged application."
                ) do |target|
                options.target = target
            end

            opts.on("-a", "--arg BUILD_ARGUMENT", String,
                "Custom argument that can be passed to CMake when building.",
                "  (Multiple arguments on the command line are supported. They will be added after the '--' section",
                "   that will be passed to CMake.)") do |arg|
                options.args << arg
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

    def self.create_command(options)
        case RUBY_PLATFORM
            when /mswin|msys/i
                options.gradle_extension = ".bat"
                options.gradle_call_prefix = ""
            else
                options.gradle_extension = ""
                options.gradle_call_prefix = "."
        end

        android_build_dir = File.join(File.absolute_path(options.build_directory), "project")

        if File.exist?(File.join(android_build_dir, "gradle#{options.gradle_extension}"))
            options.require_directory_change = true
            options.build_directory = android_build_dir
            return BuildOptions.create_android_command(options)
        end

        options.require_directory_change = false
        return BuildOptions.create_cmake_command(options)
    end

    def self.create_android_command(options)
        build_directory = File.absolute_path("#{options.build_directory}")

        command = "#{options.gradle_call_prefix}/gradlew#{options.gradle_extension}"
        command << " assemble#{options.config}"

        return command
    end

    def self.create_cmake_command(options)


        # Parse the CMakeCache.txt file and inspect the 'YI_PLATFORM' variable.
        # If the line matches the regex '^(YI_PLATFORM:)[A-Z]+(=ps4)', then
        # we need to use the custom build of CMake, since it's the only CMake that understands
        # what the PS4 platform is.
        cache_path = File.join(options.build_directory, "CMakeCache.txt")
        if File.exists?(cache_path)
            cache_contents = File.read(cache_path)
        else
            puts "CMakeCache not found at #{cache_path}. Ensure the project is properly generated before building. See generate.rb."
            exit 1
        end

        if cache_contents.match(/^(YI_PLATFORM:)[A-Z]+(=ps4)/i)
            # Regex match for CMAKE_ROOT, which was the cmake path used to generate. The CMAKE_ROOT variable
            # includes share/cmake or share/cmake-3.8 (current PS4 cmake), so this regex should match both versions.
            # The MatchData object returns the capture (.+) from it's [] method, to which we append bin/cmake.exe
            cmake_root = /^CMAKE_ROOT:INTERNAL=(.+)share.cmake.{0,6}$/.match(cache_contents)
            command = File.join(cmake_root[1], 'bin', 'cmake.exe')
        else
            command = "cmake"
        end

        command << " --build \"#{options.build_directory}\""

        if !options.target.nil?
            command << " --target #{options.target}"
        end

        if !options.config.nil?
            command << " --config #{options.config}"
        end

        if options.args.length > 0
            command << " --"
            options.args.each { |arg|
                command << " \"#{arg}\""
            }
        end

        return command
    end
end

options = BuildOptions.parse(ARGV)
command = BuildOptions.create_command(options)

puts "#=============================================="
puts "Build command:"
puts "  #{command}"
puts ""
puts "Build Directory: #{options.build_directory}"
puts "Configuration: #{options.config}"
puts "#=============================================="

calling_directory = Dir.pwd
if options.require_directory_change
    Dir.chdir("#{options.build_directory}")
end

command_result = system(command)
if command_result == false || command_result == nil
    if options.require_directory_change
        Dir.chdir("#{calling_directory}")
    end

    if command_result == nil
        puts "Build failed -- could not execute cmake command."
        puts "Ensure that cmake is installed and available in your PATH."
    end

    abort()
end

if options.require_directory_change
    Dir.chdir("#{calling_directory}")
end
