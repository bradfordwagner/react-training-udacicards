// @flow

import type {Dispatch} from 'redux-thunk';
import * as Storeage from '../Util/Storeage';
import {Deck} from "../Lib/Deck";

export const LoadDecks = 'LoadDecks';
export const DeckActions = {
  [LoadDecks]: LoadDecks,
};

export type LoadDecksAction = {
  type: string,
  decks: Deck[],
}

export type SaveDeckAction = {
  type: string,
  deck: Deck,
}

export const loadDecks = () => (dispatch: Dispatch<LoadDecksAction>) => Storeage.loadDecks().then(decks => dispatch({type: DeckActions.LoadDecks, decks}));
