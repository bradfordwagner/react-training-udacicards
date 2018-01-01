// @flow

import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { BackgroundColors, TextStyle, TextAlignment, Duo1, Duo2, Duo3 } from '../Util/CommonStyles';
import { Deck, Question } from '../Lib/Deck';
import { TextBox } from '../Components/TextBox';
import { QuestionSummary } from '../Components/QuestionSummary';

type Props = {}
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

    editQuestion = (question: Question) => console.info("edit question", question)

    deleteQuestion = (question: Question) => console.info("deleting question", question)

    render() {
        return (
            <View>
                <TextBox
                    placeholder="Title"
                    value={this.state.deck.title}
                    onChange={(title) => this.updateTitle(title)}
                />
                <Text style={[TextStyle.SubText, TextAlignment.Center]}>Questions</Text>
                <Button title="Add Question" color={Duo2} onPress={() => console.info("Adding a question")} />
                {this.state.deck.questions.map(question => (
                    <QuestionSummary
                        key={question.uuid}
                        question={question}
                        onPress={() => this.editQuestion(question)}
                        onDeletePress={() => this.deleteQuestion(question)}
                        showDelete={true}
                    />
                ))}

                <Button title="Create" onPress={() => console.info("Create!")} />

                <Text>{JSON.stringify(this.state.deck)}</Text>
            </View>
        );
    }
}
