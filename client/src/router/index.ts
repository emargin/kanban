import React, { ComponentType, ReactNode } from 'react'
import { RouteProps } from 'react-router-dom'
import Auth from '../pages/Auth/Auth'
import Registration from '../pages/Registration/Registration'

export interface IRouter {
    path: string
    element: React.ComponentType
    exact?: boolean
}

export enum RouteName {
    LOGIN = '/auth',
    REGISTRATION = '/registration',
}

export const publicRouters: IRouter[] = [
    { path: RouteName.LOGIN, element: Auth, exact: true },
    { path: RouteName.REGISTRATION, element: Registration, exact: true },
]

// export const privatRouters: IRouter[] = [

// ]
