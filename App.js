// @flow
import thunk from 'redux-thunk';
import React from 'react';
import {Stack} from './Navigation/Stack';
import * as Notifications from './Util/Notifications';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {CombinedReducers} from './Redux/CombinedReducers';
import logger from 'redux-logger'

type Props = {}
type State = {}

export default class App extends React.Component<Props, State> {
  store = createStore(CombinedReducers, applyMiddleware(thunk, logger));

  componentDidMount = () => {
    Notifications.scheduleNotification();
  };

  render() {
    return (
      <Provider store={this.store}>
        <Stack/>
      </Provider>
    );
  }
}
