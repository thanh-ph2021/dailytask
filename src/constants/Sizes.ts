import { Dimensions } from "react-native"

const Sizes = {
    s: 8,
    l: 14,
    xl: 24,
    xxl: 32,

    // font sizes
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    padding: 12,
    radius: 10,

    banner: 250,

    chart: Dimensions.get('window').width * 0.6,

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export default Sizes