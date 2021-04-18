import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './app.reducer'
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  opened: boolean = false

  constructor(private authService: AuthService, private store: Store<fromRoot.State>, private ngAuth: AngularFireAuth) {

  }

  ngOnInit() {
    this.authService.initAuthentication()

  }



}
