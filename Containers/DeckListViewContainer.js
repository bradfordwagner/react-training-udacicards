// @flow
import type { NavigationProps } from '../Lib/Navigation';

import React from 'react';
import { View, Text, Button } from 'react-native';
import { loadDecks } from '../Util/Storeage';
import { Deck } from '../Lib/Deck';
import { BackgroundColors } from '../Util/CommonStyles';
import { DeckSummary } from '../Components/DeckSummary';
import { States } from '../Navigation/NavigationStates';


type Props = {
    navigation: NavigationProps<any>
}
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
            <DeckSummary deck={DefaultDeck} onPress={() => console.info("deck summary pressed")} />
            <Button title="Add Deck" onPress={() => this.props.navigation.navigate(States.AddDeck)} />
        </View>
    )
}
