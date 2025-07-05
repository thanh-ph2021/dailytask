import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
  Notification,
} from '@notifee/react-native'

const CHANNEL_ID = 'default'

export async function setupNotificationChannel() {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Nhắc nhở',
    importance: AndroidImportance.HIGH,
  })
}

export async function requestNotificationPermission() {
  const settings = await notifee.requestPermission()
  return settings.authorizationStatus >= 1
}

export async function scheduleNotification({
  id,
  title,
  body,
  date,
  repeat = false,
}: {
  id: string
  title: string
  body: string
  date: Date
  repeat?: boolean
}) {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency: repeat ? RepeatFrequency.DAILY : undefined,
  }

  const notification: Notification = {
    id,
    title,
    body,
    android: {
      channelId: CHANNEL_ID,
      smallIcon: 'ic_launcher', // đặt icon đúng tên
      style: {
        type: AndroidStyle.BIGTEXT,
        text: body,
      },
      color: '#1976D2',
    },
    ios: {
      sound: 'default',
    },
  }

  await notifee.createTriggerNotification(notification, trigger)
}

export async function cancelNotification(id: string) {
  await notifee.cancelNotification(id)
}

export async function cancelAllScheduledNotifications() {
  await notifee.cancelAllNotifications()
}

export function handleNotificationPress(callback: (data: any) => void) {
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      callback(detail.notification)
    }
  })
}
