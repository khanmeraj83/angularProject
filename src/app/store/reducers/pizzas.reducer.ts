import { Action } from '@ngrx/store'
import { User } from '../../models/user.model';
import * as fromPizzas from '../actions/pizzas.action';

export interface PizzaState {
    data: User[];
    loaded: boolean;
    loading: boolean;
}

export const initialState : PizzaState = {
    data:[],
    loaded: false,
    loading: false
};

// Section 2
export function reducer(state = initialState, action: fromPizzas.PizzasAction): PizzaState {

    // Section 3
    switch (action.type) {
        case fromPizzas.LOAD_PIZZAS: {
            return {...state, loading: true};
        }
        case fromPizzas.LOAD_PIZZAS_FAIL: {
            return {...state, loading: false, loaded: false};
        }
        case fromPizzas.LOAD_PIZZAS_SUCCESS: {
            return {...state, loading: false, loaded: true};
        }
            

        

        default:
            return state;
    }
}