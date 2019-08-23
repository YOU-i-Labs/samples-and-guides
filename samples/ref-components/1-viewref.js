/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, ViewRef } from '@youi/react-native-youi';

export class ViewRefComponent extends Component {
  render() {
    return (
      <Composition source="Training_RefComponents">
        {/* ViewRefs are useful to target a specific child component */}
        <ViewRef name="View">
          <ViewRef name="Text"/>
        </ViewRef>

        {/* Will match the same Text field above */}
        <ViewRef name="Text"/>

        {/* Valid, any Ref is a ViewRef but props won't work */}
        <ViewRef name="Btn-Small" text="Won't Show"/>
      </Composition>
    );
  }
}
