#ifndef _NATIVE_MODULE_SAMPLE_H_
#define _NATIVE_MODULE_SAMPLE_H_

#include <youireact/NativeModule.h>

class YI_RN_MODULE(NativeLogger)
{
public:
    YI_RN_EXPORT_NAME(Logger);
    YI_RN_EXPORT_METHOD(debug)(CYIString message);
    YI_RN_EXPORT_METHOD(send)(Callback successCallback, Callback catchCallback, CYIString message);
};

#endif // _NATIVE_MODULE_SAMPLE_H_
