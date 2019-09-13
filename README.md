# You.i Engine One React Native Samples and Guides

This project is a collection of guides and samples to help you get started with You.i Engine One.

---
  * [Installation](#installation)
    + [Install You.i Engine SDK](#install-youi-engine-sdk)
  * [Usage](#usage)
  * [Debugging](#debugging)
  * [Support](#support)
  * [Contributing](#contributing)
  * [License](#license)

## Installation

**Please note that you will need access to the You.i Engine SDK in order to
build and run this application.**

### Install You.i Engine SDK
There are a few dependencies that needs to be pre-installed before building the
app, depending on your platform. Please follow the installation instructions at
[our Developer
Portal](https://developer.youi.tv/latest/Content/InstallationCommon/H1IntroToInstallSection.htm)
before continuing.

## Usage

To get started, simply clone the repository and install all dependencies:
```shell
git clone https://github.com/YOU-i-Labs/samples-and-guides
cd samples-and-guides
yarn install
```

Building The app is done via the `generate` and `build` scripts in the `youi`
folder. `generate` will create the relevant project based on platform (Xcode,
Android Studio, Visual Studio, etc.) in the corrosponding `build` folder.

Additional supported platforms are: `osx, android, ios, tvos, tizen-nacl, uwp,
ps4, linux`

For example, to build for OSX:
```shell
cd youi
./generate.rb -p osx [-c debug|release]
./build.rb -b build/osx [-c debug|release]
```
For additional information on the build scripts please refer to [this
page.](https://developer.youi.tv/latest/Content/RN_BuildingAppsTopics/H2RNBuildProc.htm)

Start Metro bundler:
```shell
yarn start &
```

Run the app:
```shell
# from within the `youi` folder
open build/osx/Debug/Training
```

## Debugging

You.i Engine apps support remote debugging just like a regular React Native
app. To turn on debugging press or touch any corner of the app 3 times in a
row. The You.i Engine debug menu will open where you can turn on
`Remote JS debugging`

Note: Debugging incurs a performance hit and is not recommended when running on
low end devices.

## Support

These samples are provided as-is. For any questions, please reach out to your account
manager.

## Contributing

Contributing is currently closed. Please refer to
[CONTRIBUTING](CONTRIBUTING.md) for more information.

## License

You.i Engine samples are available under the [MIT](LICENSE) license.
