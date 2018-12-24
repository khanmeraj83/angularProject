import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'


export const LOGIN_USER       = '[Auth] Login User';
export const REGISTER_USER    = '[Auth] Register User';
export const SET_CURRENT_USER      = '[Auth] Set Current User';
export const SET_INITIAL_USER      = '[Auth] Set Initial User';


export class LoginUser implements Action {
    readonly type = LOGIN_USER

    constructor(public payload: any) {}
}

export class RegisterUser implements Action {
    readonly type = REGISTER_USER

    constructor(public payload: any) {}
}

export class SetInitialUser implements Action {
    readonly type = SET_INITIAL_USER

    constructor(public payload: any) {}
}

export class SetCurrentUser implements Action {
    readonly type = SET_CURRENT_USER

    constructor(public payload: any) {}
}

export type Action = LoginUser | RegisterUser | SetInitialUser | SetCurrentUser;
