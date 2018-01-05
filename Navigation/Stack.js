// @flow

import React from 'react'
import {StackNavigator} from 'react-navigation';
import {States} from './NavigationStates';
import {DeckListViewContainer} from '../Containers/DeckListViewContainer';
import {NewDeckContainer} from '../Containers/NewDeckContainer';
import {AddQuestionContainer} from '../Containers/AddQuestionContainer';
import {IndividualDeckViewContainer} from '../Containers/IndividualDeckViewContainer';
import {QuizContainer} from '../Containers/QuizContainer';

export const Stack = StackNavigator({
    [States.DeckListView]: { screen: DeckListViewContainer },
    [States.AddDeck]: { screen: NewDeckContainer },
    [States.AddQuestion]: { screen: AddQuestionContainer },
    [States.IndividualDeckView]: { screen: IndividualDeckViewContainer },
    [States.Quiz]: { screen: QuizContainer }
});
