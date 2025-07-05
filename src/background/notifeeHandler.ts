import notifee, { EventType } from '@notifee/react-native'

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification } = detail

    switch (type) {
        case EventType.PRESS:
            console.log('[Background] User pressed notification:', notification)

            if (notification?.data?.id) {

            }

            break

        default:
            break
    }
})