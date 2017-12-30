// @flow

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {loadDecks, saveQuestion, loadQuestions} from "./Util/Storeage"
import {Deck, Question} from './Lib/Deck';
import {DeckListViewContainer} from './Containers/DeckListViewContainer'

type Props = {}
type State = {}

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <DeckListViewContainer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
