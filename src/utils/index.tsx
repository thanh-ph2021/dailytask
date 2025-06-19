import { Platform, Text, TouchableOpacity, View } from "react-native"
import { Notifier } from "react-native-notifier"
import Svg from "react-native-svg"
import RNFS from 'react-native-fs'
import { GoogleSignin } from "@react-native-google-signin/google-signin"

import { Colors, Sizes, Fonts } from "../contants"
import { CategoryModel, TaskModel } from "../models"
import { saveLastSyncTime } from "../services/AsyncStorage"
import { GoogleDrive } from "../apis/GoogleDrive"


export { default as Icons } from './Icons'

export const showNotification = (title: string, Icon: () => React.ReactElement) => {
    Notifier.showNotification({
        duration: 2000,
        title: title,
        Component: (props) => {
            return (
                <View style={{ flexDirection: 'row', backgroundColor: Colors.white, padding: Sizes.s, marginHorizontal: Sizes.s, marginVertical: Sizes.xxl, borderRadius: Sizes.s, elevation: 5 }}>
                    <Icon />
                    <Text style={{ ...Fonts.body3, color: Colors.black, paddingLeft: Sizes.l }}>{props.title}</Text>
                </View>
            )
        }
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