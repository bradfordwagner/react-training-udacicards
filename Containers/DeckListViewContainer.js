// @flow
import type { NavigationProps } from '../Lib/Navigation';
import type { NewDeckNavigationProps } from './NewDeckContainer';
import type { Action } from '../Components/ActionBar'

import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import * as Storeage from '../Util/Storeage';
import { Deck } from '../Lib/Deck';
import { BackgroundColors, Layout } from '../Util/CommonStyles';
import { DeckSummary } from '../Components/DeckSummary';
import { States } from '../Navigation/NavigationStates';
import { ActionBar } from '../Components/ActionBar';


type Props = {
    navigation: NavigationProps<any>
}
type State = {
    decks: Deck[]
}

export class DeckListViewContainer extends React.Component<Props, State> {
    state = {
        decks: []
    }

    componentDidMount = () => {
        this.reloadDecks()
    }

    reloadDecks = () => {
        Storeage.loadDecks().then(decks => {
            console.info("loaded decks", decks);
            this.setState({ decks })
        })
    }

    newDeck = () => {
        const params: NewDeckNavigationProps = { onCreate: () => this.reloadDecks() }
        this.props.navigation.navigate(States.AddDeck, params)
    }

    buildActions = () => {
        const createDeck: Action = {
            title: "Create Deck",
            onPress: () => this.newDeck()
        }
        return [createDeck]
    }

    render = () => (
        <View style={[Layout.Flex]}>
            <ScrollView style={[Layout.Flex]}>
                {this.state.decks.map((deck, index) => (
                    <DeckSummary key={deck.uuid} deck={this.state.decks[index]} onPress={() => console.info("deck summary pressed")} />
                ))}
            </ScrollView>
            <ActionBar actions={this.buildActions()} />
        </View>
    )
}
