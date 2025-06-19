import { useEffect, useState } from 'react'
import { Image, StyleSheet, Switch, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleSignin, SignInResponse, User } from '@react-native-google-signin/google-signin'
import moment from 'moment'

import { selectCategories, selectTasks, selectTheme } from '../redux/selectors'
import { Fonts, Sizes } from '../contants'
import { getUserData, removeUserData, saveUserData } from '../services/EncryptedStorage '
import { Icons, saveDataToFile, showNotification } from '../utils'
import { GoogleDrive } from '../apis/GoogleDrive'
import { getLastSyncTime, removeLastSyncTime, saveLastSyncTime } from '../services/AsyncStorage'
import { CategoryModel, TaskModel, StateModel } from '../models'
import { asyncCategoriesHandle } from '../redux/Reducers/CategoriesReducer'
import { asyncTasksHandle } from '../redux/Reducers/TasksReducer'
import { Container, Header, Icon, LoadingDialog, TextComponent, TypeIcons } from '../components'

type asyncData = {
    categories: CategoryModel[],
    tasks: TaskModel[],
    lastSyncTime: string
}

const AccountSyncScreen = () => {
    const { colors } = useSelector((state: StateModel) => selectTheme(state))
    const navigation = useNavigation()
    const [isEnable, setIsEnable] = useState(false)
    const { t } = useTranslation()
    const [userData, setUserData] = useState<User>()
    const [lastSyncTime, setLastSyncTime] = useState<string>()
    const [dialog, setDialog] = useState<{visible: boolean, description: string}>({visible: false, description: ''})
    const tasks = useSelector((state: StateModel) => selectTasks(state))
    const categories = useSelector((state: StateModel) => selectCategories(state))
    const dispatch = useDispatch<any>()

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserData()
            setUserData(user)
            const time = await getLastSyncTime()
            time && setLastSyncTime(time)
        }
        fetchData()
    }, [])

    const handleLogin = async () => {
        if (userData) {
            await GoogleSignin.signOut()
            setUserData(undefined)
            setLastSyncTime(undefined)
            removeLastSyncTime()
            removeUserData()
            // saveAutoBackup(false)
            // setIsEnable(false)
        } else {
            await signIn()
        }
    }

    const updateLastSyncTime = async (date: string) => {
        await saveLastSyncTime(date)
        setLastSyncTime(date)
    }

    const handleAsyncData = async () => {
        setDialog({visible: true, description: 'backingUpData'})
        const date = new Date().toISOString()
        const filePath = await saveDataToFile({ categories, tasks, lastSyncTime: date })
        const token = await GoogleSignin.getTokens()
        if (filePath && token) {
            await GoogleDrive.uploadToDrive(token.accessToken, filePath)
            updateLastSyncTime(date)
        }
        showNotification(t('dataBackupSuccessful'), Icons.success)
        setDialog({visible: false, description: ''})
    }

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const response: SignInResponse = await GoogleSignin.signIn()
            const userInfo = response.data as User
            setUserData(userInfo)
            saveUserData(JSON.stringify(userInfo))

            const token = await GoogleSignin.getTokens()
            if (token) {
                setDialog({visible: true, description: 'loadingData'})
                const fieldId = await GoogleDrive.getFileId(token.accessToken)
                if (fieldId) {
                    const data: asyncData = await GoogleDrive.downloadFile(token.accessToken, fieldId)
                    updateLastSyncTime(data.lastSyncTime)
                    await dispatch(asyncCategoriesHandle(data.categories))
                    await dispatch(asyncTasksHandle(data.tasks))
                }
            }
            setDialog({visible: false, description: ''})
        } catch (error) {
            console.error(JSON.stringify(error))
        }
    }

    // const toggleSwitch = () => {
    //     setIsEnable(previousState => !previousState)
    //     saveAutoBackup(!isEnable)
    // }


    return (
        <Container>
            <Header
                title={t('backupData').toUpperCase()}
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
                    onPress={handleLogin}
                >
                    {userData ? (
                        <>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Sizes.padding }}>

                                <Image source={{ uri: userData.user.photo! }} style={{ width: 30, height: 30, borderRadius: 30 / 2 }} />
                                <View>
                                    <TextComponent text={userData.user.name!} />
                                    <TextComponent text={userData.user.email!} style={{ ...Fonts.body5, color: colors.textSecondary }} />
                                </View>
                            </View>
                            <TextComponent text={t('logout')} style={{ ...Fonts.body4, color: colors.primary, fontWeight: 'bold' }} />
                        </>

                    ) : (
                        <>
                            <TextComponent text='Google Drive' />
                            <Icon type={TypeIcons.Feather} name='chevron-right' color={colors.textPrimary} size={Sizes.l} />
                        </>
                    )}

                </TouchableOpacity>
            </View>
            <View style={[styles.itemContainer, { backgroundColor: colors.surface }]}>
                <TouchableOpacity
                    disabled={!userData}
                    style={[styles.itemContent, { opacity: userData ? 1 : 0.5 }]}
                    onPress={handleAsyncData}
                >
                    <View>
                        <TextComponent text={t('backupRecord')} />
                        {lastSyncTime && <TextComponent text={moment(lastSyncTime).format('DD/MM/YYYY HH:mm:ss')} style={{ ...Fonts.h3, fontWeight: 'bold' }} />}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Sizes.padding }}>
                        <TextComponent text={t('backup')} style={{ ...Fonts.body4, opacity: .8 }} />
                        <Icon type={TypeIcons.Feather} name='chevron-right' color={colors.textPrimary} size={Sizes.l} />
                    </View>

                </TouchableOpacity>
            </View>
            {/* <View style={[styles.itemContainer, { backgroundColor: colors.surface }]}>
                <TouchableOpacity
                    disabled={!userData}
                    style={[styles.itemContent, { opacity: userData ? 1 : 0.5 }]}
                    onPress={toggleSwitch}
                >
                    <View style={{ width: '80%' }}>
                        <TextComponent text={t('autoBackup')} />
                        <TextComponent
                            text={t('enableAuto')}
                            style={{ ...Fonts.body5, opacity: .5 }}
                        />
                    </View>
                    <Switch
                        trackColor={{ false: Colors.gray, true: Colors.secondary }}
                        thumbColor={isEnable ? Colors.primary : Colors.white}
                        onValueChange={toggleSwitch}
                        value={isEnable}
                        style={{ marginRight: -Sizes.padding / 1.5 }}
                    />
                </TouchableOpacity>
            </View> */}
            <LoadingDialog
                visible={dialog.visible}
                description={dialog.description}
            />
        </Container >
    )
}

export default AccountSyncScreen

const styles = StyleSheet.create({
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.padding,
    },
    itemContainer: {
        marginHorizontal: Sizes.padding,
        marginVertical: Sizes.padding / 2,
        padding: Sizes.padding,
        borderRadius: Sizes.radius
    }
})