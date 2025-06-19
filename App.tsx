import React, { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import { NotifierWrapper } from 'react-native-notifier'
import { GestureHandlerRootView } from "react-native-gesture-handler"
import PushNotification, { Importance } from "react-native-push-notification"
import { PortalProvider } from "@gorhom/portal"
import SplashScreen from 'react-native-splash-screen'
import 'react-native-gesture-handler'

import { store } from "./src/redux/store"
import DrawerNavigator from "./src/navigations/DrawerNavigator"

function App() {
  useEffect(() => {
    SplashScreen.hide()

    PushNotification.createChannel(
      {
        channelId: "alert-channel-id-test",
        channelName: `Alert channel`,
        channelDescription: "Alert channel",
        importance: Importance.HIGH,
        playSound: true,
        vibrate: true,
      },
      (created) => console.log(`createChannel 'alert-channel-id' returned '${created}'`)
    )
  }, [])

  return (
    <>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PortalProvider>
            <NotifierWrapper>
              <NavigationContainer>
                <DrawerNavigator />
              </NavigationContainer>
            </NotifierWrapper>
          </PortalProvider>
        </GestureHandlerRootView>
      </Provider>
    </>
  )
}

export default App
