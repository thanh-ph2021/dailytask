import DarkTheme from "../../themes/DarkTheme"
import LightTheme from "../../themes/LightTheme"
import { SET_THEME } from "../actions"

export type ThemeColor = {
    readonly containerBackground?: string
    readonly secondary?: string
    readonly text?: string
    readonly primary: string
    readonly primaryLight: string
    readonly background: string
    readonly surface: string
    readonly textPrimary: string
    readonly textSecondary: string
    readonly accent: string
    readonly highlight: string
    readonly info: string

    readonly input: string
    readonly divider: string

}

export type ThemeData = {
    isDark: boolean,
    colors: ThemeColor
}

export type ThemeModel = {
    type: 'light' | 'dark',
    themeData: ThemeData
}
const initialState: ThemeModel = {
    type: 'light',
    themeData: LightTheme
}

const ThemeReducer = (state: ThemeModel = initialState, actions: any) => {

    switch (actions.type) {
        case SET_THEME:
            const themeData = actions.payload == 'light' ? LightTheme : DarkTheme
            return {
                ...state,
                type: actions.payload,
                themeData: themeData
            }
        default:
            return state
    }
}

export default ThemeReducer