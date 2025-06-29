import { Image, StyleSheet, View } from "react-native"

import { TextComponent } from "../../components"
import { formatActualTime } from "../../utils"
import { FocusCategoryData } from "./FocusCategoryChart"
import { Colors, Fonts, Sizes } from "../../contants"

type FocusCategoryLegendProps = {
  data: FocusCategoryData[]
}

export const FocusCategoryLegend = ({ data }: FocusCategoryLegendProps) => {
  const total = data.reduce((sum, d) => sum + d.y, 0)

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const percent = ((item.y / total) * 100).toFixed(0)

        return (
          <View key={index} style={styles.item}>
            <View style={{ backgroundColor: item.color, padding: Sizes.padding/2, borderRadius: Sizes.radius }}>
              <Image source={item.icon} style={{ width: 15, height: 15, tintColor: Colors.white }} />
            </View>
            <View>
              <TextComponent text={item.x} style={Fonts.h3} numberOfLines={1} canExpand={false} />
              <TextComponent text={`${formatActualTime(item.y)} - ${percent}%`} style={Fonts.body4} />
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.padding,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: Sizes.padding,
    gap: Sizes.padding
  },
})
