import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import * as fromRoot from '../app.reducer'
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router, private store: Store<fromRoot.State>) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean | UrlTree {
        let user;
        this.store.select('auth').subscribe(data => {
            user = data.isAuthenticated
        })
        if (user) {
            return true
        } else {
            return this.router.createUrlTree(['/login'])
        }
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let user;
        this.store.select('auth').subscribe(data => {
            user = data.isAuthenticated
        })
        if (user) {
            return true
        } else {
            return this.router.createUrlTree(['/login'])
        }
    }

}