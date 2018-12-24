import { Injectable } from '@angular/core';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { AuthService } from '../../app/services/auth.service';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import * as AuthActions from './../actions/auth.actions'


import { mergeMap, map, catchError } from 'rxjs/operators';
export type Action = AuthActions.Action;


@Injectable()
export class AuthEffects {

    constructor(private action$: Actions, private authService: AuthService){}

    @Effect()
    setInitialUser$: Observable<AuthActions.Action> = this.action$.pipe(
        ofType<AuthActions.SetInitialUser>(AuthActions.SET_INITIAL_USER),
        mergeMap((action: AuthActions.SetInitialUser) => this.authService.FillData().pipe(
            map(user => new AuthActions.SetCurrentUser(user)),
            catchError(err => of(err))
        ))
    );

    @Effect()
    loginUser$: Observable<AuthActions.Action> = this.action$.pipe(
        ofType<AuthActions.LoginUser>(AuthActions.LOGIN_USER),
        mergeMap((action: AuthActions.LoginUser) => this.authService.login(action.payload).pipe(
            map((user: any) => new AuthActions.SetCurrentUser(user)),
            catchError(err => of(err))
        ))
    );

    @Effect()
    registerUser$: Observable<AuthActions.Action> = this.action$.pipe(
        ofType<AuthActions.RegisterUser>(AuthActions.REGISTER_USER),
        mergeMap((action: AuthActions.RegisterUser) => this.authService.registerUser(action.payload).pipe(
            map((user: any) => new AuthActions.SetCurrentUser(user)),
            catchError(err => of(err))
        ))
    );

}