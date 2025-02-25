import { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, ListRenderItemInfo, TouchableOpacity, Image, PermissionsAndroid, Platform, StatusBar } from 'react-native'
import { useSelector } from 'react-redux'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useTranslation } from 'react-i18next'

import { makeSelectTasksFilter } from '../redux/selectors'
import TaskCard from '../components/Home/TaskCard'
import { Colors, Fonts, Images, Sizes } from '../contants'
import Tabs from '../components/Home/Tabs'
import { dateString, getDayOfWeek } from '../utils'
import { useTheme } from '../hooks'
import { Container, TextComponent } from '../components'
import { TaskModel } from '../models'

type HomeScreenProps = {
    navigation: any
}

const DATA = ['today', 'tomorrow']

const HomeScreen = ({ navigation }: HomeScreenProps) => {

    const [dateSelected, setDateSelected] = useState(new Date())
    const [modalPicker, setModalPicker] = useState<boolean>(false)
    const [selected, setSelected] = useState<string>()
    const [headerText, setHeaderText] = useState<string>(DATA[0])
    const data = useSelector(makeSelectTasksFilter(dateSelected ?? new Date()))
    const { t } = useTranslation()
    const { isDark } = useTheme()

    useEffect(() => {
        const requestNotificationPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                    )
                } catch (error) {
                }
            }
        }

        requestNotificationPermission()
    }, [])

    const showDatePicker = () => {
        setModalPicker(true)
    }

    const hideDatePicker = () => {
        setModalPicker(false)
    }

    const handleConfirm = (value: Date) => {
        hideDatePicker()
        setDateSelected(value)
    }

    const onSelectedChange = (value: string) => {
        const today: Date = new Date()
        const date: Date = new Date(value)

        const tomorrow: Date = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            setHeaderText(DATA[0])
        } else if (date.toDateString() === tomorrow.toDateString()) {
            setHeaderText(DATA[1])
        } else {
            setHeaderText('')
        }

        setDateSelected(date)
    }

    return (
        <Container>
            <StatusBar backgroundColor='transparent' translucent barStyle={isDark ? 'light-content' : 'dark-content'} />
            <Image source={Images.banner1} style={{ width: '100%', height: Sizes.banner, position: 'absolute' }} />

            <View style={{
                backgroundColor: Colors.primary,
                padding: Sizes.padding / 2,
                borderRadius: Sizes.radius,
                position: 'absolute',
                top: Sizes.padding * 3,
                left: Sizes.padding
            }}>
                {headerText && <TextComponent text={t(headerText)} style={{ ...Fonts.h3, fontWeight: 'bold', color: Colors.white }} />}
                <TextComponent
                    text={`${t(getDayOfWeek(dateSelected)).substring(0, 3)} - ${dateString(dateSelected)}`}
                    style={[{ color: Colors.white }, headerText ? undefined : { ...Fonts.h3, fontWeight: 'bold' }]}
                />
            </View>

            <View style={styles.content}>
                <Tabs date={dateSelected} onPress={(date) => onSelectedChange(date.toString())} />
                <FlatList
                    data={data}
                    renderItem={({ item, index }: ListRenderItemInfo<TaskModel>) => {
                        const firstOrLast = index === 0 ? 'first' : index === data.length - 1 ? 'last' : undefined
                        return <TaskCard data={item} firstOrLast={firstOrLast} selected={selected} setSelected={setSelected} length={data.length} />
                    }}
                    keyExtractor={(item, index) => item.id!.toString() + index}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    ListFooterComponent={() => <View style={{ marginBottom: 300 }} />}
                />
            </View>

            <DateTimePickerModal
                isVisible={modalPicker}
                mode={'date'}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={dateSelected}
            />
            <TouchableOpacity
                onPress={() => navigation.push('AddTask')}
                style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    bottom: Sizes.padding,
                    right: Sizes.padding,
                    padding: Sizes.padding,
                    borderRadius: Sizes.radius,
                    elevation: 6
                }}>
                <Image source={Images.add} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        </Container>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

    content: {
        paddingHorizontal: Sizes.s,
        marginTop: Sizes.banner - Sizes.padding * 4,
    },

    listContainer: {
        paddingHorizontal: Sizes.s
    },

})