/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, View } from '@youi/react-native-youi';
import { PixelRatio } from 'react-native';
import { StyledButton } from '../../components/styledButton';

export class MixingCompositionsViews extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StyledButton title="JSX Button"/>
        <View style={{ width: 350 / PixelRatio.get(), height: 60 / PixelRatio.get() }}>
          <Composition source="Training_Btn-Small"/>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
