import React, { useState } from "react"
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"

import DonateAdButton from "./DonateAdButton"
import { Container, Header, Icon, TextComponent, TypeIcons } from "../../components"
import { useTheme } from "../../hooks"
import { Fonts, Images, Sizes } from "../../constants"
import { Icons } from "../../utils"

const DonateScreen = () => {
    const { colors } = useTheme()
    const navigation = useNavigation()
    const { t } = useTranslation()
    const [visible, setVisible] = useState<boolean>(false)
    const [selectedMethod, setSelectedMethod] = useState<'momo' | 'vcb' | null>(null)

    const handlePressDonate = (method: 'momo' | 'vcb') => {
        setSelectedMethod(method)
        setVisible(true)
    }

    return (
        <Container>
            <Header
                title={'Donate'.toUpperCase()}
                textStyle={{ textAlign: 'center' }}
                headerLeft={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon type={TypeIcons.Feather} name='chevron-left' color={colors.textPrimary} size={Sizes.xl} />
                    </TouchableOpacity>
                }
            />

            <View style={{ margin: Sizes.padding, gap: Sizes.padding }}>
                <TextComponent text={t('donateSupport')} style={Fonts.body3} textAlign="center" />
                <TextComponent text={t('thankYou')} style={Fonts.body3} textAlign="center" />
            </View>
            <View style={[styles.sectionContainer, { backgroundColor: colors.containerBackground, borderColor: colors.divider }]}>
                <TouchableOpacity
                    style={styles.rowItem}
                    onPress={() => handlePressDonate('momo')}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer,]}>
                            <Icons.Momo size={24} />
                        </View>
                        <TextComponent text={t("Momo")} style={Fonts.body3} />
                    </View>
                    <Icons.arrowRight2 color={colors.text} size={24} />
                </TouchableOpacity>
            </View>
            <View style={[styles.sectionContainer, { backgroundColor: colors.containerBackground, borderColor: colors.divider }]}>
                <TouchableOpacity
                    style={styles.rowItem}
                    onPress={() => handlePressDonate('vcb')}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer,]}>
                            <Image source={Images.vietcombank} style={{ width: 24, height: 24 }} />
                        </View>
                        <TextComponent text={t("Vietcombank")} style={Fonts.body3} />
                    </View>
                    <Icons.arrowRight2 color={colors.text} size={24} />
                </TouchableOpacity>
            </View>
            <DonateAdButton />
            <Modal visible={visible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.containerBackground }]}>
                        <TextComponent
                            text={selectedMethod === 'momo' ? t('scanMomo') : t('scanVietcombank')}
                            style={Fonts.h4}
                            textAlign="center"
                        />
                        <Image
                            source={
                                selectedMethod === 'momo'
                                    ? Images.momoQR
                                    : Images.vietcombankQR
                            }
                            style={{ width: 200, height: 200, marginVertical: Sizes.padding }}
                            resizeMode="contain"
                        />
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <TextComponent text={t('close')} style={Fonts.body3} textAlign="center" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Container>
    )
}

export default DonateScreen

const styles = StyleSheet.create({
    sectionContainer: {
        justifyContent: 'center',
        marginHorizontal: Sizes.padding,
        padding: Sizes.padding/2,
        marginTop: Sizes.l,
        borderRadius: Sizes.l,
        borderWidth: 1
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Sizes.radius,
        justifyContent: 'space-between',
    },
    rowLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Sizes.padding,
    },
    iconContainer: {
        padding: Sizes.padding,
        borderRadius: Sizes.radius,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: Sizes.padding,
        borderRadius: Sizes.radius,
        alignItems: 'center',
    }
})