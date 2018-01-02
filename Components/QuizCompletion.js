// @flow

import React from 'react'
import { View, Text } from 'react-native';
import {
    Layout,
    BackgroundColors,
    TextStyle,
    VerticalAlignment,
    HorizontalAlignment
} from '../Util/CommonStyles';

export type QuizCompletionProps = {
    deckName: string,
    correctAnswersCount: number,
    totalQuestions: number
}

export const QuizCompletion = ({ deckName, correctAnswersCount, totalQuestions }: QuizCompletionProps) => (
    <View style={[Layout.Flex, VerticalAlignment.Center, HorizontalAlignment.Center]}>
        <Text style={[TextStyle.Title]}>{deckName}</Text>
        <Text>Score: {correctAnswersCount / totalQuestions * 100}%</Text>
        <Text>{correctAnswersCount} / {totalQuestions} were answered correctly</Text>
    </View>
)