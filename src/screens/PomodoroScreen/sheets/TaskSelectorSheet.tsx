import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { View } from 'react-native'
import { AppBottomSheet } from '../../../components'
import TaskSelector from '../TaskSelector'

const TaskSelectorSheet = forwardRef(({ data, onSelect, colors, t }, ref) => {
    const sheetRef = useRef(null)

    useImperativeHandle(ref, () => ({
        open: () => sheetRef.current?.snapTo(0),
        close: () => sheetRef.current?.close()
    }))

    return (
        <AppBottomSheet
            ref={sheetRef}
            enableDynamicSizing
            backgroundStyle={{ backgroundColor: colors.containerBackground }}
            handleIndicatorStyle={{ backgroundColor: colors.text, opacity: 0.3 }}
        >
            <View style={{ marginHorizontal: Sizes.padding }}>
                <TaskSelector
                    data={data}
                    onSelect={(task) => {
                        sheetRef.current?.close()
                        onSelect(task)
                    }}
                    colors={colors}
                    t={t}
                />
            </View>
        </AppBottomSheet>
    )
})

export default TaskSelectorSheet
