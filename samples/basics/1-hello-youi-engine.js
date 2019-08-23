/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Text, View } from '@youi/react-native-youi';

export class HelloYouiEngine extends Component {
  render() {
    return (
      <View>
        <Text style ={{ color:'#F1F1F1', fontSize: 24 }}>
          If you like React, you'll also like React Native.
        </Text>
        <Text style ={{ color:'#F1F1F1', fontSize: 24 }}>
          If you like React Native, you'll love You.i Engine.
        </Text>
      </View>
    );
  }
}
