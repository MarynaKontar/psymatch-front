import {HostListener, Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';

export abstract class DeactivationGuarded {
  abstract canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<DeactivationGuarded> {
  canDeactivate(component: DeactivationGuarded):  Observable<boolean> | Promise<boolean> | boolean {
  return component.canDeactivate ? component.canDeactivate() : true;
  }
}


// @HostListener('window:beforeunload', ['$event'])
// unloadNotification($event: any) {
//   if (window.onpagehide || window.onpagehide === null) {
//     if (!this.canDeactivate()) {
//       $event.returnValue = true;
//     }
//   }
// }
