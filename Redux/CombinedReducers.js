// @flow


import {combineReducers} from "redux";
import {NavigationReducer} from './NavigationReducer';

const nav = NavigationReducer;
export const CombinedReducers = combineReducers({nav});
