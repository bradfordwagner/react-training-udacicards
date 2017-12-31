// @flow

import React from 'react'
import { StackNavigator } from 'react-navigation';
import { States } from './NavigationStates';
import { DeckListViewContainer } from '../Containers/DeckListViewContainer';
import { Text } from 'react-native';

const AddDeckView = () => (<Text>Add Deck View</Text>)

export const Stack = StackNavigator({
    [States.DeckListView]: { screen: DeckListViewContainer },
    [States.AddDeck]: { screen: AddDeckView }
})