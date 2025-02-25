import { useEffect, useState } from 'react'
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

import TextComponent from './TextComponent'
import { Sizes } from '../contants'
import { useTheme } from '../hooks'

type InputModalProps = {
    visible: boolean,
    onClose: () => void,
    value: string,
    onSubmit: (value: string) => void
}

const InputModal = ({ visible, onClose, onSubmit, value }: InputModalProps) => {

    const [text, setText] = useState(value)
    const { colors } = useTheme()

    useEffect(() => {
        if (visible) setText(value)
    }, [value, visible])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { backgroundColor: colors.background }]}>
                    <View style={{ width: '90%', marginVertical: Sizes.padding }}>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: colors.primary, borderRadius: Sizes.s, paddingHorizontal: Sizes.s, color: colors.textPrimary }}
                            value={text}
                            onChangeText={setText}
                            placeholder='Enter category name'
                            placeholderTextColor={colors.textSecondary}
                        />
                    </View>
                    <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={onClose} >
                            <TextComponent text='CLOSE' />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={!text}
                            onPress={() => {
                                onSubmit(text.trim())
                                onClose()
                            }} >
                            <TextComponent text='OK' style={{ fontWeight: 'bold' }} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default InputModal

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
        width: '90%',
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
})