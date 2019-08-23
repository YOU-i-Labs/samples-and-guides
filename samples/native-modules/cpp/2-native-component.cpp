#include "2-native-component.h"
#include <scenetree/YiAtlasTextSceneNode.h>
#include <cxxreact/JsArgumentHelpers.h>

#define TAG "NativeComponentSample"

YI_TYPE_DEF_INST(NativeComponentSample, yi::react::ShadowView)

NativeComponentSample::NativeComponentSample()
{
}

NativeComponentSample::~NativeComponentSample() = default;

YGSize NativeComponentSample::YogaMeasure(YGNodeRef node, float width, YGMeasureMode widthMode, float height, YGMeasureMode heightMode) const
{
    YI_UNUSED(node);
    YI_UNUSED(widthMode);
    YI_UNUSED(heightMode);

    // Here you want to actually calculate the size of the node
    // For the example we're just going to use a static value
    YGSize size = {300.f, 10.f};

    return size;
}

void NativeComponentSample::ConfigureDefaultProperties()
{
    // These are default for text
    folly::dynamic defaultProps = folly::dynamic::object;
    defaultProps["fontSize"] = 24;
    defaultProps["color"] = ToDynamic(CYIColor::Named().Black);
    defaultProps["ellipsizeMode"] = "tail";
    defaultProps["fontFamily"] = "yi_Arial-Regular.ttf";
    ApplyProps(std::move(defaultProps));
}

bool NativeComponentSample::OnInit()
{
    m_controller.SetCounterpart(GetCounterpart());
    m_controller.SetReactComponent(this);
    GetYogaNode()->SetYogaMeasureFunction(*this, &NativeComponentSample::YogaMeasure);
    m_controller.SetYogaNode(GetYogaNode());
    return true;
}

void NativeComponentSample::OnLayoutApplied()
{
    yi::react::ShadowView::OnLayoutApplied();

    // Define additional properties based on the layout.
}

std::unique_ptr<CYISceneNode> NativeComponentSample::CreateCounterpart(CYISceneManager *pSceneManager)
{
    // This is where the actual Text node is created
    std::unique_ptr<CYITextSceneNode> pTextNode(new CYIAtlasTextSceneNode);
    pTextNode->SetSceneManager(pSceneManager);
    pTextNode->SetFontID(0);
    pTextNode->SetMultiline(true);
    pTextNode->Init();
    return std::unique_ptr<CYISceneNode>{pTextNode.release()};
}

const CYITextSceneNode *NativeComponentSample::GetCounterpart() const
{
    return static_cast<const CYITextSceneNode *>(yi::react::ShadowView::GetCounterpart());
}

CYITextSceneNode *NativeComponentSample::GetCounterpart()
{
    return static_cast<CYITextSceneNode *>(yi::react::ShadowView::GetCounterpart());
}

void NativeComponentSample::ApplyProps(folly::dynamic properties)
{
    m_controller.ApplyProps(properties);
    yi::react::ShadowView::ApplyProps(std::move(properties));
}

void NativeComponentSample::OnChildAddedAtIndex(ReactComponent *pChild, size_t index)
{
    YI_ASSERT(!pChild->GetCounterpart() && !pChild->GetYogaNode(), TAG, "Invariants of Raw Text not met!");
    m_controller.AddShadowRawText(pChild, index);
}

void NativeComponentSample::OnChildRemovedAtIndex(ReactComponent *pChild, size_t index)
{
    YI_ASSERT(!pChild->GetCounterpart() && !pChild->GetYogaNode(), TAG, "Invariants of Raw Text not met!");
    m_controller.RemoveShadowRawText(pChild, index);
}

yi::react::TextController &NativeComponentSample::GetController()
{
    return m_controller;
}
