import { StyleProp, View, ViewStyle } from "react-native"

import { Colors, Sizes } from "../contants"

interface Props {
    height?: number,
    color?: string,
    style?: StyleProp<ViewStyle>
}

const Divider = (props: Props) => {

    const { height, color, style } = props
    return (
        <View style={[
            { height: height ? height : 2, backgroundColor: color ? color : Colors.lightGray, alignItems: 'center', marginVertical: Sizes.padding },
            style
        ]} />
    )
}

export default Divider