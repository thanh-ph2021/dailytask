import { StyleProp, View, TouchableOpacity, ViewStyle, StyleSheet } from "react-native"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"

import TextComponent from "./TextComponent"
import Icon, { TypeIcons } from "./Icon"
import { Colors, Sizes } from "../contants"

type AppRadioProps = {
    options: string[]
    checkedValue: string,
    onChange: Dispatch<SetStateAction<string>>,
    onCallBack?: (value: string) => void,
    containerStyle?: StyleProp<ViewStyle>
}

const AppRadio = ({ options, checkedValue, onChange, containerStyle, onCallBack }: AppRadioProps) => {
    const { t } = useTranslation()
    return (
        <View style={containerStyle}>
            {options.map((option) => {
                let active = checkedValue === option
                return (
                    <TouchableOpacity
                        key={option}
                        onPress={() => {
                            onChange(option)
                            onCallBack && onCallBack(option)
                        }}
                        style={styles.radio}
                    >
                        <Icon
                            type={TypeIcons.MaterialIcons}
                            name={active ? "radio-button-checked" : "radio-button-unchecked"}
                            color={active ? Colors.primary : Colors.gray}
                            size={Sizes.xl} />
                        <TextComponent text={t(option)} />
                    </TouchableOpacity>
                )
            })}

        </View>
    )
}

export default AppRadio

const styles = StyleSheet.create({
    radio: {
        flexDirection: 'row',
        paddingBottom: Sizes.padding,
        gap: Sizes.padding
    }
})