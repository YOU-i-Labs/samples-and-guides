/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, View, Button } from '@youi/react-native-youi';

export class MixingCompositionsViews extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button color="white" title="JSX Button"/>
        </View>
        <Composition source="Training_Btn-Small"/>
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
  buttonContainer: {
    borderWidth: 2,
    borderColor: '#F1F1F1',
    color: '#841584',
    padding: '18',
    height: '60',
    width: '350',
    margin: 20,
  },
};
