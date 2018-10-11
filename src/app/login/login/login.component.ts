import { Component, OnInit } from '@angular/core';
import {User} from '../../profile/user';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.user)
      .subscribe(loggedUser => {
        this.user = loggedUser.body;
        localStorage.setItem('token', loggedUser.headers.get('AUTHORIZATION'));
        console.log('token', loggedUser.headers.get('AUTHORIZATION'));
      });
    this.router.navigate(['home']); // TODO возвращать на пред. стр.
  }

  logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem("expires_at");
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
