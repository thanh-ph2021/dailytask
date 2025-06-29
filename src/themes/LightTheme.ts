import { Colors } from "../contants"
import { ThemeData } from "../redux/Reducers/ThemeReducer"

const LightTheme: ThemeData = {
    isDark: false,
    colors: {
        containerBackground: 'white',
        secondary: Colors.secondary,
        text: 'black',
        
        primary: '#179810',
        primaryLight: '#1FBF14',
        background: "#FFFFFF",
        surface: "#BBEBC4",
        textPrimary: "#000000",
        textSecondary: "#444444",
        accent: "#E6A100",
        highlight: "#D67800",
        info: "#4AC3FF",
        input: "#F3F3F3",
        divider: "#EEEEEE"
    }
}

export default LightTheme