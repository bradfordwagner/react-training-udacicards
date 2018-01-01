// @flow

import type { NavigationProps } from "../Lib/Navigation"

import React from 'react'
import { View, Text } from 'react-native';
import { Deck } from '../Lib/Deck';

export type IndividualDeckViewContainerNavigationProps = {
    afterEdit: Function,
    deck: Deck
}

type Props = {
    navigation: NavigationProps<IndividualDeckViewContainerNavigationProps>
}
type State = {}

export class IndividualDeckViewContainer extends React.Component<Props, State> {
    render = () => (
        <View>
            <Text>IndividualDeckViewContainer</Text>
        </View>
    )
}