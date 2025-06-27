import { Image, TouchableOpacity, View } from "react-native"

import TextComponent from "../TextComponent"
import { Colors, Fonts, Sizes } from "../../contants"
import { Icons } from "../../utils"
import { useTheme } from "../../hooks"
import { TaskModel } from "../../models"

const TaskCard = ({ task, onSelect }: { task: TaskModel, onSelect: () => void }) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            style={{
                backgroundColor: colors.containerBackground,
                padding: Sizes.padding,
                borderRadius: Sizes.radius,
                shadowOpacity: 0.1,
                shadowRadius: 4,
                borderWidth: 0.3,
                borderLeftWidth: 5,
                borderLeftColor: task.category?.color || colors.primary,
            }}
            onPress={onSelect}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextComponent text={task.title} style={Fonts.h3} />
                <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                    <Icons.play color="white" size={16} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 12 }}>
                {task.category && <View
                    style={{
                        backgroundColor: task.category.color,
                        padding: 5,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 18,
                        height: 18
                    }}
                >
                    <Image source={task.category.icon} style={{ width: 12, height: 12, tintColor: Colors.white }} />
                </View>}
                <TextComponent text={task.category?.text} style={{ ...Fonts.body4, color: colors.text }} />
            </View>
        </TouchableOpacity>
    );
};

export default TaskCard
