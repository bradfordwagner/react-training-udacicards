import { StyleSheet } from 'react-native';

export const CommonStyles = StyleSheet.create({
    red: {
        backgroundColor: "red"
    },
});

export const Layout = StyleSheet.create({
    flex: {
        flex: 1
    },
    row: {
        flexDirection: "row"
    },
    column: {
        flexDirection: "column"
    }
})

export const CrossAlignment = StyleSheet.create({
    start: {
        alignItems: "flex-start"
    },
    centered: {
        alignItems: "center"
    }
})

export const MainAlignment = StyleSheet.create({
    start: {
        justifyContent: "flex-start"
    }
})
