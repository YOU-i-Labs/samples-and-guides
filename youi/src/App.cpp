/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
#include "App.h"

#include <JSBundlingStrings.h>
#include <appium/YiWebDriverLocator.h>
#include <cxxreact/JSBigString.h>
#include <glog/logging.h>

#include "../../samples/native-modules/cpp/1-native-module.h"
#include "../../samples/native-modules/cpp/2-native-component.h"

#include <youireact/modules/drm/FairPlayDrmHandlerModule.h>

App::App() = default;

App::~App() = default;

using namespace yi::react;

bool App::UserInit()
{
    // Start the web driver for allowing the use of Appium.
    CYIWebDriver *pWebDriver = CYIWebDriverLocator::GetWebDriver();
    if (pWebDriver)
    {
        pWebDriver->Start();
    }

#if !defined(YI_MINI_GLOG)
    // miniglog defines this using a non-const char * causing a compile error and it has no implementation anyway.
    static bool isGoogleLoggingInitialized = false;
    if (!isGoogleLoggingInitialized)
    {
        google::InitGoogleLogging("--logtostderr=1");
        isGoogleLoggingInitialized = true;
    }
#endif

    std::unique_ptr<JsBundleLoader> pBundleLoader(GetBundler());

    PlatformApp::SetJsBundleLoader(std::move(pBundleLoader));
    auto init = PlatformApp::UserInit();
    GetReactNativeViewController().AddModule<NativeLogger>();
    GetReactNativeViewController().AddViewModule<NativeComponentSample>();
    GetReactNativeViewController().AddModule<FairPlayDrmHandlerModule>();
    return init;
}

bool App::UserStart()
{
    return PlatformApp::UserStart();
}

void App::UserUpdate()
{
    PlatformApp::UserUpdate();
}
