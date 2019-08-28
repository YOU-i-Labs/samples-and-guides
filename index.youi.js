/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { AppRegistry, View, Text, BackHandler, TouchableHighlight, FontRegistry } from '@youi/react-native-youi';
import { Basics,
  Compositions,
  RefComponents,
  Timelines,
  FocusManagement,
  Lists,
  NativeModules,
  InputHandler,
  DRM  } from './samples';

const modules = [Basics, Compositions, RefComponents, Timelines, FocusManagement, Lists, NativeModules, InputHandler, DRM];

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

  async componentDidMount() {
    if (!(await FontRegistry.exists('Montserrat')).exists)
      FontRegistry.add({ family: 'Montserrat', file: 'yi_Montserrat-Medium.otf' });

    this.backHandlerListener = BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState({ screen: null });
    });
    this.buttonStacks = modules.map((module, index) => <View style={{ alignSelf: 'flex-start' }} key={index}>
      <Text style={{ fontSize: 16, marginTop: 5, marginLeft: 10, color: 'white' }}>Module {index + 1}</Text>
      <View style={{ flexDirection: 'row', alignContent: 'flex-start', alignItems: 'flex-start' }}>
        {Object.keys(module).map(name =>
        <TouchableHighlight underlayColor={'#F1F1F166'} style={styles.highlight} key={name} onPress={() => this.setState({ screen: module[name], backgroundColor: '#F1F1F1FF' })}><Text style={styles.text}>{module[name].name}</Text></TouchableHighlight>)}
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
  highlight: {
    height: 65,
    marginBottom:10,
    marginTop:10,
    marginRight:10,
    marginLeft:10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius:10,
    borderWidth: 2,
    width: 250,
    borderColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color:'#F1F1F1',
    fontFamily: 'Montserrat',
  },
};

AppRegistry.registerComponent('YiReactApp', () => YiReactApp);
