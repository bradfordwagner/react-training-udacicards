// @flow

import React from 'react'
import { StackNavigator } from 'react-navigation';
import { DeckListView, AddDeck } from './NavigationStates';
import { DeckListViewContainer } from '../Containers/DeckListViewContainer';
import { Text } from 'react-native';

const AddDeckView = () => (<Text>Add Deck View</Text>)

export const Stack = StackNavigator({
    [DeckListView]: {
        screen: DeckListViewContainer
    },
    [AddDeck]: {
        screen: AddDeckView
    }
})