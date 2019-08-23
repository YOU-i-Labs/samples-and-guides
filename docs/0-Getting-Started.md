This page will help you install and build your first You.i Engine app. If you already have React Native installed, you can skip ahead to the [Tutorial](1-Learn-The-Basics.md).

The easiest way to get started with You.i Engine is with the You.i CLI. The You.i CLI lets you install and manage You.i Engine versions and create new projects. Note that there are a few dependencies that you will need to install which you can find in our [Requirements page](https://developer.youi.tv/latest/Content/TechSpecsHardwareReqs/AllSpecs.htm) and in our [installation instructions](https://developer.youi.tv/latest/Content/InstallationCommon/H1IntroToInstallSection.htm)

Assuming that you have finished installing the You.i Engine based on the instructions in our developer portal you can now get started with the You.i CLI.

```sh
yarn global add youi-cli # or: npm install -g youi-cli
```

> **Note** In order to proceed with the instructions below, you will need to have a valid You.i Engine API key.

Run the following commands to login using your API key and install the latest version of the You.i Engine.

```sh
youi-tv login
youi-tv install
```

Then run the following commands to create a new You.i Engine project called "AwesomeProject":

```sh
youi-tv init AwesomeProject

cd AwesomeProject
yarn start # you can also use: npm start
```

This will start a development server for you.

## Running your You.i Engine application

You will need to generate and build the app. This guide assumes you are running on Mac OS. For other platforms please see the full guide on our [developer portal](https://developer.youi.tv/latest/Content/RN_BuildingAppsTopics/H2RNBuildProc.htm).

```sh
./youi/generate.rb -p osx

./youi/build.rb -b youi/build/osx
```

`generate` will create an xcode project in `youi/build/osx/AwesomeProject.xcodeproj` and build will compile the app to `youi/build/Debug/AwesomeProject`

### Modifying your app

Now that you have successfully run the app, let's modify it. Open `index.youi.js` in your text editor of choice and edit some lines. The application should reload automatically once you save your changes.

### That's it!

Congratulations! You've successfully run and modified your first You.i Engine app.
