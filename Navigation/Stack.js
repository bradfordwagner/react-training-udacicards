// @flow

import type {Dispatch} from "redux";
import type {NavigationState} from "../Redux/NavigationState";

import React from 'react'
import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import {States} from './NavigationStates';
import {DeckListViewContainer} from '../Containers/DeckListViewContainer';
import {NewDeckContainer} from '../Containers/NewDeckContainer';
import {AddQuestionContainer} from '../Containers/AddQuestionContainer';
import {IndividualDeckViewContainer} from '../Containers/IndividualDeckViewContainer';
import {QuizContainer} from '../Containers/QuizContainer';
import {CombinedState} from "../Redux/CombinedState";
import {connect} from "react-redux";

export const Navigator = StackNavigator({
  [States.DeckListView]: {screen: DeckListViewContainer},
  [States.AddDeck]: {screen: NewDeckContainer},
  [States.AddQuestion]: {screen: AddQuestionContainer},
  [States.IndividualDeckView]: {screen: IndividualDeckViewContainer},
  [States.Quiz]: {screen: QuizContainer},
});


type StackProps = { dispatch: Dispatch<any>, nav: NavigationState }
const NavHelpers = ({dispatch, nav}: StackProps) => (
  <Navigator navigation={addNavigationHelpers({dispatch, state: nav})}/>
);

const mapStateToProps = (state: CombinedState) => ({nav: state.nav});

export const Stack = connect(mapStateToProps)(NavHelpers);
