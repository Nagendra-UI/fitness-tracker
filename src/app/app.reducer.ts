import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store"
import * as fromShared from "./shared/shared.reducer"
import * as fromAuth from "./auth/auth.reducer"

export interface State {
    shared: fromShared.State
    auth: fromAuth.State
}

export const appReducers: ActionReducerMap<State> = {
    shared: fromShared.SharedReducer,
    auth: fromAuth.AuthReducer
}

export const getUiState = createFeatureSelector<fromShared.State>('shared');
export const getIsLoading = createSelector(getUiState, fromShared.getLoadingState)

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getAuthenticatedState = createSelector(getAuthState, fromAuth.getAuthenticatedState)

