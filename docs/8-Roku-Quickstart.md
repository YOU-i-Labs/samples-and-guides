# Roku Development Quickstart

This document will guide you through the necessary steps to run a You.i Engine application on a Roku device for testing and debugging purposes.

> **Note** There are special considerations for Roku apps. Please see the full cloud solution documentation if your app doesn't behave as expected on Roku.

## Set up your Roku

Before we begin, your Roku will need to be set up for development. If you already have developer mode on, you'll need your Roku IP address and developer password. Skip down to [Building for Roku](#building-for-roku).

Full details on Roku developer mode can be found on the [Roku Blog](https://blog.roku.com/developer/developer-setup-guide).

### 1. Enable Developer Mode

To turn on development mode simply enter the super ultra secret code using your remote:

🏠🏠🏠+⬆️️️️⬆️️️️+➡️⬅️+➡️⬅️+➡️️

### 2. Write the Roku IP and Accept T&C

The Roku will show you the device IP and prompt you to accept the Terms and Conditions.

Write down the IP, as you will need it further down.

### 3. Set a device password

We recommend using `youi` as your password, but it can be anything you choose.

## Building for Roku

> **Note** Building for Roku is only supported on macOS and Linux

Building the application for Roku is similar to how you would normally build your app, simply set `YI_BUILD_CLOUD_SERVER` to enable cloud functionality.

`./generate.rb -p osx -d YI_BUILD_CLOUD_SERVER=ON`

`./build.rb -b build/osx`

On newer projects (6.1+) you should only have to run the following.

`youi-tv build -p osx -d YI_BUILD_CLOUD_SERVER=ON`

## Running the App

Once the app is build, navigate to the output folder: `youi/build/osx/{project}/[Debug|Release]`

Run the app: `./{project} -n1`

The optional parameter `-n1` will launch the app without opening a rendering window. Instead all output will be sent to `stdout`.

If successful, you will see:

```c
I/CYITCPServer: Listening for incoming connection from port 54322...
I/CYICloudServer: Start Listening on port 54322. Now WAITING_FOR_CLIENT RokuOS.
Serving HTTP on 0.0.0.0 port 8000 ...
```

> **Note** The app must be run from the same folder where the executable is. Launching the app from another folder will result in assets failing to load.


## Deploying the Roku client

Now that your application is running and waiting for connections, we can deploy and run the Roku client onto the device.

Go into the `client` folder within your project directory.

The Roku client comes preconfigured to get you up and running immediately. You will need the Roku IP address and the developer password if different from `youi`. Once you have all of the above simply run `youi-tv roku-client -u rokudev:<roku_password> -l -s <roku_IP_address>`. If you used `youi` as the password, you don't need the `-u` parameter.

> **Note** Please run `youi-tv roku-client --help` to see the full list of options available.
