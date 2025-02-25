import { createSelector } from "reselect"

import { StateModel } from "../models/StateModel"
import { TaskModel } from "../models/TaskModel"
import { CategoryModel } from "../models"

export const selectTasks = (state: StateModel) => state.tasks

export const makeSelectTasksFilter = (date: Date) => {
    return createSelector(
        (state: StateModel) => state.tasks,
        (state: StateModel) => state.categories,
        (tasks: TaskModel[], categories: CategoryModel[]) => {
            const selectedDate = new Date(date)
            selectedDate.setHours(0, 0, 0, 0)

            return tasks
                .filter((task) => {
                    const taskDate = new Date(task.dateTime)
                    taskDate.setHours(0, 0, 0, 0)
                    return taskDate.getTime() === selectedDate.getTime()
                })
                .map((task) => ({
                    ...task,
                    category: categories.find((cat) => cat.id === task.categoryId) || undefined,
                }))
                .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
        }
    )
}

export const makeSelectCompletedTasks = () => {
    return createSelector(
        (state: StateModel) => state.tasks,
        (tasks: TaskModel[]) => {
            return tasks.filter(task => task.completed)
        }
    )
}

export const makeSelectPendingTasks = () => {
    return createSelector(
        (state: StateModel) => state.tasks,
        (state: StateModel) => state.categories,
        (tasks: TaskModel[], categories: CategoryModel[]) => {
            return tasks
                .filter(task => !task.completed)
                .map(task => ({
                    ...task,
                    category: categories.find(cat => cat.id === task.categoryId) || undefined,
                }))
        }
    )
}

export const selectTheme = (state: StateModel) => state.theme.themeData

export const selectCategories = (state: StateModel) => state.categories