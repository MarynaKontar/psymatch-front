import { Component, OnInit } from '@angular/core';
import {User} from '../../profile/user';
import {LoginService} from '../login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistrationService} from '../../registration/registration.service';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  returnUrl: string;
  constructor(private loginService: LoginService,
              private registrationService: RegistrationService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    // reset login status
    this.logout();
    this.loginService.login(this.user)
      .subscribe(loggedUser => {
        this.user = loggedUser.body;
        console.log(this.user);
        console.log(loggedUser);

        // TODO где лучше это делать? Здесь или в сервисе? В сервисе в методах надо subscribe, так что наверное лучше здесь.
         this.saveTokenToLocalStorage(loggedUser);
         this.setHaveAgeAndGender();
         this.setIsRegistered();
         this.isValueCompatibilityTestPassed(loggedUser);
        // console.log('haveAgeAndGender: ', (this.user.age != null && this.user.gender != null) ? 'true' : 'false');
        // console.log('token', loggedUser.headers.get('AUTHORIZATION'));
      },
        error => {
          // login failed so display error

        });
    this.router.navigateByUrl(this.returnUrl); // TODO возвращать на пред. стр.
  }

  private setHaveAgeAndGender() {
    this.registrationService.setHaveAgeAndGender(this.user);
  }
  private saveTokenToLocalStorage(httpResponse: HttpResponse<User>) {
    this.loginService.saveTokenToLocalStorage(httpResponse);
  }
  private setIsRegistered() {
    this.registrationService.setIsRegistered();
  }

  private isValueCompatibilityTestPassed(loggedUser: HttpResponse<User>) {
    return this.loginService.setIsValueCompatibilityTestPassed(loggedUser);
  }

  logout() {
    this.loginService.logout();
  }

}



// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//
//   intercept(req: HttpRequest<any>,
//             next: HttpHandler): Observable<HttpEvent<any>> {
//
//     let idToken: string = null;
//     if (req.params.has('token')) {
//       idToken = req.params.get('token');
//     } else {
//       idToken = localStorage.getItem('token');
//     }
//
//     if (idToken) {
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization',
//           idToken)
//       });
//
//       return next.handle(cloned);
//     } else {
//       return next.handle(req);
//     }




// //т.к HttpInterceptor перехватывает абсолютно все запросы мы должны гарантировать, что Authorization заголовок будет
//добавлен только к запросам на наш API
// if (!req.url.includes('api/')) {
//   return next.handle(req);
// }
//
// //клонироуем запрос, что бы добавить новый заголовок
// const authReq = req.clone({
//   headers: req.headers.set('Authorization', this.auth.authHeader)
// });
// //передаем клонированный запрос место ориганального
// return next.handle(authReq);


// }
// }
