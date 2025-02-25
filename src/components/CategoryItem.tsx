import { TouchableOpacity, View, Image, StyleSheet } from "react-native"

import { CategoryModel } from "../models"
import UtilStyles from "../utils/UtilStyles"
import TextComponent from "./TextComponent"
import { Colors, Fonts, Sizes } from "../contants"

type CategoryItemProps = {
    item: CategoryModel,
    onPress?: () => void,
    onLongPress?: () => void
}

const CategoryItem = ({ item, onPress, onLongPress }: CategoryItemProps) => {
    return (
        <TouchableOpacity style={styles.cateItemContainer} onPress={onPress} onLongPress={onLongPress}>
            <View style={[styles.wrapIcon, { backgroundColor: item.color }]}>
                <Image source={item.icon} style={[UtilStyles.icon, { tintColor: Colors.white }]} />
            </View>
            <View style={{ alignItems: 'center' }}>
                <TextComponent text={item.text} />
                {item.id !== '-1' && <TextComponent text={`0 entries`} style={styles.textNumTries} />}
            </View>
        </TouchableOpacity>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    textNumTries: {
        ...Fonts.body5,
        opacity: 0.6,
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
})