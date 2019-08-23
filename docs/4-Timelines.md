# Timelines

Great animations are the backbone of a great user experience. React
Native provides two complementary animation systems:
[Animated](https://facebook.github.io/react-native/docs/animations#animated-api)
for granular and interactive control of specific values, and
[LayoutAnimation](https://facebook.github.io/react-native/docs/animations#layoutanimation-api)
for animated global layout transactions.

In addition to the React Native animation systems, You.i Engine One
provides its own animation system based on After Effects keyframes and
composition markers.

Animations are referenced using the TimelineRef component and are as
simple as calling play() on them, no more Animated timings and values\!

```jsx
import React, { Component } from 'react';
import { Composition, TimelineRef } from '@youi/react-native-youi';

export default class TimelineRefPlayOnload extends Component {
  inTimeline = React.createRef();

  componentDidMount() {
    this.inTimeline.current.play();
  }

  render() {
    return (
      <Composition source="Training_Main">
        <TimelineRef
          name="In"
          ref={this.inTimeline}
        />
      </Composition>
    );
  }
}
```

The `In` Timeline is conventionally used to define screen transitions.

## What else can I do with Timelines?

TimelineRef exposes the ability to start and stop animations through
several methods. For playing a timeline, you can use `Play` and
`Start`. For ending an animation, you can use `Stop`, `Abort`, and
`Pause`. Lastly, you can scrub to a given position in a timeline with
the `Seek` method.

Although some of these methods seem similar, there are some small
differences between them that can be used for different results. For
more information please see the [TimelineRef
component](https://developer.youi.tv/latest/Content/RN_DevTopics/H2TimelineRefComponent.htm).

Timelines can also be played in reverse using the `direction` property or
looped infinitely using the loop property.

```jsx
<TimelineRef
  name="In"
  direction="reverse"
  loop={true}
/>
```

Looping a Timeline in reverse.

## What If I wanted to chain animations?

JavaScript [ES6
promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
are a useful way of handling callbacks for asynchronous operations; for
example, an operation that should only happen after a timeline has
completed. While TimelineRefs do not expose promises at this time, you
can wrap the component and add promise functionality and even
autoplay on mount.

A very basic implementation of this:

```jsx
import React, { Component } from 'react';
import { Composition, ButtonRef, TimelineRef } from '@youi/react-native-youi';

export default class TimelineRefPlayOnInteraction extends Component {
  inTimeline = React.createRef();

  outTimeline = React.createRef();

  onPress = async () => {
    await this.outTimeline.current.play();
    await this.inTimeline.current.play();
  }

  render() {
    return (
      <Composition source="Training_Main">
          <PromiseTimelineRef
          name="In"
          ref={this.inTimeline}
          autoplay
        />

        <PromiseTimelineRef
          name="Out"
          ref={this.outTimeline}
        />

        <ButtonRef name="Btn-Next" title="Next" onPress={this.onPress} />
      </Composition>
    );
  }
}

class PromiseTimelineRef extends Component {
  timelineRef = React.createRef();

  componentDidMount() {
    if (this.props.autoplay)
      this.play();
  }

  play = () => new Promise(resolve => {
    this.resolve = resolve;
    this.ref.play();
  });

  render() {
    return (
      <TimelineRef
        {...props}
        name={this.props.name}
        ref={this.timelineRef}
        onCompleted={() => {
          if (this.resolve)
            this.resolve('onCompleted');
        }}
      />
    );
  }
}
```

We wrapped the `TimelineRef` to return a promise on play, and resolve the
promise in the `onCompleted` callback.
