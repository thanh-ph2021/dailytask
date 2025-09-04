import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { TFunction } from 'i18next'

import { TextComponent } from '../../components'
import { Fonts, Sizes } from '../../constants'
import { HeatmapData, HOURS } from '../../utils'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'

type Props = {
  t: TFunction
  colors: ThemeColor
  data: HeatmapData
}

const CELL_WIDTH = 56
const CELL_HEIGHT = 40

const PomodoroHeatmap = ({ data, t, colors }: Props) => {
  return (
    <View style={[styles.container, { backgroundColor: colors.containerBackground, borderColor: colors.divider }]}>
      <TextComponent text={t('pomodoroHeatmap')} style={{ ...Fonts.h3, marginBottom: Sizes.padding }} />
      <ScrollView>
        <ScrollView horizontal>
          <View>
            <View style={styles.headerRow}>
              <TextComponent text={''} style={{ width: 60 }} />
              {HOURS.map((hour) => (
                <TextComponent key={hour} text={`${hour}:00`} style={styles.hourLabel} />
              ))}
            </View>

            {Object.entries(data).reverse().map(([day, hourMap]) => (
              <View key={day} style={styles.row}>
                <TextComponent text={t(day)} style={{ width: 60 }} numberOfLines={1} canExpand={false} />
                {HOURS.map((hour) => {
                  const cell = hourMap[hour]

                  return (
                    <View key={hour} style={styles.cell}>
                      {cell?.items?.map((item, i) =>
                        Array(item.count)
                          .fill(0)
                          .map((_, j) => (
                            <View
                              key={`${i}-${j}`}
                              style={[
                                styles.pomodoroBar,
                                {
                                  backgroundColor: item.color,
                                },
                              ]}
                            />
                          ))
                      ) || null}
                    </View>
                  )
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  )
}

export default PomodoroHeatmap

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: Sizes.radius,
    borderWidth: 1,
    marginHorizontal: Sizes.padding,
    marginBottom: Sizes.padding,
    padding: Sizes.padding,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  hourLabel: {
    width: CELL_WIDTH,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cell: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    alignItems: 'center',
    flexDirection: 'row',
  },
  pomodoroBar: {
    width: 8,
    height: 24,
    margin: 2,
    borderRadius: 2,
  },
})
