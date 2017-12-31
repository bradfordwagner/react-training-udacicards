// @flow

import React from 'react';
import { Text, View} from 'react-native';
import {loadDecks, saveQuestion, loadQuestions} from "./Util/Storeage"
import {Deck, Question} from './Lib/Deck';
import {DeckListViewContainer} from './Containers/DeckListViewContainer'
import { Layout, HorizontalAlignment, VerticalAlignment } from './Util/CommonStyles';

type Props = {}
type State = {}

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <View style={[Layout.Flex, HorizontalAlignment.Center, VerticalAlignment.Center]}>
        <DeckListViewContainer/>
      </View>
    );
  }
}
