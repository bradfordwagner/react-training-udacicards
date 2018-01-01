// @flow

import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { BackgroundColors } from '../Util/CommonStyles';
import { Deck } from '../Lib/Deck';
import { TextBox } from '../Components/TextBox';

type Props = {}
type State = {
    deck: Deck
}

export class NewDeckContainer extends Component<Props, State> {
    state = {
        deck: new Deck()
    }

    updateTitle = (title: string) => {
        const deck = this.state.deck
        deck.title = title
        this.setState({ deck })
    }

    render() {
        return (
            <View>
                <TextBox
                    placeholder="Title"
                    value={this.state.deck.title}
                    onChange={(title) => this.updateTitle(title)}
                />
                <Text>{JSON.stringify(this.state.deck)}</Text>
            </View>
        );
    }
}
