declare module 'react-native-config' {
    export interface NativeConfig {
        webClientId?: string
        API_VERSION?: string
    }

    export const Config: NativeConfig
    export default Config
}