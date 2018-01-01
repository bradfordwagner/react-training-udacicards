// @flow
import type { NavigationProps } from '../Lib/Navigation'

import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Deck, Question } from '../Lib/Deck';
import { TextBox } from '../Components/TextBox';
import { Layout } from '../Util/CommonStyles';

export type AddQuestionContainerParams = {
    deck: Deck
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
    }

    addQuestion = () => console.info("Add Question")

    render = () => (
        <View style={Layout.Column}>
            <TextBox
                value={this.state.question}
                onChange={(question) => this.setState({ question })}
                placeholder="Question"
            />
            <TextBox
                value={this.state.answer}
                onChange={(answer) => this.setState({ answer })}
                placeholder="Answer"
            />
            <Button
                title="Add"
                color="green"
                onPress={this.addQuestion}
            />
        </View>
    )
}