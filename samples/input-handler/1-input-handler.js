/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { View, Text, Input } from '@youi/react-native-youi';

const keys = [
  'Space',
  'Play',
  'MediaPlay',
  'MediaPlayPause',
];

export class InputHandler extends Component {
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
        <Text style={{ fontSize: 24, color:'#F1F1F1' }}>{`${this.state ? this.state.info : 'Press Space or the Play Button'}`}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
