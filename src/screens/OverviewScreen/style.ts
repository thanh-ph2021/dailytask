import { StyleSheet } from "react-native"
import { Sizes } from "../../constants"

export const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Sizes.padding,
        paddingTop: Sizes.padding
    },
})