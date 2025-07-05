import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { TFunction } from 'i18next'

import { Colors, Fonts, Sizes } from '../../constants'
import { TextComponent } from '../../components'

type TabType = 'Pomodoro' | 'Tasks'

interface Props {
    t: TFunction
    activeTab: TabType
    onChangeTab: (tab: TabType) => void
}

const CustomTabSwitcher: React.FC<Props> = ({ activeTab, onChangeTab, t }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.tab,
                    activeTab === 'Tasks' ? styles.activeTab : styles.inactiveTab,
                ]}
                onPress={() => onChangeTab('Tasks')}
            >
                <TextComponent
                    text={t('tasks')}
                    style={Fonts.h3}
                    color={activeTab === 'Tasks' ? Colors.white : Colors.black}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.tab,
                    activeTab === 'Pomodoro' ? styles.activeTab : styles.inactiveTab,
                ]}
                onPress={() => onChangeTab('Pomodoro')}
            >
                <TextComponent
                    text="Pomodoro"
                    style={[Fonts.h3, { fontWeight: '600' }]}
                    color={activeTab === 'Pomodoro' ? Colors.white : Colors.black}
                />
            </TouchableOpacity>
        </View>
    )
}

export default CustomTabSwitcher

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.lightGray,
        borderRadius: Sizes.radius,
        marginHorizontal: Sizes.padding,
    },
    tab: {
        flex: 1,
        paddingVertical: Sizes.padding / 1.5,
        alignItems: 'center',
        borderRadius: Sizes.radius,
        
    },
    activeTab: {
        backgroundColor: Colors.primary,
    },
    inactiveTab: {
        backgroundColor: 'transparent',
    },
})
