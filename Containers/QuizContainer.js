// @flow

import type {NavigationProps} from "../Lib/Navigation"
import type {Action} from "../Components/ActionBar"
import {ActionBar} from '../Components/ActionBar';

import React from 'react'
import {View} from 'react-native';
import {Deck, Question} from '../Lib/Deck';
import {Layout} from '../Util/CommonStyles';
import {QuizCompletion} from '../Components/QuizCompletion';
import {connect} from "react-redux";
import type {CombinedState} from "../Redux/CombinedState";
import type {CombinedActionsProps} from "../Redux/CombinedActions";
import {CombinedActions} from "../Redux/CombinedActions";
import {QuestionView} from "../Components/QuestionView";
import {QuizProgress} from "../Components/QuizProgress";

export type QuizParams = {
  deckId: string,
}
type Props = {
  navigation: NavigationProps<QuizParams>,
}

type ReactProps = {
  deck: Deck,
}

type CombinedProps = Props & ReactProps & CombinedActionsProps

type State = {
  question?: Question,
  displayQuestion: boolean,
  numberCorrect: number,
  currentIndex: number,
}

const initialState: State = {
  question: undefined,
  displayQuestion: true,
  numberCorrect: 0,
  currentIndex: 0,
};

export const QuizContainer = connect((state: CombinedState, selfProps: Props): ReactProps => {
  const uuid = selfProps.navigation.state.params.deckId;
  const deck = state.deck.byId[uuid];
  const props: ReactProps = {deck};
  return props;
}, CombinedActions)(class extends React.Component<CombinedProps, State> {
    state = initialState;

    componentDidMount = () => {
      const deck = this.getDeck();

      if (deck.questions.length === 0) {
        this.goBack()
      } else {
        this.restartQuiz()
      }
    };

    restartQuiz = () => {
      const state: State = {...initialState, question: this.getDeck().questions[0]};
      this.setState(state);
    };

    getDeck = (): Deck => this.props.deck;

    goBack = () => this.props.navigation.goBack();

    nextQuestion = (answerWasCorrect: boolean) => {

    };

    buildActions = () => {
      const correct: Action = {
        title: "Correct",
        onPress: () => this.nextQuestion(true)
      };

      const incorrect: Action = {
        title: "Incorrect",
        onPress: () => this.nextQuestion(false)
      };

      const toggleView: Action = {
        title: this.showQuestion ? "Show Answer" : "Show Question",
        onPress: () => this.setState({displayQuestion: !this.state.displayQuestion})
      };

      return [correct, incorrect, toggleView]
    };

    render = () => {
      if (this.state.showResults) {
        return this.renderCompletion()
      } else {
        return this.renderQuestion()
      }
    };

    renderQuestion = () => (
      <View style={[Layout.Flex]}>
        <View style={[Layout.Flex]}>
          <View style={[Layout.Flex]}>
            <QuestionView question={this.state.question} displayQuestion={this.state.displayQuestion}/>
          </View>

          <QuizProgress currentIndex={this.state.currentIndex} questions={this.props.deck.questions}/>
        </View>

        <ActionBar actions={this.buildActions()}/>
      </View>
    );

    renderCompletion = () => (
      <QuizCompletion
        deckName={this.getDeck().title}
        correctAnswersCount={this.state.correctAnswers}
        totalQuestions={this.getDeck().questions.length}
        goBack={this.goBack}
        restartQuiz={() => {
          this.restartQuiz();
          this.forceUpdate()
        }}
      />
    )
  }
)
