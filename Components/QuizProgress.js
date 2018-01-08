// @flow

import React from 'react';
import {Question} from "../Lib/Deck";
import {ProgressViewIOS, Text, View} from 'react-native';
import {Layout} from "../Util/CommonStyles";

export type QuizProgressProps = {
  currentIndex: number,
  questions: Question[],
}

const computeRemainingQuestions = (currentIndex: number, questions: Question[]) => questions.length - (currentIndex + 1);
const computeProgress = (currentIndex: number, questions: Question[]) => (currentIndex + 1) / questions.length;

export const QuizProgress = ({currentIndex, questions}: QuizProgressProps) => (
  <View style={[Layout.Row]}>
    <Text>{computeRemainingQuestions(currentIndex, questions)} remaining</Text>
    <ProgressViewIOS progress={computeProgress(currentIndex, questions)} style={Layout.Flex}/>
  </View>
);
