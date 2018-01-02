// @flow

import type { NavigationProps } from "../Lib/Navigation"
import type { Action } from "../Components/ActionBar"

import React from 'react'
import { View, Text, ProgressViewIOS } from 'react-native';
import { Deck, Question } from '../Lib/Deck';
import { Layout } from '../Util/CommonStyles';
import { ActionBar } from '../Components/ActionBar';
import { QuizCompletion } from '../Components/QuizCompletion';

export type QuizParams = {
    deck: Deck
}
type Props = {
    navigation: NavigationProps<QuizParams>
}
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

export class QuizContainer extends React.Component<Props, State> {
    state = {
        currentIndex: 0,
        currentQuestion: undefined,
        progress: 0,
        percentageCorrect: 0,
        showQuestion: true,
        remainingQuestions: 0,
        correctAnswers: 0,
        showResults: false
    }

    componentDidMount = () => {
        const deck = this.getDeck()

        if (deck.questions.length == 0) {
            this.goBack()
        } else {
            this.restartQuiz()
        }
    }

    restartQuiz = () => {
        const deck = this.getDeck()
        const currentQuestion = deck.questions[this.state.currentIndex]
        const remainingQuestions = deck.questions.length - 1
        const progress = 1 / deck.questions.length
        const showResults = false
        this.setState({ currentQuestion, remainingQuestions, progress, showResults })
    }

    getDeck = () => this.props.navigation.state.params.deck

    goBack = () => this.props.navigation.goBack()

    resolveText = () => {
        if (this.state.currentQuestion) {
            return this.state.showQuestion ? this.state.currentQuestion.question : this.state.currentQuestion.answer
        } else {
            return ""
        }
    }

    buildActions = () => {
        const correct: Action = {
            title: "Correct",
            onPress: () => this.nextQuestion(true)
        }

        const incorrect: Action = {
            title: "Incorrect",
            onPress: () => this.nextQuestion(false)
        }

        const toggleView: Action = {
            title: this.showQuestion ? "Show Answer" : "Show Question",
            onPress: () => {
                this.setState({ showQuestion: !this.state.showQuestion })
                this.forceUpdate()
            }
        }

        return [correct, incorrect, toggleView]
    }

    nextQuestion = (isCorrect: boolean) => {
        const deck = this.getDeck()

        const currentIndex = this.state.currentIndex + 1
        const correctAnswers = isCorrect ? this.state.correctAnswers + 1 : this.state.correctAnswers
        const progress = (currentIndex + 1) / deck.questions.length
        const showQuestion = true
        const remainingQuestions = deck.questions.length - currentIndex

        const isFinished = currentIndex == deck.questions.length
        if (isFinished) {
            this.setState({ currentQuestion: undefined, showResults: true, correctAnswers })
        } else {
            const currentQuestion = this.getDeck().questions[currentIndex]
            this.setState({ currentQuestion, currentIndex, correctAnswers, progress, showQuestion, remainingQuestions })
        }
    }

    render = () => {
        if (this.state.showResults) {
            return this.renderCompletion()
        } else {
            return this.renderQuestion()
        }
    }

    renderQuestion = () => (
        <View style={[Layout.Flex]}>
            <View style={[Layout.Flex]}>
                <View style={[Layout.Flex]}>
                    <Text>{this.resolveText()}</Text>
                </View>

                <View style={[Layout.Row]}>
                    <Text>{this.state.remainingQuestions}</Text>
                    <ProgressViewIOS progress={this.state.progress} style={Layout.Flex} />
                </View>
            </View>

            <ActionBar actions={this.buildActions()} />
        </View>
    )

    renderCompletion = () => (
        <QuizCompletion
            deckName={this.getDeck().title}
            correctAnswersCount={this.state.correctAnswers}
            totalQuestions={this.getDeck().questions.length}
            goBack={this.goBack}
            restartQuiz={() => {
                this.restartQuiz()
                this.forceUpdate()
            }}
        />
    )
}