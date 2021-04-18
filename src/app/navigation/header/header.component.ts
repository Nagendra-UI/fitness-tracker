import { from, Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer'
import * as authReducer from '../../auth/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Input() open: boolean = false
  @Output() opened = new EventEmitter<boolean>()
  isAuth: Observable<boolean>


  constructor(private router: Router,
    private authService: AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isAuth = this.store.select(fromRoot.getAuthenticatedState)
  }

  sideNav() {
    this.opened.emit(true)
  }

  loginPage() {
    this.router.navigate(['/login'])
    this.isAuth = this.store.select(fromRoot.getAuthenticatedState)
  }

  signupPage() {
    this.router.navigate(['/signup'])
  }

  logout() {
    this.authService.logout()
    this.isAuth = this.store.select(fromRoot.getAuthenticatedState)
    this.router.navigate(['/login'])
  }



}
