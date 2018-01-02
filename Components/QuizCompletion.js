// @flow

import type { Action } from "./ActionBar"

import React from 'react'
import { View, Text } from 'react-native';
import {
    Layout,
    BackgroundColors,
    TextStyle,
    VerticalAlignment,
    HorizontalAlignment
} from '../Util/CommonStyles';
import { ActionBar } from './ActionBar';

export type QuizCompletionProps = {
    deckName: string,
    correctAnswersCount: number,
    totalQuestions: number,
    restartQuiz: Function,
    goBack: Function
}

function buildActions(goBack: Function, restartQuiz: Function): Action[] {
    const restartQuizAction: Action = { title: "Restart Quiz", onPress: restartQuiz }
    const goBackAction: Action = { title: "Go Back", onPress: goBack }
    return [goBackAction, restartQuizAction]
}

export const QuizCompletion = ({ deckName, correctAnswersCount, totalQuestions, goBack, restartQuiz }: QuizCompletionProps) => (
    <View style={[Layout.Flex]}>
        <View style={[Layout.Flex, VerticalAlignment.Center, HorizontalAlignment.Center]}>
            <Text style={[TextStyle.Title]}>{deckName}</Text>
            <Text>Score: {correctAnswersCount / totalQuestions * 100}%</Text>
            <Text>{correctAnswersCount} / {totalQuestions} were answered correctly</Text>
        </View>

        <ActionBar actions={buildActions(goBack, restartQuiz)} />
    </View>
)