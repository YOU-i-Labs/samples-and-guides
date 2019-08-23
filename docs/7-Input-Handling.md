# Input Handling

In addition to touch, most devices support a wide range of input devices: TV remotes, game controllers, keyboards, and touchpads. You.i Engine One provides an Input module to handle the different range of input devices.

> **Note** This API is currently under review and may change in the future.


## Input Events

The `Input` module provides a simple API to handle different physical
input events. Please reference [this
page](https://developer.youi.tv/API_Docs/latest/core/html/group__events.html#gaaa98c87d4d3a110e58e1f498d91a8b25)
for a full list of supported key codes.

Handling input is done by attaching an event handler for each individual
key using the `addEventListener` method.

```jsx
import React, { Component } from 'react';
import { View, Text, Input } from '@youi/react-native-youi';

const keys = [
 'Space',
 'Play',
 'MediaPlay',
 'MediaPlayPause',
];

export default class InputHandler extends Component {
 componentDidMount() {
   keys.forEach(key => Input.addEventListener(key, this.registerUserActivity));
 }

 componentWillUnmount() {
   keys.forEach(key => Input.removeEventListener(key, this.registerUserActivity));
 }

 registerUserActivity = keyEvent => {
   const { keyCode, eventType } = keyEvent;
   this.setState({ info: `${keyCode} ${eventType}` });
 }

 render() {
   return (
     <View style={styles.container}>
       <Text style={{ fontSize: 24 }}>{`${this.state ? this.state.info : 'Press Space or the Play Button'}`}</Text>
     </View>
   );
 }
}

const styles = {
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff',
 },
};
```

In this example we respond to the Space and Play buttons. Since some
devices may have a different type of Play button, we register the same
handler to three different key codes.

It’s best to remove all event listeners when a component is unmounted.
To do so, use the `removeEventListener` method.
