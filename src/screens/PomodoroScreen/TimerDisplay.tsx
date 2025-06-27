import React, { memo } from 'react'
import { View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { TFunction } from 'i18next'

import { Sizes } from '../../contants'
import { TextComponent } from '../../components'
import { Fonts } from '../../contants'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'

interface TimerDisplayProps {
    secondsLeft: number;
    timerMode: 'countdown' | 'countup';
    totalDuration: number;
    isRunning: boolean;
    mode: 'focus' | 'short-break' | 'long-break';
    sessionCount: number;
    formatTime: (secs: number) => string;
    colors: ThemeColor
    t: TFunction<"translation", undefined>
}

const TimerDisplay = ({
    secondsLeft,
    timerMode,
    totalDuration,
    isRunning,
    mode,
    sessionCount,
    formatTime,
    colors,
    t
}: TimerDisplayProps) => {
    const fillValue = timerMode === 'countdown'
        ? (secondsLeft / totalDuration) * 100
        : 100;

    return (
        <View style={{ elevation: 6, padding: Sizes.padding * 2, backgroundColor: colors.background, borderRadius: Sizes.width }}>
            <AnimatedCircularProgress
                size={250}
                width={25}
                fill={fillValue}
                tintColor={timerMode === 'countup' ? colors.background : isRunning && mode === 'focus' ? colors.accent : colors.primary}
                backgroundColor={timerMode === 'countup' ? colors.background : "#E0E0E0"}
                duration={1000}
                rotation={0}
                lineCap="round"
            >
                {() => (
                    <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                        <TextComponent text={formatTime(secondsLeft).toString()} style={Fonts.time} />
                        {timerMode === 'countdown' && (
                            <TextComponent
                                text={
                                    mode === 'focus'
                                        ? sessionCount === 0
                                            ? t('noSessions')
                                            : t('sessions', { count: sessionCount })
                                        : t(mode === 'short-break' ? 'shortBreak' : 'longBreak')
                                }
                                style={Fonts.body4}
                                color={colors.textSecondary}
                            />
                        )}
                    </View>
                )}
            </AnimatedCircularProgress>
        </View>
    )
}

export default memo(TimerDisplay)
