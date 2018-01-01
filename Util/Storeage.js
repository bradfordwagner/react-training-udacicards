//  @flow

import { AsyncStorage } from 'react-native'
import { Deck, Question } from "../Lib/Deck"
import type { DeckStoreage } from "../Lib/Deck"

const DecksKey = "bradfordwagner-TrainingCards-decks"

const EditingKey = "bradfordwagner-TrainingCards-editingDeck"

export const saveDeck = (deck: Deck) => {
    return AsyncStorage.mergeItem(DecksKey, JSON.stringify({ [deck.uuid]: deck }))
}

export const loadDecks = () => {
    return AsyncStorage.getItem(DecksKey).then(res => {
        const storeage: DeckStoreage = JSON.parse(res)
        return storeage ? Object.values(storeage) : []
    })
}

export const saveEditingDeck = (deck: Deck) => {
    return AsyncStorage.setItem(EditingKey, JSON.stringify(deck))
}

export const loadEditingDeck = () => {
    console.info("loadEditingDeck");
    return AsyncStorage.getItem(EditingKey).then(res => {
        const deck: Deck = JSON.parse(res)
        console.info("found editing deck", deck);
        return deck ? deck : new Deck()
    })
}

export const clearEditingDeck = () => {
    return AsyncStorage.removeItem(EditingKey)
}