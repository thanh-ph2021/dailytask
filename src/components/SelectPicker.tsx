import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, ViewProps } from 'react-native'
import { Colors, Fonts, Sizes } from '../contants'
import { useTheme } from '../hooks'
import { Icons } from '../utils'
import TextComponent from './TextComponent'

type Props = {
    label?: string
    value: string
    placeholder?: string
    onPress: () => void,
}

const SelectPicker: React.FC<Props> = ({ label, value, placeholder, onPress }) => {
    const { colors } = useTheme()

    return (
        <View style={styles.container}>
            {label && <TextComponent text={label} style={[styles.label, { color: colors.textPrimary }]}/>}
            <TouchableOpacity
                style={[styles.inputContainer, { borderColor: colors.textSecondary }]}
                onPress={onPress}
            >
                <TextComponent
                    text={value || placeholder || 'Select'}
                    style={[
                        styles.valueText,
                        {
                            color: value ? colors.textPrimary : colors.textSecondary,
                        },
                    ]} />
                <Icons.arrowDown size={20} color={colors.textSecondary} />
            </TouchableOpacity>
        </View>
    )
}

export default SelectPicker

const styles = StyleSheet.create({
    container: {
        marginBottom: Sizes.padding,
    },
    label: {
        marginBottom: 6,
        ...Fonts.h3,
    },
    inputContainer: {
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderRadius: Sizes.radius,
        paddingHorizontal: Sizes.padding,
        paddingVertical: Sizes.padding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    valueText: {
        ...Fonts.body4
    },
});
