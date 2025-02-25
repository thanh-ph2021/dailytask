import { View, TouchableOpacity, Image } from 'react-native'
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { DrawerActions } from '@react-navigation/native'

import HomeScreen from "../screens/HomeScreen"
import { Colors, Images } from '../contants'
import OverviewScreen from '../screens/OverviewScreen'
import { useTheme } from '../hooks'

type BottomTabParamList = {
    Drawer: undefined,
    Home: undefined,
    Overview: undefined,
}

const Tab = createBottomTabNavigator<BottomTabParamList>()

const AppTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
    const { colors } = useTheme()

    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
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
                        });

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
                        <Image
                            source={route.name === "Drawer" ? Images.drawer : route.name === "Home" ? Images.home : Images.overview}
                            style={{ width: 30, height: 30, tintColor: isFocused ? Colors.primary : "gray" }}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
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
            <Tab.Screen name="Overview" component={OverviewScreen} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator