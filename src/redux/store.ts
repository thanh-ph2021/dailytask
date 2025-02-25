import { applyMiddleware, combineReducers, createStore } from 'redux'

import TasksReducer from './Reducers/TasksReducer'
import middleware from './middleware'
import { ActionType } from './actions'
import { TaskModel } from '../models/TaskModel'
import ThemeReducer, { ThemeModel } from './Reducers/ThemeReducer'
import { CategoryModel } from '../models'
import CategoriesReducer from './Reducers/CategoriesReducer'

type RootState = {
    tasks: TaskModel[],
    theme: ThemeModel,
    categories: CategoryModel[]
}

type RootAction = ActionType

export const store = createStore<RootState, RootAction>(
    combineReducers({
        tasks: TasksReducer,
        theme: ThemeReducer,
        categories: CategoriesReducer,
    }),
    applyMiddleware(middleware)
)