import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import moment from "moment"

import { TaskModel } from "../../models/TaskModel"
import { addTaskStorage, getTaskStorage } from "../../services/AsyncStorage"
import { ADD_TASK, DELETE_TASK, COMPLETE_TASK, FETCH_TASKS, addTask, fetchTasks, UPDATE_TASK, updateTask, deleteTask, completeTask, ASYNC_TASKS, asyncTasks, COMPLETE_TASK_POMODORO, completeTaskPomodoro } from "../actions"
import { Icons, showNotification } from "../../utils"
import { cancelNotification, scheduleNotification } from '../../services/NotificationService'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

const initialState: TaskModel[] = []

const TasksReducer = (state: TaskModel[] = initialState, actions: any) => {
    let newState = [...state]
    switch (actions.type) {
        case ADD_TASK:
            newState = [
                ...state,
                actions.payload,
            ]
            break

        case DELETE_TASK:
            newState = [...state].filter(item => item.id != actions.payload)
            break

        case COMPLETE_TASK:
            newState = [...state].map(task => {
                if (task.id == actions.payload) {
                    return {
                        ...task,
                        completed: !task.completed,
                    }
                }

                return task
            })
            break

        case COMPLETE_TASK_POMODORO:
            newState = [...state].map(task => {
                if (task.id == actions.payload.id) {
                    return {
                        ...task,
                        completed: true,
                        actualFocusTimeInSec: actions.payload.actualFocusTimeInSec,
                        startAt: actions.payload.startAt,
                    }
                }

                return task
            })
            break

        case FETCH_TASKS:
        case ASYNC_TASKS:
            newState = actions.payload
            break

        case UPDATE_TASK:
            const valueUpdate = actions.payload
            newState = [...state].map(task => {

                if (task.id == valueUpdate.id) {
                    return valueUpdate
                }

                return task
            })
            break
    }

    return newState
}



export default TasksReducer


export const saveNewTask = (data: TaskModel, t: TFunction) => async (dispatch: any, getState: any) => {
    try {
        const state = getState()
        const id = nanoid()
        const task = { ...data, id: id }

        if (data.isAlert) {
            scheduleNotification({
                id: id,
                title: t('timeToWork'),
                body: `${data.title}\n${data.description}`,
                date: data.dateTime,
            })
        }
        await addTaskStorage([...state.tasks, task])

        showNotification(t('addTaskSuccess'), Icons.success)

        await dispatch(addTask(task))
    } catch (error) {
        console.log("🚀 ~ saveNewTask ~ error:", error)
    }
}

export const updateTaskHandle = (data: TaskModel, t: TFunction) => async (dispatch: any, getState: any) => {
    try {
        if (data.isAlert && !data.completed) {
            scheduleNotification({
                id: data.id!,
                title: t('timeToWork'),
                body: `${data.title}\n${data.description}`,
                date: data.dateTime,
            })
        } else {
            cancelNotification(data.id!.toString())
        }
        const state = getState()
        const tasks = [...state.tasks].map(task => {
            if (task.id == data.id) {
                return data
            }
            return task
        })
        await addTaskStorage(tasks)

        dispatch(updateTask(data))
        showNotification(t('updateSuccess'), Icons.success)
    } catch (error) {
        console.log("🚀 ~ saveNewTask ~ error:", error)
    }
}

export const deleteTaskHandle = (id: string, t: TFunction) => async (dispatch: any, getState: any) => {
    try {
        cancelNotification(id.toString())
        const state = getState()
        const tasks = [...state.tasks].filter(item => item.id != id)
        await addTaskStorage(tasks)

        dispatch(deleteTask(id))

        showNotification(t('deleteSuccess'), Icons.success)
    } catch (error) {
        console.log("🚀 ~ saveNewTask ~ error:", error)
    }
}

export const completeTaskHandle = (id: string, t: TFunction) => async (dispatch: any, getState: any) => {
    try {
        const state = getState()
        const tasks = [...state.tasks]

        let newRepeatTask = null

        const updatedTasks = tasks.map((task) => {
            if (task.id !== id) return task

            const isCompleted = !task.completed
            const dateTime = new Date(task.dateTime)

            // Nếu toggle sang completed và có repeat
            if (isCompleted && task.repeat && task.repeat !== 'none') {
                const repeatMap: Record<string, number> = {
                    daily: 1,
                    weekly: 7,
                    monthly: 30,
                }

                const nextDate = moment(dateTime).add(repeatMap[task.repeat], 'days').toDate()

                newRepeatTask = {
                    ...task,
                    id: nanoid(),
                    completed: false,
                    dateTime: nextDate,
                }

                // Tạo thông báo nếu cần
                if (newRepeatTask.isAlert) {
                    scheduleNotification({
                        id: newRepeatTask.id.toString(),
                        title: t('timeToWork'),
                        body: `${newRepeatTask.title}\n${newRepeatTask.description}`,
                        date: newRepeatTask.dateTime,
                    })
                }
            }

            // Nếu task ban đầu có thông báo và đang chuyển sang completed → lập lại thông báo
            if (task.isAlert && !isCompleted && dateTime > new Date()) {
                scheduleNotification({
                    id: task.id.toString(),
                    title: t('timeToWork'),
                    body: `${task.title}\n${task.description}`,
                    date: dateTime,
                })
            } else {
                cancelNotification(id.toString())
            }

            return {
                ...task,
                completed: isCompleted,
            }
        })

        await addTaskStorage(updatedTasks)

        dispatch(completeTask(id))

        if (newRepeatTask) {
            dispatch(addTask(newRepeatTask))
        }

    } catch (error) {
        console.log("🚀 ~ completeTaskHandle error:", error)
    }
}

export const completeTaskPomodoroHandle = (selectedTask: TaskModel, t: TFunction) => async (dispatch: any, getState: any) => {
    try {
        const state = getState()

        let newRepeatTask = null

        const tasks = [...state.tasks].map(task => {
            if (task.id !== selectedTask.id!) return task

            const isCompleted = !task.completed
            const dateTime = new Date(task.dateTime)

            if (isCompleted && task.repeat && task.repeat !== 'none') {
                const repeatMap: Record<string, number> = {
                    daily: 1,
                    weekly: 7,
                    monthly: 30,
                }

                const nextDate = moment(dateTime).add(repeatMap[task.repeat], 'days').toDate()

                newRepeatTask = {
                    ...task,
                    id: nanoid(),
                    completed: false,
                    dateTime: nextDate,
                }

                if (newRepeatTask.isAlert) {
                    scheduleNotification({
                        id: newRepeatTask.id.toString(),
                        title: t('timeToWork'),
                        body: `${newRepeatTask.title}\n${newRepeatTask.description}`,
                        date: nextDate,
                    })
                } else {
                    cancelNotification(selectedTask.id!.toString())
                }
            }

            return {
                ...task,
                completed: true,
                actualFocusTimeInSec: selectedTask.actualFocusTimeInSec,
                startAt: selectedTask.startAt
            }
        })
        await addTaskStorage(tasks)

        dispatch(completeTaskPomodoro(selectedTask))

        if (newRepeatTask) {
            dispatch(addTask(newRepeatTask))
        }
    } catch (error) {
        console.log("🚀 ~ saveNewTask ~ error:", error)
    }
}

export const fetchSomeTask = (dispatch: any) => {
    getTaskStorage().then((tasks: TaskModel[]) => {
        dispatch(fetchTasks(tasks.map(task => {
            return {
                ...task,
                dateTime: new Date(task.dateTime)
            }
        })))
    })
}

export const asyncTasksHandle = (data: TaskModel[]) => async (dispatch: any, getState: any) => {
    try {
        const formattedData = data.map(task => ({
            ...task,
            dateTime: new Date(task.dateTime)
        }))
        const state = getState()
        const tasks: TaskModel[] = [...state.tasks].concat([...formattedData])
        const uniqueTasks = [...new Map(tasks.map(item => [item.id, item])).values()]
        await addTaskStorage(uniqueTasks)

        dispatch(asyncTasks(uniqueTasks))
    } catch (error) {
        console.log("🚀 ~ asyncTasks ~ error:", error)
    }
}