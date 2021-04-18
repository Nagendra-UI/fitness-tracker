import { Exercise } from './exercise.model';
import { createAction, props } from "@ngrx/store";

export const getExercises = createAction('GET_EXERCISES',
    props<{ exercises: Exercise[] }>()
);

export const getRecentExercise = createAction('GET_RECENT_EXERCISES',
    props<{ exercises: Exercise[] }>()
);

export const startExercise = createAction('START_EXERCISE',
    props<{ id: string }>()
);

export const stopExercise = createAction('STOP_EXERCISE');
