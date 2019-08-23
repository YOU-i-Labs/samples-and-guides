/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, ListRef, TimelineRef, View, FlatList, Image } from '@youi/react-native-youi';
import { TouchableOpacity } from 'react-native';
import movies from '../../movies';

const listsArray = new Array(4).fill('');

export class ListOfLists extends Component {

  renderSubItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ marginHorizontal: 10 }}>
        <Image
          style={{ width: 270,  height: 405 }}
          source={{ uri: `res://drawable/default/2x3-${item.image}` }}
        />
      </TouchableOpacity>
    );
  }

  renderItem = () => {
    return (
      <View style={{ marginVertical: 30 }}>
        <FlatList
          renderItem={this.renderSubItem}
          horizontal={true}
          data={movies}
        />
      </View>
    );
  }

  render() {
    return (
      <Composition source="Training_Lists">
        <ListRef
          name="List-Large"
          data={listsArray}
          renderItem={this.renderItem}
          horizontal={false}
        />
      </Composition>
    );
  }
}
