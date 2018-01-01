// @flow

import UUID from "../Util/UUID"

export class Deck {
    uuid: string = UUID()
    title: string = ""
    questions: Question[] = []
}

export class Question {
    uuid: string = UUID()
    question: string = ""
    answer: string = ""
}

export type DeckStoreage = { [uuid: string]: Deck }