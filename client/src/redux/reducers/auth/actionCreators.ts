import { ActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction } from "./types";

export const ActionCreators = {
    setAuth: (auth: boolean): SetAuthAction => ({type:ActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (isLoading: boolean):SetIsLoadingAction => ({type:ActionEnum.SET_IS_LOADING, payload: isLoading}),
    setError: (error: string):SetErrorAction => ({type:ActionEnum.SET_ERROR, payload: error}),
}