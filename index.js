import PushNotificationIOS from "@react-native-community/push-notification-ios"
import PushNotification from "react-native-push-notification"
import { GoogleSignin } from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.file'],
  webClientId: '',
})

PushNotification.configure({

  onRegister: function (token) {
    console.log("TOKEN:", token)
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification)

    notification.finish(PushNotificationIOS.FetchResult.NoData)
  },

  onAction: function (notification) {
    console.log("ACTION:", notification.action)
    console.log("NOTIFICATION:", notification)

  },

  onRegistrationError: function(err) {
    console.error(err.message, err)
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: Platform.OS === 'ios',
});

import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'

import './src/i18n/i18n.config'

AppRegistry.registerComponent(appName, () => App)
