import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { TFunction } from 'i18next'

import { TextComponent } from '../../components'
import { Fonts, Images, Sizes } from '../../contants'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: Sizes.padding,
        margin: Sizes.padding
      }}
    >
      <View style={[styles.containerBox, { backgroundColor: colors.surface }]}>
        <TouchableOpacity
          style={{ position: 'absolute', right: Sizes.padding, top: Sizes.padding }}
          onPress={onPressInfo}
        >
          <Image
            source={Images.info2}
            style={{ tintColor: colors.textSecondary, width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <TextComponent
          text={completedCount.toString()}
          style={{ ...Fonts.h2, fontWeight: 'bold' }}
        />
        <TextComponent text={t('completedTasks')} />
      </View>

      <View style={[styles.containerBox, { backgroundColor: colors.surface }]}>
        <TextComponent
          text={pendingCount.toString()}
          style={{ ...Fonts.h2, fontWeight: 'bold' }}
        />
        <TextComponent text={t('pendingTasks')} />
      </View>
    </View>
  )
}

export default OverviewHeaderInfo

const styles = StyleSheet.create({
  containerBox: {
    flex: 1,
    padding: Sizes.padding,
    borderRadius: Sizes.radius,
    alignItems: 'center'
  }
})
