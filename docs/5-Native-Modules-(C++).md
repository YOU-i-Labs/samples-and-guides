# Native Modules (C++)

Similar to React Native, your app may need to access a platform API that
does not have a corresponding React Native or You.i Engine One module
yet. You may want to re-use existing code, or write high performance
native code for various reasons.

In React Native, you would write a Native Module either in Objective C
or Java. Because You.i Engine One spans across additional platforms,
Native Modules are written in C++. Native Modules are also useful when
you want to integrate a 3rd party SDK.

This is an advanced guide that shows how to build a native module. It
assumes the reader knows C++.

> **Note** Because You.i Engine uses C++ for native modules, existing 3rd party modules are not supported at this time.

## Native Logging Module Example

Let’s say we want to be able to log messages via the native app instead
of using `console.log()`

A native module is just a C++ class that uses a set of macros to expose
its functionality to JavaScript.

```cpp
// native-logger.h
#include <youireact/NativeModule.h>

class YI_RN_MODULE(NativeLogger)
{
public:
   YI_RN_EXPORT_NAME(Logger);
   YI_RN_EXPORT_METHOD(debug)(CYIString message);
};
```

You.i Engine C++ classes must use the `YI_RN_MODULE` macro in the class
definition, the name here will be used in native code. The
`YI_RN_EXPORT_NAME` macro defines the module name in JavaScript and
must be specified.

You.i Engine will not expose any methods of the NativeLogger class
unless explicitly told to do so using the `YI_RN_EXPORT_METHOD` macro.

The first thing you need to do in your class implementation is to
instantiate the module using the `YI_RN_INSTANTIATE_MODULE` macro.
Exported method implementations use the `YI_RN_DEFINE_EXPORT_METHOD`
macro:

```cpp
// native-logger.cpp
#include "native-logger.h"
#define TAG "NativeLogger"

YI_RN_INSTANTIATE_MODULE(NativeLogger);
YI_RN_DEFINE_EXPORT_METHOD(NativeLogger, debug)(CYIString message)
{
   YI_LOGD(TAG, "%s", message.GetData());
}
```

Lastly, you need to add the `NativeLogger` module to the React Native
bridge App.cpp:

```cpp
// App.cpp
#include "native-logger.h"
bool App::UserInit()
{
 // ...
 bool bUserInit = PlatformApp::UserInit();
 GetReactNativeViewController().AddModule<NativeLogger>();
 return bUserInit;
}
```

Now from your JavaScript file you can access the method like this:

```jsx
import { NativeModules } from 'react-native';
const { Logger } = NativeModules;
Logger.debug("Hello World!");
```

## Argument Types

`YI_RN_EXPORT_METHOD` supports all standard JSON object types, such as:

  - string (`CYIString`)
  - number (`int, float, double`)
  - boolean (`bool`)
  - array (`std::list`) of any types from this list
  - object (`std::map`) with string keys and values of any type from this list
  - function (`Callback`)

**Handling parameters in a method**

There are four basic options when it comes to method parameters:

  - No params.
  - Params.
  - Params and one callback. (`Callback`)
  - Params and two callbacks. (`Promise`)

The "params" ("parameters", "arguments" or "args") object is a
folly::dynamic object

representing an array in which each element is the left-to-right param

as passed in on the JavaScript side. The array is made up of other

folly::dynamics that may be strings, numbers, objects, arrays, etc.

Instead of using `folly::dynamic`, it's recommended to specify your
parameter types in the method definition. The `NativeModule` class will
try to convert the array of arguments if the correct signature is found.

```cpp
MyModule.makeNamed3dPoint("Earth", 1.0, 2.5, 3.77);
```

This will match to either of the definitions below:

```cpp
YI_RN_EXPORT_METHOD(**makeNamed3dPoint**)(**folly**::dynamic args);
```

```cpp
YI_RN_EXPORT_METHOD(makeNamed3dPoint)(CYIString name, float x, float y, float z);
```

In this case, the NativeModule tries to expand the `args` dynamic
array into

the specified types in the expected order.

If an argument to your function is optional, use
`folly::Optional<Type>`. This will

not fail out on error.

## Promises

Native modules can also fulfill a promise, which can simplify your code,
especially when using ES2016's async/await syntax. When the first
parameters of a bridged native method are both a Callback, its
corresponding JS method will return a JS Promise object.

```cpp
// native-logger.h
#include <youireact/NativeModule.h>

class YI_RN_MODULE(NativeLogger)
{
public:
    YI_RN_EXPORT_NAME(Logger);
    YI_RN_EXPORT_METHOD(debug)(CYIString message);
    YI_RN_EXPORT_METHOD(send)(Callback resolveCallback, Callback rejectCallback, CYIString message);
};
```

We’ve added a new method called `send` which requires the first two
parameters to be callbacks. The following parameters define the method
signature in JavaScript.

```cpp
// native-logger.cpp
#include "native-logger.h"
#include <network/YiHTTPRequest.h>
#include <network/YiHTTPResponse.h>

#define TAG "NativeLogger"

YI_RN_INSTANTIATE_MODULE(NativeLogger);
YI_RN_DEFINE_EXPORT_METHOD(NativeLogger, debug)(CYIString message)
{
   YI_LOGD(TAG, "%s", message.GetData());
}

YI_RN_DEFINE_EXPORT_METHOD(NativeLogger, send)(Callback resolveCallback, Callback rejectCallback, CYIString message)
{
   YI_LOGD(TAG, "%s", message.GetData());

   //Sends the message to some endpoint that takes time to respond.
   std::shared_ptr<CYIHTTPRequest> pRequest(new CYIHTTPRequest(CYIUrl("http://httpstat.us/200?sleep=3000"), CYIHTTPRequest::GET));
   pRequest->NotifyResponse.Connect([resolveCallback, message]() {
       resolveCallback({ ToDynamic("\"" + message + "\" recieved." ) });
   });

   pRequest->NotifyError.Connect([rejectCallback, message]() {
       rejectCallback({ ToDynamic("\"" + message + "\" not received." ) });
   });

   CYIHTTPService::GetInstance()->EnqueueRequest(pRequest);
}
```

The JavaScript counterpart of this method returns a promise. This means
you can use the await keyword to wait for its results.

```jsx
import { NativeModules } from 'react-native';
const { Logger } = NativeModules;


async function delayedLogger(message) {
 const response = await Logger.send(message);
 console.log(response);
}

delayedLogger('Hello World!');
```
