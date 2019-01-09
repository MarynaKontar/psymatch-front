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
// для поворота карточек, если делать это с помощью TS. Но пока поворот сделан с помощью css и эта анимация не используется
