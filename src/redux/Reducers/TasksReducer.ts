import PushNotification from "react-native-push-notification"
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'

import { TaskModel } from "../../models/TaskModel"
import { addTaskStorage, getTaskStorage } from "../../services/AsyncStorage"
import { ADD_TASK, DELETE_TASK, COMPLETE_TASK, FETCH_TASKS, addTask, fetchTasks, UPDATE_TASK, updateTask, deleteTask, completeTask, ASYNC_TASKS, asyncTasks, COMPLETE_TASK_POMODORO, completeTaskPomodoro } from "../actions"
import { Colors } from "../../contants"
import { Icons, showNotification } from "../../utils"

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


export const saveNewTask = (data: TaskModel) => async (dispatch: any, getState: any) => {
    try {
        const state = getState()
        const id = nanoid()
        const task = { ...data, id: id }

        if (data.isAlert) {
            PushNotification.localNotificationSchedule({
                date: data.dateTime,

                title: data.title,
                message: data.description,

                channelId: 'alert-channel-id-test',
                autoCancel: true,
                largeIcon: '',
                color: Colors.primary,
                showWhen: true,
                when: data.dateTime.getTime(),
                id: id.toString(),
                // userInfo: {title: 'abc'},
                allowWhileIdle: true
            })
        }
        await addTaskStorage([...state.tasks, task])

        showNotification('Add new task done!', Icons.success)

        dispatch(addTask(task))
    } catch (error) {
        console.log("🚀 ~ saveNewTask ~ error:", error)
    }
}

export const updateTaskHandle = (data: TaskModel) => async (dispatch: any, getState: any) => {
    try {
        PushNotification.cancelLocalNotification(data.id!.toString())
        if (data.isAlert) {
            PushNotification.localNotificationSchedule({
                date: data.dateTime,

                title: data.title,
                message: data.description,

                channelId: 'alert-channel-id-test',
                autoCancel: true,
                largeIcon: '',
                color: Colors.primary,
                showWhen: true,
                when: data.dateTime.getTime(),
                id: data.id!.toString(),
                // userInfo: {title: 'abc'},
                allowWhileIdle: true
            })
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
        showNotification('Update done!', Icons.success)
    } catch (error) {
        console.log("🚀 ~ saveNewTask ~ error:", error)
    }
}

export const deleteTaskHandle = (id: string) => async (dispatch: any, getState: any) => {
    try {
        PushNotification.cancelLocalNotification(id.toString())
        const state = getState()
        const tasks = [...state.tasks].filter(item => item.id != id)
        await addTaskStorage(tasks)

        dispatch(deleteTask(id))

        showNotification('Delete done!', Icons.success)
    } catch (error) {
        console.log("🚀 ~ saveNewTask ~ error:", error)
    }
}

export const completeTaskHandle = (id: string) => async (dispatch: any, getState: any) => {
    try {
        PushNotification.cancelLocalNotification(id.toString())
        const state = getState()

        const tasks = [...state.tasks].map(task => {
            if (task.id == id) {
                if (task.isAlert && task.completed && task.dateTime.getTime() > new Date().getTime()) {
                    PushNotification.localNotificationSchedule({
                        date: task.dateTime,

                        title: task.title,
                        message: task.description,

                        channelId: 'alert-channel-id-test',
                        autoCancel: true,
                        largeIcon: '',
                        color: Colors.primary,
                        showWhen: true,
                        when: task.dateTime.getTime(),
                        id: task.id!.toString(),
                        // userInfo: {title: 'abc'},
                        allowWhileIdle: true
                    })
                }
                return {
                    ...task,
                    completed: !task.completed,
                }
            }

            return task
        })
        await addTaskStorage(tasks)

        dispatch(completeTask(id))
    } catch (error) {
        console.log("🚀 ~ saveNewTask ~ error:", error)
    }
}

export const completeTaskPomodoroHandle = (selectedTask: TaskModel) => async (dispatch: any, getState: any) => {
    try {
        PushNotification.cancelLocalNotification(selectedTask.id!.toString())
        const state = getState()

        const tasks = [...state.tasks].map(task => {
            if (task.id == selectedTask.id!) {
                return {
                    ...task,
                    completed: true,
                    actualFocusTimeInSec: selectedTask.actualFocusTimeInSec,
                }
            }

            return task
        })
        await addTaskStorage(tasks)

        dispatch(completeTaskPomodoro(selectedTask))
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