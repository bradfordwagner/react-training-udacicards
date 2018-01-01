// @flow

import React from 'react'
import { StackNavigator } from 'react-navigation';
import { States } from './NavigationStates';
import { DeckListViewContainer } from '../Containers/DeckListViewContainer';
import { Text } from 'react-native';
import { NewDeckContainer } from '../Containers/NewDeckContainer';
import { AddQuestionContainer } from '../Containers/AddQuestionContainer';

export const Stack = StackNavigator({
    [States.AddDeck]: { screen: NewDeckContainer },
    [States.AddQuestion]: { screen: AddQuestionContainer },
    [States.DeckListView]: { screen: DeckListViewContainer }
})