import { AuthGuard } from './../auth/auth.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { Routes } from '@angular/router';
import { TrainingComponent } from './training.component';

const routes: Routes = [
    { path: '', component: TrainingComponent, canActivate: [AuthGuard] },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TrainingRoutingModule { }