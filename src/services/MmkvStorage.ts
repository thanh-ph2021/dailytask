import { MMKV } from "react-native-mmkv"

export const storage = new MMKV()

export const STORAGE_KEYS = {
    POMODORO_TIMER_MODE: 'POMODORO_TIMER_MODE',
    POMODORO_START_TIME: 'POMODORO_START_TIME',
    POMODORO_END_TIME: 'POMODORO_END_TIME',
}

export const savePomodoroTimerMode = (mode: 'countdown' | 'countup') => {
    storage.set(STORAGE_KEYS.POMODORO_TIMER_MODE, mode)
}

export const getPomodoroTimerMode = (): 'countdown' | 'countup' => {
    const value = storage.getString(STORAGE_KEYS.POMODORO_TIMER_MODE)
    return value === 'countup' ? 'countup' : 'countdown'
}

export const savePomodoroStartTime = (time: string) => {
    storage.set(STORAGE_KEYS.POMODORO_START_TIME, time)
}

export const getPomodoroStartTime = (): string => {
    return storage.getString(STORAGE_KEYS.POMODORO_START_TIME) || '0'
}

export const savePomodoroEndTime = (time: string) => {
    storage.set(STORAGE_KEYS.POMODORO_END_TIME, time)
}

export const getPomodoroEndTime = (): string => {
    return storage.getString(STORAGE_KEYS.POMODORO_END_TIME) || '0'
}

export const clearPomodoroTimes = () => {
    storage.delete(STORAGE_KEYS.POMODORO_START_TIME)
    storage.delete(STORAGE_KEYS.POMODORO_END_TIME)
}