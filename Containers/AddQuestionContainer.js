// @flow
import type {NavigationProps} from '../Lib/Navigation'
import type {Action} from '../Components/ActionBar';
import {ActionBar} from '../Components/ActionBar';

import React, {Component} from 'react';
import {View} from 'react-native';
import {Deck, Question} from '../Lib/Deck';
import {TextBox} from '../Components/TextBox';
import {Layout} from '../Util/CommonStyles';

export type AddQuestionContainerParams = {
  deck: Deck,
  onAdd: Function
}

type Props = {
  navigation: NavigationProps<AddQuestionContainerParams>
}
type State = {
  question: string,
  answer: string
}

export class AddQuestionContainer extends Component<Props, State> {
  state = {
    question: "",
    answer: ""
  };

  addQuestion = () => {
    const q = new Question();
    q.question = this.state.question;
    q.answer = this.state.answer;
    const deck = this.props.navigation.state.params.deck;
    deck.questions.push(q);
    this.props.navigation.goBack();
    this.props.navigation.state.params.onAdd()
  };

  buildActions = () => {
    const addQuestion: Action = {
      title: "Add Question",
      onPress: () => this.addQuestion()
    };
    return [addQuestion]
  };

  render = () => (
    <View style={Layout.Colum, Layout.Flex}>
      <View style={[Layout.Flex]}>
        <TextBox
          value={this.state.question}
          onChange={(question) => this.setState({question})}
          placeholder="Question"
        />
        <TextBox
          value={this.state.answer}
          onChange={(answer) => this.setState({answer})}
          placeholder="Answer"
        />
      </View>

      <ActionBar actions={this.buildActions()}/>
    </View>
  )
}
