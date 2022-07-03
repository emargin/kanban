import { IUser } from '../../../models/IUser'
import { ActionEnum, ActionTypes, IAuthState } from './types'

const initialState: IAuthState = {
    isAuth: false,
    user: {} as IUser,
    error: '',
    isLoading: false,
}

export const authReducer = (state = initialState, action: ActionTypes): IAuthState => {
    switch (action.type) {
        case ActionEnum.SET_AUTH: {
            return { ...state, isAuth: action.payload, isLoading: false }
        }
        case ActionEnum.SET_IS_LOADING: {
            return { ...state, isLoading: action.payload }
        }
        case ActionEnum.SET_ERROR: {
            return { ...state, error: action.payload, isLoading: false }
        }
        default:
            return state
    }
}
