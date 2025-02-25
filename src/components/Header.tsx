import { ReactElement } from 'react'
import { View, StyleSheet, TextStyle } from 'react-native'
import { useSelector } from 'react-redux'

import { Sizes } from '../contants'
import TextComponent from './TextComponent'
import { StateModel } from '../models/StateModel'
import { selectTheme } from '../redux/selectors'


type HeaderProps = {
    headerLeft?: ReactElement
    title?: string,
    headerRight?: ReactElement,
    textStyle?: TextStyle
}

const Header = ({ headerLeft, title, headerRight, textStyle }: HeaderProps) => {
    const { colors } = useSelector((state: StateModel) => selectTheme(state))

    return (
        <View style={styles.container}>
            {headerLeft && <View style={[styles.containerLeft, { zIndex: 99 }]}>
                {headerLeft}
            </View>}

            <View style={{ flex: 1 }}>
                <TextComponent style={[styles.text, textStyle]} text={title ? title : ''} color={colors.text} />
            </View>
            {headerRight && <View style={[styles.containerRight, { zIndex: 99 }]}>
                {headerRight}
            </View>}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: Sizes.l,
        marginTop: Sizes.xl,

    },

    text: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: Sizes.l,
    },

    containerLeft: {
        left: Sizes.l,
        position: 'absolute',
        alignSelf: 'center'
    },

    containerRight: {
        position: 'absolute',
        alignSelf: 'center',
        right: Sizes.l
    }
})