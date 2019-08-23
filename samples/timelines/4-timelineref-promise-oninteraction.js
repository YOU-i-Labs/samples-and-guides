/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';
import { Composition, ButtonRef, TimelineRef } from '@youi/react-native-youi';

export class TimelineWithPromise extends Component {
  forwardTimeline = React.createRef();

  reverseTimeline = React.createRef();

  onPress = async () => {
    if (this.forwardTimeline.current && this.reverseTimeline.current) {
      await this.forwardTimeline.current.play();
      await this.reverseTimeline.current.play();
    }
  }

  render() {
    return (
      <Composition source="Training_Timelines">
         <PromiseTimelineRef name="Loop" loop autoplay />
         <PromiseTimelineRef
          name="Forward"
          ref={this.forwardTimeline}
        />

        <PromiseTimelineRef
          name="Reverse"
          ref={this.reverseTimeline}
        />

        <ButtonRef name="Btn-Small" title="Play" onPress={this.onPress} />
      </Composition>
    );
  }
}

class PromiseTimelineRef extends Component {
  innerRef = React.createRef();

  componentDidMount() {
    if (this.props.autoplay)
      this.play();
  }

  play = () => {
    return this.innerRef.current ?
    new Promise(resolve => {
      this.resolve = resolve;
      this.innerRef.current.play();
    }) : Promise.reject(new Error('Ref not ready'));
}

  render() {
    return (
      <TimelineRef
        {...this.props}
        name={this.props.name}
        ref={this.innerRef}
        onCompleted={() => {
          if (this.resolve)
            this.resolve('onCompleted');
        }}
      />
    );
  }
}
