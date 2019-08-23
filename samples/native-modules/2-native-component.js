/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { View } from '@youi/react-native-youi';
import { requireNativeComponent } from 'react-native';

const TextComponent = requireNativeComponent('TextComponent');

export class NativeComponent extends Component {
  render() {
    return (
      <View>
        <TextComponent>Custom Text Component</TextComponent>
      </View>
    );
  }
}
