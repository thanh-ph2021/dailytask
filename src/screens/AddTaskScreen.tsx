import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, Switch, ScrollView, Image } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useTranslation } from 'react-i18next'

import { Colors, Sizes, Fonts, Images } from '../contants'
import { RootStackParamList } from '../navigations/MainNavigator'
import { saveNewTask, updateTaskHandle } from '../redux/Reducers/TasksReducer'
import { useTheme } from '../hooks'
import { StateModel, TaskModel } from '../models'
import { selectCategories } from '../redux/selectors'
import { AlertModal, Container, Header, Icon, SelectModal, TextComponent, TypeIcons } from '../components'

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
    categoryId: '1'
}

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
    const [category, setCategory] = useState(route.params && route.params.data ?  route.params.data.category : categories[0])

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

    const addTaskHandle = () => {
        if (validate()) {
            const dataHandled: TaskModel = {
                ...data,
                title: data.title.trim(),
                description: data.description.trim(),
                categoryId: category.id
            }
            route.params ? dispatch(updateTaskHandle(dataHandled)) : dispatch(saveNewTask(dataHandled))
            route.params && navigation.goBack()

            setData(initData)
        }
    }

    const onClose = () => {
        setAlert({ ...alert, visible: false })
    }

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
            />

            <View style={{ justifyContent: 'center' }}>
                <View
                    style={{
                        backgroundColor: colors.surface,
                        alignSelf: 'center',
                        width: '70%',
                        height: 15,
                        borderTopLeftRadius: Sizes.l,
                        borderTopRightRadius: Sizes.l,
                        elevation: 6,
                        opacity: 0.3
                    }}
                />
                <View
                    style={{
                        backgroundColor: colors.surface,
                        alignSelf: 'center',
                        width: '80%',
                        height: 15,
                        borderTopLeftRadius: Sizes.l,
                        borderTopRightRadius: Sizes.l,
                        elevation: 6,
                        opacity: 0.5
                    }}
                />

                <ScrollView
                    style={{
                        backgroundColor: colors.surface,
                        alignSelf: 'center',
                        width: '85%',
                        height: '75%',
                        borderRadius: Sizes.l,
                        elevation: 6,
                        padding: Sizes.xl,
                    }}
                    showsVerticalScrollIndicator={false}
                >

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: Sizes.s }}>
                            <Icon type={TypeIcons.MaterialIcons} name={'space-dashboard'} color={Colors.primary} size={Sizes.xl} />
                            <TextComponent text={t('title').toUpperCase()} style={[styles.textTitle, { paddingLeft: Sizes.s }]} />
                        </View>
                        <TextInput
                            style={{
                                borderColor: colors.primary,
                                borderWidth: 1,
                                borderRadius: Sizes.s,
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
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: Sizes.s }}>
                            <Icon type={TypeIcons.Feather} name={'edit'} color={Colors.primary} size={Sizes.xl} />
                            <TextComponent text={t('description').toUpperCase()} style={[styles.textTitle, { paddingLeft: Sizes.s }]} />
                        </View>
                        <TextInput
                            style={{
                                borderColor: colors.primary,
                                borderWidth: 1,
                                borderRadius: Sizes.s,
                                paddingHorizontal: Sizes.s,
                                textAlignVertical: 'top',
                                color: colors.textPrimary
                            }}
                            multiline
                            numberOfLines={6}
                            value={data.description}
                            onChangeText={(text) => setDataHandle('description', text)}
                            placeholder={`${t('description')} ...`}
                            placeholderTextColor={colors.textSecondary}
                        />
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: Sizes.s }}>
                            <Image source={Images.category2} style={{ width: Sizes.xl, height: Sizes.xl }} />
                            <Text style={[styles.textTitle, { paddingLeft: Sizes.s }]}>{t('category').toUpperCase()}</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                borderWidth: 1,
                                borderRadius: Sizes.xl,
                                borderColor: Colors.primary,
                                padding: Sizes.padding,
                                paddingVertical: Sizes.s,
                                alignItems: 'center',
                                alignSelf: 'flex-start',
                                gap: Sizes.l
                            }}
                            onPress={() => setVisibleSelectCate(true)}
                        >
                            <TextComponent text={category.text} />
                            <View style={{ backgroundColor: category.color, padding: 5, borderRadius: 5, alignItems: 'center' }}>
                                <Image source={category.icon} style={{ width: 15, height: 15, tintColor: Colors.white }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: Sizes.s }}>
                            <Icon type={TypeIcons.Feather} name='calendar' color={Colors.primary} size={Sizes.xl} />
                            <Text style={[styles.textTitle, { paddingLeft: Sizes.s }]}>{t('dateTime').toUpperCase()}</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                width: '80%',
                                borderWidth: 1,
                                borderRadius: Sizes.xl,
                                borderColor: Colors.primary,
                                paddingHorizontal: Sizes.s,
                                alignItems: 'center'
                            }}
                            onPress={() => showDatePicker()}
                        >

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '22%' }}>
                                <TextComponent
                                    text={`${data.dateTime.getHours() < 10 ? '0' + data.dateTime.getHours() : data.dateTime.getHours()}`}
                                />
                                <TextComponent
                                    text=':'
                                />
                                <TextComponent
                                    text={`${data.dateTime.getMinutes() < 10 ? '0' + data.dateTime.getMinutes() : data.dateTime.getMinutes()}`}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
                                <TextComponent
                                    text={`${data.dateTime.getDate() < 10 ? '0' + data.dateTime.getDate() : data.dateTime.getDate()}`}
                                />
                                <TextComponent
                                    text='-'
                                />
                                <TextComponent
                                    text={`${data.dateTime.getMonth() < 9 ? '0' + (data.dateTime.getMonth() + 1) : data.dateTime.getMonth() + 1}`}
                                />
                                <TextComponent
                                    text='-'
                                />
                                <TextComponent
                                    text={`${data.dateTime.getFullYear()}`}
                                />
                            </View>

                            <Icon type={TypeIcons.Feather} name='chevron-down' size={Sizes.xl} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: Sizes.s }}>
                            <Icon type={TypeIcons.Octicons} name={'stopwatch'} color={Colors.primary} size={Sizes.xl} />
                            <Text style={[styles.textTitle, { paddingLeft: Sizes.s }]}>{t('alert').toUpperCase()}</Text>
                        </View>
                        <Switch
                            trackColor={{ false: Colors.divider, true: Colors.primary }}
                            thumbColor={data.isAlert ? Colors.divider : Colors.gray}
                            onValueChange={onHanldeAlert}
                            value={data.isAlert}
                            style={{ alignSelf: 'flex-start' }}
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.buttonAdd} onPress={addTaskHandle}>
                    <Icon type={TypeIcons.Entypo} name='check' color={Colors.text} size={Sizes.xxl} />
                </TouchableOpacity>
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
        </Container>
    )
}

export default AddTaskScreen

const styles = StyleSheet.create({
    buttonAdd: {
        backgroundColor: Colors.primary,
        borderRadius: 100,
        padding: Sizes.s,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        bottom: -20,
        elevation: 6
    },

    textTitle: {
        ...Fonts.h3,
        fontWeight: 'bold',
        color: Colors.primary
    }
})