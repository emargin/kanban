import { IUser } from "../../../models/IUser";


export enum Action {
    SET_AUTH = 'SET_AUTH',
    SET_IS_LOADING = 'SET_IS_LOADING',
    SET_ERROR = 'SET_ERROR',
}


export interface IAuthState {
    isAuth: boolean,
    user: IUser, 
    isLoading: boolean,     
    error: string,
}