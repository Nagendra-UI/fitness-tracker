import { take } from 'rxjs/operators';
import { Exercise } from './../exercise.model';
import { map } from 'rxjs/operators';
import { Component, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from './../training.service';
import * as fromTraining from '../training.reducer'

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0
  trainingTimer: any;
  dialogBox: any;
  constructor(public dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.toResumeTimer()
  }

  toResumeTimer() {
    this.store.select('training').pipe(map(data => data.currentExercise), take(1)).subscribe(exercise => {
      const step = exercise.duration / 100 * 1000
      this.trainingTimer = setInterval(() => {
        this.progress += 1
        if (this.progress >= 100) {
          clearInterval(this.trainingTimer)
          this.trainingService.completedExercise(this.progress, exercise)
        }
      }, step)
    })

  }

  onStop() {
    clearInterval(this.trainingTimer)
    this.dialogBox = this.dialog.open(StopTrainingComponent, { data: { progress: this.progress } })
    this.dialogBox.afterClosed().subscribe(data => {
      if (data) {
        this.trainingService.stopExercise(this.progress)
      } else {
        this.toResumeTimer()
      }
    });
  }

}
