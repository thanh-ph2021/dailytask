import { FlatList, Image, Modal, TouchableOpacity, View } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import TextComponent from './TextComponent'
import UtilStyles from '../utils/UtilStyles'
import { Colors, Fonts, Images, Sizes } from '../contants'
import Divider from './Divider'
import { useTheme } from '../hooks'
import { selectCategories } from '../redux/selectors'
import { CategoryModel, StateModel } from '../models'
import { RootStackParamList } from '../navigations/MainNavigator'

type SelectModalProps = {
    visible: boolean,
    onClose: () => void,
    onSubmit: (value: string | CategoryModel | any) => void,
    type: 'color' | 'icon' | 'category',
    navigation?: NavigationProp<RootStackParamList>
}

const COLOR_DATA = [
    { id: 1, color: '#A71C1C' },
    { id: 2, color: '#205DB9' },
    { id: 3, color: '#D69407' },
    { id: 4, color: '#616EE7' },
    { id: 5, color: '#AE1EBB' },
    { id: 6, color: '#759B46' },
    { id: 7, color: '#12A6B7' },
    { id: 8, color: '#17AB2D' },
    { id: 9, color: '#F6A56B' },
    { id: 10, color: '#235C69' },
    { id: 11, color: '#451A9C' },
    { id: 12, color: '#77067D' },
    { id: 13, color: '#CD244E' },
    { id: 14, color: '#D92124' },
    { id: 15, color: '#AB620E' },
    { id: 16, color: '#71862A' },
]

export const ICON_DATA = [
    { id: 1, icon: Images.work },
    { id: 2, icon: Images.home2 },
    { id: 3, icon: Images.list },
    { id: 4, icon: Images.finance },
    { id: 5, icon: Images.money },
    { id: 6, icon: Images.taxi },
    { id: 7, icon: Images.payWall },
    { id: 8, icon: Images.exchange },
    { id: 9, icon: Images.settings },
    { id: 10, icon: Images.music },
    { id: 11, icon: Images.sun },
    { id: 12, icon: Images.binoculars },
    { id: 13, icon: Images.chatgpt },
    { id: 14, icon: Images.alert },
    { id: 15, icon: Images.anonymous },
    { id: 16, icon: Images.flower2 },
]

const SelectModal = ({ visible, onClose, onSubmit, type, navigation }: SelectModalProps) => {
    const { colors } = useTheme()
    const { t } = useTranslation()
    const categories = useSelector((state: StateModel) => selectCategories(state))

    const renderContent = () => {
        if (type === 'color') {
            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {COLOR_DATA.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    width: Sizes.width / 8,
                                    height: Sizes.width / 8,
                                    backgroundColor: item.color,
                                    margin: Sizes.padding,
                                    borderRadius: Sizes.width / 16
                                }}
                                onPress={() => {
                                    onSubmit(item.color)
                                    onClose()
                                }} />
                        )
                    })}
                </View>
            )
        }
        if (type === 'icon') {
            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {ICON_DATA.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    width: Sizes.width / 8,
                                    height: Sizes.width / 8,
                                    margin: Sizes.padding,
                                    borderRadius: Sizes.width / 16,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => {
                                    onSubmit(item.id.toString())
                                    onClose()
                                }}
                            >
                                <Image source={item.icon} style={[{ tintColor: colors.textSecondary, width: 35, height: 35 }]} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
        }
        //type === 'category'
        return (
            <FlatList
                data={categories}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={{ padding: Sizes.padding, flexDirection: 'row', alignItems: 'center', gap: Sizes.padding, width: 120 }}
                            onPress={() => {
                                onSubmit(item)
                                onClose()
                            }}
                        >
                            <View style={{
                                padding: Sizes.padding,
                                backgroundColor: item.color,
                                borderRadius: Sizes.padding,
                                width: 35,
                                height: 35,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={item.icon} style={[{ tintColor: Colors.white, width: 20, height: 20 }]} />
                            </View>
                            <TextComponent text={item.text} />
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={UtilStyles.centeredView}>
                <View style={[UtilStyles.modalView, { backgroundColor: colors.containerBackground, maxHeight: '80%' }]}>
                    <TextComponent text={t(type)} style={{ ...Fonts.h3 }} />
                    <Divider height={.5} color={Colors.gray} style={{ width: '100%' }} />
                    {renderContent()}
                    {type == 'category' && (
                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation && navigation.navigate('Categories')
                                    onClose()
                                }}
                            >
                                <TextComponent text={t('manageCategories').toUpperCase()} style={{ ...Fonts.h3, fontWeight: 'bold' }} />
                            </TouchableOpacity>
                            <Divider height={.5} color={Colors.gray} style={{ width: '100%' }} />
                        </>
                    )}
                    <TouchableOpacity
                        onPress={onClose}
                    >
                        <TextComponent text={t('close').toUpperCase()} style={{ ...Fonts.h3, fontWeight: 'bold', textAlign: 'center' }} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default SelectModal