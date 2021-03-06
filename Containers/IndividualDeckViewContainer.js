// @flow

import type {NavigationProps} from "../Lib/Navigation"
import type {Action} from "../Components/ActionBar"
import {ActionBar} from '../Components/ActionBar';
import type {AddQuestionContainerParams} from "../Containers/AddQuestionContainer"
import type {QuizParams} from "../Containers/QuizContainer"

import React from 'react'
import {View} from 'react-native';
import {Deck} from '../Lib/Deck';
import {Layout} from '../Util/CommonStyles';
import {DeckSummary} from '../Components/DeckSummary';
import {States} from '../Navigation/NavigationStates';
import {connect} from 'react-redux';
import {CombinedActions} from "../Redux/CombinedActions";
import type {CombinedState} from "../Redux/CombinedState";

export type IndividualDeckViewContainerNavigationProps = {
  deckId: string
}

type Props = {
  navigation: NavigationProps<IndividualDeckViewContainerNavigationProps>
}

type ReduxProps = {
  deck: Deck,
  title: string,
  numQuestions: number,
}

type CombinedProps = ReduxProps & Props

type State = {}

export const IndividualDeckViewContainer = connect((state: CombinedState, ownProps: Props) => {
  const deck = state.deck.byId[ownProps.navigation.state.params.deckId];
  const title = deck.title;
  const numQuestions = deck.questions.length;
  const props: ReduxProps = {deck, title, numQuestions};
  return props;
}, CombinedActions)(
  class extends React.Component<CombinedProps, State> {

    getDeck = () => this.props.deck;

    startQuiz = () => {
      const params: QuizParams = {deckId: this.getDeck().uuid};
      this.props.navigation.navigate(States.Quiz, params)
    };

    addQuestion = () => {
      const params: AddQuestionContainerParams = {deckId: this.getDeck().uuid};
      this.props.navigation.navigate(States.AddQuestion, params)
    };

    buildActions = () => {
      const startQuiz: Action = {
        title: "Start Quiz",
        onPress: () => this.startQuiz()
      };

      const addQuestion: Action = {
        title: "Add Question",
        onPress: () => this.addQuestion()
      };

      return [startQuiz, addQuestion]
    };

    render = () => (
      <View style={[Layout.Flex]}>
        <View style={[Layout.Flex]}>
          <DeckSummary title={this.props.title} numQuestions={this.props.numQuestions} onPress={() => console.info("you have been squelched")}/>
        </View>

        <ActionBar actions={this.buildActions()}/>
      </View>
    )
  }
)
