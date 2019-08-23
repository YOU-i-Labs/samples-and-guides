/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, ImageRef } from '@youi/react-native-youi';

export class ImageRefComponent extends Component {
  render() {
    return (
      <Composition source="Training_RefComponents">
        <ImageRef name="Img-16x9" source={{ uri: 'https://via.placeholder.com/720x405/fa8072?text=ImageRef' }}/>
      </Composition>
    );
  }
}
