import { StyleSheet, View } from 'react-native';
import Toast, { BaseToast, ErrorToast, ToastConfig, ToastConfigParams } from 'react-native-toast-message'
import { TextComponent } from '../components';
import { Fonts, Sizes } from '../constants';

type DefaultToastProps = {
    title: string,
    Icon: () => React.ReactElement,
    textColor?: string,
    backgroundColor?: string,
}

export const toastConfig: ToastConfig = {
    default: ({ props }: ToastConfigParams<DefaultToastProps>) => (
        <View style={[styles.container, { backgroundColor: props.backgroundColor ?? 'white' }]}>
            <props.Icon />
            <TextComponent color={props.textColor ?? 'black'} text={props.title} style={[Fonts.body3, { flexShrink: 1 }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Sizes.width - Sizes.padding * 2,
        flexDirection: 'row',
        gap: Sizes.padding,
        padding: Sizes.padding,
        borderRadius: Sizes.s,
        alignItems: 'center',
        elevation: 6,
    },
})