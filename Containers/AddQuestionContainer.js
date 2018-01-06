// @flow
import type {NavigationProps} from '../Lib/Navigation'
import type {Action} from '../Components/ActionBar';
import {ActionBar} from '../Components/ActionBar';

import React, {Component} from 'react';
import {View} from 'react-native';
import {Deck, Question} from '../Lib/Deck';
import {TextBox} from '../Components/TextBox';
import {Layout} from '../Util/CommonStyles';
import {connect} from "react-redux";
import type {CombinedState} from "../Redux/CombinedState";
import type {CombinedActionsProps} from "../Redux/CombinedActions";
import {CombinedActions} from "../Redux/CombinedActions";

export type AddQuestionContainerParams = {
  deckId: string
}

type Props = {
  navigation: NavigationProps<AddQuestionContainerParams>
}

type ReduxProps = {
  deck: Deck
}

type CombinedProps = Props & ReduxProps & CombinedActionsProps

type State = {
  question: string,
  answer: string
}

export const AddQuestionContainer = connect((state: CombinedState, ownProps: Props) => {
  const deck = state.deck.byId[ownProps.navigation.state.params.deckId];
  const props: ReduxProps = {deck};
  return props;
}, CombinedActions)(
  class extends Component<CombinedProps, State> {
    state = {
      question: "",
      answer: ""
    };

    addQuestion = () => {
      const q = new Question();
      q.question = this.state.question;
      q.answer = this.state.answer;

      const deck = this.props.deck;
      deck.questions.push(q);
      this.props.saveDeck(deck);
      this.props.navigation.goBack()
    };

    buildActions = () => {
      const addQuestion: Action = {
        title: "Add Question",
        onPress: () => this.addQuestion()
      };
      return [addQuestion];
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
)
