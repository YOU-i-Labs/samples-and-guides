/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, ListRef, ImageRef, ButtonRef, TimelineRef, View } from '@youi/react-native-youi';
import movies from '../../movies';

export class BasicListRef extends Component {
  inTimeline = React.createRef();

  componentDidMount() {
    this.inTimeline.current.play();
  }

  renderItem = ({ item }) => {
    return (
      <View style={{ marginRight: 50 }}>
        <Composition source="Training_Btn-Medium-Container">
          <ButtonRef name="Btn-Medium">
            <ImageRef name="Img-2x3" source={{ uri: `res://drawable/default/2x3-${item.image}` }}/>
          </ButtonRef>
        </Composition>
      </View>
    );
  }

  render() {
    return (
      <Composition source="Training_Lists">
        <TimelineRef name="In" ref={this.inTimeline} />
        <ListRef name="List-Large" horizontal={true} data={movies} renderItem={this.renderItem}/>
      </Composition>
    );
  }
}
