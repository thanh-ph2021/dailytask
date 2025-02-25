import AsyncStorage from "@react-native-async-storage/async-storage"
import { TaskModel } from "../models/TaskModel"
import DefaultCategories, { NUMBER_DEFAULT_CATEGORIES } from "../data/DefaultCategories"
import { CategoryModel } from "../models"

const addTaskStorage = async (tasks: TaskModel[]) => {
    try {
        await AsyncStorage.setItem('Tasks', JSON.stringify(tasks))
    } catch (error) {
        console.log("🚀 ~ AddTask ~ error:", error)
    }
}

const getTaskStorage = async () => {
    try {
        const tasks = await AsyncStorage.getItem('Tasks')
        if (tasks) {
            return JSON.parse(tasks)
        }
    } catch (error) {
        console.log("🚀 ~ AddTask ~ error:", error)
    }

    return []
}

const saveAppLanguage = async (language: string) => {
    await AsyncStorage.setItem('appLanguage', language)
}

const getAppLanguage = async () => {
    const language = await AsyncStorage.getItem('appLanguage')
    return language
}

const saveAppTheme = async (theme: string) => {
    await AsyncStorage.setItem('appTheme', theme)
}

const getAppTheme = async () => {
    const theme = await AsyncStorage.getItem('appTheme')
    return theme
}

const getCategories = async () => {
    try {
        const categories = await AsyncStorage.getItem('Categories')
        if (categories) {
            const data = JSON.parse(categories).length >= NUMBER_DEFAULT_CATEGORIES
            if (data) {
                return JSON.parse(categories)
            }
        }
    } catch (error) {
        console.log("🚀 ~ getCategories ~ error:", error)
    }

    await saveCategories(DefaultCategories)
    return DefaultCategories
}

const saveCategories = async (categories: CategoryModel[]) => {
    try {
        await AsyncStorage.setItem('Categories', JSON.stringify(categories))
    } catch (error) {
        console.log("🚀 ~ saveCategories ~ error:", error)
    }
}

const saveLastSyncTime = async (date: string) => {
    try {
        await AsyncStorage.setItem('LastSyncTime', date.toString())
    } catch (error) {
        console.log("🚀 ~ saveLastSyncTime ~ error:", error)
    }
}

const getLastSyncTime = async () => {
    try {
        return await AsyncStorage.getItem('LastSyncTime')
    } catch (error) {
        console.log("🚀 ~ getLastSyncTime ~ error:", error)
    }
}

const removeLastSyncTime = async () => {
    try {
        await AsyncStorage.removeItem('LastSyncTime')
    } catch (error) {
        console.log("🚀 ~ removeLastSyncTime ~ error:", error)
    }
}

const saveAutoBackup = async (data: boolean) => {
    try {
        await AsyncStorage.setItem('AutoBackup', JSON.stringify(data))
    } catch (error) {
        console.log("🚀 ~ saveAutoBackup ~ error:", error)
    }
}

const getAutoBackup = async () => {
    try {
        const value = await AsyncStorage.getItem('AutoBackup')
        return value ? JSON.parse(value) : false
    } catch (error) {
        console.log("🚀 ~ getAutoBackup ~ error:", error)
        return false
    }
}

export {
    addTaskStorage,
    getTaskStorage,
    saveAppLanguage,
    getAppLanguage,
    saveAppTheme,
    getAppTheme,
    getCategories,
    saveCategories,
    getLastSyncTime,
    saveLastSyncTime,
    removeLastSyncTime,
    saveAutoBackup,
    getAutoBackup
}