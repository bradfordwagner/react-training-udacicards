// @flow

import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {CardStyle, TextAlignment, TextStyle, Uno1} from '../Util/CommonStyles';

export type DeckSummaryProps = {
  title: string,
  numQuestions: number,
  onPress: Function,
}

export const DeckSummary = ({title, numQuestions, onPress}: DeckSummaryProps) => {
  return (
    <TouchableHighlight style={[CardStyle.Default]} onPress={onPress} underlayColor={Uno1}>
      <View>
        <Text style={[TextAlignment.Center, TextStyle.Title]}>{title}</Text>
        <Text style={[TextAlignment.Center, TextStyle.SubText]}>{numQuestions} cards</Text>
      </View>
    </TouchableHighlight>
  );
};
