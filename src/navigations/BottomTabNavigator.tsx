import { View, TouchableOpacity } from 'react-native'
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { DrawerActions } from '@react-navigation/native'

import { Colors } from '../contants'
import { useTheme } from '../hooks'
import { PomodoroScreen, HomeScreen, OverviewScreen } from '../screens'
import { Icons } from '../utils'

type BottomTabParamList = {
    Drawer: undefined,
    Home: undefined,
    Overview: undefined,
    Pomodoro: undefined,
}

const Tab = createBottomTabNavigator<BottomTabParamList>()

const renderIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? Colors.primary : "gray"
    switch (routeName) {
        case "Drawer":
            return <Icons.menu size={30} color={color} />
        case "Home":
            return isFocused ? <Icons.homeFill size={30} color={color} /> : <Icons.home size={30} color={color} />
        case "Pomodoro":
            return isFocused ? <Icons.timerFill size={30} color={color} /> : <Icons.timer size={30} color={color} />
        case "Overview":
            return isFocused ? <Icons.chartFill size={30} color={color} /> : <Icons.chart size={30} color={color} />
        default:
            return null
    }
}

const AppTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
    const { colors } = useTheme()

    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.containerBackground,
            elevation: 6
        }}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index

                const onPress = () => {
                    if (route.name === "Drawer") {
                        navigation.dispatch(DrawerActions.openDrawer())
                    } else {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        })

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name)
                        }
                    }
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={{ flex: 1, alignItems: "center", padding: 10 }}
                    >
                        {renderIcon(route.name, isFocused)}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBar={props => <AppTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                lazy: true
            }}

        >
            <Tab.Screen name="Drawer" component={HomeScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Pomodoro" component={PomodoroScreen} />
            <Tab.Screen name="Overview" component={OverviewScreen} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator