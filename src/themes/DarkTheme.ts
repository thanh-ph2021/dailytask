import { Colors } from "../contants"
import { ThemeData } from "../redux/Reducers/ThemeReducer"

const DarkTheme: ThemeData = {
    isDark: true,
    colors: {
        containerBackground: '#1F222A',
        secondary: Colors.secondary,
        text: 'white',

        primary: "#179810",
        primaryLight: "#1FBF14",
        background: "#181A20",
        surface: "#1E1E1E",
        textPrimary: "#FFFFFF",
        textSecondary: "#B0B0B0",
        accent: "#E6A100",
        highlight: "#FF9800",
        info: "#007ACC",

        input: "#646A74",
        divider: "#36383F"
    }
}

export default DarkTheme