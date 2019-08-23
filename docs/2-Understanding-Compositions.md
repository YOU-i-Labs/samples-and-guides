# Understanding Compositions

You.i Engine One introduces a way to declare a component using data from
After Effects. This is done with the `Composition` component.

In React Native, components are created with JSX declaratively. When
using a `Composition`, your component and its hierarchical data is
predefined. Child components of a composition are declarative
references.

## Loading a Composition

With this framework in mind, we can start with a simple example that
loads a `Composition` from our `Training.aep` file. This is done using the
`source` property. The naming scheme for the source property is
`{fileName}_{compositionName}`

```jsx
import React, { Component } from 'react';
import { Composition } from '@youi/react-native-youi';

export default class CompositionLoadingSample extends Component {
 render() {
   return (
       <Composition source="Training_Main" />
   );
 }
}
```

this recursively opens the **Main** composition and its children,
exported from the Training.AEP file.

## Combining React Native Components and Compositions

React Native components cannot be used inside a Composition. However,
you can use Compositions inside React Native components. This allows you
to leverage React Native’s excellent Flexbox layout with richly animated
Compositions components with much less code.

For example, a screen might be laid out in large pieces by React Native
components such as `View` and `FlatList`, but with the individual components
such as buttons and images, being created with compositions.

```jsx
import React, { Component } from 'react';
import { Composition, View, Button } from '@youi/react-native-youi';

export default class MixingCompositionsAndViewsSample extends Component {
 render() {
   return (
     <View style={styles.container}>
       <View style={styles.buttonContainer}>
         <Button title="JSX Button"/>
       </View>
       <Composition source="Training_Btn-Small"/>
     </View>
   );
 }
}

const styles = {
 container: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff',
 },
 buttonContainer: {
   backgroundColor: '#c3c3c3',
   color: '#841584',
   padding: '18',
   height: '50',
   width: '230',
   margin: 20,
 },
};
```

## This is still pretty bare bones, where are the meat and potatoes?

Now that we know all about Compositions, we can learn about how to use
Ref components in the [next section](3-Ref-Components.md).
