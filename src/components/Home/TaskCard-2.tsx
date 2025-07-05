import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable'
import { useTranslation } from 'react-i18next'

import TextComponent from '../TextComponent'
import { Colors, Fonts, Sizes } from '../../constants'
import { formatActualTime, formatHourMinute24h, Icons } from '../../utils'
import { useTheme } from '../../hooks'
import { TaskModel } from '../../models'

type Props = {
    task: TaskModel
    onSelect?: (data: TaskModel) => void
    onEdit?: (data: TaskModel) => void
    onDelete?: (data: TaskModel) => void
    hideAction?: boolean
    onComplete?: (data: TaskModel) => void
}

const TaskCard2 = ({ task, onSelect, onEdit, onDelete, onComplete, hideAction }: Props) => {
    const { colors } = useTheme()
    const { t } = useTranslation()
    const swipeableRef = React.useRef<SwipeableMethods>(null)

    const renderRightActions = () => (
        <View style={{ flexDirection: 'row', gap: Sizes.padding / 2, marginLeft: Sizes.padding / 2 }}>
            <TouchableOpacity
                onPress={() => {
                    onEdit && onEdit(task)
                    if (swipeableRef.current) {
                        swipeableRef.current.close()
                    }
                }}
                style={[styles.buttonAction, { backgroundColor: Colors.blue }]}
            >
                <Icons.Edit color="white" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    onDelete && onDelete(task)
                    if (swipeableRef.current) {
                        swipeableRef.current.close()
                    }
                }}
                style={[styles.buttonAction, { backgroundColor: Colors.lightRed2 }]}
            >
                <Icons.Trash color="white" size={20} />
            </TouchableOpacity>
        </View>
    )
    const renderLeftActions = () => (
        <View style={[styles.buttonAction, { backgroundColor: colors.accent, width: 120 }]}>
            <TextComponent text={t(task.completed ? 'reopenTask' : 'completed')} style={Fonts.body3} />
        </View>
    )

    return (
        <Swipeable
            renderRightActions={task.completed ? undefined : renderRightActions}
            renderLeftActions={renderLeftActions}
            onSwipeableOpen={(direction) => {
                if (direction === 'right') {
                    if (swipeableRef.current) {
                        swipeableRef.current.close()
                    }
                    onComplete && onComplete(task)
                }
            }}
            ref={swipeableRef}
            enabled={!hideAction}>
            <TouchableOpacity
                style={{
                    backgroundColor: colors.containerBackground,
                    padding: Sizes.padding,
                    borderRadius: Sizes.radius,
                    borderWidth: 1,
                    borderLeftWidth: 5,
                    borderRightColor: colors.divider,
                    borderTopColor: colors.divider,
                    borderBottomColor: colors.divider,
                    borderLeftColor: task.category?.color || colors.primary,
                }}
                onPress={() => onSelect && onSelect(task)}
            >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Sizes.padding }}>
                    <View style={{ alignSelf: 'flex-start' }}>
                        {task.completed ? <Icons.CheckCircle size={24} color={colors.primary} /> : <Icons.Circle size={24} color={colors.primary} />}
                    </View>

                    <View style={{ flex: 1 }}>
                        <TextComponent
                            text={task.title}
                            style={task.completed ? Fonts.body3 : Fonts.h3}
                            color={task.completed ? colors.textSecondary : colors.text}
                            numberOfLines={1}
                            textDecorationLine={task.completed ? 'line-through' : undefined} />
                        <TextComponent
                            text={task.description}
                            style={Fonts.body4}
                            color={colors.textSecondary}
                            numberOfLines={1}
                            textDecorationLine={task.completed ? 'line-through' : undefined} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: Sizes.padding }}>
                            {task.isAlert && (
                                <View style={{ flexDirection: 'row', gap: Sizes.padding / 2, alignItems: 'center' }}>
                                    <Icons.notification color={colors.text} size={18} />
                                    <TextComponent text={formatHourMinute24h(task.dateTime.toString())} />
                                </View>
                            )}
                            {task.category && (
                                <View style={{ flexDirection: 'row', gap: Sizes.padding / 2, alignItems: 'center' }}>
                                    <View
                                        style={{
                                            backgroundColor: task.category.color,
                                            padding: 5,
                                            borderRadius: 5,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 18,
                                            height: 18,
                                        }}
                                    >
                                        <Image source={task.category.icon} style={{ width: 12, height: 12, tintColor: Colors.white }} />
                                    </View>
                                    <TextComponent text={task.category?.text} style={Fonts.body4} color={colors.text} />
                                </View>
                            )}
                            {task.actualFocusTimeInSec && (
                                <View style={{ flexDirection: 'row', gap: Sizes.padding / 2, alignItems: 'center' }}>
                                    <Icons.timer color={colors.accent} size={18} />
                                    <TextComponent text={formatActualTime(task.actualFocusTimeInSec)} color={colors.accent} style={Fonts.h3} />
                                </View>
                            )}
                        </View>
                    </View>
                    {!task.completed && <View
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            backgroundColor: colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: Sizes.s,
                            alignSelf: 'flex-start'
                        }}
                    >
                        <Icons.play color="white" size={16} />
                    </View>}
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

export default TaskCard2

const styles = StyleSheet.create({
    buttonAction: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: '100%',
        borderRadius: Sizes.radius,
    },
})
