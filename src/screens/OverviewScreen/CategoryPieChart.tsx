import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { VictoryPie } from 'victory-native'
import { TFunction } from 'i18next'

import { Colors, Fonts, Sizes } from '../../contants'
import { TextComponent } from '../../components'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'
import { ChartClick } from '../../utils'

interface PendingCategoryData {
    x: string
    y: number
    color: string
    icon: any
}

interface PieChartProps {
    t: TFunction
    colors: ThemeColor
    selectedOption: string
    onPressSelectOption: () => void
    pendingDataByCategory: PendingCategoryData[]
}

const CategoryPieChart: React.FC<PieChartProps> = ({
    t,
    colors,
    selectedOption,
    onPressSelectOption,
    pendingDataByCategory
}) => {
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
                <TextComponent text={t('pendingTasksIn')} style={{ ...Fonts.h3, width: '60%' }} />

                <TouchableOpacity
                    style={{ backgroundColor: colors.surface, padding: Sizes.padding / 2, borderRadius: Sizes.radius }}
                    onPress={onPressSelectOption}
                >
                    <TextComponent text={t(selectedOption)} style={Fonts.body3} />
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
                        <View style={{ backgroundColor: d.color, padding: Sizes.padding/2, borderRadius: Sizes.radius }}>
                            <Image source={d.icon} style={{ width: 15, height: 15, tintColor: Colors.white }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Sizes.padding }}>
                            <TextComponent text={d.x} style={Fonts.body3} />
                            <TextComponent text={d.y.toString()} style={{ ...Fonts.body3, fontWeight: 'bold' }} />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default CategoryPieChart
