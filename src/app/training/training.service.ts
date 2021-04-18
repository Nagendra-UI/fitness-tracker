import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SharedService } from './../shared/shared.service';
import { Router } from '@angular/router';
import { Exercise } from './exercise.model';
import * as fromTraining from './training.reducer';
import * as sharedActions from '../shared/shared.actions';
import * as trainingActions from './training.actions';

@Injectable({ providedIn: 'root' })
export class TrainingService {

    newExercise = new Subject<Exercise>()
    changedExercise = new Subject<Exercise[]>()
    recentChangedExercise = new Subject<Exercise[]>()
    allSub: Subscription[] = []

    constructor(
        private firebaseDb: AngularFirestore,
        private sharedService: SharedService,
        private store: Store<fromTraining.State>
    ) { }


    fetchAvailableExercise() {
        this.store.dispatch(sharedActions.startLoading())
        this.allSub.push(this.firebaseDb.collection('availableExercises')
            .snapshotChanges().pipe(map(docsArray => {
                return docsArray.map(docs => {
                    return {
                        id: docs.payload.doc.id,
                        ...docs.payload.doc.data() as Exercise
                    };
                })
            }))
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(sharedActions.stopLoading())
                this.store.dispatch(trainingActions.getExercises({ exercises }))
            }, error => {
                this.store.dispatch(sharedActions.stopLoading())
                this.sharedService.showSnackBar("Do not Fetching the data, please try again later", null, 3000)
                this.changedExercise.next(null)
            }))
    }

    selectExercise(id: string) {
        this.store.dispatch(trainingActions.startExercise({ id }))
    }

    getRecentExercises() {
        this.store.dispatch(sharedActions.startLoading())
        this.allSub.push(this.firebaseDb.collection('recentExercise').valueChanges().subscribe((exercises: Exercise[]) => {
            this.store.dispatch(trainingActions.getRecentExercise({ exercises }))
            this.store.select('training').subscribe(data => {
            })
            this.store.dispatch(sharedActions.stopLoading())
        }, error => {
            this.sharedService.showSnackBar("Do not Fetching the data, please try again later", null, 3000)
            this.recentChangedExercise.next(null)
            this.store.dispatch(sharedActions.stopLoading())
        }))
    }

    stopExercise(progress: number) {
        this.store.select('training').pipe(map(data => data.currentExercise), take(1)).subscribe(exercise => {
            this.addExercisetoDb({
                ...exercise,
                duration: exercise.duration * (progress / 100),
                calories: exercise.calories * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            })
            this.store.dispatch(trainingActions.stopExercise())
        })
    }

    completedExercise(progress: number, exercise: Exercise) {
        this.addExercisetoDb({
            ...exercise,
            duration: exercise.duration * (progress / 100),
            calories: exercise.calories * (progress / 100),
            date: new Date(),
            state: 'completed'
        })
        this.store.dispatch(trainingActions.stopExercise())
    }

    private addExercisetoDb(exercise: Exercise) {
        this.firebaseDb.collection('recentExercise').add(exercise)
    }
    cancelSubscriptions() {
        this.allSub.forEach(sub => {
            sub.unsubscribe()
        })
    }

    ngOnDestroy(): void {
        this.cancelSubscriptions()
    }


}