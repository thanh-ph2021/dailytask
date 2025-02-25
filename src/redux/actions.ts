import { CategoryModel } from "../models"
import { TaskModel } from "../models/TaskModel"

export type ActionType = {
    type: string,
    payload: any
}

export const ADD_TASK = 'ADD_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const COMPLETE_TASK = 'COMPLETE_TASK'
export const FETCH_TASKS = 'FETCH_TASKS'
export const UPDATE_TASK = 'UPDATE_TASK'

export const SET_THEME = 'SET_THEME'

export const ADD_CUSTOM_CATEGORY = 'ADD_CUSTOM_CATEGORY'
export const DELETE_CUSTOM_CATEGORY = 'DELETE_CUSTOM_CATEGORY'
export const UPDATE_CUSTOM_CATEGORY = 'UPDATE_CUSTOM_CATEGORY'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const ASYNC_CATEGORIES = 'ASYNC_CATEGORIES'
export const ASYNC_TASKS = 'ASYNC_TASKS'


export const addTask = (data: TaskModel) => {
    return {
        type: ADD_TASK,
        payload: data
    }
}

export const deleteTask = (id: string) => {
    return {
        type: DELETE_TASK,
        payload: id
    }
}

export const completeTask = (id: string) => {
    return {
        type: COMPLETE_TASK,
        payload: id
    }
}

export const fetchTasks = (data: TaskModel[]) => {
    return {
        type: FETCH_TASKS,
        payload: data
    }
}

export const updateTask = (data: TaskModel) => {
    return {
        type: UPDATE_TASK,
        payload: data
    }
}

export const setTheme = (data: string) => {
    return {
        type: SET_THEME,
        payload: data
    }
}

export const addCategory = (data: CategoryModel) => {
    return {
        type: ADD_CUSTOM_CATEGORY,
        payload: data
    }
}

export const updateCategory = (data: CategoryModel) => {
    return {
        type: UPDATE_CUSTOM_CATEGORY,
        payload: data
    }
}

export const deleteCategory = (data: string) => {
    return {
        type: DELETE_CUSTOM_CATEGORY,
        payload: data
    }
}

export const fetchCategories = (data: CategoryModel[]) => {
    return {
        type: FETCH_CATEGORIES,
        payload: data
    }
}

export const asyncCategories = (data: CategoryModel[]) => {
    return {
        type: ASYNC_CATEGORIES,
        payload: data
    }
}

export const asyncTasks = (data: TaskModel[]) => {
    return {
        type: ASYNC_TASKS,
        payload: data
    }
}