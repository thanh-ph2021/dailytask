import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { TFunction } from 'i18next'

import { TaskModel } from '../../models'
import { Sizes, Fonts } from '../../constants'
import { TextComponent, TaskCard2 } from '../../components'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'
import { Icons } from '../../utils'

interface TaskSelectorProps {
    data: TaskModel[]
    onSelect: (task: TaskModel) => void
    colors: ThemeColor
    t: TFunction
    onClose: () => void
}

const TaskSelector = ({ data, onSelect, colors, t, onClose }: TaskSelectorProps) => {
    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Sizes.padding }}>
                <TextComponent text={t('selectTask')} style={{ ...Fonts.h2, fontWeight: 'bold' }} />
                <TouchableOpacity onPress={onClose}>
                    <Icons.close size={30} color={colors.text} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id!}
                renderItem={({ item }) => (
                    <TaskCard2 task={item} onSelect={() => onSelect(item)} hideAction />
                )}
                contentContainerStyle={{ gap: Sizes.padding, marginBottom: Sizes.padding }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: Sizes.padding }}>
                        <TextComponent text={t('noTasksToday')} style={Fonts.body3} color={colors.textSecondary} />
                    </View>
                }
                ListFooterComponent={() => <View style={{ height: Sizes.padding * 6 }} />}
            />
        </>
    )
}

export default TaskSelector
