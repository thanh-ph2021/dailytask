import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { TFunction } from 'i18next'

import { Divider, TextComponent } from '../../components'
import { Sizes, Fonts, Colors } from '../../contants'
import { Icons } from '../../utils'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'

interface Props {
    timerMode: 'countdown' | 'countup'
    onConfirm: (mode: 'countdown' | 'countup') => void
    onCancel: () => void
    colors: ThemeColor
    t: TFunction<"translation", undefined>
}

const TimerModePicker = ({ timerMode, onConfirm, onCancel, colors, t }: Props) => {
    const [selectedMode, setSelectedMode] = useState<'countdown' | 'countup'>(timerMode)

    useEffect(() => {
        setSelectedMode(timerMode)
    }, [timerMode])

    return (
        <View>
            <TextComponent text={t('timerMode')} style={{ ...Fonts.h2, marginBottom: Sizes.padding }} />
            <Divider color={colors.textSecondary} height={0.3} />
            {[
                ['countdown',
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Sizes.padding }}>
                        <TextComponent text="25:00 " style={Fonts.body2} />
                        <Icons.arrowRight size={24} color={colors.text} />
                        <TextComponent text="00:00" style={Fonts.body2} />
                    </View>,
                    t('countdownDescription')
                ],
                ['countup',
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Sizes.padding }}>
                        <TextComponent text="00:00 " style={Fonts.body2} />
                        <Icons.arrowRight size={24} color={colors.text} />
                        <Icons.unlimited size={32} color={colors.text} />
                    </View>,
                    t('countupDescription')
                ]
            ].map(([mode, label, desc]) => (
                <TouchableOpacity
                    key={mode as string}
                    onPress={() => setSelectedMode(mode as any)}
                    style={{
                        paddingVertical: Sizes.padding,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {label}
                        </View>
                        <TextComponent text={desc as string} style={Fonts.body5} color={colors.textSecondary} />
                    </View>
                    {selectedMode === mode && <Icons.tickCircle color={colors.primary} size={30} />}
                </TouchableOpacity>
            ))}
            <View style={{ position: 'absolute', bottom: -90, left: 0, right: 0 }}>
                <Divider color={colors.textSecondary} height={0.5} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={onCancel}
                        style={{
                            backgroundColor: colors.surface,
                            flex: 1,
                            marginRight: Sizes.padding,
                            borderRadius: Sizes.radius * 2,
                            padding: Sizes.padding,
                        }}
                    >
                        <TextComponent text={t('cancel')} style={[Fonts.h3, { textAlign: 'center' }]} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onConfirm(selectedMode)}
                        style={{
                            backgroundColor: colors.primary,
                            flex: 1,
                            borderRadius: Sizes.radius * 2,
                            padding: Sizes.padding,
                        }}
                    >
                        <TextComponent text={t('OK')} style={[Fonts.h3, { textAlign: 'center' }]} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default TimerModePicker
