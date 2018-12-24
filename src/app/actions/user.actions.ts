import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { User } from './../models/user.model';

// Section 2
export const ADD_TUTORIAL       = '[TUTORIAL] Add';
export const REMOVE_TUTORIAL    = '[TUTORIAL] Remove';
export const LIST_TUTORIAL      = '[TUTORIAL] List';
export const GET_POST           = 'Post get';
export const GET_POST_SUCCESS   = 'Post get success';

// Section 3
export class AddTutorial implements Action {
    readonly type = ADD_TUTORIAL

    constructor(public payload: User) {}
}

export class RemoveTutorial implements Action {
    readonly type = REMOVE_TUTORIAL

    constructor(public payload: number) {}
}

export class ListTutorial implements Action {
    readonly type = LIST_TUTORIAL

    constructor(public payload: User[]) {}
}

export class GetPost implements Action {
    readonly type = GET_POST;

    //constructor(public payload: User[]) {}
}

export class GetPostSuccess implements Action {
    readonly type = GET_POST_SUCCESS;

    constructor(public payload: User[]) {}
}

// Section 4
export type Actions = AddTutorial | RemoveTutorial | ListTutorial | GetPost | GetPostSuccess