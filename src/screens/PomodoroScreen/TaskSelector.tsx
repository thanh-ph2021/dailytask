import React from 'react'
import { FlatList, View } from 'react-native'
import { TFunction } from 'i18next'

import { TaskModel } from '../../models'
import { Sizes, Fonts } from '../../contants'
import { TextComponent, TaskCard2 } from '../../components'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'

interface TaskSelectorProps {
    data: TaskModel[]
    onSelect: (task: TaskModel) => void
    colors: ThemeColor
    t: TFunction
}

const TaskSelector = ({ data, onSelect, colors, t }: TaskSelectorProps) => {
    return (
        <>
            <TextComponent text={t('selectTask')} style={{ ...Fonts.h2, fontWeight: 'bold', marginBottom: Sizes.padding }} />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id!}
                renderItem={({ item }) => (
                    <TaskCard2 task={item} onSelect={() => onSelect(item)} hideAction/>
                )}
                contentContainerStyle={{ gap: Sizes.padding, marginBottom: Sizes.padding }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: Sizes.padding }}>
                        <TextComponent text={t('noTasksToday')} style={Fonts.body3} color={colors.textSecondary} />
                    </View>
                }
            />
        </>
    )
}

export default TaskSelector
