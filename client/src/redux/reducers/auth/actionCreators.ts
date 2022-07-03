import { API, IAuthRequest } from '../../../api/api'
import { IUser } from '../../../models/IUser'
import { AppDispatch } from '../../store'
import { ActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction } from './types'

export const ActionCreators = {
    setAuth: (auth: boolean): SetAuthAction => ({
        type: ActionEnum.SET_AUTH,
        payload: auth,
    }),
    setUser: (user: IUser): any => ({ type: ActionEnum.SET_USER, payload: user }),
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
            dispatch(ActionCreators.setIsLoading(true))
            const response = await API.fetchAuth(authRequest)
            dispatch(ActionCreators.setUser(response.data))
            dispatch(ActionCreators.setAuth(true))
            dispatch(ActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(ActionCreators.setError('Произошла ошибка'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(ActionCreators.setIsLoading(true))
            dispatch(ActionCreators.setUser({} as IUser))
            dispatch(ActionCreators.setAuth(false))
            dispatch(ActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(ActionCreators.setError('Произошла ошибка'))
        }
    },
}
