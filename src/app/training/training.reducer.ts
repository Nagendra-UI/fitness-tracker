
import { createReducer, on } from "@ngrx/store"
import * as actions from "./training.actions";
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer'

export interface TrainigState {
    availableExercise: Exercise[]
    recentExercise: Exercise[]
    currentExercise: Exercise
}

export interface State extends fromRoot.State {
    training: TrainigState
}

const intialState: TrainigState = {
    availableExercise: [],
    recentExercise: [],
    currentExercise: null
}

export const TrainingReducer = createReducer(
    intialState,
    on(actions.getExercises, (state, { exercises }) => {
        return {
            ...state,
            availableExercise: exercises,
        }
    }),
    on(actions.getRecentExercise, (state, { exercises }) => {
        return {
            ...state,
            recentExercise: exercises,
        }
    }),
    on(actions.startExercise, (state, { id }) => {
        return {
            ...state,
            currentExercise: { ...state.availableExercise.find(exercise => exercise.id === id) }
        }
    }),
    on(actions.stopExercise, state => {
        return {
            ...state,
            currentExercise: null,
        }
    }),
);


