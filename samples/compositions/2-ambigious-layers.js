/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, ViewRef, TextRef } from '@youi/react-native-youi';

export class AmbigiousLayers extends Component {
 render() {
   return (
      <Composition source="Training_Main">
        <ViewRef name="Overlay">
          <TextRef name="Info" text="Nesting allows us to disambiguate nodes in the Scenetree" />
        </ViewRef>

        <TextRef name="Info" text="The Scenetree is traversed from top to bottom" />
      </Composition>
   );
 }
}
