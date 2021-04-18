
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrainingService } from '../training.service';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from './../exercise.model';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import * as fromTrining from "../training.reducer"
import * as fromRoot from "../../app.reducer"
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-recent-training',
  templateUrl: './recent-training.component.html',
  styleUrls: ['./recent-training.component.css']
})
export class RecentTrainingComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state']

  dataSource = new MatTableDataSource<Exercise>()
  isLoading: Observable<boolean>

  constructor(private trainingService: TrainingService,
    private store: Store<fromTrining.State>) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  ngOnInit() {
    this.store.select('auth').subscribe(data => {
      if (data.isAuthenticated) {
        this.trainingService.getRecentExercises()
      }
    })
    this.store.select('training').pipe(map(data => data.recentExercise)).subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises
    })
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.isLoading = this.store.select(fromRoot.getIsLoading)
  }

  onFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase()
  }



}
