/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
#include "AppFactory.h"
#include "App.h"

#define APP_NAME "training"

#define APP_WIDTH (1920)
#define APP_HEIGHT (1080)

std::unique_ptr<CYIApp> AppFactory::Create()
{
    return std::make_unique<App>();
}

int AppFactory::GetWindowWidth()
{
    return APP_WIDTH;
}

int AppFactory::GetWindowHeight()
{
    return APP_HEIGHT;
}

const char *AppFactory::GetWindowName()
{
    return APP_NAME;
}
