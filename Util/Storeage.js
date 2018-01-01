// @flow

import { AsyncStorage } from 'react-native'
import { Deck, Question } from "../Lib/Deck"
import type { DeckStoreage } from "../Lib/Deck"

const QuestionsKey = "bradfordwagner-TrainingCards-questions"
const DecksKey = "bradfordwagner-TrainingCards-decks"

export const saveDeck = (deck: Deck) => {
    return AsyncStorage.mergeItem(DecksKey, JSON.stringify({ [deck.uuid]: deck }))
}

export const loadDecks = () => {
    return AsyncStorage.getItem(DecksKey).then(res => {
        const storeage: DeckStoreage = JSON.parse(res)
        return storeage ? Object.values(storeage) : []
    })
}
