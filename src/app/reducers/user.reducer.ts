import { Action } from '@ngrx/store'
import { User } from './../models/user.model'
import * as UserActions from './../actions/user.actions'

// Section 1
const initialState: User = {
    completed: true,
    title: 'happy',
    userId: 0,
    id: 0
}

// Section 2
export function reducer(state: User[] = [initialState], action: UserActions.Actions) {

    // Section 3
    switch (action.type) {
        case UserActions.ADD_TUTORIAL:
        const dataAdd = action.payload;
            //return [...state, dataAdd];
            return {
                ...state,
                loading: false,
                loaded: true,
                dataAdd,
            }    

        case UserActions.LIST_TUTORIAL:
            //console.log("hello",action.payload)
            return [...state, ...action.payload];
            
        case UserActions.REMOVE_TUTORIAL:
            state.splice(action.payload, 1)
            return state;

        case UserActions.GET_POST_SUCCESS:
            console.log("effectsxxxx", action.payload)
            const data = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                data,
            }    
        case UserActions.GET_POST:            
                return {
                    ...state,
                    loading: true
                };
            
            // case UserActions.GET_POST:
            // return [...state, loading: true];    

        default:
            return state;
    }
}