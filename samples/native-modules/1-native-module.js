/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from '@youi/react-native-youi';
import { NativeModules } from 'react-native';

const { Logger } = NativeModules;

export class LoggerModule extends Component {
  constructor() {
    super();
    this.state = { callbackResponse: 'Delayed response will show here' };
  }

  nativeLog = () => {
    Logger.debug('Hello World');
  }

  delayedNativeLog = async message => {
    const response = await Logger.send('Hello World');
    this.setState({ callbackResponse: response });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button color="white" title='Log "Hello World"' onPress={this.nativeLog}/>
        </View>
        <View style={styles.buttonContainer}>
          <Button color="white" title='Delayed log "Hello World"' onPress={this.delayedNativeLog}/>
        </View>
        <Text style={{ color:'#F1F1F1' }}>{this.state.callbackResponse}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    borderWidth: 2,
    borderColor: '#F1F1F1',
    color: '#841584',
    paddingBottom: '20',
    paddingTop: '14',
    margin: '10',
    height: '50',
    width: '230',
  },
});
