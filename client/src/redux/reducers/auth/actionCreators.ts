import { API, IAuthRequest, IRegRequest } from '../../../api/api'
import { IUser } from '../../../models/IUser'
import { AppDispatch } from '../../store'
import { ActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from './types'

const AuthActionCreators = {
    setAuth: (auth: boolean): SetAuthAction => ({
        type: ActionEnum.SET_AUTH,
        payload: auth,
    }),
    setUser: (user: IUser): SetUserAction => ({ type: ActionEnum.SET_USER, payload: user }),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
        type: ActionEnum.SET_IS_LOADING,
        payload: isLoading,
    }),
    setError: (error: string): SetErrorAction => ({
        type: ActionEnum.SET_ERROR,
        payload: error,
    }),
    login: (authRequest: IAuthRequest) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            const response = await API.fetchAuth(authRequest)
            dispatch(AuthActionCreators.setUser(response.data))
            dispatch(AuthActionCreators.setAuth(true))
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            await API.sighOut()
            dispatch(AuthActionCreators.setUser({} as IUser))
            dispatch(AuthActionCreators.setAuth(false))
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка'))
        }
    },
    registration: (regRequest: IRegRequest) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            const response = await API.fetchReg(regRequest)
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка'))
        }
    },
}

export default AuthActionCreators
