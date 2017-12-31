import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import {
    BackgroundColors,
    HorizontalAlignment,
    TextAlignment,
    TextStyle,
    CardStyle
} from '../Util/CommonStyles';
import { Deck } from '../Lib/Deck';

export type DeckSummaryProps = {
    deck: Deck,
    onPress: Function
}

export const DeckSummary = ({ deck }: DeckSummaryProps) => {
    return (
        <TouchableHighlight>
        {/* <TouchableHighlight style={BackgroundColors.Red}> */}
            <View style={[CardStyle.Default]} >
                <Text style={[TextAlignment.Center, TextStyle.Title]}>{deck.title}</Text>
                <Text style={[TextAlignment.Center, TextStyle.SubText]}>{deck.questionIds.length} cards</Text>
            </View>
        </TouchableHighlight>
    );
};
