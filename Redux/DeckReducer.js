// @flow

import type {DeckState} from "./DeckState";
import {InitialDeckState} from "./DeckState";
import type {LoadDecksAction, SaveDeckAction} from "./DeckActions";
import {DeckActions} from "./DeckActions";
import {Deck} from "../Lib/Deck";

type DeckAction = LoadDecksAction & SaveDeckAction

export const DeckReducer = (state: DeckState = InitialDeckState, action: DeckAction) => {
  switch (action.type) {
    case DeckActions.SaveDeck:
      const saveDeckAction: SaveDeckAction = action;
      const deck = saveDeckAction.deck;
      const newState: DeckState = {
        ...state,
        byId: {
          ...state.byId,
          [deck.uuid]: deck
        }
      };
      newState.sortedAlphabetically = sortAlphabetically(newState.byId);
      return newState;
    case DeckActions.LoadDecks:
      const {decks} = action;
      const byId: { [uuid: string]: Deck } = {};
      decks.forEach(deck => byId[deck.uuid] = deck);
      const sortedAlphabetically = sortAlphabetically(byId);
      return {...state, byId, sortedAlphabetically};
    default:
      return state;
  }
};

const sortAlphabetically = (byId: { [uuid: string]: Deck }) =>
  Object.keys(byId)
    .map(uuid => byId[uuid])
    .sort((a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase()))
    .map(deck => deck.uuid);
