/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
#ifndef _APP_H_
#define _APP_H_

#include <signal/YiSignalHandler.h>
#include <youireact/ReactNativePlatformApp.h>

class App
    : public yi::react::PlatformApp
{
public:
    App();

    virtual ~App();

protected:
    virtual bool UserInit() override;
    virtual bool UserStart() override;
    virtual void UserUpdate() override;

private:
};

#endif // _APP_H_
