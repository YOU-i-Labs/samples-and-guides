/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Text, TouchableHighlight, NativeModules } from 'react-native';

const { Cloud } = NativeModules;

export class StyledButton extends Component {
  state = { isFocused: false }

  onFocus = () => {
    this.setState({ isFocused: true });
  }

  onBlur = () => {
    this.setState({ isFocused: false });
  }

  render() {
    return (
      <TouchableHighlight
        {...this.props}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        underlayColor={'#F1F1F166'}
        style={[styles.button, this.state.isFocused ? styles.focused : null]}
      >
        <Text style={styles.text}>{this.props.title || 'Button'}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = {
  button: {
    height: 35,
    margin: 10,
    padding: 10,
    borderRadius:10,
    borderWidth: 2,
    width: 160,
    borderColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color:'#F1F1F1',
    fontFamily: 'Montserrat',
  },
  focused: {
    borderColor: '#E71C32',
    backgroundColor: Cloud.isCloudServer ? '#F1F1F166' : null,
  },
};
