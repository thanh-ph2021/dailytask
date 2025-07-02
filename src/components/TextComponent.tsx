import React, { memo, useState } from 'react'
import { StyleProp, TextStyle, Text, Platform, TextLayoutEventData, NativeSyntheticEvent } from "react-native"

import { useTheme } from '../hooks'

interface Props {
    text?: string,
    color?: string,
    size?: number,
    flex?: number,
    style?: StyleProp<TextStyle>,
    title?: boolean,
    numberOfLines?: number,
    showFullLine?: boolean,
    canExpand?: boolean,
    upperCase?: boolean,
    textAlign?: "right" | "auto" | "left" | "center" | "justify" | undefined
    textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | undefined
}

const TextComponent = (props: Props) => {

    const { text, color, size, flex, style, title, numberOfLines, showFullLine, canExpand = true, upperCase, textAlign = 'left', textDecorationLine = 'none' } = props
    const [textShown, setTextShown] = useState(false)
    const [lengthMore, setLengthMore] = useState(false)
    const { colors } = useTheme()

    const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14

    const toggleNumberOfLines = () => {
        setTextShown(!textShown)
    }

    const onTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
        setLengthMore(event.nativeEvent.lines.length > (numberOfLines ?? 3))
    }

    return (
        <>
            <Text
                numberOfLines={textShown || showFullLine ? undefined : (numberOfLines ?? 3)}
                style={[
                    {
                        color: color ?? colors.text,
                        flex: flex ?? 0,
                        fontSize: size ? size : title ? 18 : fontSizeDefault,
                        lineHeight: 21,
                        fontFamily: 'Roboto-Regular',
                        textAlign: textAlign,
                        textDecorationLine: textDecorationLine
                    },
                    style,
                ]}
                onTextLayout={onTextLayout}
            >
                {upperCase ? text!.toUpperCase() : text}
            </Text>

            {canExpand && lengthMore && !showFullLine ? <Text
                onPress={toggleNumberOfLines}
                style={{ lineHeight: 21, marginTop: 10, color: colors.primary }}
            >{textShown ? 'Read less' : 'Read more'}</Text> : <></>}
        </>
    )
}

export default memo(TextComponent)