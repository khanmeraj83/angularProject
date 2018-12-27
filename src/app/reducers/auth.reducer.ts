import { Action } from '@ngrx/store'
import * as AuthActions from './../actions/auth.actions'

export interface AuthState {
    user: any | null;
}

const initialState: AuthState = {
    user: null
}

// export const authReducer: (state: AuthState, action: AuthActions.Action) => AuthState = (state =
//     initialState, action: AuthActions.Action) => {
//     switch (action.type) {
//         case AuthActions.SET_CURRENT_USER:
//             return {
//                 ...state,
//                 user: action.payload
//             };

//         default:
//             return state;

//     }
// }

export function authReducer(state: any = initialState, action: AuthActions.Action) {
    switch (action.type) {
        case AuthActions.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;

    }
}