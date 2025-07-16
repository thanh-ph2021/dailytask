import React, { useEffect } from "react"
import { Provider } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { PortalProvider } from "@gorhom/portal"
import SplashScreen from 'react-native-splash-screen'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'

import { store } from "./src/redux/store"
import DrawerNavigator from "./src/navigations/DrawerNavigator"
import { requestNotificationPermission, setupNotificationChannel } from "./src/services/NotificationService"
import { toastConfig } from "./src/utils/toast"
import { useCheckVersion } from "./src/hooks/useCheckVersion"

function App() {
  const { version } = useCheckVersion()

  useEffect(() => {
    SplashScreen.hide()

    const initNotification = async () => {
      await setupNotificationChannel()
      await requestNotificationPermission()
    }

    initNotification()

    version.onCheckVersionSilently()
  }, [])

  return (
    <>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PortalProvider>
            <NavigationContainer>
              <DrawerNavigator />
              <Toast config={toastConfig} />
            </NavigationContainer>
          </PortalProvider>
        </GestureHandlerRootView>
      </Provider>
    </>
  )
}

export default App
