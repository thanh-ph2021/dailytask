import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { TFunction } from 'i18next'
import { Moment } from 'moment'

import { Colors, Fonts, Images, Sizes } from '../../contants'
import { TextComponent } from '../../components'
import { formatActualTime, WeeklyData } from '../../utils'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'

type Props = {
    data: WeeklyData
    t: TFunction
    colors: ThemeColor
    startOfWeek: Moment
    endOfWeek: Moment
    onPrevWeek: () => void
    onNextWeek: () => void
}

const WeeklyFocusChart = ({
    data,
    t,
    colors,
    startOfWeek,
    endOfWeek,
    onNextWeek,
    onPrevWeek,
}: Props) => {
    const maxTotal = Math.max(
        ...Object.values(data).map((day) =>
            day.reduce((sum, task) => sum + task.durationInSec, 0)
        )
    )

    const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextComponent
                    text={t('weeklyFocusTime')}
                    style={{ ...Fonts.h3, width: '60%' }}
                />
                <View style={styles.weekNav}>
                    <TouchableOpacity onPress={onPrevWeek}>
                        <Image source={Images.sortLeft} style={styles.arrowIcon} />
                    </TouchableOpacity>
                    <TextComponent
                        text={`${startOfWeek.format('DD/MM')} - ${endOfWeek.format('DD/MM')}`}
                        style={Fonts.body4}
                    />
                    <TouchableOpacity onPress={onNextWeek}>
                        <Image source={Images.sortRight} style={styles.arrowIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {daysOrder.map((dayKey) => {
                const tasks = data[dayKey] || []
                const total = tasks.reduce((sum, t) => sum + t.durationInSec, 0)

                return (
                    <View key={dayKey} style={styles.item}>
                        <View style={styles.row}>
                            <TextComponent text={t(dayKey)} />
                            <TextComponent text={formatActualTime(total)} style={Fonts.h3} />
                        </View>
                        <View style={styles.barBackground}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: `${(total / maxTotal) * 100}%`,
                                }}
                            >
                                {tasks.map((task, index) => {
                                    const widthPercent = (task.durationInSec / total) * 100
                                    return (
                                        <View
                                            key={index}
                                            style={{
                                                width: `${widthPercent}%`,
                                                backgroundColor: task.color,
                                                height: 8,
                                            }}
                                        />
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

export default WeeklyFocusChart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: Sizes.radius,
        borderWidth: 1,
        borderColor: Colors.gray,
        marginHorizontal: Sizes.padding,
        marginBottom: Sizes.padding,
        padding: Sizes.padding,
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: Sizes.padding,
        width: '100%',
    },
    weekNav: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    arrowIcon: {
        width: 15,
        height: 15,
    },
    item: {
        marginBottom: Sizes.padding,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Sizes.padding,
    },
    barBackground: {
        height: 8,
        backgroundColor: Colors.gray,
        borderRadius: 4,
        overflow: 'hidden',
    },
})
