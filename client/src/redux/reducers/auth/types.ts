import { IUser } from "../../../models/IUser";


export enum ActionEnum {
    SET_AUTH = 'SET_AUTH',
    SET_USER = 'SET_USER',
    SET_IS_LOADING = 'SET_IS_LOADING',
    SET_ERROR = 'SET_ERROR',
}


export interface IAuthState {
    isAuth: boolean,
    user: IUser, 
    isLoading: boolean,     
    error: string,
}


export type ActionTypes = SetAuthAction | SetUserAction | SetIsLoadingAction | SetErrorAction

export interface SetAuthAction {
    type: ActionEnum.SET_AUTH,
    payload: boolean
}

export interface SetUserAction {
    type: ActionEnum.SET_USER,
    payload: IUser
}

export interface SetIsLoadingAction {
    type: ActionEnum.SET_IS_LOADING,
    payload: boolean
}

export interface SetErrorAction {
    type: ActionEnum.SET_ERROR,
    payload: string
}