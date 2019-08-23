/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, TimelineRef, ButtonRef, TextRef } from '@youi/react-native-youi';

export class TimelineRefPlayOnInteraction extends Component {
  forwardTimeline = React.createRef();

  loopTimeline = React.createRef();

  state = { bodyText: '' }

  onTimelineLoaded = () => {
    this.setState({ bodyText: 'Timeline Loaded' });
  };

  onTimelineCompleted = () => this.setState({ bodyText: 'Timeline Completed' });

  onPress = () => {
    this.setState({ bodyText: 'Playing Timeline' });
    if (this.forwardTimeline.current && this.loopTimeline.current) {
      this.forwardTimeline.current.play();
      this.loopTimeline.current.play();
    }
  }

  render() {
    return (
      <Composition source="Training_Timelines">
         <TimelineRef
          name="Forward"
          onCompleted={this.onTimelineCompleted}
          ref={this.forwardTimeline}
        />

        <TimelineRef
          name="Loop"
          onCompleted={this.onTimelineCompleted}
          ref={this.loopTimeline}
          loop={true}
        />

        <ButtonRef
          name="Btn-Small"
          onPress={this.onPress}
          title="Play"
        />

        <TextRef name="Info" text={this.state.bodyText} />
      </Composition>
    );
  }
}
