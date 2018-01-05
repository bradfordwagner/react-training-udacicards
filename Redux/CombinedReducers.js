// @flow


import {combineReducers} from "redux";
import {NavigationReducer} from './NavigationReducer';
import {DeckReducer} from "./DeckReducer";

const nav = NavigationReducer;
const deck = DeckReducer;
export const CombinedReducers = combineReducers({nav, deck});
