import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {

// т.к HttpInterceptor перехватывает абсолютно все запросы мы должны гарантировать, что Authorization заголовок будет
// добавлен только к запросам на наш API
//    if (!req.url.includes('api/')) {
//      return next.handle(req);
//    }

// Get the auth token from the service.
//     const token = this.auth.getAuthorizationToken();
    const token: string = localStorage.getItem('token');
    // let t = req.params.has('token');
    // if (req.params.has('token')) {
    //   token = req.params.get('token');
    // }

    if (token) {
      // клонироуем запрос, что бы добавить новый заголовок (менять сам запрос нельзя, он immutable), поєтому меняем клонированный
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', token),
      });
      // передаем клонированный запрос вместо ориганального
      return next.handle(clonedReq);
    } else {
      return next.handle(req);
    }
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
// добавлен только к запросам на наш API
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
