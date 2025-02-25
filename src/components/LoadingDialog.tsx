import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import TextComponent from './TextComponent'
import { Colors, Sizes } from '../contants'
import { useTheme } from '../hooks'

type Props = {
    description: string,
    visible: boolean,
}

const LoadingDialog = (props: Props) => {

    const { description, visible } = props
    const { t } = useTranslation()
    const { colors } = useTheme()

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { backgroundColor: colors.surface }]}>
                    <ActivityIndicator size={30} />
                    <TextComponent text={`${t(description)} ...`} style={styles.modalText} />
                </View>
            </View>
        </Modal>
    )
}

export default LoadingDialog

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: Sizes.l,
        borderRadius: 20,
        width: '80%',
        padding: Sizes.l,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: Sizes.s,
        padding: Sizes.s,
        elevation: 2,
        width: 60
    },
    buttonClose: {
        backgroundColor: Colors.primary,
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})