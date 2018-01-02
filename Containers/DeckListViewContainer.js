// @flow
import type { NavigationProps } from '../Lib/Navigation';
import type { NewDeckNavigationProps } from './NewDeckContainer';
import type { Action } from '../Components/ActionBar'
import type { IndividualDeckViewContainerNavigationProps } from './IndividualDeckViewContainer'

import React from 'react';
import { View, Text, Button, ScrollView, Animated } from 'react-native';
import * as Storeage from '../Util/Storeage';
import { Deck } from '../Lib/Deck';
import { BackgroundColors, Layout } from '../Util/CommonStyles';
import { DeckSummary } from '../Components/DeckSummary';
import { States } from '../Navigation/NavigationStates';
import { ActionBar } from '../Components/ActionBar';

type Props = {
    navigation: NavigationProps<any>,
    setTimeout(todo: Function, time: number): void
}

type State = {
    decks: Deck[],
    springAnim: { [uuid: string]: Animated.Value }
}

export class DeckListViewContainer extends React.Component<Props, State> {
    animationDuration = 200

    state = {
        decks: [],
        springAnim: {}//new Animated.Value(1)
    }

    componentDidMount = () => {
        this.reloadDecks()
    }

    reloadDecks = () => {
        Storeage.loadDecks().then(decks => {
            const springAnim = this.state.springAnim
            decks.forEach(deck => {
                springAnim[deck.uuid] = new Animated.Value(1)
            })

            this.setState({ decks, springAnim })
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

    openDeckView = (deck: Deck) => {
        this.springAnimation(deck)
        setTimeout(() => {
            this.unspringAnimation(deck)
            setTimeout(() => {
                const params: IndividualDeckViewContainerNavigationProps = { afterEdit: () => this.forceUpdate(), deck }
                this.props.navigation.navigate(States.IndividualDeckView, params)
            }, this.animationDuration + 100)
        }, this.animationDuration)
    }

    springAnimation = (deck: Deck) => {
        Animated.spring(this.state.springAnim[deck.uuid], { duration: this.animationDuration, toValue: 1.3 }).start()
    }

    unspringAnimation = (deck: Deck) => {
        Animated.spring(this.state.springAnim[deck.uuid], { duration: this.animationDuration, toValue: 1 }).start()
    }

    render = () => (
        <View style={[Layout.Flex]}>
            <ScrollView style={[Layout.Flex]}>
                {this.state.decks.map((deck, index) => (
                    <Animated.View style={{ opacity: 1, transform: [{ scale: this.state.springAnim[deck.uuid] }] }}>
                        <DeckSummary key={deck.uuid} deck={this.state.decks[index]} onPress={() => this.openDeckView(deck)} />
                    </Animated.View>
                ))}
            </ScrollView>
            <ActionBar actions={this.buildActions()} />
        </View>
    )
}
