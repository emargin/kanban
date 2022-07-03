import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk'
import authReducer from './reducers/auth'

const rootReducer = combineReducers({
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
