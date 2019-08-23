/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Composition, TextRef } from '@youi/react-native-youi';

export class OnTimelinesLoaded extends Component {
  constructor(props) {
    super(props);
    this.state = { bodyText: '' };
  }

  onTimelineLoaded = timeline => timeline.play();

  onTimelinesLoaded = timelines => {
    const timelinesArray = Object.entries(timelines);
    this.setState({ bodyText: `${timelinesArray.length} Timelines Loaded: ${timelinesArray.map(it => it[0])}` });

    timelinesArray.map(it => it[1].play());
  }

  render() {
    return (
      <Composition source="Training_Timelines" onTimelinesLoaded={this.onTimelinesLoaded}>
        <TextRef name="Info" text={this.state.bodyText} />
      </Composition>
    );
  }
}
