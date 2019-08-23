/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { View, Text, FocusManager } from '@youi/react-native-youi';
import { TouchableOpacity } from 'react-native';

export class FocusControl extends Component {
  touchableRef = React.createRef();

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => {
          if (this.touchableRef.current)
            FocusManager.focus(this.touchableRef.current);
          }}>
          <Text style={styles.buttonText}>Press Me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} ref={this.touchableRef}>
          <Text style={styles.buttonText}>I will gain focus</Text>
        </TouchableOpacity>
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
  button: {
    borderWidth: 2,
    borderColor: '#F1F1F1',
    color: '#F1F1F1',
    padding: '18',
    height: '50',
    width: '230',
    margin: '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color:'#F1F1F1',
    fontFamily: 'Montserrat',
  },
};
