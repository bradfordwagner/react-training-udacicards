// @flow

import { StyleSheet } from 'react-native';

export const Uno1 = "#d6e9ff"
export const Uno2 = "#88b4e7"
export const Uno3 = "#5d8cc0"
export const Uno4 = "#586f89"
export const Uno5 = "#444c55"

export const Duo1 = "34febb"
export const Duo2 = "32ae85"
export const Duo3 = "42675a"

export const BackgroundColors = StyleSheet.create({
    Red: {
        backgroundColor: "red"
    },
});

export const Layout = StyleSheet.create({
    Flex: {
        flex: 1
    },
    Row: {
        flexDirection: "row"
    },
    Column: {
        flexDirection: "column"
    }
})

export const VerticalAlignment = StyleSheet.create({
    Start: {
        alignItems: "flex-start"
    },
    Center: {
        alignItems: "center"
    }
})

export const HorizontalAlignment = StyleSheet.create({
    Start: {
        justifyContent: "flex-start"
    },
    Center: {
        justifyContent: "center"
    }
})

export const TextAlignment = StyleSheet.create({
    Center: {
        textAlign: "center"
    }
})

export const TextStyle = StyleSheet.create({
    Title: {
        fontSize: 20,
        color: Uno3
    },
    SubText: {
        fontSize: 18,
        color: Uno4
    }
})

export const CardStyle = {
    Default: {
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        borderRadius: 16,
        backgroundColor: "white",
        margin: 10,
        padding: 10
    }    
}