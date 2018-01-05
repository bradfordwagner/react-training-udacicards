// @flow

import type {NavigationProps} from "../Lib/Navigation"
import type {AddQuestionContainerParams} from "./AddQuestionContainer"
import type {Action} from "../Components/ActionBar"
import {ActionBar} from '../Components/ActionBar';

import React, {Component} from 'react';
import {View} from 'react-native';
import {Layout} from '../Util/CommonStyles';
import {Deck, Question} from '../Lib/Deck';
import {TextBox} from '../Components/TextBox';
import {QuestionSummary} from '../Components/QuestionSummary';
import {States} from '../Navigation/NavigationStates';
import {Ionicons} from "@expo/vector-icons";
import * as Storeage from "../Util/Storeage"

export type NewDeckNavigationProps = {
    onCreate: Function
}

type Props = {
    navigation: NavigationProps<NewDeckNavigationProps>
}

type State = {
    deck: Deck
}

export class NewDeckContainer extends Component<Props, State> {
    state = {
        deck: new Deck()
    };

    updateTitle = (title: string) => {
        const deck = this.state.deck;
        deck.title = title;
        this.setState({ deck })
    };

    rerender = () => this.forceUpdate();

    addQuestion = () => this.props.navigation.navigate(States.AddQuestion, ({ deck: this.state.deck, onAdd: () => this.rerender() }: AddQuestionContainerParams));

    editQuestion = (question: Question) => console.info("edit question - we may never implement this :P", question);

    deleteQuestion = (question: Question) => {
        const deck = this.state.deck;
        deck.questions = deck.questions.filter(q => q.uuid !== question.uuid);
        this.setState({ deck })
    };

    create = () => {
        console.info("creating");
        Storeage.saveDeck(this.state.deck).then(() => {
            this.props.navigation.goBack();
            if (this.props.navigation.state.params.onCreate) {
                this.props.navigation.state.params.onCreate()
            }
        })
    };

    buildActions = () => {
        const addQuestion: Action = {
            icon: <Ionicons name="ios-add" size={22} />,
            onPress: () => this.addQuestion()
        };

        const create: Action = {
            title: "Create",
            onPress: () => this.create()
        };

        return [addQuestion, create]
    };

    render = () => (
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
