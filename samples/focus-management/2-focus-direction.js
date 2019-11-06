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


export class FocusDirection extends Component {
  firstButton = React.createRef();

  middleButton = React.createRef();

  lastButton = React.createRef();

  componentDidMount() {
    FocusManager.setNextFocus(this.firstButton.current, this.lastButton.current, 'up');
    FocusManager.setNextFocus(this.firstButton.current, this.lastButton.current, 'left');
    FocusManager.setNextFocus(this.firstButton.current, this.middleButton.current, 'right');

    FocusManager.setNextFocus(this.middleButton.current, this.firstButton.current, 'left');
    FocusManager.setNextFocus(this.middleButton.current, this.lastButton.current, 'right');

    FocusManager.setNextFocus(this.lastButton.current, this.firstButton.current, 'down');
    FocusManager.setNextFocus(this.lastButton.current, this.middleButton.current, 'left');
    FocusManager.setNextFocus(this.lastButton.current, this.firstButton.current, 'right');

    FocusManager.focus(this.middleButton.current);
  }

  render() {
    return (
      <View style={styles.container}>
         <StyledButton
            title="First Button"
            ref={this.firstButton}
          />
          <StyledButton
            title="Middle Button"
            ref={this.middleButton}
          />
          <StyledButton
            title="Last Button"
            ref={this.lastButton}
          />
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
