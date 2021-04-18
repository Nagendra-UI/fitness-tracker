import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { SharedService } from './../../shared/shared.service';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading: Observable<boolean>

  constructor(private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
    this.isLoading = this.store.select(fromRoot.getIsLoading)
  }

  onSubmit(formData: NgForm) {
    this.authService.addUser(formData.value.email, formData.value.password)
  }


}
