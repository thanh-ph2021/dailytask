import React, { useMemo, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { useSelector } from 'react-redux'

import { makeSelectCompletedTasks, makeSelectPendingTasks, selectCategories } from '../../redux/selectors'
import { StateModel } from '../../models'
import { AlertModal, Container, Header, SelectModalv2 } from '../../components'
import { Icons } from '../../utils'
import { Sizes } from '../../contants'
import OverviewHeaderInfo from './OverviewHeaderInfo'
import WeeklyBarChart from './WeeklyBarChart'
import CategoryPieChart from './CategoryPieChart'
import { useTheme } from '../../hooks'

const DATA_OPTIONS = ['in7Days', 'in30Days', 'all']

const OverviewScreen = () => {
    const { colors } = useTheme()
    const { t } = useTranslation()
    const completedTasks = useSelector(makeSelectCompletedTasks())
    const pendingTasks = useSelector(makeSelectPendingTasks())
    const categories = useSelector((state: StateModel) => selectCategories(state))

    const [visibleAlert, setVisibleAlert] = useState(false)
    const [visibleSelect, setVisibleSelect] = useState(false)
    const [selectedOption, setSelectedOption] = useState<(typeof DATA_OPTIONS)[number]>('in7Days')
    const [startOfWeek, setStartOfWeek] = useState(moment().startOf('isoWeek'))

    const endOfWeek = useMemo(() => startOfWeek.clone().endOf('isoWeek'), [startOfWeek])

    const weeklyTasks = useMemo(() => {
        return completedTasks.filter(task =>
            moment(task.dateTime).isBetween(startOfWeek, endOfWeek, 'day', '[]')
        )
    }, [completedTasks, startOfWeek, endOfWeek])

    const filteredPendingTasks = useMemo(() => {
        const now = moment()
        return pendingTasks.filter(task => {
            const taskTime = moment(task.dateTime)
            if (selectedOption === 'in7Days') return taskTime.isBetween(now.clone().subtract(7, 'days'), now, undefined, '[]')
            if (selectedOption === 'in30Days') return taskTime.isBetween(now.clone().subtract(30, 'days'), now, undefined, '[]')
            return true
        })
    }, [pendingTasks, selectedOption])

    const pendingDataByCategory = useMemo(() => {
        const categoryData: Record<string, { x: string; y: number; color: string; icon: any }> = categories.reduce((acc, category) => {
            acc[category.id] = { x: category.text, y: 0, color: category.color, icon: category.icon }
            return acc
        }, {} as Record<string, { x: string; y: number; color: string; icon: any }>)

        filteredPendingTasks.forEach((task) => {
            if (categoryData[task.categoryId!]) {
                categoryData[task.categoryId!].y += 1
            }
        })

        return Object.values(categoryData).filter((item) => item.y > 0)
    }, [filteredPendingTasks, categories])

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header
                    title={t('overview').toUpperCase()}
                    textStyle={{ textAlign: 'center' }}
                    headerRight={
                        <TouchableOpacity onPress={() => { }}>
                            <Icons.setting color={colors.text} size={Sizes.xl} />
                        </TouchableOpacity>
                    }
                />

                <OverviewHeaderInfo
                    completedCount={completedTasks.length}
                    pendingCount={pendingTasks.length}
                    onPressInfo={() => setVisibleAlert(true)}
                    t={t}
                    colors={colors}
                />

                <WeeklyBarChart
                    t={t}
                    colors={colors}
                    startOfWeek={startOfWeek}
                    endOfWeek={endOfWeek}
                    weeklyTasks={weeklyTasks}
                    onPrevWeek={() => setStartOfWeek(prev => prev.clone().subtract(7, 'days'))}
                    onNextWeek={() => setStartOfWeek(prev => prev.clone().add(7, 'days'))}
                />

                <CategoryPieChart
                    t={t}
                    colors={colors}
                    selectedOption={selectedOption}
                    onPressSelectOption={() => setVisibleSelect(true)}
                    pendingDataByCategory={pendingDataByCategory}
                />

                <AlertModal
                    type="info"
                    description={t('allTasksDone')}
                    visible={visibleAlert}
                    onClose={() => setVisibleAlert(false)}
                />

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

export default OverviewScreen
