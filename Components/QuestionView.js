// @flow

import React from 'react';
import {Question} from "../Lib/Deck";
import {Text} from 'react-native';

export type QuestionViewProps = {
  question?: Question,
  displayQuestion: boolean,
}

const resolveQuestion = (question?: Question, displayQuestion: boolean) => {
  let response = "";
  if (question) {
    response = displayQuestion ? question.question : question.answer;
  }
  return response;
};

export const QuestionView = ({question, displayQuestion}: QuestionViewProps) => (
  <Text>{resolveQuestion(question, displayQuestion)}</Text>
);
