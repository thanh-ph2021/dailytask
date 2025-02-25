import { Dispatch, MiddlewareAPI } from 'redux'

import { ActionType } from "./actions"

const middleware: any = (storeAPI: MiddlewareAPI) => (next: Dispatch) => (action: ActionType | Function) => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }

    return next(action)
}

export default middleware
