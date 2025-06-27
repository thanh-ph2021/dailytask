import { useEffect, useRef, useState } from 'react'

import { FOCUS_DURATION, SHORT_BREAK_DURATION, LONG_BREAK_DURATION } from '../contants'

type Mode = 'focus' | 'short-break' | 'long-break'
type TimerMode = 'countdown' | 'countup'

export const usePomodoroTimer = (timerMode: TimerMode) => {
    const [mode, setMode] = useState<Mode>('focus')
    const [sessionCount, setSessionCount] = useState(0)
    const [secondsLeft, setSecondsLeft] = useState(timerMode === 'countdown' ? FOCUS_DURATION : 0)
    const [isRunning, setIsRunning] = useState(false)
    const [isSessionDone, setIsSessionDone] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (timerMode === 'countdown') {
                        if (prev <= 1) {
                            clearInterval(timerRef.current!)
                            setIsSessionDone(true)
                            return 0
                        }
                        return prev - 1
                    } else {
                        return prev + 1
                    }
                })
            }, 1000)
        } else {
            clearInterval(timerRef.current!)
        }

        return () => clearInterval(timerRef.current!)
    }, [isRunning, timerMode])

    const handleSessionComplete = () => {
        if (mode === 'focus') {
            const newSession = sessionCount + 1
            setSessionCount(newSession)
            if (newSession % 4 === 0) {
                setMode('long-break')
                setSecondsLeft(LONG_BREAK_DURATION)
            } else {
                setMode('short-break')
                setSecondsLeft(SHORT_BREAK_DURATION)
            }
        } else {
            setMode('focus')
            setSecondsLeft(FOCUS_DURATION)
        }
        setIsRunning(false)
    }

    const resetTimer = () => {
        setIsRunning(false)
        setSecondsLeft(timerMode === 'countdown' ? FOCUS_DURATION : 0)
        setSessionCount(0)
        setMode('focus')
    }

    const getDuration = (mode: Mode, timerMode: TimerMode) => {
        if (timerMode === 'countdown') {
            if (mode === 'focus') return FOCUS_DURATION
            if (mode === 'short-break') return SHORT_BREAK_DURATION
            return LONG_BREAK_DURATION
        } else {
            return secondsLeft || 1
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
    }
}
