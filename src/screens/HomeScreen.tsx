import { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    SectionList,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
    Platform,
    StatusBar,
    SectionListData
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { makeSelectTasksFilter } from '../redux/selectors'
import { Colors, Fonts, Images, Sizes } from '../constants'
import Tabs from '../components/Home/Tabs'
import { useTheme } from '../hooks'
import { AlertModal, Container, Divider, Header, TaskCard2, TextComponent } from '../components'
import { TaskModel } from '../models'
import { displayName } from '../../app.json'
import { Icons, showNotification } from '../utils'
import { completeTaskHandle, deleteTaskHandle } from '../redux/Reducers/TasksReducer'

type HomeScreenProps = {
    navigation: any
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const [dateSelected, setDateSelected] = useState(new Date())
    const data = useSelector(makeSelectTasksFilter(dateSelected ?? new Date()))
    const { isDark, colors } = useTheme()
    const { t } = useTranslation()
    const [alert, setAlert] = useState<{
        visible: boolean
        type: 'warning' | 'error' | 'info'
        description: string
        onOk: () => void
    }>({
        visible: false,
        type: 'warning',
        description: '',
        onOk: () => { },
    })

    const dispatch = useDispatch<any>()

    const onClose = () => {
        setAlert({ ...alert, visible: false })
    }

    useEffect(() => {
        const requestNotificationPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                    )
                } catch (error) { }
            }
        }

        requestNotificationPermission()
    }, [])

    const onSelectedChange = (value: string) => {
        const date: Date = new Date(value)
        setDateSelected(date)
    }

    const onEditHandle = (task: TaskModel) => {
        navigation.navigate('AddTask', { data: {...task, dateTime: task.dateTime.toISOString()} })
    }

    const onDeleteHandle = (task: TaskModel) => {
        setAlert({
            visible: true,
            description: 'areYouSureDelTask',
            type: 'warning',
            onOk: () => dispatch(deleteTaskHandle(task.id!, t)),
        })
    }

    const onCompletedHandle = async (task: TaskModel) => {
        await dispatch(completeTaskHandle(task.id!, t))
        showNotification(!task.completed
            ? t('taskCompletedMessage', { title: task.title })
            : t('taskUncompletedMessage', { title: task.title })
            , () => <Icons.success />)
    }

    const completedTasks = data.filter(task => task.completed)
    const unCompletedTasks = data.filter(task => !task.completed)

    const sections: { title: string; data: TaskModel[] }[] = []

    if (unCompletedTasks.length > 0) {
        sections.push({ title: '', data: unCompletedTasks })
    }

    if (completedTasks.length > 0) {
        sections.push({ title: t('completedTasks'), data: completedTasks })
    }

    return (
        <Container>
            <StatusBar
                backgroundColor="transparent"
                translucent
                barStyle={isDark ? 'light-content' : 'dark-content'}
            />
            <Header title={displayName} textStyle={{ textAlign: 'center' }} />

            <View style={styles.content}>
                <Tabs date={dateSelected} onPress={(date) => onSelectedChange(date.toString())} />
                <SectionList
                    sections={sections}
                    keyExtractor={(item, index) => item.id!.toString() + index}
                    renderItem={({ item }) => (
                        <TaskCard2
                            task={item}
                            onEdit={onEditHandle}
                            onDelete={onDeleteHandle}
                            onComplete={onCompletedHandle}
                            onSelect={onCompletedHandle}
                        />
                    )}
                    renderSectionHeader={({ section }: { section: SectionListData<TaskModel> }) => (
                        section.title && <View style={styles.sectionHeader}>
                            <TextComponent
                                text={section.title}
                                style={[Fonts.h3, { marginRight: Sizes.s }]}
                            />
                            <Divider height={0.3} color={colors.textSecondary} style={{ flex: 1 }} />
                        </View>
                    )}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={styles.containerEmpty}>
                            <Icons.Empty size={150} color={colors.surface} />
                            <TextComponent text={t('empty')} style={Fonts.h2} />
                            <TextComponent
                                text={t('emptyMessage')}
                                style={Fonts.body3}
                                color={colors.textSecondary}
                            />
                        </View>
                    )}
                    ListFooterComponent={() => <View style={{ marginBottom: 300 }} />}
                />
            </View>

            <AlertModal
                type={alert.type ?? 'warning'}
                description={alert.description}
                visible={alert.visible}
                onClose={onClose}
                onOk={alert.onOk}
            />

            <TouchableOpacity
                onPress={() => navigation.push('AddTask')}
                style={styles.fab}
            >
                <Image source={Images.add} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        </Container>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: Sizes.s,
    },
    listContainer: {
        paddingVertical: Sizes.padding,
        paddingHorizontal: Sizes.padding,
        gap: Sizes.padding,
    },
    containerEmpty: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Sizes.height / 1.5,
        gap: Sizes.padding,
    },
    fab: {
        backgroundColor: Colors.primary,
        position: 'absolute',
        bottom: Sizes.padding,
        right: Sizes.padding,
        padding: Sizes.padding,
        borderRadius: Sizes.radius,
        elevation: 6,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Sizes.s,
    },
})
