import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { CommonStyles, CrossAlignment } from '../Util/CommonStyles';
import { Deck } from '../Lib/Deck';

export type DeckSummaryProps = {
    deck: Deck,
    onPress: Function
}

export const DeckSummary = ({ deck }: DeckSummaryProps) => {
    return (
        <TouchableHighlight style={CommonStyles.red}>
            <View>
                <Text style={[CrossAlignment.centered]}>{deck.title}</Text>
                <Text>{deck.questionIds.length}</Text>
            </View>
        </TouchableHighlight>
    );
};
