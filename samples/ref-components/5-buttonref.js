/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, ButtonRef, TextRef } from '@youi/react-native-youi';

export class ButtonRefComponent extends Component {
  constructor() {
    super();
    this.state = { presses: 0 };
  }

  onPress = () => {
    this.setState({ presses: this.state.presses + 1 });
  }

  render() {
    return (
      <Composition source="Training_RefComponents">
        <ButtonRef name="Btn-Small" text="Push Me" onPress={this.onPress}/>

        <TextRef name="Info" text={`Button pressed ${this.state.presses} times.`}/>
      </Composition>
    );
  }
}
