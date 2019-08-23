/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, TextInputRef, TextRef } from '@youi/react-native-youi';

export class TextInputRefComponent extends Component {
  textInputRef = React.createRef();

  state = { infoText: 'Enter Text in the TextInput' };

  onChangeText = text => {
    this.setState({ infoText: text });
  }

  componentDidMount()  {
    this.textInputRef.current.activate();
  }

  render() {
    return (
      <Composition source="Training_RefComponents">
        <TextInputRef
          name="TextInput"
          secureTextEntry={false}
          onChangeText={this.onChangeText}
          ref={this.textInputRef}
        />

        <TextRef name="Info" text={this.state.infoText} />
      </Composition>
    );
  }
}
