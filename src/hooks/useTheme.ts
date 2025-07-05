import { useSelector } from "react-redux"

import { selectTheme } from "../redux/selectors"
import { StateModel } from "../models/StateModel"

const useTheme = () => {
    const theme = useSelector((state: StateModel) => selectTheme(state))

    return theme
}

export default useTheme