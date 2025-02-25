import { StateModel } from "../../models/StateModel"
import LightTheme from "../../themes/LightTheme"
import CategoriesReducer from "./CategoriesReducer"
import TasksReducer from "./TasksReducer"
import ThemeReducer from "./ThemeReducer"

const initState: StateModel = {
    tasks: [],
    theme: {
        type: 'light',
        themeData: LightTheme
    },
    categories: []
}

const RootReducer = (state: StateModel = initState, actions: any) => {
    return {
        tasks: TasksReducer(state.tasks, actions),
        theme: ThemeReducer(state.theme, actions),
        categories: CategoriesReducer(state.categories, actions)
    }
}

export default RootReducer