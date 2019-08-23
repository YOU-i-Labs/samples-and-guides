/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, View, Button, ButtonRef, Text } from '@youi/react-native-youi';
import { TouchableOpacity } from 'react-native';

export class FocusProps extends Component {
  constructor() {
    super();
    this.state = { focused: '', blurred: '' };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPressIn={() => this.setState({ focused: 'TouchableOpacity' })}
            onPressOut={() => this.setState({ blurred: 'TouchableOpacity' })}
          >
            <Text style={{ color:'#F1F1F1' }}>Touchable Opacity</Text>
          </TouchableOpacity>
          <Composition source="Training_Btn-Small-Container">
            <ButtonRef name="Btn-Small"
              onFocus={() => this.setState({ focused: 'ButtonRef' })}
              onBlur={() => this.setState({ blurred: 'ButtonRef' })}
            />
          </Composition>
          <View style={styles.buttonContainer}>
            {/* Button has no focus events */}
            <Button color="white" title="Button (No Focus)"/>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={{ color:'#F1F1F1', fontSize: 24 }}>{`${this.state.focused} gained focus. ${this.state.blurred} lost focus.`}</Text>
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
  buttonContainer: {
    borderWidth: 2,
    borderColor: '#F1F1F1',
    color: '#841584',
    padding: '18',
    height: '50',
    width: '230',
    margin: '20',
  },
  info: {
    backgroundColor: '#08050B',
    position: 'absolute',
    width: '1920',
    height: '60',
    top: '1020',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
