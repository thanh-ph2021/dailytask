import {
    AdEventType,
    RewardedAd,
    RewardedAdEventType,
    TestIds,
} from 'react-native-google-mobile-ads'
import { useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import { useTheme } from '../../hooks'
import { Icons, showNotification } from '../../utils'
import { TextComponent } from '../../components'
import { Fonts, Sizes } from '../../constants'


const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-1981952654375968/2427657050'
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
})

export default function DonateAdButton() {
    const [loaded, setLoaded] = useState(false)
    const { t } = useTranslation()
    const { colors } = useTheme()

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(
            RewardedAdEventType.LOADED,
            () => setLoaded(true)
        )

        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            (reward) => {
                showNotification(t('ad_thank_you'), () => <Icons.success />)
            }
        )

        const unsubscribeClosed = rewarded.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                setLoaded(false)
                rewarded.load()
            }
        )

        rewarded.load()

        return () => {
            unsubscribeLoaded()
            unsubscribeEarned()
            unsubscribeClosed()
        }
    }, [])

    const showAd = () => {
        if (loaded) {
            rewarded.show()
            setLoaded(false)
        } else {
            showNotification(t('ad_not_ready'), () => <Icons.info size={30} color={colors.primary} />)
        }
    }

    return (
        <View style={[styles.sectionContainer, { backgroundColor: colors.containerBackground, borderColor: colors.divider }]}>
            <TouchableOpacity
                style={styles.rowItem}
                onPress={showAd}
            >
                <View style={styles.rowLeftContainer}>
                    <View style={[styles.iconContainer,]}>
                        <Icons.AdMob size={24} />
                    </View>
                    <TextComponent text={t('watch_ad')} style={Fonts.body3} />
                </View>
                <Icons.arrowRight2 color={colors.text} size={24} />
            </TouchableOpacity>
        </View>
    )
}

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
})