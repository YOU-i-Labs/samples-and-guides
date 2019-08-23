/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { TouchableOpacity, Image, View, FlatList } from 'react-native';
import movies from '../../movies';

export class GridFlatList extends Component {
  renderItem = ({ item }) => {
    return (

      <TouchableOpacity>
        <View style={{ margin: 15 }}>
          <Image style={{ width: 272, height: 408 }} source={{ uri: `res://drawable/default/2x3-${item.image}` }}/>
       </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, margin: 50 }}>
        <FlatList
          data={[...movies, ...movies, ...movies]}
          renderItem={this.renderItem}
          horizontal={false}
          numColumns={6}
        />
      </View>
    );
  }
}
