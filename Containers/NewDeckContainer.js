// @flow

import type { NavigationProps } from "../Lib/Navigation"
import type { AddQuestionContainerParams } from "./AddQuestionContainer"
import type { Action } from "../Components/ActionBar"

import React, { Component } from 'react';
import { Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import {
    BackgroundColors,
    TextStyle,
    TextAlignment,
    Duo1,
    Duo2,
    Duo3,
    Layout,
    VerticalAlignment
} from '../Util/CommonStyles';
import { Deck, Question } from '../Lib/Deck';
import { TextBox } from '../Components/TextBox';
import { QuestionSummary } from '../Components/QuestionSummary';
import { States } from '../Navigation/NavigationStates';
import { AddQuestionContainer } from './AddQuestionContainer';
import { ActionBar } from '../Components/ActionBar';
import { Ionicons } from "@expo/vector-icons";
import * as Storeage from "../Util/Storeage"

type Props = {
    navigation: NavigationProps<Deck>
}
type State = {
    isLoading: boolean,
    deck: Deck
}

export class NewDeckContainer extends Component<Props, State> {
    state = {
        isLoading: true,
        deck: new Deck()
    }

    componentDidMount = () => {
        Storeage.loadEditingDeck().then(deck => this.setState({ deck, isLoading: false }))
    }

    updateTitle = (title: string) => {
        const deck = this.state.deck
        deck.title = title
        this.setState({ deck })
    }

    rerender = () => this.forceUpdate()

    addQuestion = () => this.props.navigation.navigate(States.AddQuestion, ({ deck: this.state.deck, onAdd: () => this.rerender() }: AddQuestionContainerParams))

    editQuestion = (question: Question) => console.info("edit question - we may never implement this :P", question)

    deleteQuestion = (question: Question) => {
        const deck = this.state.deck
        deck.questions = deck.questions.filter(q => q.uuid !== question.uuid)
        this.setState({ deck })
    }

    create = () => console.info("Create!");

    buildActions = () => {
        const addQuestion: Action = {
            icon: <Ionicons name="ios-add" size={22} />,
            onPress: () => this.addQuestion()
        }

        const create: Action = {
            title: "Create",
            onPress: () => this.create()
        }

        return [addQuestion, create]
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={[Layout.Flex, VerticalAlignment.Center]}>
                    <ActivityIndicator size="large" />
                </View>
            )
        } else {
            return (
                <View style={[Layout.Flex]}>
                    <View style={[Layout.Column, Layout.Flex]}>
                        <TextBox
                            placeholder="Title"
                            value={this.state.deck.title}
                            onChange={(title) => this.updateTitle(title)}
                        />
                        {this.state.deck.questions.map(question => (
                            <QuestionSummary
                                key={question.uuid}
                                question={question}
                                onPress={() => this.editQuestion(question)}
                                onDeletePress={() => this.deleteQuestion(question)}
                                showDelete={true}
                            />
                        ))}
                    </View>
                    <ActionBar actions={this.buildActions()} />
                </View>
            )
        }
    }
}
