import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'

import { Colors, Fonts, Images, Sizes } from '../../contants'
import { TextComponent } from '../../components'
import { useTheme } from '../../hooks'

interface Props {
    value: string
    label: string,
    onPressInfo?: () => void,
    colorValue?: string
}

const DataCard: React.FC<Props> = ({ value, label, onPressInfo, colorValue }) => {
    const { colors } = useTheme()
    return (
        <View style={[styles.card, { backgroundColor: colors.background }]}>
            <TextComponent
                text={value}
                style={[Fonts.h2, { fontWeight: 'bold' }]}
                color={colorValue ? colorValue : Colors.primary}
                textAlign="center"
            />
            <TextComponent
                text={label}
                style={[Fonts.body5, { marginTop: 4 }]}
                color={colors.text}
                textAlign="center"
                numberOfLines={1}
            />
            {onPressInfo && <TouchableOpacity
                style={{ position: 'absolute', right: Sizes.padding, top: Sizes.padding }}
                onPress={onPressInfo}
            >
                <Image
                    source={Images.info2}
                    style={{ tintColor: colors.textSecondary, width: 20, height: 20 }}
                />
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        paddingVertical: Sizes.padding,
        borderRadius: Sizes.radius,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '48%',
        elevation: 6
    },
})

export default DataCard
