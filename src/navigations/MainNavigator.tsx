import { createStackNavigator } from '@react-navigation/stack'
import AddTaskScreen from '../screens/AddTaskScreen'
import BottomTabNavigator from './BottomTabNavigator'
import CategoriesScreen from '../screens/CategoriesScreen'

export type RootStackParamList = {
  MainTabs: undefined
  AddTask: undefined
  Categories: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const MainNavigator = () => {

  return (
    <Stack.Navigator initialRouteName='MainTabs'>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default MainNavigator