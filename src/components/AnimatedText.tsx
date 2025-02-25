import { memo, useEffect } from 'react'
import { Easing, Text, View } from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated'

const AniText = Animated.createAnimatedComponent(Text)

interface Props {
    strikeThrought: boolean,
    textColor: string,
    inactiveTextColor: string,
    onPress?: () => void,
    children?: React.ReactNode
}

const AnimatedText = memo((props: Props) => {
    const { strikeThrought, textColor, inactiveTextColor, onPress, children } = props

    const hstackOffset = useSharedValue(0)
    const hstackAnimatedStyles = useAnimatedStyle(
        () => ({
            transform: [{ translateX: hstackOffset.value }]
        }),
        [strikeThrought]
    )
    const textColorProgress = useSharedValue(0)
    const textColorAnimatedStyles = useAnimatedStyle(
        () => ({
            color: interpolateColor(
                textColorProgress.value,
                [0, 1],
                [textColor, inactiveTextColor]
            )
        }),
        [strikeThrought, textColor, inactiveTextColor]
    )
    const strikethroughWidth = useSharedValue(0)
    const strikethroughAnimatedStyles = useAnimatedStyle(
        () => ({
            width: `${strikethroughWidth.value * 100}%`,
            borderBottomColor: interpolateColor(
                textColorProgress.value,
                [0, 1],
                [textColor, inactiveTextColor]
            )
        }),
        [strikeThrought, textColor, inactiveTextColor]
    )

    useEffect(() => {
        const easing = Easing.out(Easing.quad)
        if (strikeThrought) {
            hstackOffset.value = withSequence(
                withTiming(4, { duration: 200, easing }),
                withTiming(0, { duration: 200, easing })
            )
            strikethroughWidth.value = withTiming(1, { duration: 400, easing })
            textColorProgress.value = withDelay(
                1000,
                withTiming(1, { duration: 400, easing })
            )
        } else {
            strikethroughWidth.value = withTiming(0, { duration: 400, easing })
            textColorProgress.value = withTiming(0, { duration: 400, easing })
        }
    })

    return (
        <View>
            <AniText style={[textColorAnimatedStyles]}>{children}</AniText>
        </View>
    )
})

export default AnimatedText