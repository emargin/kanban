import { IUser } from "../../../models/IUser"
import { Action, IAuthState } from "./types"

const initialState:IAuthState = {
    isAuth: false,
    user: {} as IUser,
    error: '',
    isLoading: false
}

export const authReducer = (state=initialState, action: any) => {
    switch (action.type){
        case Action.SET_AUTH: {
            return {...state, isAuth: true, isLoading: false}
        }
        case Action.SET_IS_LOADING: {
            return {...state, isLoading: action.payload}
        }
        case Action.SET_ERROR: {
            return {...state, error: action.payload, isLoading: false}
        }
        default: 
            return state
    }

}