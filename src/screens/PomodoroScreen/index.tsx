import { useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity, ImageBackground, InteractionManager, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Colors, FOCUS_DURATION, Fonts, Images, Sizes } from '../../contants'
import { usePomodoroTimer, useTheme } from '../../hooks'
import { completeTaskPomodoroHandle } from '../../redux/Reducers/TasksReducer'
import { makeSelectPendingTasksFilter } from '../../redux/selectors'
import { Icons, showNotification } from '../../utils'
import { Container, Header, AlertModal, AppBottomSheet, TextComponent } from '../../components'
import TimerDisplay from './TimerDisplay'
import TaskSelector from './TaskSelector'
import TimerModePicker from './TimerModePicker'
import { TaskModel } from '../../models'
import SelectPicker from '../../components/SelectPicker'
import { styles } from './style'
import PomodoroInfo from './PomodoroInfo'

const PomodoroScreen = () => {
    const { t } = useTranslation()
    const { colors, isDark } = useTheme()
    const dispatch = useDispatch<any>()
    const data = useSelector(makeSelectPendingTasksFilter(new Date()))

    const [selectedTask, setSelectedTask] = useState<TaskModel | null>(null)
    const [alert, setAlert] = useState({ visible: false, type: 'warning' as const, description: '' })
    const [bottomSheetMode, setBottomSheetMode] = useState<'task' | 'timer' | 'info'>('task')
    const [timerMode, setTimerMode] = useState<'countdown' | 'countup'>('countdown')
    const [shouldOpenSheet, setShouldOpenSheet] = useState(false)
    const [isCompleting, setIsCompleting] = useState(false)

    const openSheetWithMode = (mode: 'task' | 'timer' | 'info') => {
        setBottomSheetMode(mode)
        setShouldOpenSheet(true)
    }

    useEffect(() => {
        if (shouldOpenSheet) {
            bottomSheetRef.current?.snapTo(0)
            setShouldOpenSheet(false)
        }
    }, [shouldOpenSheet])

    const {
        isRunning,
        secondsLeft,
        sessionCount,
        mode,
        isSessionDone,
        setIsRunning,
        setIsSessionDone,
        setSecondsLeft,
        setMode,
        resetTimer,
        handleSessionComplete,
        totalDuration
    } = usePomodoroTimer(timerMode)

    const bottomSheetRef = useRef<any>(null)

    useEffect(() => {
        if (!isSessionDone) return

        handleSessionComplete()
        setIsSessionDone(false)
    }, [isSessionDone])

    const handleComplete = async () => {
        if (!selectedTask) return
        setIsCompleting(true)
        await dispatch(completeTaskPomodoroHandle({
            ...selectedTask,
            actualFocusTimeInSec: timerMode === 'countdown'
                ? sessionCount * FOCUS_DURATION + (FOCUS_DURATION - secondsLeft)
                : secondsLeft,
        }))
        showNotification(t('taskCompleted', { something: selectedTask.title }), Icons.success, 4000)
        resetTimer()
        setSelectedTask(null)
        setIsCompleting(false)
    }

    const handleSkipBreak = () => {
        setMode('focus')
        setSecondsLeft(FOCUS_DURATION)
        setIsRunning(false)
    }

    const handleClose = () => {
        setAlert({
            visible: true,
            description: `${t('confirmExitTask')}`,
            type: 'warning'
        })
    }

    const formatTime = (secs: number) => {
        if (timerMode === 'countup') {
            const hrs = Math.floor(secs / 3600).toString().padStart(2, '0')
            const min = Math.floor((secs % 3600) / 60).toString().padStart(2, '0')
            const sec = (secs % 60).toString().padStart(2, '0')
            return `${hrs}:${min}:${sec}`
        } else {
            const min = Math.floor(secs / 60).toString().padStart(2, '0')
            const sec = (secs % 60).toString().padStart(2, '0')
            return `${min}:${sec}`
        }
    }

    const renderBottomSheetContent = () => {
        if (bottomSheetMode === 'task') {
            return <TaskSelector
                data={data}
                onSelect={(task) => {
                    bottomSheetRef.current?.close()

                    InteractionManager.runAfterInteractions(() => {
                        setSelectedTask(task)
                    })
                }}
                colors={colors}
                t={t}
            />
        } else if (bottomSheetMode === 'info') {
            return <PomodoroInfo colors={colors} t={t} />
        }
        return (
            <TimerModePicker
                timerMode={timerMode}
                onCancel={() => bottomSheetRef.current?.close()}
                onConfirm={(newTimerMode) => {
                    bottomSheetRef.current?.close()

                    InteractionManager.runAfterInteractions(() => {
                        setTimerMode(newTimerMode)
                        setSecondsLeft(newTimerMode === 'countdown' ? FOCUS_DURATION : 0)
                        setIsRunning(false)
                    })
                }}
                colors={colors}
                t={t}
            />
        )
    }

    return (
        <Container>
            <ImageBackground
                source={isDark ? Images.pomodoroBgDark : Images.pomodoroBg}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                resizeMode="cover"
            >
                <Header
                    title={t('Pomodoro').toUpperCase()}
                    textStyle={{ textAlign: 'center', color: Colors.white }}
                    headerRight={
                        <TouchableOpacity onPress={() => openSheetWithMode('info')}>
                            <Icons.info color={Colors.white} size={Sizes.xl} />
                        </TouchableOpacity>
                    }
                />

                <View style={{ paddingHorizontal: Sizes.padding, marginTop: Sizes.padding }}>
                    {selectedTask ? (
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: Colors.white,
                            paddingVertical: Sizes.padding * 1.5,
                            paddingHorizontal: Sizes.padding,
                            borderRadius: Sizes.radius,
                            borderWidth: 0.3,
                            borderLeftWidth: 5,
                            borderLeftColor: selectedTask.category?.color || colors.primary,
                            width: '100%',
                            justifyContent: 'space-between',
                        }}>
                            <TextComponent text={selectedTask.title} style={Fonts.h3} color={Colors.black} />
                            <TouchableOpacity onPress={handleClose}>
                                <Icons.close size={24} color={Colors.black} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <SelectPicker
                            value={''}
                            placeholder={t('selectTask')}
                            onPress={() => {
                                openSheetWithMode('task')

                            }}
                        />
                    )}
                </View>

                <View style={styles.timerContainer}>
                    <TimerDisplay
                        secondsLeft={secondsLeft}
                        timerMode={timerMode}
                        totalDuration={totalDuration}
                        isRunning={isRunning}
                        mode={mode}
                        sessionCount={sessionCount}
                        formatTime={formatTime}
                        colors={colors}
                        t={t}
                    />

                    {mode !== 'focus' ? (
                        isRunning ? (
                            <TouchableOpacity style={[styles.startButton, { borderWidth: 1, borderColor: colors.primary }]} onPress={handleSkipBreak}>
                                <TextComponent text={t('skipBreak')} style={Fonts.h3} color={Colors.primary} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={[styles.startButton, { backgroundColor: colors.primary }]} onPress={() => setIsRunning(true)}>
                                <TextComponent text={t('startBreak')} style={Fonts.h3} color={Colors.white} />
                            </TouchableOpacity>
                        )
                    ) : isRunning ? (
                        <TouchableOpacity style={[styles.startButton, { borderWidth: 1, borderColor: colors.primary }]} onPress={() => setIsRunning(false)}>
                            <TextComponent text={t('pause')} style={Fonts.h3} color={colors.primary} />
                        </TouchableOpacity>
                    ) : (timerMode === 'countdown' ? secondsLeft !== totalDuration : secondsLeft > 0) ? (
                        <View style={styles.pauseOptions}>
                            <TouchableOpacity
                                style={[styles.startButton, { width: '40%', backgroundColor: colors.accent, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: Sizes.padding }]}
                                onPress={handleComplete}
                                disabled={isCompleting}
                            >
                                {isCompleting ? (
                                    <ActivityIndicator color={Colors.white} size="small" />
                                ) : (
                                    <TextComponent text={t('complete')} style={Fonts.h3} color={Colors.white} textAlign='center' />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.startButton, { width: '40%', backgroundColor: colors.primary }]} onPress={() => setIsRunning(true)}>
                                <TextComponent text={t('continue')} style={Fonts.h3} color={Colors.white} textAlign='center' />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={[styles.startButton, { flexDirection: 'row', gap: Sizes.padding, backgroundColor: !selectedTask ? Colors.gray : colors.primary }]}
                            onPress={() => setIsRunning(true)}
                            disabled={!selectedTask}
                        >
                            <Icons.play color={Colors.white} size={24} />
                            <TextComponent text={t('startToFocus')} style={Fonts.h3} color={Colors.white} />
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity style={styles.optionsRow} onPress={() => {
                    openSheetWithMode('timer')
                }}>
                    <View style={styles.optionItem}>
                        <Icons.timer color={colors.textSecondary} size={24} />
                        <TextComponent text={t('timerMode')} style={Fonts.body4} />
                    </View>
                </TouchableOpacity>
            </ImageBackground>

            <AppBottomSheet
                ref={bottomSheetRef}
                enableDynamicSizing
                snapPoints={[Sizes.height * 0.45, Sizes.height]}
                backgroundStyle={{ backgroundColor: colors.containerBackground }}
                handleIndicatorStyle={{ backgroundColor: colors.text, opacity: 0.3 }}
            >
                <View style={{ height: '100%', gap: Sizes.padding, marginHorizontal: Sizes.padding }}>
                    {renderBottomSheetContent()}
                </View>
            </AppBottomSheet>

            <AlertModal
                type={'warning'}
                description={alert.description}
                visible={alert.visible}
                onClose={() => setAlert({ ...alert, visible: false })}
                onOk={() => {
                    setSelectedTask(null)
                    resetTimer()
                    setAlert({ ...alert, visible: false })
                }}
            />
        </Container>
    )
}

export default PomodoroScreen
