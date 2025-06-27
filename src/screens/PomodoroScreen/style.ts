import { StyleSheet } from 'react-native'

import { Sizes } from '../../contants'

export const styles = StyleSheet.create({
    timerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Sizes.padding * 2,
    },
    startButton: {
        borderRadius: Sizes.radius * 2,
        paddingHorizontal: Sizes.padding * 2,
        paddingVertical: Sizes.padding,
        marginTop: Sizes.padding,
    },
    pauseOptions: {
        flexDirection: 'row',
        gap: Sizes.padding,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: Sizes.padding,
    },
    optionItem: {
        alignItems: 'center',
        gap: Sizes.padding / 2,
    },
})
