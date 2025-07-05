import { Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import { version } from '../../app.json'
import { Fonts, Images, Sizes } from '../constants'
import { useTheme } from '../hooks'
import { Container, Header, Icon, TextComponent, TypeIcons } from '../components'

const data = ['privacyPolicy', 'temsService', 'checkUpdate']

const AboutScreen = () => {
    const navigation = useNavigation()
    const { t } = useTranslation()
    const { colors } = useTheme()

    return (
        <Container>
            <Header
                title={t('about').toUpperCase()}
                textStyle={{ textAlign: 'center' }}
                headerLeft={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon type={TypeIcons.Feather} name='chevron-left' color={colors.textPrimary} size={Sizes.xl} />
                    </TouchableOpacity>
                }
            />
            <View>
                <View style={{ alignItems: 'center', gap: Sizes.padding / 2, marginTop: Sizes.padding * 5 }}>
                    <Image source={Images.logo} style={{ width: 80, height: 80 }} />
                    <TextComponent text={`${t('version')} ${version}`} />
                </View>

                <View style={{ marginTop: Sizes.padding * 5 }}>
                    {data.map((item, index) => (
                        <View key={index} style={[styles.itemContainer, { backgroundColor: colors.containerBackground, borderColor: colors.divider }]}>
                            <TouchableOpacity
                                style={styles.itemContent}
                                onPress={() => {
                                    switch (index) {
                                        case 0:
                                            Linking.openURL("https://thanh-ph2021.github.io/react-website/#/privacy-policy/1")
                                            break
                                        case 1:
                                            Linking.openURL("https://thanh-ph2021.github.io/react-website/#/terms-of-service/1")
                                            break
                                        case 2:
                                            Linking.openURL("https://play.google.com/store/apps/details?id=com.dtaskapp")
                                            break
                                    }
                                }}
                            >
                                <TextComponent text={t(item)} />
                                <Icon type={TypeIcons.Feather} name='chevron-right' color={colors.textPrimary} size={Sizes.l} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

            </View>
            <TextComponent
                text={`© ${new Date().getFullYear()} Lter Studio. ${t('allReserved')}`}
                style={{ ...Fonts.h3, position: 'absolute', bottom: Sizes.padding, textAlign: 'center', width: '100%' }}
            />
        </Container>
    )
}

export default AboutScreen

const styles = StyleSheet.create({
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.padding,
    },
    itemContainer: {
        margin: Sizes.padding,
        paddingHorizontal: Sizes.padding,
        borderRadius: Sizes.radius,
        borderWidth: 1
    }
})