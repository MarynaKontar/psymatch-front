import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../login/login.service';
import {ComponentName} from '../common-components/services/component-name';
import {LogService} from '../common-components/services/log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: LoginService,
              private router: Router,
              private log: LogService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLogin()) {
      this.log.log(ComponentName.AUTH_GUARD, `canActivate: login=TRUE`);
      return true;
    } else {
      this.log.log(ComponentName.AUTH_GUARD, `canActivate: login=FALSE`);
      this.log.log(ComponentName.AUTH_GUARD, `canActivate: returnUrl=${state.url}`);
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
