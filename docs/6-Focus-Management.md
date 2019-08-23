# Focus Management

You.i Engine One is designed from the ground up to support 10ft
platforms. `FocusManager` is a powerful complement to React Native on any
device that receives input from an external device instead of touch. Using the `FocusManager` requires no
build changes and simply works on all platforms.

You.i Engine One is able to dynamically calculate how it should manage
focus behavior and direction, but sometimes it is necessary to implement
custom behaviors such as focusing between elements that aren’t directly
aligned, or setting the ‘default’ item to focus on when visiting a page.

> **Note** Focus Management differs slightly between Ref and non-Ref components. It’s important to read carefully and understand the differences between the two.

## Focusable components

There a few rules on what components are focusable:

1. Any `*Ref` component is focusable if its `focusable` prop is `true` and the `visible` prop is not `false`.
2. A `ButtonRef` component with a `FocusIn` timeline will have its `focusable` prop set to `true` by default.
3. Any `Touchable*` component is focusable, which includes the `Button` component.

To determine if a `Ref` component has gained or lost focus, use `onFocus` and `onBlur` respectively.

```jsx
<ViewRef
  name="SomeView"
  focusable={true}
  onFocus={() => { console.log('ViewRef gained focus') }}
  onBlur={() => { console.log('ViewRef lost focus') }}
/>
```

To determine if a child `Ref` component has gained or lost focus, use
`onFocusInDescendants` and `onBlurInDescendants` respectively.

```jsx
<ViewRef
  name="SomeView"
  focusable={true}
  onFocusInDescendants={() => { console.log('ViewRef child gained focus'} }
  onBlurInDescendants={() => { console.log('ViewRef child lost focus'} }
/>
```

This is very handy when trying to determine focus on a related set of
components, such as a navigation menu.

The order of callbacks when a child component gains focus is:
1. Child component `onFocus`
2. Parent component `onFocusInDescendants`

This callback order works similarly for `onBlur` and `onBlurInDescendants`.

## Setting focus programmatically

The `FocusManager` module enables fine tuned control of focus using imperative calls. The `FocusManager` can be used for setting the initial focus in the component, when navigating between screens or when the next focus direction is ambigious.

To focus on a component, simply call `FocusManager.focus(ref)` like this:

```jsx
buttonRef = React.createRef();

<View>
  <Button
    title="Press Me"
    onPress={() => {
      if (this.buttonRef.current)
        FocusManager.focus(this.buttonRef.current)
      }
    }
  />
  <Button
    title="Focus Target"
    ref={this.buttonRef}
  />
</View>
```

> **Note** Always set initial focus in `componentDidMount` lifecycle method. This will guarantee that the ref is available and can be focused on after the first `render` has finished.

## Focus Direction

Sometimes, you may want behavior that is different from the default
focus behavior provided by the You.i Engine. In this case, you can use
FocusManager.setNextFocus() to override default behaviors and define
your own.

setNextFocus takes three arguments: `fromRef`, `toRef`, Direction (`"up", "down", "left", "right"`)

```jsx
import React, { Component } from 'react';
import { View, Button, FocusManager } from '@youi/react-native-youi';

export default class MixingCompositionsAndViewsSample extends Component {
  firstButton = React.createRef();

  middleButton = React.createRef();

  lastButton = React.createRef();

  componentDidMount() {
    FocusManager.setNextFocus(this.firstButton.current, this.lastButton.current, 'up');
    FocusManager.setNextFocus(this.lastButton.current, this.firstButton.current, 'down');
    FocusManager.focus(this.middleButton.current);
  }

  render() {
    return (
      <View style={styles.container}>
          <Button
            title="First Button"
            ref={this.firstButton}
          />
          <Button
            title="Middle Button"
            ref={this.middleButton}
          />
          <Button
            title="Last Button"
            ref={this.lastButton}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff',
 },
});
```

In the above example, we set a vertical list of buttons that can focus
continuously in both the up and down directions.

## Locking focus

If you have an overlay that you need to show, and you want the focus
system to only allow focusing on items within that composition instead
of underneath, you will need to set it as the focus root.

When an item is set as the focus root, only itself and its children will
be able to receive focus. It is the equivalent of setting the `focusable`
prop to `false` on all the components that are not a child of the focus
root.


```jsx
sideBarRef = React.createRef();

<ViewRef
  name="Sidebar"
  ref={this.sideBarRef}
  onFocusInDescendants={() => {
    if (this.sidebarRef.current)
      FocusManager.setFocusRoot(this.sideBarRef.current, true)
  }}
/>
<ViewRef name="MainScreen" />
```

Above, only children of the Sidebar `ViewRef` will be focusable, while
nothing on MainScreen will be focusable.
