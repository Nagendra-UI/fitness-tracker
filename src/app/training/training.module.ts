import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { TrainingReducer } from './training.reducer';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from "./training-routing.module";
import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { RecentTrainingComponent } from './recent-training/recent-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';



@NgModule({
    declarations: [
        TrainingComponent,
        NewTrainingComponent,
        RecentTrainingComponent,
        CurrentTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule,
        AngularFirestoreModule,
        StoreModule.forFeature('training', TrainingReducer)
    ],
    exports: []
})

export class TrainingModule { }