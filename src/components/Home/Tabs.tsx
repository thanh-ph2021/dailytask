import { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native"

import { Sizes, Fonts, Colors } from '../../contants'
import { addDaysToDate } from '../../utils'
import { useTheme } from '../../hooks'
import TextComponent from '../TextComponent'

type TabsType = {
    date: Date,
    onPress: (date: Date) => void,
    style?: StyleProp<ViewStyle>
}

const Tabs = ({ date, onPress, style }: TabsType) => {

    const [array, setArray] = useState<Date[]>([])
    const { colors } = useTheme()

    useEffect(() => {
        const generateData = () => {
            const before = addDaysToDate(date, -1)
            const after = addDaysToDate(date, 1)

            setArray([before, date, after])
        }

        generateData()
    }, [date])

    return (
        <View style={[{ flexDirection: 'row', marginLeft: Sizes.s, columnGap: Sizes.l }, style]}>
            {array.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index.toString()}
                        style={{
                            backgroundColor: index === 1 ? colors.primary : colors.background, 
                            width: 45, 
                            height: 45, 
                            borderRadius: 100, 
                            elevation: 6, 
                            alignItems: 'center',
                            justifyContent: 'center', marginTop: Sizes.xl
                        }}
                        onPress={() => onPress(item)}
                    >
                        <TextComponent
                            text={item.getDate().toString()}
                            style={{ ...Fonts.h2, fontWeight: 'bold', color: index === 1 ? Colors.white : colors.primary }}
                        />
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default Tabs