import React, { useEffect, useRef, useState } from 'react'
import {
    FlatList,
    TouchableOpacity,
    ViewStyle,
    StyleProp,
    Dimensions,
    View,
} from 'react-native'

import { Sizes, Fonts, Colors } from '../../contants'
import { addDaysToDate } from '../../utils'
import { useTheme } from '../../hooks'
import TextComponent from '../TextComponent'

type TabsType = {
    date: Date
    onPress: (date: Date) => void
    style?: StyleProp<ViewStyle>
}

const ITEM_WIDTH = 60 + Sizes.l
const SCREEN_WIDTH = Dimensions.get('window').width
const PRELOAD_WEEKS = 3

const generateDays = (centerDate: Date, weeks: number): Date[] => {
    const start = new Date(centerDate)
    start.setDate(start.getDate() - start.getDay() + 1 - 7 * (weeks - 1))
    const days: Date[] = []
    for (let i = 0; i < weeks * 7; i++) {
        days.push(addDaysToDate(start, i))
    }
    return days
}

const Tabs = ({ date: selectedDate, onPress, style }: TabsType) => {
    const [days, setDays] = useState<Date[]>([])
    const [initialScrollDone, setInitialScrollDone] = useState(false)
    const listRef = useRef<FlatList>(null)
    const selectedDateAtInit = useRef<Date>(selectedDate)
    const { colors } = useTheme()

    useEffect(() => {
        const initialDays = generateDays(selectedDateAtInit.current, PRELOAD_WEEKS)
        setDays(initialDays)

        requestAnimationFrame(() => {
            const centerIndex = initialDays.findIndex(
                d => d.toDateString() === selectedDateAtInit.current.toDateString()
            )
            if (centerIndex !== -1) {
                listRef.current?.scrollToIndex({
                    index: centerIndex,
                    animated: false,
                    viewOffset: SCREEN_WIDTH / 2 - ITEM_WIDTH / 2,
                })
                setInitialScrollDone(true)
            }
        })
    }, [])

    useEffect(() => {
        if (!initialScrollDone) return

        const index = days.findIndex(
            d => d.toDateString() === selectedDate.toDateString()
        )
        if (index !== -1) {
            listRef.current?.scrollToIndex({
                index,
                animated: true,
                viewOffset: SCREEN_WIDTH / 2 - ITEM_WIDTH / 2,
            })
        }
    }, [selectedDate])

    const handleLoadMore = (direction: 'before' | 'after') => {
        const firstDate = days[0]
        const lastDate = days[days.length - 1]

        if (direction === 'before') {
            const newWeek: Date[] = []
            for (let i = -7; i < 0; i++) {
                newWeek.push(addDaysToDate(firstDate, i))
            }
            setDays(prev => [...newWeek, ...prev])
        }

        if (direction === 'after') {
            const newWeek: Date[] = []
            for (let i = 1; i <= 7; i++) {
                newWeek.push(addDaysToDate(lastDate, i))
            }
            setDays(prev => [...prev, ...newWeek])
        }
    }

    const renderItem = ({ item }: { item: Date }) => {
        const isSelected = item.toDateString() === selectedDate.toDateString()
        const dayName = item.toLocaleDateString('en-US', { weekday: 'short' })
        const dayNumber = item.getDate()
        const today = new Date()
        const isToday = item.toDateString() === today.toDateString()

        return (
            <TouchableOpacity
                onPress={() => onPress(item)}
                style={{
                    width: 60,
                    height: 70,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isSelected ? colors.primary : colors.containerBackground,
                    borderWidth: isSelected ? 0 : 1,
                    borderColor: colors.divider,
                    marginHorizontal: Sizes.l / 2,
                }}
            >
                {isToday && (
                    <View
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: colors.primary,
                            position: 'absolute',
                            top: 6,
                        }}
                    />
                )}
                <TextComponent
                    text={dayNumber.toString()}
                    style={Fonts.h2}
                    color={isSelected ? Colors.white : colors.text}
                />
                <TextComponent
                    text={dayName}
                    style={Fonts.body4}
                    color={isSelected ? Colors.white : colors.textSecondary}
                />
            </TouchableOpacity>
        )
    }

    const handleScroll = (e: any) => {
        const offsetX = e.nativeEvent.contentOffset.x
        const contentWidth = e.nativeEvent.contentSize.width

        if (offsetX < ITEM_WIDTH * 2) {
            handleLoadMore('before')
        }

        if (offsetX + SCREEN_WIDTH > contentWidth - ITEM_WIDTH * 2) {
            handleLoadMore('after')
        }
    }

    return (
        <View style={[{ paddingVertical: 4 }, style]}>
            <FlatList
                ref={listRef}
                data={days}
                horizontal
                keyExtractor={item => item.toDateString()}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                getItemLayout={(_, index) => ({
                    length: ITEM_WIDTH,
                    offset: ITEM_WIDTH * index,
                    index,
                })}
            />
        </View>
    )
}

export default Tabs
