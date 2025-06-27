import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native'
import moment, { Moment } from 'moment'
import { TFunction } from 'i18next'

import { Colors, Fonts, Images, Sizes } from '../../contants'
import { TextComponent } from '../../components'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'
import { TaskModel } from '../../models'
import { ChartClick } from '../../utils'

interface BarChartProps {
  t: TFunction
  colors: ThemeColor
  startOfWeek: Moment
  endOfWeek: Moment
  weeklyTasks: TaskModel[]
  onPrevWeek: () => void
  onNextWeek: () => void
}

const WeeklyBarChart: React.FC<BarChartProps> = ({
  t,
  colors,
  startOfWeek,
  endOfWeek,
  weeklyTasks,
  onPrevWeek,
  onNextWeek
}) => {
  const chartDataBar = Array(7)
    .fill(0)
    .map((_, i) => ({
      x: i + 1,
      y: weeklyTasks.filter(task => moment(task.dateTime).isoWeekday() === i + 1).length,
    }))

  return (
    <View style={{
      alignItems: 'center',
      marginHorizontal: Sizes.padding,
      marginBottom: Sizes.padding,
      borderColor: Colors.gray,
      borderWidth: 1,
      borderRadius: Sizes.radius
    }}>
      <View style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: Sizes.padding,
        width: '100%'
      }}>
        <TextComponent text={t('completionDailyTasks')} style={{ ...Fonts.h3, width: '60%' }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <TouchableOpacity onPress={onPrevWeek}>
            <Image source={Images.sortLeft} style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
          <TextComponent
            text={`${startOfWeek.format("DD/MM")}-${endOfWeek.format("DD/MM")}`}
            style={Fonts.body4}
          />
          <TouchableOpacity onPress={onNextWeek}>
            <Image source={Images.sortRight} style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
        </View>
      </View>

      <ChartClick style={{ height: Sizes.height * 0.4 }}>
        <VictoryChart>
          <VictoryAxis
            tickFormat={(tick) => {
              const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
              return t(weekdays[tick - 1]).substring(0, 3)
            }}
            style={{
              axis: { stroke: "transparent" },
              grid: { stroke: "transparent" },
              tickLabels: { fill: colors.textPrimary }
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "transparent" },
              grid: { stroke: "transparent" },
              tickLabels: { fill: "transparent" }
            }}
          />
          <VictoryBar
            cornerRadius={{ top: 5, bottom: 5 }}
            barWidth={7}
            style={{
              data: {
                fill: ({ datum }) =>
                  datum.x === moment().isoWeekday()
                    ? colors.highlight
                    : colors.surface,
              },
              labels: { fill: colors.textPrimary },
            }}
            data={chartDataBar}
            labels={({ datum }) => datum.y}
          />
        </VictoryChart>
      </ChartClick>
    </View>
  )
}

export default WeeklyBarChart
