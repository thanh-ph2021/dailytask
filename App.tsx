import React, { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import { NotifierWrapper } from 'react-native-notifier'
import { GestureHandlerRootView } from "react-native-gesture-handler"
import PushNotification, { Importance } from "react-native-push-notification"
import { PortalProvider } from "@gorhom/portal"

import { store } from "./src/redux/store"
import MainNavigator from "./src/navigations/MainNavigator"
import { StatusBar } from "react-native"
import DrawerNavigator from "./src/navigations/DrawerNavigator"
import 'react-native-gesture-handler'
import SplashScreen from "./src/screens/SplashScreen"


function App() {
  const [isShowSplash, setIsShowSplash] = useState(true)
  useEffect(() => {
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

    const timeout = setTimeout(() => {
      setIsShowSplash(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      {isShowSplash ? (<SplashScreen />) : (
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
      )}
    </>
  );
}

export default App;
