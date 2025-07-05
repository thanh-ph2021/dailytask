import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Svg, { Circle, G, Line, Text as SvgText } from 'react-native-svg'
import { VictoryPie } from 'victory-native'
import { TFunction } from 'i18next'

import { formatActualTime } from '../../utils'
import { Fonts, Sizes } from '../../constants'
import { TextComponent } from '../../components'
import { FocusCategoryLegend } from './FocusCategoryLegend'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'

const PIE_CHART_SIZE = 260
const CHART_PADDING = 30
const CHART_SIZE = PIE_CHART_SIZE + CHART_PADDING * 2
const CENTER = CHART_SIZE / 2
const INNER_RADIUS = 70
const LINE_LENGTH = 50

const radians = (deg: number) => (Math.PI / 180) * deg

export type FocusCategoryData = {
  x: string,
  y: number,
  color: string,
  icon: number
}

export type FocusCategoryProps = {
  data: FocusCategoryData[]
  t: TFunction
  colors: ThemeColor
  selectedOption: string
  onPressSelectOption: () => void
}

const FocusCategoryChart = ({ data, t, colors, selectedOption, onPressSelectOption }: FocusCategoryProps) => {
  const total = data.reduce((sum, d) => sum + d.y, 0)

  const chartData = data.map((item, i) => ({
    x: '',
    y: item.y,
    color: item.color,
    categoryName: item.x,
  }))

  let cumulativeAngle = 0
  const leaderLines = chartData.map((slice, i) => {
    const angle = (slice.y / total) * 360
    const midAngle = cumulativeAngle + angle / 2
    cumulativeAngle += angle

    const rad = radians(midAngle - 90)
    const lineStartX = CENTER + (INNER_RADIUS + 4) * Math.cos(rad)
    const lineStartY = CENTER + (INNER_RADIUS + 4) * Math.sin(rad)
    const lineMidX = CENTER + (INNER_RADIUS + 36) * Math.cos(rad)
    const lineMidY = CENTER + (INNER_RADIUS + 36) * Math.sin(rad)
    const isLeft = lineMidX < CENTER
    const lineEndX = lineMidX + (isLeft ? -LINE_LENGTH : LINE_LENGTH)

    const timeStr = formatActualTime(slice.y)

    return (
      <G key={i}>
        {/* Leader line */}
        <Line x1={lineStartX} y1={lineStartY} x2={lineMidX} y2={lineMidY} stroke={slice.color} strokeWidth={1} />
        <Line x1={lineMidX} y1={lineMidY} x2={lineEndX} y2={lineMidY} stroke={slice.color} strokeWidth={1} />
        <Circle cx={lineEndX} cy={lineMidY} r={2} fill={slice.color} />

        {/* Top text: Time and percent */}
        <SvgText
          x={lineEndX}
          y={lineMidY - 4}
          fill={colors.text}
          fontSize="10"
          fontWeight={'bold'}
          textAnchor={isLeft ? 'start' : 'end'}
        >
          {`${timeStr}`}
        </SvgText>

        {/* Bottom text: Category label */}
        <SvgText
          x={lineEndX}
          y={lineMidY + 10}
          fill={colors.text}
          fontSize="10"
          textAnchor={isLeft ? 'start' : 'end'}
        >
          {t(`${slice.categoryName}`)}
        </SvgText>
      </G>
    )
  })

  return (
    <View style={[styles.container, {backgroundColor: colors.containerBackground, borderColor: colors.divider}]}>
      <View style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
      }}>
        <TextComponent text={t('focusTimeCategory')} style={{ ...Fonts.h3, width: '60%' }} />

        <TouchableOpacity
          style={{ backgroundColor: colors.surface, padding: Sizes.padding / 2, borderRadius: Sizes.radius, borderColor: colors.divider, borderWidth: 1 }}
          onPress={onPressSelectOption}
        >
          <TextComponent text={t(selectedOption)} style={Fonts.body3} />
        </TouchableOpacity>
      </View>

      <Svg width={CHART_SIZE} height={CHART_SIZE}>
        <VictoryPie
          standalone={false}
          width={PIE_CHART_SIZE}
          height={PIE_CHART_SIZE}
          innerRadius={INNER_RADIUS}
          padAngle={1}
          labels={() => ''}
          data={chartData}
          colorScale={chartData.map(d => d.color)}
          origin={{ x: CENTER, y: CENTER }}
        />
        {leaderLines}
        <SvgText
          x={CENTER}
          y={CENTER}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="25"
          fontWeight="bold"
          fill={colors.text}
        >
          {formatActualTime(total)}
        </SvgText>
      </Svg>
      <FocusCategoryLegend data={data} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: Sizes.radius,
    borderWidth: 1,
    marginHorizontal: Sizes.padding,
    marginBottom: Sizes.padding,
    padding: Sizes.padding,
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})

export default FocusCategoryChart
