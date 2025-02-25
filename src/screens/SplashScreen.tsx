import React from 'react'
import { Image, View, StatusBar } from "react-native"

import { Images } from "../contants"

const SplashScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <StatusBar hidden />
            <Image source={Images.logo} resizeMode="cover" style={{ width: 150, height: 150 }} />
        </View>
    )
}

export default SplashScreen