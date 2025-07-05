import { Modal, StyleSheet, View, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"

import { useTheme } from "../hooks"
import { Icons } from "../utils"
import { Colors, Sizes } from "../constants"
import TextComponent from "./TextComponent"


interface Props {
    type: 'error' | 'info' | 'warning',
    description: string,
    visible: boolean,
    onClose: () => void,
    onOk?: () => void
}


const AlertModal = (props: Props) => {

    const { type, description, visible, onClose, onOk } = props
    const { t } = useTranslation()
    const { colors } = useTheme()

    const renderButton = () => {

        if (onOk) {
            return (
                <View style={{ width: '60%', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={onClose}>
                        <TextComponent text={t('cancel')} style={styles.textStyle}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            onOk()
                            onClose()
                        }}>
                        <TextComponent text='OK' style={styles.textStyle}/>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={onClose} >
                <TextComponent text={t('close')} style={styles.textStyle}/>
            </TouchableOpacity>
        )

    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, {backgroundColor: colors.surface}]}>
                    {type == 'warning' ? <Icons.svgWarning /> : type == 'error' ? <Icons.svgError /> : <Icons.svgInfo />}
                    <TextComponent text={t(type).toUpperCase()} style={styles.modalText}/>
                    <TextComponent text={t(description)} style={styles.modalText}/>
                    {renderButton()}
                </View>
            </View>
        </Modal>
    )
}

export default AlertModal

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