// @flow

import React from 'react';
import {Stack} from './Navigation/Stack';
import * as Notifications from './Util/Notifications';

type Props = {}
type State = {}

export default class App extends React.Component<Props, State> {
  componentDidMount = () => {
    // Notifications.cancelNotifications();
    Notifications.scheduleNotification();
  };

  render() {
    return (
      <Stack />
    );
  }
}
