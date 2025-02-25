import { ReactNode } from "react"
import { SafeAreaView, ViewStyle } from "react-native"
import { useSelector } from "react-redux"

import { StateModel } from "../models/StateModel"
import { selectTheme } from "../redux/selectors"

interface ContainerProps {
    children: ReactNode
    style?: ViewStyle
}

const Container: React.FC<ContainerProps> = ({children, style}) => {
    const { colors } = useSelector((state: StateModel) => selectTheme(state))
    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: colors.background }, style]}>
            {children}
        </SafeAreaView>
    )
}

export default Container