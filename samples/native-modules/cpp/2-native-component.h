#ifndef _NATIVE_COMPONENT_SAMPLE_H_
#define _NATIVE_COMPONENT_SAMPLE_H_

#include "youireact/nodes/ShadowView.h"
#include "youireact/props/TextController.h"
#include <scenetree/YiTextSceneNode.h>
        
class NativeComponentSample : public yi::react::ShadowView
{
public:
    YI_RN_EXPORT_NAME(TextComponent);
    
    NativeComponentSample();
    
    virtual ~NativeComponentSample() final;
    virtual bool OnInit() override;
    virtual void ApplyProps(folly::dynamic properties) override;
    virtual const CYITextSceneNode *GetCounterpart() const final;
    virtual CYITextSceneNode *GetCounterpart() final;
    yi::react::TextController &GetController();
    YGSize YogaMeasure(YGNodeRef node, float width, YGMeasureMode widthMode, float height, YGMeasureMode heightMode) const;
    
private:
    virtual std::unique_ptr<CYISceneNode> CreateCounterpart(CYISceneManager *pSceneManager) final;
    virtual void ConfigureDefaultProperties() final;
    virtual void OnChildAddedAtIndex(ReactComponent *pChild, size_t index) override;
    virtual void OnChildRemovedAtIndex(ReactComponent *pChild, size_t index) override;
    virtual void OnLayoutApplied() final;
    
    yi::react::TextController m_controller;
    
    YI_TYPE_BASES(NativeComponentSample, ShadowView);
};


#endif // _NATIVE_COMPONENT_SAMPLE_H_
