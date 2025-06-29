import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { TFunction } from 'i18next'

import { TextComponent } from '../../components'
import { Colors, Fonts, Sizes } from '../../contants'
import { HeatmapData, HOURS } from '../../utils'

type Props = {
  t: TFunction
  data: HeatmapData
}

const CELL_WIDTH = 56
const CELL_HEIGHT = 40

const PomodoroHeatmap = ({ data, t }: Props) => {
  return (
    <View style={styles.container}>
      <TextComponent text={t('pomodoroHeatmap')} style={{ ...Fonts.h3, marginBottom: Sizes.padding }} />
      <ScrollView>
        <ScrollView horizontal>
          <View>
            <View style={styles.headerRow}>
              <TextComponent text={''} style={{ width: 60 }} />
              {HOURS.map((hour) => (
                <Text key={hour} style={styles.hourLabel}>{`${hour}:00`}</Text>
              ))}
            </View>

            {Object.entries(data).reverse().map(([day, hourMap]) => (
              <View key={day} style={styles.row}>
                <TextComponent text={t(day)} style={{ width: 60 }} numberOfLines={1} canExpand={false} />
                {HOURS.map((hour) => {
                  const cell = hourMap[hour]
                  const count = cell?.count || 0
                  const color = cell?.color || '#ccc'

                  return (
                    <View key={hour} style={styles.cell}>
                      {Array(count)
                        .fill(0)
                        .map((_, i) => (
                          <View
                            key={i}
                            style={[
                              styles.pomodoroBar,
                              {
                                backgroundColor: color,
                              },
                            ]}
                          />
                        ))}
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
    borderColor: Colors.gray,
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
  dayLabel: {
    width: 90,
    fontSize: 14,
    marginRight: 6,
    fontWeight: '500',
    color: '#333',
  },
  cell: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pomodoroBar: {
    width: 8,
    height: 24,
    margin: 2,
    borderRadius: 2,
  },
})
