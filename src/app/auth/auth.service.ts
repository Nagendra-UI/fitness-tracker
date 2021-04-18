import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';

import { SharedService } from './../shared/shared.service';
import { TrainingService } from './../training/training.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as AuthActions from '../auth/auth.actions'
import * as SharedActions from '../shared/shared.actions'
import * as fromRoot from '../app.reducer'


@Injectable({ providedIn: 'root' })

export class AuthService {

    constructor(private router: Router,
        private ngAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private sharedService: SharedService,
        private store: Store<fromRoot.State>,
        private route: ActivatedRoute) { }

    initAuthentication() {
        this.ngAuth.authState.subscribe(user => {
            if (user) {
                this.store.dispatch(AuthActions.setAuthenticated())
            } else {
                this.store.dispatch(AuthActions.setUnauthenticated())
                this.trainingService.cancelSubscriptions()
                this.router.navigate(['/login'])
            }
        })
    }

    addUser(email: string, password: string) {
        this.store.dispatch(SharedActions.startLoading())
        this.ngAuth.createUserWithEmailAndPassword(email, password).then(result => {
            this.store.dispatch(SharedActions.stopLoading())
        }, error => {
            this.store.dispatch(SharedActions.stopLoading())
            this.sharedService.showSnackBar(error.message, null, 3000)
        })
    }

    loginUser(email: string, password: string) {
        this.store.dispatch(SharedActions.startLoading())
        this.ngAuth.signInWithEmailAndPassword(email, password).then(result => {
            this.initAuthentication()
            this.router.navigate(['/'])
            this.store.dispatch(SharedActions.stopLoading())
        }, error => {
            this.sharedService.showSnackBar(error.message, null, 3000)
            this.store.dispatch(SharedActions.stopLoading())
        })
    }

    logout() {
        this.ngAuth.signOut()
        this.store.dispatch(AuthActions.setUnauthenticated())
        this.trainingService.cancelSubscriptions()
    }


}