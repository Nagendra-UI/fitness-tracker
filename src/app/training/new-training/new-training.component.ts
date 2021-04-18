import { Component, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { SharedService } from './../../shared/shared.service';
import * as fromRoot from "../../app.reducer"
import * as fromTraining from "../training.reducer"



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  isLoading: Observable<boolean>
  exercises: Observable<Exercise[]>
  ExercisesLength: boolean;

  constructor(private traingService: TrainingService,
    private sharedService: SharedService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.store.select('auth').subscribe(data => {
      if (data.isAuthenticated) {
        this.traingService.fetchAvailableExercise()
      }
    })
    this.isLoading = this.store.select(fromRoot.getIsLoading)
    this.exercises = this.store.select('training').pipe(map(data => data.availableExercise))
    this.exercises.subscribe(data => {
      this.ExercisesLength = data.length > 0
    })
  }

  trainingStart(exersiceIs: NgForm) {
    this.traingService.selectExercise(exersiceIs.value.exerciseId)
  }

  fetchExercise() {
    this.traingService.fetchAvailableExercise()
  }


}
