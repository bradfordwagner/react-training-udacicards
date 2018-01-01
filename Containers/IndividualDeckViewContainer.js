// @flow

import type { NavigationProps } from "../Lib/Navigation"
import type { Action } from "../Components/ActionBar"
import type { AddQuestionContainerParams } from "../Containers/AddQuestionContainer"
import type { QuizParams } from "../Containers/QuizContainer"

import React from 'react'
import { View, Text } from 'react-native';
import { Deck } from '../Lib/Deck';
import { Layout, BackgroundColors } from '../Util/CommonStyles';
import { DeckSummary } from '../Components/DeckSummary';
import { ActionBar } from '../Components/ActionBar';
import { States } from '../Navigation/NavigationStates';
import * as StoreageAPI from "../Util/Storeage"

export type IndividualDeckViewContainerNavigationProps = {
    afterEdit: Function,
    deck: Deck
}

type Props = {
    navigation: NavigationProps<IndividualDeckViewContainerNavigationProps>
}
type State = {}

export class IndividualDeckViewContainer extends React.Component<Props, State> {

    getDeck = () => this.props.navigation.state.params.deck

    startQuiz = () => {
        const params: QuizParams = {
            deck: this.getDeck()
        }
        this.props.navigation.navigate(States.Quiz, params)
    }

    addQuestion = () => {
        const params: AddQuestionContainerParams = {
            deck: this.getDeck(),
            onAdd: () => {
                StoreageAPI.saveDeck(this.getDeck()).then(() => {
                    this.forceUpdate()
                })
            }
        }
        this.props.navigation.navigate(States.AddQuestion, params)
    }

    buildActions = () => {
        const startQuiz: Action = {
            title: "Start Quiz",
            onPress: () => this.startQuiz()
        }

        const addQuestion: Action = {
            title: "Add Question",
            onPress: () => this.addQuestion()
        }

        return [startQuiz, addQuestion]
    }

    render = () => (
        <View style={[Layout.Flex]}>
            <View style={[Layout.Flex]}>
                <DeckSummary deck={this.getDeck()} onPress={() => console.info("you have been squelched")} />
            </View>

            <ActionBar actions={this.buildActions()} />
        </View>
    )
}