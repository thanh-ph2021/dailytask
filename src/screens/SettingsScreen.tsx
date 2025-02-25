import { useRef, useState } from "react"
import { StyleSheet, View, TouchableOpacity, Switch, ToastAndroid } from "react-native"
import { NavigationProp } from '@react-navigation/native'
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import { Colors, Fonts, Sizes } from "../contants"
import { selectTheme } from "../redux/selectors"
import { setTheme } from "../redux/actions"
import { SettingStackParamList } from "../navigations/DrawerNavigator"
import { saveAppLanguage, saveAppTheme } from "../services/AsyncStorage"
import { StateModel } from "../models"
import { AppBottomSheet, AppRadio, Container, Header, Icon, TextComponent, TypeIcons } from "../components"

const LANGUAGE_DATA = ['en', 'vi']

type SettingsScreenProps = {
    navigation: NavigationProp<SettingStackParamList, 'SettingsScreen'>,
}

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
    const { colors, isDark } = useSelector((state: StateModel) => selectTheme(state))
    const bottomSheetRef = useRef<any>(null)
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    const [checkedLanguage, setCheckedLanguage] = useState<string>(i18n.language)

    const handleLanguageChange = (value: string) => {
        i18n.changeLanguage(value)
        saveAppLanguage(value)
    }

    const toggleSwitch = (value: boolean) => {
        const newTheme = value ? 'dark' : 'light'
        dispatch(setTheme(newTheme))
        saveAppTheme(newTheme)
    }

    const showBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.snapTo(0)
        }
    }

    const renderLanguage = () => {
        return (
            <TextComponent text={t(i18n.language)} style={{ opacity: 0.5 }} />
        )
    }

    return (
        <Container>
            <Header
                title={t('settings').toUpperCase()}
                textStyle={{ textAlign: 'center' }}
                headerLeft={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon type={TypeIcons.Feather} name='chevron-left' color={colors.textPrimary} size={Sizes.xl} />
                    </TouchableOpacity>
                }
            />
            <View style={[styles.itemContainer, { backgroundColor: colors.surface }]}>
                <TouchableOpacity
                    style={styles.itemContent}
                    onPress={() => navigation.navigate('AccountSyncScreen')}
                >
                    <TextComponent text={t('backupData')} />
                    <Icon type={TypeIcons.Feather} name='chevron-right' color={colors.textPrimary} size={Sizes.l} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemContent}
                >
                    <TextComponent text={t('darkMode')} />
                    <Switch
                        trackColor={{ false: Colors.gray, true: Colors.secondary }}
                        thumbColor={isDark ? Colors.primary : Colors.white}
                        onValueChange={toggleSwitch}
                        value={isDark}
                        style={{ marginRight: -Sizes.padding / 1.5 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContent} onPress={showBottomSheet}>
                    <TextComponent text={t('language')} />
                    {renderLanguage()}
                </TouchableOpacity>
            </View>
            <View style={[styles.itemContainer, { backgroundColor: colors.surface }]}>
                <TouchableOpacity
                    style={styles.itemContent}
                    onPress={() => navigation.navigate('AboutScreen')}
                >
                    <TextComponent text={t('about')} />
                    <Icon type={TypeIcons.Feather} name='chevron-right' color={colors.textPrimary} size={Sizes.l} />
                </TouchableOpacity>
            </View>

            <AppBottomSheet
                ref={bottomSheetRef}
                snapPoints={[Sizes.height * 0.35]}
                backgroundStyle={{ backgroundColor: colors.surface }}
                handleIndicatorStyle={{ backgroundColor: colors.text, opacity: .3 }}
                containerStyle={{ margin: Sizes.padding, borderRadius: Sizes.padding }}
            >
                <View style={{ height: '60%', gap: Sizes.padding, marginHorizontal: Sizes.padding }}>
                    <TextComponent text={t('language')} style={{ ...Fonts.h3, fontWeight: 'bold', marginBottom: Sizes.padding }} />
                    <AppRadio
                        options={LANGUAGE_DATA}
                        checkedValue={checkedLanguage}
                        onChange={setCheckedLanguage}
                        onCallBack={handleLanguageChange}
                    />
                </View>
            </AppBottomSheet>
        </Container>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary
    },
    text: {
        fontSize: 20,
        fontWeight: '400',
        textDecorationLine: 'line-through'
    },
    strike: {
        position: 'absolute',
        height: 2,
        backgroundColor: 'red',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: Sizes.padding * 2,
        marginBottom: Sizes.padding * 2,
        borderBottomColor: Colors.lightGray2,
        borderBottomWidth: .3,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.padding,
    },
    itemContainer: {
        margin: Sizes.padding,
        paddingHorizontal: Sizes.padding,
        borderRadius: Sizes.radius
    }
})