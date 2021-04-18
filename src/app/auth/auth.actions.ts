import { createAction } from "@ngrx/store";

export const setAuthenticated = createAction('SET_AUTHENTICATED')
export const setUnauthenticated = createAction('SET_UNAUTHENTICATED')