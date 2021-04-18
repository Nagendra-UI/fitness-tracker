import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})

export class TrainingComponent implements OnInit {
  onTraining: Observable<boolean>
  constructor(private traingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.onTraining = this.store.select('training').pipe(map(data => data.currentExercise != null))
  }

}
