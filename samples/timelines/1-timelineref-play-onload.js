/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, TimelineRef, TextRef } from '@youi/react-native-youi';

export class TimelineRefPlayOnload extends Component {
  inTimeline = React.createRef();

  loopTimeline = React.createRef();

  state = { bodyText: '' };

  componentDidMount() {
    this.inTimeline.current.play();
    this.loopTimeline.current.play();

    this.setState({ bodyText: 'Timeline Loaded' });
  }

  onTimelineCompleted = () => this.setState({ bodyText: 'Timeline Completed' });

  render() {
    return (
      <Composition source="Training_Timelines">
         <TimelineRef
          name="Forward"
          ref={this.inTimeline}
          onCompleted={this.onTimelineCompleted}
        />

        <TimelineRef
          name="Loop"
          ref={this.loopTimeline}
          onCompleted={this.onTimelineCompleted}
          loop={true}
        />

        <TextRef name="Info" text={this.state.bodyText} />
      </Composition>
    );
  }
}
