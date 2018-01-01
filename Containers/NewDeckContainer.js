// @flow

import type { NavigationProps } from "../Lib/Navigation"
import type { AddQuestionContainerParams } from "./AddQuestionContainer"
import type { Action } from "../Components/ActionBar"

import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import {
    BackgroundColors,
    TextStyle,
    TextAlignment,
    Duo1,
    Duo2,
    Duo3,
    Layout
} from '../Util/CommonStyles';
import { Deck, Question } from '../Lib/Deck';
import { TextBox } from '../Components/TextBox';
import { QuestionSummary } from '../Components/QuestionSummary';
import { States } from '../Navigation/NavigationStates';
import { AddQuestionContainer } from './AddQuestionContainer';
import { ActionBar } from '../Components/ActionBar';
import { Ionicons } from "@expo/vector-icons";

type Props = {
    navigation: NavigationProps<any>
}
type State = {
    deck: Deck
}

export class NewDeckContainer extends Component<Props, State> {
    state = {
        deck: new Deck()
    }

    componentDidMount = () => {
        const q = new Question()
        q.question = "Is Bradford the best?aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaa"
        q.answer = "Yes he is indeed the bestest"
        this.state.deck.questions.push(q)
        const deck = this.state.deck
        this.setState({ deck })
    }

    updateTitle = (title: string) => {
        const deck = this.state.deck
        deck.title = title
        this.setState({ deck })
    }

    addQuestion = () => this.props.navigation.navigate(States.AddQuestion, ({ deck: this.state.deck }: AddQuestionContainerParams))

    editQuestion = (question: Question) => console.info("edit question", question)

    deleteQuestion = (question: Question) => console.info("deleting question", question)

    create = () => console.info("Create!");

    buildActions = () => {
        const addQuestion: Action = {
            icon: <Ionicons name="ios-add" size={22} />,
            // onPress: () => this.addQuestion()
            onPress: () => console.info("Add Question")
        }

        const create: Action = {
            title: "Create",
            onPress: () => this.create()
        }

        return [addQuestion, create]
    }

    render() {
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

                    <Text>{JSON.stringify(this.state.deck)}</Text>
                </View>
                <ActionBar actions={this.buildActions()} />
            </View>
        );
    }
}
