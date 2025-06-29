import { createSelector } from "reselect"
import { subDays, isWithinInterval, parseISO } from "date-fns"

import { StateModel } from "../models/StateModel"
import { TaskModel } from "../models/TaskModel"
import { CategoryModel } from "../models"
import { isThisMonth, isThisWeek, isToday } from "../utils"

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

export const makeSelectPendingTasksFilter = (date: Date) => {
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
                    return taskDate.getTime() === selectedDate.getTime() && !task.completed
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

export const selectTotalFocusTimeToday = createSelector(
  (state: StateModel) => state.tasks,
  (tasks: TaskModel[]) => {
    return tasks
      .filter(task => task.actualFocusTimeInSec && isToday(task.dateTime.toString()))
      .reduce((sum, task) => sum + (task.actualFocusTimeInSec || 0), 0)
  }
)

export const selectTotalFocusTimeThisWeek = createSelector(
  (state: StateModel) => state.tasks,
  (tasks: TaskModel[]) => {
    return tasks
      .filter(task => task.actualFocusTimeInSec && isThisWeek(task.dateTime.toString()))
      .reduce((sum, task) => sum + (task.actualFocusTimeInSec || 0), 0)
  }
)

export const selectTotalFocusTimeThisMonth = createSelector(
  (state: StateModel) => state.tasks,
  (tasks: TaskModel[]) => {
    return tasks
      .filter(task => task.actualFocusTimeInSec && isThisMonth(task.dateTime.toString()))
      .reduce((sum, task) => sum + (task.actualFocusTimeInSec || 0), 0)
  }
)

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export const selectPomodoroStreak = createSelector(
  (state: StateModel) => state.tasks,
  (tasks: TaskModel[]) => {
    const daysWithPomodoro = new Set<string>()

    // Bước 1: gom các ngày có task > 0s
    tasks.forEach(task => {
      if (task.actualFocusTimeInSec && task.actualFocusTimeInSec > 0) {
        const dateStr = formatDate(new Date(task.dateTime))
        daysWithPomodoro.add(dateStr)
      }
    })

    // Bước 2: tính streak từ hôm nay về trước
    let streak = 0
    const today = new Date()

    for (let i = 0; ; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(today.getDate() - i)
      const dateStr = formatDate(checkDate)

      if (daysWithPomodoro.has(dateStr)) {
        streak++
      } else {
        break
      }
    }

    return streak
  }
)

export const makeSelectCompletedTasksLast7Days = () => {
  return createSelector(
    (state: StateModel) => state.tasks,
    (state: StateModel) => state.categories,
    (tasks: TaskModel[], categories: CategoryModel[]) => {
      const now = new Date()
      const from = subDays(now, 6)

      return tasks
        .filter(task => {
          if (!task.completed) return false
          if (!task.startAt) return false

          const date = typeof task.startAt === 'string'
            ? parseISO(task.startAt)
            : new Date(task.startAt)

          return isWithinInterval(date, { start: from, end: now })
        })
        .map(task => ({
          ...task,
          category: categories.find(cat => cat.id === task.categoryId),
        }))
    }
  )
}

export const makeSelectCompletedPomodoroTasks = () => {
    return createSelector(
        (state: StateModel) => state.tasks,
        (tasks: TaskModel[]) => {
          
            return tasks.filter(task => {
              if (!task.actualFocusTimeInSec) return false
              if (!task.completed) return false

              return task
            })
        }
    )
}