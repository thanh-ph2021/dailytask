import { Platform, TouchableOpacity } from "react-native"
import Svg from "react-native-svg"
import RNFS from 'react-native-fs'
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { format, isSameDay, subDays } from "date-fns"
import { Moment } from "moment"
import moment from "moment"
import Toast from 'react-native-toast-message'

import { Colors } from "../constants"
import { CategoryModel, TaskModel } from "../models"
import { saveLastSyncTime } from "../services/AsyncStorage"
import { GoogleDrive } from "../apis/GoogleDrive"
export { default as Icons } from './Icons'

export const showNotification = (title: string, Icon: () => React.ReactElement, duration?: number, textColor?: string, backgroundColor?: string) => {
    Toast.show({
        type: 'default',
        visibilityTime: duration ?? 3000,
        props: {
            title: title,
            Icon: Icon,
            textColor,
            backgroundColor
        },
    })
}

export function addDaysToDate(currentDate: Date, daysToAdd: number) {

    const futureDate = new Date(currentDate)
    futureDate.setDate(futureDate.getDate() + daysToAdd)

    return futureDate
}

export const dateString = (date: Date) => {
    return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear()
}

export const getDayOfWeek = (date: Date) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    return days[date.getDay()]
}

export const checkDayOrNight = () => {
    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 20

    return isDayTime
}

export const ChartClick = Platform.OS === 'android' ? Svg : TouchableOpacity

export type BackupDataModel = {
    categories: CategoryModel[],
    tasks: TaskModel[],
    lastSyncTime: string
}

export const saveDataToFile = async (data: BackupDataModel) => {
    const path = `${RNFS.DocumentDirectoryPath}/d-task-data.json`
    const jsonData = JSON.stringify(data, null, 2)

    try {
        await RNFS.writeFile(path, jsonData, "utf8")
        console.log("File saved at:", path)
        return path
    } catch (error) {
        console.error("Error saving file:", error)
    }
}

export const handleAsyncData = async (data: BackupDataModel) => {
    const date = new Date().toISOString()
    const filePath = await saveDataToFile(data)
    const token = await GoogleSignin.getTokens()
    if (filePath && token) {
        await GoogleDrive.uploadToDrive(token.accessToken, filePath)
        await saveLastSyncTime(date)
    }
}

export const formatActualTime = (seconds: number): string => {
    if (seconds === 0) return '0'
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    let result = ''
    if (hrs > 0) result += `${hrs}h `
    if (mins > 0) result += `${mins}m `
    if ((secs > 0 || result === '') && hrs == 0) result += `${secs}s`

    return result.trim()
}

export const isToday = (dateStr: string) => {
    const today = new Date()
    const date = new Date(dateStr)
    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    )
}

export const isThisWeek = (dateStr: string) => {
    const now = new Date()
    const inputDate = new Date(dateStr)

    const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - dayOfWeek + 1)
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(now)
    endOfWeek.setHours(23, 59, 59, 999)

    return inputDate >= startOfWeek && inputDate <= endOfWeek
}

export const isThisMonth = (dateStr: string) => {
    const now = new Date()
    const inputDate = new Date(dateStr)
    return (
        inputDate.getFullYear() === now.getFullYear() &&
        inputDate.getMonth() === now.getMonth()
    )
}

type CellData = { items: { count: number, color: string }[] }

export type HourMap = Record<number, CellData>
export type HeatmapData = Record<string, HourMap>

export const HOURS = [...Array.from({ length: 24 - 8 }, (_, i) => i + 8), ...Array.from({ length: 8 }, (_, i) => i)]

const getDateLabel = (date: Date, now: Date) => {
    if (isSameDay(date, now)) return 'today'
    if (isSameDay(date, subDays(now, 1))) return 'yesterday'
    return format(date, 'MMM dd')
}

export const transformTasksToHeatmapData = (tasks: TaskModel[]): HeatmapData => {
    const now = new Date()
    const data: HeatmapData = {}

    for (let i = 6; i >= 0; i--) {
        const date = subDays(now, i)
        const label = getDateLabel(date, now)

        data[label] = {}
    }

    tasks.forEach(task => {
        if (!task.startAt || !task.category?.color || !task.actualFocusTimeInSec) return

        const dateObj = typeof task.startAt === 'string' ? new Date(task.startAt) : task.startAt
        let label = getDateLabel(dateObj, now)

        const hour = dateObj.getHours()
        const roundedHour = Math.floor(hour / 2) * 2

        // Tính số session (mỗi 25 phút = 1500 giây)
        const SESSION_LENGTH = 1500 // 25 phút
        const sessionCount = Math.floor(task.actualFocusTimeInSec / SESSION_LENGTH)
        if (sessionCount < 1) return // bỏ qua nếu chưa đủ 1 session

        if (!data[label]) data[label] = {}
        if (!data[label][roundedHour]) {
            data[label][roundedHour] = {
                items: [{ count: sessionCount, color: task.category.color }]
            }
        } else {
            const items = data[label][roundedHour].items

            // Tìm xem đã có cùng màu chưa
            const existing = items.find(i => i.color === task.category!.color)

            if (existing) {
                existing.count += sessionCount
            } else {
                items.push({ count: sessionCount, color: task.category.color })
            }
        }
    })

    return data
}

export type FocusDayData = {
    label: string
    durationInSec: number
    color: string
}
export type WeeklyData = Record<string, FocusDayData[]>

export const groupTasksByDay = (tasks: TaskModel[], startOfWeek: Moment, endOfWeek: Moment): WeeklyData => {
    const grouped: WeeklyData = {}

    for (let i = 0; i < 7; i++) {
        const day = startOfWeek.clone().add(i, 'days').format('dddd').toLowerCase()
        grouped[day] = []
    }

    tasks.forEach(task => {
        const taskDate = moment(task.startAt)
        if (taskDate.isBetween(startOfWeek, endOfWeek, 'day', '[]')) {
            const dayKey = taskDate.format('dddd').toLowerCase()
            const isToday = moment().isSame(taskDate, 'day')

            grouped[dayKey].push({
                label: task.title,
                durationInSec: task.actualFocusTimeInSec ?? 0,
                color: isToday ? Colors.accent : Colors.primary
            })
        }
    })

    return grouped
}

export function formatHourMinute24h(isoString: string): string {
    const date = new Date(isoString)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}
