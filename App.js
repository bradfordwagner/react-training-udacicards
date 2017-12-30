// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { loadDecks, saveQuestion, loadQuestions } from "./Util/Storeage"
import { Deck, Question } from './Lib/Deck';

type Props = {}
type State = {}

export default class App extends React.Component<Props, State> {
  componentDidMount = () => {

    loadQuestions().then(questions => {
      console.info('loaded questions', questions)
      loadDecks().then(decks => {
        console.info('loaded decks', decks)
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
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
