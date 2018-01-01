// @flow



import * as React from 'react'
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import {
    CardStyle,
    Layout,
    HorizontalAlignment,
    VerticalAlignment,
    BackgroundColors,
    Uno1
} from '../Util/CommonStyles';

export type Action = {
    icon?: React.Node,
    title?: string,
    onPress?: Function
}

export type ActionBarProps = {
    actions: Action[]
}

export const ActionBar = ({ actions }: ActionBarProps) => (
    <View style={[CardStyle.BottomCard, Layout.Row, HorizontalAlignment.SpaceAround]}>
        {actions && actions.map((action, index) => (
            <TouchableHighlight key={`ActionBar-${index}`} style={[Layout.Flex]} underlayColor={Uno1} onPress={action.onPress}>
                <View style={[Layout.Column, VerticalAlignment.Center]} >
                    {action.icon}
                    {action.title && <Text style={[VerticalAlignment.Center]}>{action.title}</Text>}
                </View>
            </TouchableHighlight>
        ))}
    </View>
)

const Style = StyleSheet.create({
    ActionBarHeight: {
        height: 40
    }
})