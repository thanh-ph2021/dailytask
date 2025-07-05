import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { View } from 'react-native'
import { AppBottomSheet } from '../../../components'
import TimerModePicker from '../TimerModePicker'
import { Sizes } from '../../../constants'


const TimerModePickerSheet = forwardRef(({ timerMode, onConfirm, colors, t }, ref) => {
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
                <TimerModePicker
                    timerMode={timerMode}
                    onCancel={() => sheetRef.current?.close()}
                    onConfirm={(mode) => {
                        sheetRef.current?.close()
                        onConfirm(mode)
                    }}
                    colors={colors}
                    t={t}
                />
            </View>
        </AppBottomSheet>
    )
})

export default TimerModePickerSheet
