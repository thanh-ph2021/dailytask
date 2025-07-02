import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, TextInput, View, TouchableOpacity, Switch, ScrollView, Image, ActivityIndicator } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useTranslation } from 'react-i18next'

import { Colors, Sizes, Fonts } from '../contants'
import { RootStackParamList } from '../navigations/MainNavigator'
import { saveNewTask, updateTaskHandle } from '../redux/Reducers/TasksReducer'
import { useTheme } from '../hooks'
import { StateModel, TaskModel } from '../models'
import { selectCategories } from '../redux/selectors'
import { AlertModal, Container, Divider, Header, Icon, SelectModal, SelectModalv2, TextComponent, TypeIcons } from '../components'
import { Icons } from '../utils'

type AddTaskScreenProps = {
    navigation: NavigationProp<RootStackParamList, 'AddTask'>,
    route: any
}

const getInitDate = () => {
    let date = new Date()

    return date
}

const initData = {
    title: '',
    description: '',
    dateTime: getInitDate(),
    isAlert: false,
    completed: false,
    categoryId: '1',
    repeat: 'none'
}

type OptionItemProps = {
    Icon: () => React.ReactElement,
    label: string,
    ValueComponent: () => React.ReactElement,
    onPress?: () => void
    iconColor?: string
}

const REPEAT_OPTIONS = ['none', 'daily', 'weekly', 'monthly']

const AddTaskScreen = ({ navigation, route }: AddTaskScreenProps) => {
    const [data, setData] = useState<TaskModel>(route.params && route.params.data ? route.params.data : initData)
    const dispatch = useDispatch<any>()
    const { t } = useTranslation()
    const { colors } = useTheme()
    const [alert, setAlert] = useState<{ visible: boolean, type: "warning" | "error" | "info", description: string }>({
        visible: false,
        type: 'warning',
        description: ''
    })
    const [showModalDatePicker, setShowModalDatePicker] = useState<boolean>(false)
    const [visibleSelectCate, setVisibleSelectCate] = useState(false)
    const categories = useSelector((state: StateModel) => selectCategories(state))
    const [category, setCategory] = useState(route.params && route.params.data && route.params.data.category ? route.params.data.category : categories[0])
    const [visibleSelect, setVisibleSelect] = useState(false)
    const [selectedRepeat, setSelectedRepeat] = useState<(typeof REPEAT_OPTIONS)[number]>('none')
    const [loading, setLoading] = useState(false)

    const showDatePicker = () => {
        setShowModalDatePicker(true)
    }

    const hideDatePicker = () => {
        setShowModalDatePicker(false)
    }

    const handleConfirm = (value: Date) => {
        setDataHandle('dateTime', value)
        hideDatePicker()
    }

    const setDataHandle = (key: string, value: any) => {
        setData({ ...data, [key]: value })
    }

    const validate = () => {
        if (data.title == '') {
            setAlert({
                visible: true,
                description: `${t('titleEmpty')} !!!`,
                type: 'warning'
            })
            return false
        } else if (data.description == '') {
            setAlert({
                visible: true,
                description: `${t('descriptionEmpty')} !!!`,
                type: 'warning'
            })
            return false
        } else if (data.isAlert == true && data.dateTime < new Date()) {
            setAlert({
                visible: true,
                description: `${t('theStarting')} !!!`,
                type: 'warning'
            })
            onHanldeAlert()
            return false
        }
        return true
    }

    const onHanldeAlert = () => {
        setDataHandle('isAlert', !data.isAlert)
    }

    const addTaskHandle = async () => {
        if (validate()) {
            setLoading(true)

            const dataHandled: TaskModel = {
                ...data,
                title: data.title.trim(),
                description: data.description.trim(),
                categoryId: category.id,
                repeat: selectedRepeat
            }
            try {
                if (route.params) {
                    await dispatch(updateTaskHandle(dataHandled))
                    navigation.goBack()
                } else {
                    await dispatch(saveNewTask(dataHandled))
                }
                setData(initData)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
    }

    const onClose = () => {
        setAlert({ ...alert, visible: false })
    }



    const OptionItem = ({ Icon, label, ValueComponent, onPress }: OptionItemProps) => (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <View style={styles.left}>
                <Icon />
                <TextComponent text={label} style={Fonts.h3} />
            </View>
            <View style={styles.right}>
                <ValueComponent />
            </View>
        </TouchableOpacity>
    )

    return (
        <Container>
            <Header
                title={route.params ? t('update').toUpperCase() : t('addTask').toUpperCase()}
                textStyle={{ textAlign: 'center' }}
                headerLeft={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon type={TypeIcons.Feather} name='chevron-left' color={colors.textPrimary} size={Sizes.xl} />
                    </TouchableOpacity>
                }
                headerRight={
                    <TouchableOpacity
                        disabled={loading}
                        style={{
                            backgroundColor: colors.primary,
                            padding: Sizes.padding / 2,
                            borderRadius: Sizes.radius,
                            width: 60,
                            alignItems: 'center'
                        }}
                        onPress={addTaskHandle}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.white} size="small" />
                        ) : (
                            <TextComponent text={t('save').toUpperCase()} style={Fonts.h3} color={Colors.white} />
                        )}
                    </TouchableOpacity>
                }
            />

            <View style={{ justifyContent: 'center' }}>
                <ScrollView
                    style={{ marginHorizontal: Sizes.padding*2 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        <TextComponent text={t('title')} style={{ ...Fonts.h3, marginVertical: Sizes.padding }} />
                        <TextInput
                            style={{
                                borderColor: colors.divider,
                                backgroundColor: colors.containerBackground,
                                borderWidth: 1,
                                borderRadius: Sizes.radius,
                                paddingHorizontal: Sizes.s,
                                color: colors.textPrimary
                            }}
                            value={data.title}
                            onChangeText={(text) => setDataHandle('title', text)}
                            placeholder={`${t('title')} ...`}
                            placeholderTextColor={colors.textSecondary}
                        />
                    </View>

                    <View>
                        <TextComponent text={t('description')} style={{ ...Fonts.h3, marginVertical: Sizes.padding }} />
                        <TextInput
                            style={{
                                borderColor: colors.divider,
                                backgroundColor: colors.containerBackground,
                                borderWidth: 1,
                                borderRadius: Sizes.radius,
                                paddingHorizontal: Sizes.s,
                                color: colors.textPrimary,
                                textAlignVertical: 'top',
                            }}
                            multiline
                            numberOfLines={6}
                            value={data.description}
                            onChangeText={(text) => setDataHandle('description', text)}
                            placeholder={`${t('description')} ...`}
                            placeholderTextColor={colors.textSecondary}
                        />
                    </View>
                    <View style={{
                        marginVertical: Sizes.padding,
                        borderRadius: Sizes.radius,
                        borderColor: colors.divider,
                        backgroundColor: colors.containerBackground,
                        borderWidth: 1,
                        padding: Sizes.padding
                    }}>
                        <OptionItem
                            Icon={() => <Icons.calendar color={colors.text} size={24} />}
                            label={t('dateTime')}
                            ValueComponent={() => {
                                return (
                                    <View style={{ flexDirection: 'row', gap: Sizes.padding, alignSelf: 'flex-end' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TextComponent
                                                text={`${data.dateTime.getHours() < 10 ? '0' + data.dateTime.getHours() : data.dateTime.getHours()} : ${data.dateTime.getMinutes() < 10 ? '0' + data.dateTime.getMinutes() : data.dateTime.getMinutes()}`}
                                                style={Fonts.body3}
                                            />
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TextComponent
                                                text={`${data.dateTime.getDate() < 10 ? '0' + data.dateTime.getDate() : data.dateTime.getDate()}-${data.dateTime.getMonth() < 9 ? '0' + (data.dateTime.getMonth() + 1) : data.dateTime.getMonth() + 1}-${data.dateTime.getFullYear()}`}
                                                style={Fonts.body3}
                                            />
                                        </View>
                                    </View>
                                )
                            }}
                            onPress={() => showDatePicker()}
                        />
                        <Divider height={1} color={colors.divider} />
                        <OptionItem
                            Icon={() => <Icons.categories color={colors.text} size={24} />}
                            label={t('category')}
                            ValueComponent={() => {
                                return (
                                    <View style={{ flexDirection: 'row', gap: Sizes.padding }}>
                                        <TextComponent text={category.text} style={Fonts.body3} />
                                        <View style={{ backgroundColor: category.color, padding: 5, borderRadius: 5, alignItems: 'center' }}>
                                            <Image source={category.icon} style={{ width: 15, height: 15, tintColor: Colors.white }} />
                                        </View>
                                    </View>
                                )
                            }}
                            onPress={() => setVisibleSelectCate(true)}
                        />
                        <Divider height={1} color={colors.divider} />
                        <OptionItem
                            Icon={() => <Icons.notification color={colors.text} size={24} />}
                            label={t('alert')}
                            ValueComponent={() => {
                                return (
                                    <Switch
                                        trackColor={{ false: Colors.gray, true: Colors.primary }}
                                        thumbColor={Colors.white}
                                        onValueChange={onHanldeAlert}
                                        value={data.isAlert}
                                        style={{ alignSelf: 'flex-start' }}
                                    />
                                )
                            }}
                            onPress={onHanldeAlert}
                        />
                        <Divider height={1} color={colors.divider} />
                        <OptionItem
                            Icon={() => <Icons.repeat color={colors.text} size={24} />}
                            label={t('repeat')}
                            ValueComponent={() => {
                                return (
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextComponent text={t(selectedRepeat)} style={Fonts.body3} />
                                        <Icons.arrowRight2 size={24} color={colors.text} />
                                    </View>
                                )
                            }}
                            onPress={() => setVisibleSelect(true)}
                        />
                    </View>
                </ScrollView>
            </View>

            <DateTimePickerModal
                isVisible={showModalDatePicker}
                mode={'datetime'}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={data.dateTime}
                is24Hour={true}
            />

            <AlertModal
                type={alert.type ?? 'warning'}
                description={alert.description}
                visible={alert.visible}
                onClose={onClose}
            />
            <SelectModal
                visible={visibleSelectCate}
                onClose={() => setVisibleSelectCate(false)}
                onSubmit={setCategory}
                type='category'
                navigation={navigation}
            />
            <SelectModalv2
                visible={visibleSelect}
                data={REPEAT_OPTIONS}
                onSubmit={(value) => {
                    setSelectedRepeat(value)
                    setVisibleSelect(false)
                }}
            />
        </Container>
    )
}

export default AddTaskScreen

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Sizes.padding,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Sizes.s
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})