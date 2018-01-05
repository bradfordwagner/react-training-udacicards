// @flow

import {Deck} from "../Lib/Deck";

export type  DeckState = {
  byId: { [uuid: string]: Deck },
  sortedAlphabetically: Deck[]
}

export const InitialDeckState: DeckState = {byId: {}, sortedAlphabetically: []};

