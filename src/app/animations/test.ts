import {animate, state, style, transition, trigger} from '@angular/animations';

export let test = trigger('test', [
  state('void', style({ opacity: 0 })), // полностью прозрачен в состоянии void
  transition(':enter, :leave', [ // void <=> *
    animate('3s ease-in-out')
  ])
]);



