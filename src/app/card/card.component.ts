import { Component, OnInit } from '@angular/core';
import {flip} from '../../animations/card-animation';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    flip
  ]
})
export class CardComponent implements OnInit {
  flip: string = 'inactive';
  constructor() { }

  ngOnInit() {
  }

  toggleFlip() {
    this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
  }
}
