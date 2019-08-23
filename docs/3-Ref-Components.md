Unlike React Native components, children of a `Composition` are not
declared, instead they are referenced. This is because they have been loaded
into existence by the composition, and exist whether or not we write JSX to
interface with them. This has the advantage of needing much less code to
accomplish the same level of fidelity, but at the cost that all of this
information is not explicit in code.

To reference elements of a composition, you must use `*Ref` components as
children of the composition. Most of these components have a comparable React
Native component.
`View/ViewRef, Button/ButtonRef, FlatList/ListRef, Image/ImageRef` share similar
functionality and API, but other components like `TimelineRef` are unique to You.i
Engine SDK.

```jsx
import React, { Component } from 'react';
import { Composition, ViewRef, ButtonRef } from '@youi/react-native-youi';

export default class ViewRefSample extends Component {
 render() {
   return (
     <Composition source="Training_Main">
       <ViewRef name="Controls">
         <ButtonRef name="Btn-Next" title="Next" />
       </ViewRef>

       {/* Valid, non-ambiguous tree traversal  */}
       <ButtonRef name="Btn-Next" title="Next" onPress={() => {}}/>

       {/* Valid, any Ref is a ViewRef */}
       <ViewRef name="Btn-Next"/>

       {/* Not Valid, onPress can only be on a ButtonRef */}
       {/* <ViewRef name="Btn-Next" title="Next" onPress={() => {}}/> */}
     </Composition>
   );
 }
}
```

Every `Ref` is also a `ViewRef`, but you won’t be able to use Ref specific
props and methods.

## Working with Refs

Ref components expose some functionality through imperative calls. To
access them you can use the ref property that can be used immediately or
stored for later use, depending on the use case. Two common examples are
for focus and animations.

> **Note** Refs can become stale after another call to render, and so you must keep your refs up to date each time the function is invoked

```jsx
buttonRef = React.createRef();

<ButtonRef
   name="Btn-Next"
   ref={this.buttonRef}}
/>
```

We’ll learn more about focus and animation in the next section.

## That’s all very cool, where can I learn more about Refs?

You can find a full list of You.i Engine Ref Components
[here](https://developer.youi.tv/latest/Content/RN_DevTopics/H1_RN_RefComponents.htm).

To learn more about the After Effects workflow, we have a series of video
tutorials that you should [definitely check out](https://developer.youi.tv/latest/Content/AE_referenceTopics/H2AETutorials.htm).
