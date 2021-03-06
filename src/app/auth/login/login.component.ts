import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from './../auth.service';
import * as fromRoot from '../../app.reducer'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isLoading = this.store.select(fromRoot.getIsLoading)
  }

  onSubmit(formData: NgForm) {
    this.authService.loginUser(formData.value.email, formData.value.password)
  }


}
