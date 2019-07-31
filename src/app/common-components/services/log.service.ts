import { Injectable } from '@angular/core';
import {ComponentName} from './component-name';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  log(componentName: ComponentName, message: string, object?: Object) {
    console.log(componentName + ': ' + message);
    if (object) {
      console.log(object);
    }
  }
  error(componentName: ComponentName, error: HttpErrorResponse, message: string) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
  }
}
