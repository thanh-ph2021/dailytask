import { StyleSheet } from "react-native"

import { Sizes } from "../constants"

const UtilStyles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: Sizes.l,
        borderRadius: 20,
        width: '90%',
        paddingVertical: Sizes.l,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

export default UtilStyles