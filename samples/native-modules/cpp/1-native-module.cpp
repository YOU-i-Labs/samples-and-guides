#include "1-native-module.h"
#include <network/YiHTTPRequest.h>
#include <network/YiHTTPResponse.h>

#define TAG "NativeLogger"

YI_RN_INSTANTIATE_MODULE(NativeLogger);
YI_RN_DEFINE_EXPORT_METHOD(NativeLogger, debug)(CYIString message)
{
    YI_LOGD(TAG, "%s", message.GetData());
}

YI_RN_DEFINE_EXPORT_METHOD(NativeLogger, send)(Callback successCallback, Callback catchCallback, CYIString message)
{
    YI_LOGD(TAG, "%s", message.GetData());

    //Sends the message to some endpoint that takes time to respond.
    std::shared_ptr<CYIHTTPRequest> pRequest(new CYIHTTPRequest(CYIUrl("http://httpstat.us/200?sleep=3000"), CYIHTTPRequest::Method::GET));
    pRequest->NotifyResponse.Connect([successCallback, message]() {
        successCallback({ ToDynamic("\"" + message + "\" recieved." ) });
    });

    pRequest->NotifyError.Connect([catchCallback, message]() {
        catchCallback({ ToDynamic("\"" + message + "\" not recieved." ) });
    });

    CYIHTTPService::GetInstance()->EnqueueRequest(pRequest);
}
