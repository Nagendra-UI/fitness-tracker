import { createAction } from "@ngrx/store";

export const startLoading = createAction('START_LOADING')
export const stopLoading = createAction('STOP_LOADING')