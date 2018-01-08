// @flow

import type {NavigationProps} from "../Lib/Navigation"
import type {Action} from "../Components/ActionBar"
import {ActionBar} from '../Components/ActionBar';

import React from 'react'
import {ProgressViewIOS, Text, View} from 'react-native';
import {Deck, Question} from '../Lib/Deck';
import {Layout} from '../Util/CommonStyles';
import {QuizCompletion} from '../Components/QuizCompletion';
import * as Notifications from "../Util/Notifications";
import {connect} from "react-redux";
import type {CombinedState} from "../Redux/CombinedState";
import type {CombinedActionsProps} from "../Redux/CombinedActions";
import {CombinedActions} from "../Redux/CombinedActions";

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
  currentIndex: number,
  currentQuestion?: Question,
  progress: number,
  percentageCorrect: number,
  showQuestion: boolean,
  remainingQuestions: number,
  correctAnswers: number,
  showResults: boolean
}

export const QuizContainer = connect((state: CombinedState, selfProps: Props) => {
  const uuid = selfProps.navigation.state.params.deckId;
  const deck = state.deck.byId[uuid];
  return {deck};
}, CombinedActions)(class extends React.Component<CombinedProps, State> {
    state = {
      currentIndex: 0,
      currentQuestion: undefined,
      progress: 0,
      percentageCorrect: 0,
      showQuestion: true,
      remainingQuestions: 0,
      correctAnswers: 0,
      showResults: false
    };

    componentDidMount = () => {
      const deck = this.getDeck();

      if (deck.questions.length === 0) {
        this.goBack()
      } else {
        this.restartQuiz()
      }
    };

    restartQuiz = () => {
      const deck = this.getDeck();
      const currentQuestion = deck.questions[this.state.currentIndex];
      const remainingQuestions = deck.questions.length - 1;
      const progress = 1 / deck.questions.length;
      const showResults = false;
      this.setState({currentQuestion, remainingQuestions, progress, showResults})
    };

    getDeck = () => this.props.deck;

    goBack = () => this.props.navigation.goBack();

    resolveText = () => {
      if (this.state.currentQuestion) {
        return this.state.showQuestion ? this.state.currentQuestion.question : this.state.currentQuestion.answer
      } else {
        return ""
      }
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
        onPress: () => {
          this.setState({showQuestion: !this.state.showQuestion});
          this.forceUpdate()
        }
      };

      return [correct, incorrect, toggleView]
    };

    nextQuestion = (isCorrect: boolean) => {
      const deck = this.getDeck();

      const currentIndex = this.state.currentIndex + 1;
      const correctAnswers = isCorrect ? this.state.correctAnswers + 1 : this.state.correctAnswers;
      const progress = (currentIndex + 1) / deck.questions.length;
      const showQuestion = true;
      const remainingQuestions = deck.questions.length - currentIndex;

      const isFinished = currentIndex === deck.questions.length;
      if (isFinished) {
        Notifications.cancelNotifications().then(() => Notifications.scheduleNotification());
        this.setState({currentQuestion: undefined, showResults: true, correctAnswers})
      } else {
        const currentQuestion = this.getDeck().questions[currentIndex];
        this.setState({currentQuestion, currentIndex, correctAnswers, progress, showQuestion, remainingQuestions})
      }
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
            <Text>{this.resolveText()}</Text>
          </View>

          <View style={[Layout.Row]}>
            <Text>{this.state.remainingQuestions}</Text>
            <ProgressViewIOS progress={this.state.progress} style={Layout.Flex}/>
          </View>
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
