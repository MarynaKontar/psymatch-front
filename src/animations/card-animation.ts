import {animate, state, style, transition, trigger} from '@angular/animations';

export let flip = trigger('flip', [
    state('active', style({
      transform: 'rotateY(179deg)'
    })),
    state('inactive', style({
      transform: 'rotateY(0)'
    })),
    transition('active => inactive', animate('500ms ease-out')),
    transition('inactive => active', animate('500ms ease-in'))
  ]);
