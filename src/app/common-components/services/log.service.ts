import { Injectable } from '@angular/core';
import {ComponentName} from './component-name';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  log(componentName: ComponentName, message: string) {
    console.log(componentName + ': ' + message);
  }
}
