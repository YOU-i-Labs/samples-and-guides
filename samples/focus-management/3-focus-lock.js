/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Button, View, FocusManager, StyleSheet } from '@youi/react-native-youi';

export class FocusLock extends Component {
  firstRoot = React.createRef();

  secondRoot = React.createRef();

  lockLeftButton = React.createRef();

  constructor() {
    super();
    this.state = { lockedSide: '' };
  }

  componentDidMount() {
    FocusManager.focus(this.lockLeftButton.current);
  }

  onPress = (root, lock, side) => {
    if (root) {
      FocusManager.setFocusRoot(root, lock);
      this.setState({ lockedSide: side });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.root, this.state.lockedSide === 'left' && styles.redBorder]} ref={this.firstRoot}>
          <Button color="white" title="Lock Left"
            ref={this.lockLeftButton}
            onPress={() => this.onPress(this.firstRoot.current, true, 'left')}
          />
          <Button color="white" title="Unlock"
            onPress={() => this.onPress(this.firstRoot.current, false, '')}
          />
        </View>
        <View style={[styles.root, this.state.lockedSide === 'right' && styles.redBorder]} ref={this.secondRoot}>
          <Button color="white" title="Lock Right"
            onPress={() => this.onPress(this.secondRoot.current, true, 'right')}
          />
          <Button color="white" title="Unlock"
            onPress={() => this.onPress(this.secondRoot.current, false, '')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    borderWidth: 2,
    borderColor: '#F1F1F1',
    padding: '10',
    margin: '10',
    width: '350',
    height: '350',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redBorder: {
    borderColor: '#DA1B5B',

  },
});

