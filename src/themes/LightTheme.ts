import { Colors } from "../constants"
import { ThemeData } from "../redux/Reducers/ThemeReducer"

const LightTheme: ThemeData = {
    isDark: false,
    colors: {
        containerBackground: "#FFFFFF",
        secondary: Colors.secondary,
        text: 'black',
        
        primary: '#179810',
        primaryLight: '#1FBF14',
        background: "#F5F5F5",
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