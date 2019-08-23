/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, ViewRef, TextRef } from '@youi/react-native-youi';

export class TextRefComponent extends Component {
  render() {
    return (
      <Composition source="Training_RefComponents">
        {/* ViewRefs are useful to target a specific child component */}
        <ViewRef name="View">
          <TextRef name="Text" text="Hello"/>
        </ViewRef>

        {/* Will match the same TextRef above */}
        <TextRef name="Info" text="No Need to select the parent ViewRef if the name is non-ambigious"/>
      </Composition>
    );
  }
}
