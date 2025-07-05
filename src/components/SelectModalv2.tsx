import { Modal, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import TextComponent from './TextComponent'
import UtilStyles from '../utils/UtilStyles'
import { Fonts } from '../constants'
import Divider from './Divider'
import { useTheme } from '../hooks'

type SelectModalProps = {
    visible: boolean,
    onSubmit: (value: string) => void,
    data: string[]
}

const SelectModalv2 = ({ visible, onSubmit, data }: SelectModalProps) => {
    const { t } = useTranslation()
    const { colors } = useTheme()

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}>
            <View style={UtilStyles.centeredView}>
                <View style={[UtilStyles.modalView, { backgroundColor: colors.containerBackground }]}>
                    {data.map((item, index) => {
                        return (
                            <View key={index} style={{ width: '100%', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => onSubmit(item)}
                                    style={{ width: '100%', alignItems: 'center' }}
                                >
                                    <TextComponent text={t(item)} style={{ ...Fonts.body3 }} />
                                </TouchableOpacity>

                                {index < data.length - 1 && (
                                    <Divider height={1} color={colors.divider} style={{ width: '100%' }} />
                                )}
                            </View>
                        )
                    })}
                </View>
            </View>
        </Modal>
    )
}

export default SelectModalv2