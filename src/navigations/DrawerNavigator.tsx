import { useEffect } from "react"
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from "@react-navigation/drawer"
import { useDispatch, useSelector } from "react-redux"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import i18n from 'i18next'
import { useTranslation } from "react-i18next"

import { fetchSomeTask } from "../redux/Reducers/TasksReducer"
import SettingsScreen from "../screens/SettingsScreen"
import { Image, Linking, View } from "react-native"
import MainNavigator from "./MainNavigator"
import { Colors, Fonts, Images, Sizes } from "../contants"
import TextComponent from "../components/TextComponent"
import UtilStyles from "../utils/UtilStyles"
import Divider from "../components/Divider"
import CategoriesScreen from "../screens/CategoriesScreen"
import { AboutScreen, AccountSyncScreen } from "../screens"
import { getAppLanguage, getAppTheme, getAutoBackup } from "../services/AsyncStorage"
import { setTheme } from "../redux/actions"
import { useTheme } from "../hooks"
import { fetchSomeCategory } from "../redux/Reducers/CategoriesReducer"
import { handleAsyncData } from "../utils"
import { StateModel } from "../models"
import { selectCategories, selectTasks } from "../redux/selectors"

const Drawer = createDrawerNavigator()

export type SettingStackParamList = {
  SettingsScreen: undefined,
  AccountSyncScreen: undefined,
  AboutScreen: undefined,
}

const Stack = createStackNavigator<SettingStackParamList>()

const SettingsNavigator = () => {

  return (
    <Stack.Navigator initialRouteName='SettingsScreen'>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AccountSyncScreen" component={AccountSyncScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

type DrawerStackParamList = {
  Main: undefined,
  Categories: undefined,
  Settings: undefined
}


const DrawerNavigator = () => {

  const dispatch = useDispatch<any>()
  const { t } = useTranslation()
  const { colors } = useTheme()
  const tasks = useSelector((state: StateModel) => selectTasks(state))
  const categories = useSelector((state: StateModel) => selectCategories(state))

  const loadLanguage = async () => {
    const storedLang = await getAppLanguage()
    if (storedLang) {
      i18n.changeLanguage(storedLang)
    }
  }

  const loadTheme = async () => {
    const storedTheme = await getAppTheme()
    if (storedTheme) {
      dispatch(setTheme(storedTheme))
    }
  }

  useEffect(() => {
    dispatch(fetchSomeTask)
    dispatch(fetchSomeCategory)
    loadLanguage()
    loadTheme()
  }, [])

  function CustomDrawerContent(props: any) {
    const navigation = useNavigation<NavigationProp<DrawerStackParamList>>()
    return (
      <DrawerContentScrollView {...props} style={{ backgroundColor: colors.background }}>
        <View style={{ alignItems: 'center', marginVertical: Sizes.padding * 2 }}>
          <Image source={Images.logo} style={{ width: 100, height: 100 }} />
          <TextComponent text={'DailyTask'} style={{ ...Fonts.h2, fontWeight: 'bold' }} />
        </View>
        <Divider height={.4} color={colors.textSecondary} />
        <DrawerItem
          label={t('home')}
          labelStyle={{ color: colors.textPrimary }}
          icon={() => <Image source={Images.home} style={[UtilStyles.icon, { tintColor: colors.textPrimary }]} />}
          onPress={() => navigation.navigate('Main')}
        />
        <DrawerItem
          label={t('categories')}
          labelStyle={{ color: colors.textPrimary }}
          icon={() => <Image source={Images.category} style={[UtilStyles.icon, { tintColor: colors.textPrimary }]} />}
          onPress={() => navigation.navigate('Categories')}
        />
        <Divider height={.4} color={colors.textSecondary} />
        <DrawerItem
          label={t('settings')}
          labelStyle={{ color: colors.textPrimary }}
          icon={() => <Image source={Images.settings} style={[UtilStyles.icon, { tintColor: colors.textPrimary }]} />}
          onPress={() => navigation.navigate('Settings')}
        />
        <DrawerItem
          label={t('rateThisApp')}
          labelStyle={{ color: colors.textPrimary }}
          icon={() => <Image source={Images.star} style={[UtilStyles.icon, { tintColor: colors.textPrimary }]} />}
          onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.dtaskapp")}
        />
        <DrawerItem
          label={t('contactUs')}
          labelStyle={{ color: colors.textPrimary }}
          icon={() => <Image source={Images.info} style={[UtilStyles.icon, { tintColor: colors.textPrimary }]} />}
          onPress={() => Linking.openURL("mailto:thanh.ph2021@gmail.com")}
        />

      </DrawerContentScrollView>
    )
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="Main"
        component={MainNavigator}
      />
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator