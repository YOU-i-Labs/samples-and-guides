/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, VideoRef, ButtonRef } from '@youi/react-native-youi';

export class VideoRefComponent extends Component {
  videoPlayerRef = React.createRef();

  onPlayerReady = () => {
    if (this.videoPlayerRef.current)
      this.videoPlayerRef.current.play();
  }

  onPressPlay = () => {
    if (this.videoPlayerRef.current)
      this.videoPlayerRef.current.play();
  }

  onPressPause = () => {
    if (this.videoPlayerRef.current)
      this.videoPlayerRef.current.pause();
  }

  render() {
    return (
      <Composition source="Training_RefComponents">
        <VideoRef
          name="Video"
          ref={this.videoPlayerRef}
          source={{
            uri: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
            type: 'HLS',
          }}
          onReady={this.onPlayerReady}
        />

        <ButtonRef name="Btn-Play" title="Play" onPress={this.onPressPlay} />
        <ButtonRef name="Btn-Pause" title="Pause" onPress={this.onPressPause} />
      </Composition>
    );
  }
}
