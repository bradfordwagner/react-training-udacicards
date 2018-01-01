// @flow

import React from 'react';
import { Text, View } from 'react-native';
import { Deck, Question } from './Lib/Deck';
import { DeckListViewContainer } from './Containers/DeckListViewContainer'
import { Layout, HorizontalAlignment, VerticalAlignment } from './Util/CommonStyles';
import { Stack } from './Navigation/Stack';

type Props = {}
type State = {}

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <Stack />
    );
  }
}
