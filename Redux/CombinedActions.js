// @flow

import type {Dispatch} from "redux";
import {loadDecks, saveDeck} from "./DeckActions";
import {Deck} from "../Lib/Deck";

export const CombinedActions = (dispatch: Dispatch<any>) => ({
  loadDecks: () => dispatch(loadDecks()),
  saveDeck: (deck: Deck) => dispatch(saveDeck(deck))
});

export type CombinedActionsProps = {
  loadDecks(): Promise<any>,
  saveDeck(deck: Deck): Promise<any>,
}
