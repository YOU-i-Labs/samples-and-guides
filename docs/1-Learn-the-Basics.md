# Learn the Basics

You.i Engine One is like React Native, but it uses You.i Engine components instead of native components as building blocks. So to understand the basic structure of a You.i
Engine One app, you need to understand some of the basic React Native
and React concepts, like JSX, components, `state`, and `props`. If you
already know React and React Native, you still need to learn some You.i
Engine One-specific stuff, like Compositions and Timelines.

## Hello World

Since You.i Engine One runs the same React Native API that you’re
familiar with today, the same React Native code works without changes.

```jsx
import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('YiReactApp', () => HelloWorldApp);
```

## What's going on here?

The only unusual thing in this code example is that the JSX components
in the example do not bind to the native platform equivalents. In this
case, View maps to a CYISceneNode instead of a UIView on iOS or
android.view on Android and Text maps to a CYITextSceneNode

instead of a UITextView on iOS or android.text

## This doesn’t look so different

That’s correct. You.i Engine One is mostly API compatible with React
Native, but works across 10+ platforms. To see the differences between
the two please see [this link here](https://developer.youi.tv/latest/Content/RNsupportedComponents/VanillaSuppCompsLists.htm).

## I’m still confused, I didn’t understand any of this!

That’s ok. In order to understand the example above you need to have a
basic understanding of React Native and React as a whole. React Native
has an excellent tutorial to help you get started with the basic syntax
and workflow
[here](https://facebook.github.io/react-native/docs/tutorial).
