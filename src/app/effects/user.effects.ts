import { Injectable } from '@angular/core';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../app/services/auth.service';


import { Observable } from 'rxjs';
//import { of } from 'rxjs/observable/of';
import { of } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/delay';

import * as UserActions from './../actions/user.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
export type Action = UserActions.Actions;



@Injectable()
export class UserEffects {

    constructor(private action$: Actions, private authService: AuthService){}

   //@Effect()
    // tutorials$: Observable<Action> = this.action$.pipe(
    //     ofType<UserActions.GetPost>(UserActions.GET_POST),
    //     mergeMap((action:UserActions.GetPost) => this.authService.FillData().pipe(
    //         map(user => new UserActions.GetPostSuccess(user)),
    //         catchError(err => of(err))
    //     ))
    // );
    @Effect()    
    tutorials$: Observable<Action> = this.action$.pipe(
        ofType<UserActions.GetPost>(UserActions.GET_POST),
        mergeMap((action:UserActions.GetPost) => this.authService.FillData().pipe(
            map(user => new UserActions.GetPostSuccess(user)),
            catchError(err => of(err))
        ))
    );

}