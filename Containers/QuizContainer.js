// @flow
import type { NavigationProps } from "../Lib/Navigation"

import React from 'react'
import { View, Text } from 'react-native';
import { Deck } from '../Lib/Deck';

export type QuizParams = {
    deck: Deck
}
type Props = {
    navigation: NavigationProps<QuizParams>
}
type State = {}

export class QuizContainer extends React.Component<Props, State> {
    render = () => (
        <View>
            <Text>QuizContainer</Text>
        </View>
    )
}