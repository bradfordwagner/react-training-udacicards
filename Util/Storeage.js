//  @flow

import {AsyncStorage} from 'react-native'
import type {DeckStoreage} from "../Lib/Deck"
import {Deck} from "../Lib/Deck"

const DecksKey = "bradfordwagner-TrainingCards-decks";

export const saveDeck = (deck: Deck) => {
  return AsyncStorage.mergeItem(DecksKey, JSON.stringify({[deck.uuid]: deck}))
};

export const loadDecks = () => {
  return AsyncStorage.getItem(DecksKey).then(res => {
    const storeage: DeckStoreage = JSON.parse(res);
    return storeage ? parseStoreage(storeage) : []
  })
};

function parseStoreage(storeage: DeckStoreage): Deck[] {
  return Object.keys(storeage).map(key => storeage[key])
}
