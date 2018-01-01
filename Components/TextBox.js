// @flow

import React from 'react'
import { View, Text, TextInput } from 'react-native';
import { CardStyle } from '../Util/CommonStyles';

export type TextBoxProps = {
    placeholder: string,
    value: string,
    onChange: Function
}

export const TextBox = ({ placeholder, value = "", onChange }: TextBoxProps) => (
    <View style={CardStyle.Default}>
        <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={(val) => onChange(val)}
        />
    </View>
)