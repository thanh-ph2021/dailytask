import { AppRegistry } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import mobileAds from 'react-native-google-mobile-ads'

import './src/background/notifeeHandler'
import App from './App'
import { name as appName } from './app.json'
import './src/i18n/i18n.config'

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.file'],
  webClientId: '',
})

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
  })

AppRegistry.registerComponent(appName, () => App);
