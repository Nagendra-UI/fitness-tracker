import { createReducer, on } from "@ngrx/store"
import * as actions from "./shared.actions";

export interface State {
    isLoading: boolean
}

const intialState: State = {
    isLoading: false
}

export const SharedReducer = createReducer(
    intialState,
    on(actions.startLoading, state => ({
        isLoading: true,
    })),
    on(actions.stopLoading, state => ({
        isLoading: false
    })),
);

export const getLoadingState = (state: State) => state.isLoading


