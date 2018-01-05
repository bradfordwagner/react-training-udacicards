// @flow

import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {CardStyle, TextAlignment, TextStyle, Uno1} from '../Util/CommonStyles';
import {Deck} from '../Lib/Deck';

export type DeckSummaryProps = {
  deck: Deck,
  onPress: Function
}

export const DeckSummary = ({deck, onPress}: DeckSummaryProps) => {
  return (
    <TouchableHighlight style={[CardStyle.Default]} onPress={onPress} underlayColor={Uno1}>
      <View>
        <Text style={[TextAlignment.Center, TextStyle.Title]}>{deck.title}</Text>
        <Text style={[TextAlignment.Center, TextStyle.SubText]}>{deck.questions.length} cards</Text>
      </View>
    </TouchableHighlight>
  );
};
