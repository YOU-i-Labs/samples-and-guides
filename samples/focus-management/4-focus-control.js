/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { View, FocusManager } from '@youi/react-native-youi';
import { StyledButton } from '../../components/styledButton';

export class FocusControl extends Component {
  touchableRef = React.createRef();

  render() {
    return (
      <View style={styles.container}>
        <StyledButton style={styles.button}
          onPress={() => {
            if (this.touchableRef.current)
              FocusManager.focus(this.touchableRef.current);
            }}
          title="Press Me"
        />
        <StyledButton ref={this.touchableRef} title="I will gain focus"/>
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
