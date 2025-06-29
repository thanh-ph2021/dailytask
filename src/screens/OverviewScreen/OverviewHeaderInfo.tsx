import React from 'react'
import { View } from 'react-native'
import { TFunction } from 'i18next'

import { Sizes } from '../../contants'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'
import DataCard from './DataCard'
import { styles } from './style'

type Props = {
  completedCount: number
  pendingCount: number
  onPressInfo: () => void
  t: TFunction
  colors: ThemeColor
}

const OverviewHeaderInfo = ({
  completedCount,
  pendingCount,
  onPressInfo,
  t,
  colors
}: Props) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginHorizontal: Sizes.padding,
        marginBottom: Sizes.padding
      }}
    >
      <View style={styles.row}>
        <DataCard value={completedCount.toString()} label={t('completedTasks')} onPressInfo={onPressInfo}/>
        <DataCard value={pendingCount.toString()} label={t('pendingTasks')} />
      </View>
    </View>
  )
}

export default OverviewHeaderInfo
