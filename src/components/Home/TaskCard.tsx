import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import { TaskModel } from '../../models/TaskModel'
import { Colors, Fonts, Images, Sizes } from '../../constants'
import Icon, { TypeIcons } from '../Icon'
import { completeTaskHandle, deleteTaskHandle, updateTaskHandle } from '../../redux/Reducers/TasksReducer'
import AlertModal from '../AlertModal'
import UtilStyles from '../../utils/UtilStyles'
import TextComponent from '../TextComponent'
import { useTheme } from '../../hooks'
import { formatActualTime } from '../../utils'

type TaskCardProps = {
    data: TaskModel,
    firstOrLast: 'first' | 'last' | undefined,
    selected?: string
    setSelected: (id: string) => void,
    length: number
}

const buttonArray = [
    // alert
    { typeIcon: TypeIcons.Entypo, name: 'stopwatch' },
    // edit
    { typeIcon: TypeIcons.Feather, name: 'edit' },
    // delete
    { typeIcon: TypeIcons.Feather, name: 'trash-2' }
]

const TaskCard = ({
    data,
    firstOrLast,
    selected,
    setSelected,
    length
}: TaskCardProps) => {
    const showButton = selected == data.id && !data.completed
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const showAlert = data.isAlert && data.dateTime.getTime() > new Date().getTime()
    const { t } = useTranslation()
    const {colors}= useTheme()

    const [alert, setAlert] = useState<{ visible: boolean, type: "warning" | "error" | "info", description: string, onOk: () => void }>({
        visible: false,
        type: 'warning',
        description: '',
        onOk: () => { }
    })

    const onClose = () => {
        setAlert({ ...alert, visible: false })
    }

    const onSelectedHandle = () => {
        if (showButton) {
            setSelected('-1')
        } else {
            setSelected(data.id!)
        }
    }

    const onDeleteHandle = () => {
        setAlert({
            visible: true,
            description: 'areYouSureDelTask',
            type: 'warning',
            onOk: () => dispatch(deleteTaskHandle(data.id!, t))
        })
    }

    const onEditHandle = () => {
        navigation.navigate('AddTask', { data: data })
    }

    const onCancelAlertHandle = () => {
        setAlert({
            visible: true,
            description: t('toggleNotification', { something: t(data.isAlert ? 'off' : 'on') }),
            type: 'warning',
            onOk: () => dispatch(updateTaskHandle({
                ...data,
                isAlert: !data.isAlert
            }, t))
        })
    }

    const renderButtonFooter = () => {
        if (!showButton) {
            return <></>
        }
        return (
            <View style={{ padding: Sizes.s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '60%', marginTop: Sizes.s }}>
                {data.category && <View
                    style={{
                        backgroundColor: data.category.color,
                        padding: 5,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 18,
                        height: 18
                    }}
                >
                    <Image source={data.category.icon} style={{ width: 12, height: 12, tintColor: Colors.white }} />
                </View>}
                {buttonArray.map((item, index) => {
                    const onPress = () => {
                        switch (index) {
                            case 0:
                                onCancelAlertHandle()
                                break
                            case 1:
                                onEditHandle()
                                break
                            case 2:
                                onDeleteHandle()
                                break
                        }
                    }
                    if (index === 0 && !showAlert) {
                        return null
                    }

                    return (
                        <TouchableOpacity key={index.toString()} onPress={onPress}>
                            <Icon type={item.typeIcon} name={item.name} color={Colors.primary} size={18} />
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    return (
        <>
            {firstOrLast == 'first' || length == 1 ? (
                <View style={{ flexDirection: 'row', columnGap: 20, width: '100%' }}>
                    <Text style={{ fontWeight: 'bold', marginTop: 18, color: 'transparent' }}>
                        00:00
                    </Text>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'transparent', width: 50, height: 0
                            }}>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: Colors.primary, width: 2, marginVertical: Sizes.s, flex: 1, minHeight: 20 }} />
                    </View>
                </View>
            ) : <></>}

            <View style={{ flexDirection: 'row', columnGap: 20, width: '100%' }}>
                <TextComponent
                    text={`${data.dateTime.getHours() < 10
                        ? '0' + data.dateTime.getHours()
                        : data.dateTime.getHours()}:${data.dateTime.getMinutes() < 10
                            ? '0' + data.dateTime.getMinutes()
                            : data.dateTime.getMinutes()}`}
                    style={{ fontWeight: 'bold', marginTop: 18 }}
                />

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: data.completed ? Colors.white : Colors.primary, width: 50, height: 50, borderRadius: 100, elevation: 6, alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => dispatch(completeTaskHandle(data.id!, t))}
                    >
                        {data.completed ? <Image source={Images.flower} style={UtilStyles.icon} />
                            : <Image source={Images.nut} style={UtilStyles.icon} />}
                    </TouchableOpacity>
                    {firstOrLast == 'last' || length == 1
                        ? <></>
                        : <View style={{ backgroundColor: Colors.primary, width: 2, marginVertical: Sizes.s, flex: 1, minHeight: 20 }} />}
                </View>

                <TouchableWithoutFeedback onPress={onSelectedHandle}>
                    <View style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                            <TextComponent
                                text={data.title.toUpperCase()}
                                style={{ fontSize: 20, opacity: data.completed ? 0.5 : 1, textDecorationLine: data.completed ? 'line-through' : undefined }}
                                numberOfLines={1}
                            />
                            {showButton
                                ? (showAlert ? <Entypo name='stopwatch' color={Colors.primary} size={18} style={{ paddingLeft: Sizes.s }} /> : <></>)
                                : <></>
                            }
                        </View>
                        <TextComponent
                            style={{ width: '65%', flexShrink: 1, opacity: data.completed ? 0.5 : 1, textDecorationLine: data.completed ? 'line-through' : undefined }}
                            text={data.description}
                        />
                        {data.completed && data.actualFocusTimeInSec ? (
                            <TextComponent
                                style={Fonts.h3}
                                color={colors.primary}
                                text={`Pomodoro: ${formatActualTime(data.actualFocusTimeInSec)}`}
                            />
                        ) : <></>}
                        {renderButtonFooter()}
                    </View>
                </TouchableWithoutFeedback >
            </View >

            <AlertModal
                type={alert.type ?? 'warning'}
                description={alert.description}
                visible={alert.visible}
                onClose={onClose}
                onOk={alert.onOk}
            />
        </>

    )
}

export default TaskCard