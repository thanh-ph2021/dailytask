import { ScrollView, View } from "react-native"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useMemo, useState } from "react"
import moment from "moment"

import { Container, SelectModalv2 } from "../../../components"
import DataCard from "../DataCard"
import { Sizes } from "../../../contants"
import { styles } from "../style"
import { makeSelectCompletedPomodoroTasks, makeSelectCompletedTasksLast7Days, selectCategories, selectPomodoroStreak, selectTotalFocusTimeThisMonth, selectTotalFocusTimeThisWeek, selectTotalFocusTimeToday } from "../../../redux/selectors"
import { formatActualTime, groupTasksByDay, transformTasksToHeatmapData } from "../../../utils"
import PomodoroHeatmap from "../PomodoroHeatmap"
import WeeklyFocusChart from "../WeeklyFocusChart"
import { useTheme } from "../../../hooks"
import FocusCategoryChart from "../FocusCategoryChart"
import { StateModel } from "../../../models"

const DATA_OPTIONS = ['thisWeek', 'thisMonth', 'thisYear']

const OverviewPomodoro = () => {
    const { colors } = useTheme()
    const { t } = useTranslation()
    const totalFocusTimeToday = useSelector(selectTotalFocusTimeToday)
    const totalFocusTimeThisWeek = useSelector(selectTotalFocusTimeThisWeek)
    const totalFocusTimeThisMonth = useSelector(selectTotalFocusTimeThisMonth)
    const steakOfDays = useSelector(selectPomodoroStreak)

    const completedTasksLast7Days = useSelector(makeSelectCompletedTasksLast7Days())
    const heatmapData = transformTasksToHeatmapData(completedTasksLast7Days)

    const [startOfWeek, setStartOfWeek] = useState(moment().startOf('isoWeek'))
    const endOfWeek = useMemo(() => startOfWeek.clone().endOf('isoWeek'), [startOfWeek])
    const completedPomodoroTasks = useSelector(makeSelectCompletedPomodoroTasks())
    const data = useMemo(() => {
        return completedPomodoroTasks.filter(task =>
            moment(task.dateTime).isBetween(startOfWeek, endOfWeek, 'day', '[]')
        )
    }, [completedPomodoroTasks, startOfWeek, endOfWeek])
    const weekData = groupTasksByDay(data, startOfWeek, endOfWeek)

    const [visibleSelect, setVisibleSelect] = useState(false)
    const [selectedOption, setSelectedOption] = useState<(typeof DATA_OPTIONS)[number]>('thisWeek')
    const categories = useSelector((state: StateModel) => selectCategories(state))
    const filteredCompletedPomodoroTasks = useMemo(() => {
        const data = [...completedPomodoroTasks]

        return data.filter(task => {
            const taskTime = moment(task.dateTime)
            if (selectedOption === 'thisWeek') {
                return taskTime.isBetween(moment().startOf('isoWeek'), moment().endOf('isoWeek'), undefined, '[]')
            }
            if (selectedOption === 'thisMonth') {
                return taskTime.isBetween(moment().startOf('month'), moment().endOf('month'), undefined, '[]')
            }
            if (selectedOption === 'thisYear') {
                return taskTime.isBetween(moment().startOf('year'), moment().endOf('year'), undefined, '[]')
            }
            return true
        })
    }, [completedPomodoroTasks, selectedOption])

    const completedPomodoroDataByCategory = useMemo(() => {
        const categoryData: Record<string, { x: string; y: number; color: string; icon: any }> = categories.reduce((acc, category) => {
            acc[category.id] = { x: category.text, y: 0, color: category.color, icon: category.icon }
            return acc
        }, {} as Record<string, { x: string; y: number; color: string; icon: any }>)

        filteredCompletedPomodoroTasks.forEach((task) => {
            if (categoryData[task.categoryId!]) {
                categoryData[task.categoryId!].y += task.actualFocusTimeInSec ?? 0
            }
        })

        return Object.values(categoryData).filter((item) => item.y > 0)
    }, [filteredCompletedPomodoroTasks, categories])

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: Sizes.padding, paddingBottom: Sizes.padding }}>
                    <View style={styles.row}>
                        <DataCard value={formatActualTime(totalFocusTimeToday)} label={t('focusTimeToday')} />
                        <DataCard value={formatActualTime(totalFocusTimeThisWeek)} label={t('focusTimeThisWeek')} />
                    </View>
                    <View style={styles.row}>
                        <DataCard value={steakOfDays.toString()} label={t('streakOfDays')} colorValue="#FF981F" />
                        <DataCard value={formatActualTime(totalFocusTimeThisMonth)} label={t('focusTimeThisMonth')} />
                    </View>
                </View>

                <WeeklyFocusChart
                    data={weekData}
                    t={t}
                    colors={colors}
                    startOfWeek={startOfWeek}
                    endOfWeek={endOfWeek}
                    onPrevWeek={() => setStartOfWeek(prev => prev.clone().subtract(7, 'days'))}
                    onNextWeek={() => setStartOfWeek(prev => prev.clone().add(7, 'days'))}
                />

                <FocusCategoryChart
                    data={completedPomodoroDataByCategory}
                    t={t}
                    colors={colors}
                    selectedOption={selectedOption}
                    onPressSelectOption={() => setVisibleSelect(true)}
                />
                <PomodoroHeatmap data={heatmapData} t={t} />
                <SelectModalv2
                    visible={visibleSelect}
                    data={DATA_OPTIONS}
                    onSubmit={(value) => {
                        setSelectedOption(value)
                        setVisibleSelect(false)
                    }}
                />
            </ScrollView>
        </Container>
    )
}

export default OverviewPomodoro