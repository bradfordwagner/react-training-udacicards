import React from 'react'
import { Question } from "../Lib/Deck";
import { Text, TouchableHighlight, View, Button, StyleSheet } from 'react-native';
import { CardStyle, Uno1, Layout, HorizontalAlignment, TextAlignment } from '../Util/CommonStyles';

// @flow

export type QuestionSummaryProps = {
    question: Question,
    onPress: Function,
    showDelete: boolean,
    onDeletePress: Function
}

export const QuestionSummary = ({ question, onPress, showDelete, onDeletePress }: QuestionSummaryProps) => (
    <TouchableHighlight style={[CardStyle.Default]} underlayColor={Uno1} onPress={onPress}>
        <View style={[Layout.Row, HorizontalAlignment.SpaceBetween]}>
            <View style={Layout.Flex}>
                <Text numberOfLines={1}>{question.question}</Text>
                <Text>{question.answer}</Text>
            </View>
            {showDelete && <Button title="delete" color="red" onPress={onDeletePress} />}
        </View>
    </TouchableHighlight>
)
