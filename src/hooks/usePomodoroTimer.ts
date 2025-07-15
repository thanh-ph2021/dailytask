import { useEffect, useRef, useState } from 'react'
import { FOCUS_DURATION, SHORT_BREAK_DURATION, LONG_BREAK_DURATION, Mode } from '../constants'
import { cancelNotification, scheduleNotification } from '../services/NotificationService'
import { useTranslation } from 'react-i18next'

type TimerMode = 'countdown' | 'countup'
const NOTIFICATION_POMODORO_DONE_ID = 'NOTIFICATION_POMODORO_DONE_ID'

export const usePomodoroTimer = (timerMode: TimerMode) => {
    const { t } = useTranslation()

    // Current Pomodoro session mode: focus / short-break / long-break
    const [mode, setMode] = useState<Mode>('focus')

    // Total completed focus sessions
    const [sessionCount, setSessionCount] = useState(0)

    // Remaining (or elapsed) time in seconds
    const [secondsLeft, setSecondsLeft] = useState(timerMode === 'countdown' ? FOCUS_DURATION : 0)

    // Whether the timer is currently running
    const [isRunning, setIsRunning] = useState(false)

    // Whether the current session has ended
    const [isSessionDone, setIsSessionDone] = useState(false)

    // Internal ref for setInterval
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // The original duration of the session when it starts
    const initialDurationRef = useRef<number>(timerMode === 'countdown' ? FOCUS_DURATION : 0)

    // Timestamp when the session started (used to calculate elapsed time)
    const startTimeRef = useRef<number | null>(null)

    // Function executed every second to update the timer
    const tick = () => {
        if (!startTimeRef.current) return

        const now = Date.now()
        const elapsedSec = Math.floor((now - startTimeRef.current) / 1000)

        if (timerMode === 'countdown') {
            const remaining = initialDurationRef.current - elapsedSec
            if (remaining <= 0) {
                clearInterval(timerRef.current!)
                setIsRunning(false)
                setSecondsLeft(0)
                setIsSessionDone(true)
            } else {
                setSecondsLeft(remaining)
            }
        } else {
            // Countup mode: just keep adding elapsed time
            setSecondsLeft(initialDurationRef.current + elapsedSec)
        }
    }

    // Start or stop the interval based on isRunning
    useEffect(() => {
        if (!isRunning) return

        timerRef.current = setInterval(tick, 1000)

        return () => clearInterval(timerRef.current!)
    }, [isRunning])

    // Schedule local notification when session ends (for countdown mode only)
    const scheduleSessionEndNotification = (durationSec: number, mode: Mode) => {
        const title = mode === 'focus'
            ? t('focusSessionEnded')
            : t('breakSessionEnded')

        const body = mode === 'focus'
            ? t('timeToRest')
            : t('timeToWork')

        scheduleNotification({
            id: NOTIFICATION_POMODORO_DONE_ID,
            title,
            body,
            date: new Date(Date.now() + durationSec * 1000),
        })
    }

    // When a session completes, move to the next one (e.g., from focus to break)
    const handleSessionComplete = () => {
        if (mode === 'focus') {
            const newSession = sessionCount + 1
            setSessionCount(newSession)

            // After 4 focus sessions, switch to long break
            if (newSession % 4 === 0) {
                setMode('long-break')
                setSecondsLeft(LONG_BREAK_DURATION)
            } else {
                setMode('short-break')
                setSecondsLeft(SHORT_BREAK_DURATION)
            }
        } else {
            // After a break, return to focus
            setMode('focus')
            setSecondsLeft(FOCUS_DURATION)
        }

        setIsRunning(false)
    }

    // Start a new session (focus or break)
    const startSession = async () => {
        startTimeRef.current = Date.now()

        // Get the correct duration based on mode
        const duration = (() => {
            if (timerMode === 'countdown') {
                if (mode === 'focus') return FOCUS_DURATION
                if (mode === 'short-break') return SHORT_BREAK_DURATION
                if (mode === 'long-break') return LONG_BREAK_DURATION
            }
            return 0
        })()

        initialDurationRef.current = duration
        setSecondsLeft(duration)
        setIsRunning(true)

        // Only schedule notification for countdown sessions
        if (timerMode === 'countdown' && duration > 0) {
            scheduleSessionEndNotification(duration, mode)
        }
    }

    // Pause the current session and persist the time left
    const pauseSession = async () => {
        if (!startTimeRef.current) return

        const now = Date.now()
        const elapsedSec = Math.floor((now - startTimeRef.current) / 1000)

        if (timerMode === 'countdown') {
            const remaining = initialDurationRef.current - elapsedSec
            initialDurationRef.current = remaining
            setSecondsLeft(remaining)
            await cancelNotification(NOTIFICATION_POMODORO_DONE_ID)
        } else {
            const total = initialDurationRef.current + elapsedSec
            initialDurationRef.current = total
            setSecondsLeft(total)
        }

        setIsRunning(false)
        startTimeRef.current = null
    }

    // Resume the paused session
    const resumeSession = async () => {
        startTimeRef.current = Date.now()
        setIsRunning(true)

        if (timerMode === 'countdown') {
            scheduleSessionEndNotification(secondsLeft, mode)
        }
    }

    // Reset everything to initial state
    const resetTimer = () => {
        setIsRunning(false)
        setSecondsLeft(timerMode === 'countdown' ? FOCUS_DURATION : 0)
        setSessionCount(0)
        setMode('focus')
    }

    // Manually skip break and go straight to a new focus session
    const handleSkipBreak = async () => {
        setMode('focus')
        setSecondsLeft(FOCUS_DURATION)
        setIsRunning(false)

        await cancelNotification(NOTIFICATION_POMODORO_DONE_ID)
    }

    // Return the total duration for current mode (used for progress bars)
    const getDuration = (mode: Mode, timerMode: TimerMode) => {
        if (timerMode === 'countdown') {
            if (mode === 'focus') return FOCUS_DURATION
            if (mode === 'short-break') return SHORT_BREAK_DURATION
            return LONG_BREAK_DURATION
        } else {
            return secondsLeft || 1 // In countup mode, total grows over time
        }
    }

    return {
        secondsLeft,
        isRunning,
        mode,
        sessionCount,
        isSessionDone,
        setIsSessionDone,
        setIsRunning,
        setSecondsLeft,
        resetTimer,
        handleSessionComplete,
        setMode,
        totalDuration: getDuration(mode, timerMode),
        startSession,
        pauseSession,
        resumeSession,
        handleSkipBreak
    }
}
