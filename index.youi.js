/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { AppRegistry, View, Text, BackHandler, FontRegistry } from '@youi/react-native-youi';
import { Basics,
  Compositions,
  RefComponents,
  Timelines,
  FocusManagement,
  Lists,
  NativeModules,
  InputHandler,
  DRM  } from './samples';

import { StyledButton } from './components/styledButton';

const modules = [Basics, Compositions, RefComponents, Timelines, FocusManagement, Lists, NativeModules, InputHandler, DRM];
const modulesStrings = ['Basics', 'Compositions', 'RefComponents', 'Timelines', 'FocusManagement', 'Lists', 'NativeModules', 'InputHandler', 'DRM'];

export default class YiReactApp extends Component {
  constructor() {
    super();
    this.state = { screen: null };
    this.buttonStacks = null;
  }

  onBlur() {
    this.setState({
      backgroundColor: '#F1F1F1FF',
    });
  }

  navigateBack = () => {
    this.setState({ screen: null });
  }

  async componentDidMount() {
    if (!(await FontRegistry.exists('Montserrat')).exists)
      FontRegistry.add({ family: 'Montserrat', file: 'yi_Montserrat-Medium.otf' });

    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
    this.buttonStacks = modules.map((module, index) => <View style={{ alignSelf: 'flex-start' }} key={index}>
      <Text style={{ fontSize: 16, marginTop: 5, marginLeft: 10, color: 'white' }}>{modulesStrings[index]}</Text>
      <View style={{ flexDirection: 'row', alignContent: 'flex-start', alignItems: 'flex-start' }}>
        {Object.keys(module).map(name =>
          <StyledButton
            key={name}
            onPress={() => this.setState({ screen: module[name], backgroundColor: '#F1F1F1FF' })}
            title={module[name].name}
          />)}
      </View>
    </View>);
    this.forceUpdate();
  }

  render() {
    return <View style={styles.container}>
      {this.state.screen ? React.createElement(this.state.screen) : this.buttonStacks}
    </View>;
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303030',
  },
};

AppRegistry.registerComponent('YiReactApp', () => YiReactApp);
