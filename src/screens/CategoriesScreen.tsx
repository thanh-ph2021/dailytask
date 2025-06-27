import { useRef, useState } from "react"
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import { Colors, Fonts, Images, Sizes } from "../contants"
import { NUMBER_DEFAULT_CATEGORIES } from "../data/DefaultCategories"
import UtilStyles from "../utils/UtilStyles"
import { useTheme } from "../hooks"
import { CategoryModel, StateModel } from "../models"
import { selectCategories } from "../redux/selectors"
import { deleteCategoryHandle, saveNewCategory, updateCategoryHandle } from "../redux/Reducers/CategoriesReducer"
import { AlertModal, AppBottomSheet, CategoryItem, Container, Divider, Header, Icon, ICON_DATA, InputModal, SelectModal, SelectModalv2, TextComponent, TypeIcons } from "../components"

const DATA_OPTIONS = ['edit', 'delete']

const initData = {
    id: '99',
    text: 'New category',
    color: Colors.primary,
    icon: Images.category
}

const CategoriesScreen = () => {

    const navigation = useNavigation()
    const { colors } = useTheme()
    const bottomSheetRef = useRef<any>(null)
    const [visibleInput, setVisibleInput] = useState(false)
    const [visibleSelectColor, setVisibleSelectColor] = useState(false)
    const [visibleSelectIcon, setVisibleSelectIcon] = useState(false)
    const [visibleSelectV2, setVisibleSelectV2] = useState<{ visible: boolean, value: string }>({ visible: false, value: '0' })
    const [isEditing, setIsEditing] = useState(false)
    const { t } = useTranslation()
    const data = useSelector((state: StateModel) => selectCategories(state))
    const dispatch = useDispatch<any>()
    const [alert, setAlert] = useState<{ visible: boolean, type: "warning" | "error" | "info", description: string, onOk: () => void }>({
        visible: false,
        type: 'warning',
        description: '',
        onOk: () => { }
    })

    const [category, setCategory] = useState<CategoryModel>(initData)

    const showBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.snapTo(0)
        }
    }

    const categoriesWithAdd = [
        ...[],
        {
            id: '-1',
            text: t('add'),
            color: Colors.primary,
            icon: Images.add,
        },
    ]

    const handleAdd = () => {
        if (category.text !== 'New category') {
            if (isEditing) {
                dispatch(updateCategoryHandle(category))
            } else {
                dispatch(saveNewCategory(category))
            }
            bottomSheetRef.current.close()
        }
    }

    return (
        <Container>
            <Header
                title={t('categories').toUpperCase()}
                textStyle={styles.textHeader}
                headerLeft={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon type={TypeIcons.Feather} name='chevron-left' color={colors.textPrimary} size={Sizes.xl} />
                    </TouchableOpacity>
                }
            />
            <View style={styles.contentContainer}>
                <FlatList
                    ListHeaderComponent={<TextComponent text={t('defaultCate')} style={styles.text} />}
                    numColumns={4}
                    data={data.slice(0, NUMBER_DEFAULT_CATEGORIES)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <CategoryItem item={item} />}
                    columnWrapperStyle={styles.columnWrapper}
                />
                <FlatList
                    ListHeaderComponent={<TextComponent text={t('customCate')} style={styles.text} />}
                    numColumns={4}
                    data={data.slice(NUMBER_DEFAULT_CATEGORIES).concat(categoriesWithAdd)}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => <CategoryItem
                        item={item}
                        onPress={() => {
                            if (item.id === '-1') {
                                showBottomSheet()
                            }
                        }}
                        onLongPress={() => {
                            if (item.id !== '-1') {
                                setVisibleSelectV2({ visible: true, value: item.id })
                            }
                        }}
                    />
                    }
                    columnWrapperStyle={styles.columnWrapper}
                />
            </View>
            <AppBottomSheet
                ref={bottomSheetRef}
                snapPoints={[Sizes.height * 0.45]}
                backgroundStyle={{ backgroundColor: colors.containerBackground }}
                handleIndicatorStyle={{ backgroundColor: colors.text, opacity: .3 }}
                containerStyle={{ margin: Sizes.padding, borderRadius: Sizes.padding }}
                onClose={() => {
                    setIsEditing(false)
                    setCategory(initData)
                }}
            >
                <View style={styles.fullHeight}>
                    <View
                        style={[styles.cateItemContainer, { alignItems: 'center', width: '100%' }]}
                    >
                        <View style={[styles.wrapIcon, { backgroundColor: category.color }]}>
                            <Image source={category.icon} style={[UtilStyles.icon, { tintColor: Colors.white }]} />
                        </View>
                        <View style={styles.centerAlign}>
                            <TextComponent text={category.text} style={{ ...Fonts.h3, marginTop: Sizes.padding / 2 }} />
                        </View>
                    </View>
                    <Divider height={.5} color={Colors.gray} style={styles.divider} />
                    <TouchableOpacity onPress={() => setVisibleInput(true)}>
                        <TextComponent text={t('cateName')} style={styles.optionText} />
                    </TouchableOpacity>
                    <Divider height={.5} color={Colors.gray} style={styles.divider} />
                    <TouchableOpacity onPress={() => setVisibleSelectIcon(true)}>
                        <TextComponent text={t('cateIcon')} style={styles.optionText} />
                    </TouchableOpacity>
                    <Divider height={.5} color={Colors.gray} style={styles.divider} />
                    <TouchableOpacity onPress={() => setVisibleSelectColor(true)}>
                        <TextComponent text={t('cateColor')} style={styles.optionText} />
                    </TouchableOpacity>
                    <Divider height={.5} color={Colors.gray} style={styles.divider} />
                    <TouchableOpacity onPress={handleAdd}>
                        <TextComponent
                            text={t(isEditing ? 'editCate' : 'createCate').toUpperCase()}
                            style={styles.createCategoryText}
                        />
                    </TouchableOpacity>
                </View>
                <InputModal
                    visible={visibleInput}
                    onClose={() => setVisibleInput(false)}
                    value={category.text}
                    onSubmit={(text) => setCategory(pre => ({ ...pre, text }))}
                />
                <SelectModal
                    visible={visibleSelectColor}
                    onClose={() => setVisibleSelectColor(false)}
                    onSubmit={(color) => setCategory(pre => ({ ...pre, color }))}
                    type='color'
                />
                <SelectModal
                    visible={visibleSelectIcon}
                    onClose={() => setVisibleSelectIcon(false)}
                    onSubmit={(icon) => {
                        const selectedIcon = ICON_DATA.find(item => item.id === Number(icon))
                        setCategory(pre => ({
                            ...pre,
                            icon: selectedIcon!.icon
                        }))
                    }}
                    type='icon'
                />
                <SelectModalv2
                    visible={visibleSelectV2.visible}
                    data={DATA_OPTIONS}
                    onSubmit={(value) => {
                        switch (value) {
                            case DATA_OPTIONS[0]:
                                const categoryData = data.find(item => item.id === visibleSelectV2.value)
                                if (categoryData) {
                                    setCategory(categoryData)
                                    setIsEditing(true)
                                    showBottomSheet()
                                }
                                break
                            case DATA_OPTIONS[1]:
                                setAlert({
                                    visible: true,
                                    description: 'areYouSureDelCate',
                                    type: 'warning',
                                    onOk: () => dispatch(deleteCategoryHandle(visibleSelectV2.value))
                                })
                                break
                        }
                        setVisibleSelectV2({ visible: false, value: '0' })
                    }}
                />
                <AlertModal
                    type={alert.type ?? 'warning'}
                    description={alert.description}
                    visible={alert.visible}
                    onClose={() => setAlert({ ...alert, visible: false })}
                    onOk={alert.onOk}
                />
            </AppBottomSheet>

        </Container>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
        flex: 1
    },
    textHeader: {
        textAlign: 'center'
    },
    text: {
        ...Fonts.h3
    },
    contentContainer: {
        padding: Sizes.padding
    },
    columnWrapper: {
        // justifyContent: "space-between"
        justifyContent: 'center'
    },
    cateItemContainer: {
        padding: Sizes.padding,
        width: 80
    },
    wrapIcon: {
        alignItems: 'center',
        padding: Sizes.padding,
        borderRadius: Sizes.radius
    },
    optionText: {
        ...Fonts.body3,
        padding: Sizes.padding,
    },
    divider: {
        marginVertical: 0,
    },
    createCategoryText: {
        ...Fonts.h3,
        fontWeight: 'bold',
        color: Colors.primary,
        textAlign: 'center',
        padding: Sizes.padding * 2,
    },
    centerAlign: {
        alignItems: 'center',
    },
    fullHeight: {
        height: '100%',
    },
})