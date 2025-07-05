import 'react-native-get-random-values'
import { nanoid } from 'nanoid'

import { CategoryModel, StateModel } from "../../models"
import { getCategories, saveCategories } from "../../services/AsyncStorage"
import { Icons, showNotification } from "../../utils"
import {
    ADD_CUSTOM_CATEGORY, addCategory, ASYNC_CATEGORIES, asyncCategories, DELETE_CUSTOM_CATEGORY,
    deleteCategory, FETCH_CATEGORIES, fetchCategories, UPDATE_CUSTOM_CATEGORY,
    updateCategory
} from "../actions"
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'


const initialState: CategoryModel[] = []

const CategoriesReducer = (state: CategoryModel[] = initialState, actions: any) => {
    switch (actions.type) {
        case FETCH_CATEGORIES:
            case ASYNC_CATEGORIES:
            return [
                ...actions.payload
            ]
        case ADD_CUSTOM_CATEGORY:
            return [...state, actions.payload]
        case DELETE_CUSTOM_CATEGORY:
            return [...state].filter(item => item.id !== actions.payload)
        case UPDATE_CUSTOM_CATEGORY:
            return [...state].map(cate => {
                if (cate.id == actions.payload.id) {
                    return actions.payload
                }
                return cate
            })
    }
    return state
}

export default CategoriesReducer

export const fetchSomeCategory = (dispatch: any) => {
    getCategories().then((categories: CategoryModel[]) => {
        dispatch(fetchCategories(categories))
    })
}

export const saveNewCategory = (data: CategoryModel, t: TFunction) => async (dispatch: any, getState: any) => {
    try {
        const state = getState()
        const id = nanoid()
        const category = { ...data, id: id }

        await saveCategories([...state.categories, category])

        showNotification(t('addCategorySuccess'), Icons.success)

        dispatch(addCategory(category))
    } catch (error) {
        console.log("🚀 ~ saveNewCategory ~ error:", error)
    }
}

export const deleteCategoryHandle = (id: string, t: TFunction) => async (dispatch: any, getState: any) => {
    try {
        const state = getState()
        const categories = [...state.categories].filter(item => item.id != id)
        await saveCategories(categories)

        showNotification(t('deleteSuccess'), Icons.success)

        dispatch(deleteCategory(id))
    } catch (error) {
        console.log("🚀 ~ deleteCategoryHandle ~ error:", error)
    }
}

export const updateCategoryHandle = (data: CategoryModel, t: TFunction) => async (dispatch: any, getState: any) => {
    try {
        const state = getState()
        const categories = [...state.categories].map(cate => {
            if (cate.id == data.id) {
                return data
            }
            return cate
        })
        await saveCategories(categories)

        dispatch(updateCategory(data))
        showNotification(t('updateSuccess'), Icons.success)
    } catch (error) {
        console.log("🚀 ~ updateCategoryHandle ~ error:", error)
    }
}

export const asyncCategoriesHandle = (data: CategoryModel[]) => async (dispatch: any, getState: any) => {
    try {
        const state = getState()
        const categories: CategoryModel[] = [...state.categories].concat([...data])
        const uniqueCategories = [...new Map(categories.map(item => [item.id, item])).values()]
        await saveCategories(uniqueCategories)

        dispatch(asyncCategories(uniqueCategories))
    } catch (error) {
        console.log("🚀 ~ asyncCategories ~ error:", error)
    }
}