// @flow

import React from 'react';
import { View, Text, Button } from 'react-native';
import { loadDecks } from '../Util/Storeage';
import { Deck } from '../Lib/Deck';
import { CommonStyles } from '../Util/CommonStyles';
import { DeckSummary } from '../Components/DeckSummary';

type Props = {}
type State = {
    decks: Deck[]
}

const DefaultDeck = new Deck()
DefaultDeck.title = "Default Deck"

export class DeckListViewContainer extends React.Component<Props, State> {
    state = {
        decks: [
            DefaultDeck
        ]
    }

    componentDidMount = () => {
        console.info("loading decks");
        loadDecks().then(decks => {
            console.info("finished loading decks", decks);
        })
    }

    render = () => (
        <View>
            <DeckSummary deck={DefaultDeck} />
            <Button title="Add Deck" onPress={() => console.info("Adding a deck maybe")} />
        </View>
    )
}
