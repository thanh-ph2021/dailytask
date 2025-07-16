import React from 'react'
import { Alert, LayoutAnimation, Platform } from 'react-native'
import hotUpdate from 'react-native-ota-hot-update'
import ReactNativeBlobUtil from 'react-native-blob-util'
import { useTranslation } from 'react-i18next'
import Config from 'react-native-config'

if (Platform.OS === 'android') {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
}

const apiVersion = Config.API_VERSION

export const useCheckVersion = () => {
    const { t } = useTranslation()
    const [progress, setProgress] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [version, setVersion] = React.useState('0')

    const startUpdate = async (url: string, version: number) => {
        setLoading(true)
        hotUpdate.downloadBundleUri(ReactNativeBlobUtil, url, version, {
            updateSuccess: () => {
                setLoading(false)
                console.log('update success!')
            },
            updateFail(message?: string) {
                setLoading(false)
                Alert.alert(t('updateFailed'), message, [
                    {
                        text: t('cancel'),
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ]);
            },
            progress(received: string, total: string) {
                const percent = (+received / +total) * 100
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                setProgress(percent)
            },
            restartAfterInstall: true,
        })
    }

    const onCheckVersion = () => {
        fetch(apiVersion!).then(async (data) => {
            const result = await data.json()
            const currentVersion = await hotUpdate.getCurrentVersion()
            if (result?.version > currentVersion) {
                Alert.alert(
                    t('newVersionAvailable'),
                    t('pleaseUpdate'),
                    [
                        {
                            text: t('cancel'),
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: t('update'),
                            onPress: () =>
                                startUpdate(
                                    Platform.OS === 'ios'
                                        ? result?.downloadIosUrl
                                        : result?.downloadAndroidUrl,
                                    result.version
                                ),
                        },
                    ]
                )
            }
        })
    }

    const onCheckVersionSilently = () => {
        fetch(apiVersion!)
            .then(async (data) => {
                if (!data.ok) throw new Error('Failed to fetch version info')
                const result = await data.json()
                const currentVersion = await hotUpdate.getCurrentVersion()

                console.log('[OTA] Server version:', result.version)
                console.log('[OTA] Current version:', currentVersion)

                if (result?.version > currentVersion) {
                    hotUpdate.downloadBundleUri(
                        ReactNativeBlobUtil,
                        Platform.OS === 'ios' ? result.downloadIosUrl : result.downloadAndroidUrl,
                        result.version,
                        {
                            updateSuccess: () => {
                                console.log('[OTA] Download success! Will apply on next launch.')
                            },
                            updateFail: (message) => {
                                console.log('[OTA] Update failed:', message)
                            },
                            progress: (received, total) => {
                                const percent = (+received / +total) * 100
                                setProgress(percent)
                            },
                            restartAfterInstall: false,
                        }
                    )
                } else {
                    console.log('[OTA] App is up to date')
                }
            })
            .catch((err) => {
                console.log('[OTA] Update check failed:', err.message)
            })
    }


    const rollBack = async () => {
        const rs = await hotUpdate.rollbackToPreviousBundle()
        if (rs) {
            Alert.alert('Rollback success', 'Restart to apply', [
                {
                    text: 'Ok',
                    onPress: () => hotUpdate.resetApp(),
                    style: 'cancel',
                },
            ]);
        } else {
            Alert.alert('Oops', 'No bundle to rollback', [
                {
                    text: 'cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
            ]);
        }
    }

    const setMeta = (data: any) => {
        hotUpdate.setUpdateMetadata(data)
    }

    const getMeta = async () => {
        return hotUpdate.getUpdateMetadata()
    }

    React.useEffect(() => {
        hotUpdate.getCurrentVersion().then((data) => {
            setVersion(`${data}`)
        })
    }, [])

    return {
        version: {
            getMeta,
            setMeta,
            onCheckVersion,
            onCheckVersionSilently,
            rollBack,
            state: {
                progress,
                loading,
                version,
            },
        },
    }
}