import { createReducer, on } from "@ngrx/store"
import * as actions from "./auth.actions";

export interface State {
    isAuthenticated: boolean
}

const intialState: State = {
    isAuthenticated: false
}

export const AuthReducer = createReducer(
    intialState,
    on(actions.setAuthenticated, state => ({
        isAuthenticated: true,
    })),
    on(actions.setUnauthenticated, state => ({
        isAuthenticated: false
    })),
);

export const getAuthenticatedState = (state: State) => state.isAuthenticated


