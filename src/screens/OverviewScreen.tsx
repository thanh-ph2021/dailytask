import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { VictoryAxis, VictoryBar, VictoryChart, VictoryPie } from "victory-native"
import { useTranslation } from "react-i18next"
import { useMemo, useState } from "react"
import moment from "moment"
import { useSelector } from "react-redux"

import { Colors, Fonts, Images, Sizes } from "../contants"
import { ChartClick } from "../utils"
import { useTheme } from "../hooks"
import { makeSelectCompletedTasks, makeSelectPendingTasks, selectCategories } from "../redux/selectors"
import { StateModel } from "../models"
import { AlertModal, Container, Header, SelectModalv2, TextComponent } from "../components"

const DATA_OPTIONS = ['in7Days', 'in30Days', 'all']

const OverviewScreen = () => {

    const { colors } = useTheme()
    const [visibleAlert, setVisibleAlert] = useState<boolean>(false)
    const [visibleSelect, setVisibleSelect] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState(DATA_OPTIONS[0])
    const { t } = useTranslation()
    const completedTasks = useSelector(makeSelectCompletedTasks())
    const pendingTasks = useSelector(makeSelectPendingTasks())
    const categories = useSelector((state: StateModel) => selectCategories(state))

    const [startOfWeek, setStartOfWeek] = useState(moment().startOf("isoWeek"))
    const handlePrevWeek = () => {
        setStartOfWeek(prev => prev.clone().subtract(7, "days"))
    }
    const handleNextWeek = () => {
        setStartOfWeek(prev => prev.clone().add(7, "days"))
    }
    const endOfWeek = useMemo(() => startOfWeek.clone().endOf("isoWeek"), [startOfWeek])

    const weeklyTasks = useMemo(() => {
        return completedTasks.filter(task => {
            const taskDate = moment(task.dateTime)
            return taskDate.isBetween(startOfWeek, endOfWeek, "day", "[]")
        })
    }, [completedTasks, startOfWeek])

    const chartDataBar = useMemo(() => {
        const data = Array(7).fill(0).map((_, i) => ({
            x: i + 1,
            y: weeklyTasks.filter(task => moment(task.dateTime).isoWeekday() === i + 1).length,
        }))
        return data
    }, [weeklyTasks])

    const filteredPendingTasks = useMemo(() => {
        const now = moment()
        return pendingTasks.filter(task => {
            if (selectedOption === "in7Days") {
                return moment(task.dateTime).isBetween(now.clone().subtract(7, "days"), now, null, "[]")
            }
            if (selectedOption === "in30Days") {
                return moment(task.dateTime).isBetween(now.clone().subtract(30, "days"), now, null, "[]")
            }
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

    const renderChartBar = () => {
        return (
            <View style={{ alignItems: 'center', marginHorizontal: Sizes.padding, marginBottom: Sizes.padding, borderColor: Colors.gray, borderWidth: 1, borderRadius: Sizes.radius }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: Sizes.padding, width: '100%' }}>
                    <TextComponent text={t('completionDailyTasks')} style={{ ...Fonts.h3, width: '60%' }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <TouchableOpacity onPress={handlePrevWeek}>
                            <Image source={Images.sortLeft} style={{ width: 15, height: 15 }} />
                        </TouchableOpacity>

                        <TextComponent text={`${startOfWeek.format("DD/MM")}-${endOfWeek.format("DD/MM")}`} style={{ ...Fonts.body4 }} />
                        <TouchableOpacity onPress={handleNextWeek}>
                            <Image source={Images.sortRight} style={{ width: 15, height: 15 }} />
                        </TouchableOpacity>

                    </View>
                </View>
                <ChartClick style={{ height: Sizes.height * 0.4 }}>
                    <VictoryChart>
                        <VictoryAxis
                            tickFormat={(tick) => {
                                let text = ''
                                switch (tick) {
                                    case 1:
                                        text = 'monday'
                                        break
                                    case 2:
                                        text = 'tuesday'
                                        break
                                    case 3:
                                        text = 'wednesday'
                                        break
                                    case 4:
                                        text = 'thursday'
                                        break
                                    case 5:
                                        text = 'friday'
                                        break
                                    case 6:
                                        text = 'saturday'
                                        break
                                    case 7:
                                        text = 'sunday'
                                        break
                                }
                                return t(text).substring(0, 3)
                            }}
                            style={{
                                axis: {
                                    stroke: "transparent",
                                },
                                grid: {
                                    stroke: "transparent"
                                },
                                tickLabels: {
                                    fill: colors.textPrimary,
                                }
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            style={{
                                axis: {
                                    stroke: "transparent",
                                },
                                grid: {
                                    stroke: "transparent"
                                },
                                tickLabels: { fill: "transparent" }
                            }}
                        />

                        <VictoryBar
                            cornerRadius={{ top: 5, bottom: 5 }}
                            barWidth={7}
                            style={{
                                data: {
                                    fill: ({ datum }) =>
                                        datum.x === moment().isoWeekday() ? colors.highlight : colors.surface,
                                },
                                labels: {
                                    fill: colors.textPrimary,
                                }
                            }}
                            data={chartDataBar}
                            labels={({ datum }) => datum.y}
                        />
                    </VictoryChart>
                </ChartClick>
            </View>
        )
    }

    const renderChartPie = () => {
        return (
            <View style={{ alignItems: 'center', marginHorizontal: Sizes.padding, marginBottom: Sizes.padding, borderColor: Colors.gray, borderWidth: 1, borderRadius: Sizes.radius }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: Sizes.padding, width: '100%' }}>
                    <TextComponent text={t('pendingTasksIn')} style={{ ...Fonts.h3, width: '60%' }} />

                    <TouchableOpacity
                        style={{ backgroundColor: colors.surface, padding: Sizes.padding / 2, borderRadius: Sizes.radius }}
                        onPress={() => setVisibleSelect(true)}
                    >
                        <TextComponent text={t(selectedOption)} style={{ ...Fonts.h3 }} />
                    </TouchableOpacity>

                </View>
                <ChartClick style={{ height: Sizes.height * 0.28, marginVertical: Sizes.padding }}>
                    <VictoryPie
                        height={Sizes.chart}
                        width={Sizes.chart}
                        innerRadius={65}
                        labels={() => ''}
                        padding={0}
                        data={pendingDataByCategory}
                        colorScale={pendingDataByCategory.map(d => d.color)}
                    />
                </ChartClick>
                <View style={{ gap: Sizes.padding, width: '100%', padding: Sizes.padding }}>
                    {pendingDataByCategory.map((d, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: Sizes.padding }}>
                            <View style={{ backgroundColor: d.color, padding: Sizes.padding, borderRadius: Sizes.radius }}>
                                <Image source={d.icon} style={{ width: 25, height: 25, tintColor: Colors.white }} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Sizes.padding }}>
                                <TextComponent text={d.x} style={{ ...Fonts.body3 }} />
                                <TextComponent text={d.y.toString()} style={{ ...Fonts.h3, fontWeight: 'bold' }} />
                            </View>

                        </View>
                    ))}
                </View>
            </View>
        )
    }

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header
                    title={t('overview').toUpperCase()}
                    textStyle={{ textAlign: 'center' }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Sizes.padding, margin: Sizes.padding }}>
                    <View style={[styles.containerBox, { backgroundColor: colors.surface }]} >
                        <TouchableOpacity
                            style={{ position: 'absolute', right: Sizes.padding, top: Sizes.padding, }}
                            onPress={() => setVisibleAlert(true)}
                        >
                            <Image
                                source={Images.info2}
                                style={{ tintColor: colors.textSecondary, width: 20, height: 20 }} />
                        </TouchableOpacity>

                        <TextComponent text={completedTasks.length.toString()} style={{ ...Fonts.h2, fontWeight: 'bold' }} />
                        <TextComponent text={t('completedTasks')} />
                    </View>
                    <View style={[styles.containerBox, { backgroundColor: colors.surface }]}>
                        <TextComponent text={pendingTasks.length.toString()} style={{ ...Fonts.h2, fontWeight: 'bold' }} />
                        <TextComponent text={t('pendingTasks')} />
                    </View>
                </View>
                {renderChartBar()}
                {renderChartPie()}
                <AlertModal
                    type={'info'}
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

const styles = StyleSheet.create({
    containerBox: {
        flex: 1,
        padding: Sizes.padding,
        borderRadius: Sizes.radius,
        alignItems: 'center',
    }
})