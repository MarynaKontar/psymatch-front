import { Component, OnInit } from '@angular/core';
import {flip} from '../../animations/card-animation';
import {
  KONTAR_MARYNA_BOAST, KONTAR_MARYNA_EMAIL, KONTAR_MARYNA_FB, KONTAR_MARYNA_GITHUB, KONTAR_MARYNA_LIFE,
  KONTAR_MARYNA_NAME, KONTAR_MARYNA_ROLE, KONTAR_MARYNA_WHY_IN_PROJECT,
  PROSCKURA_VITALIY_BOAST, PROSCKURA_VITALIY_EMAIL, PROSCKURA_VITALIY_FB, PROSCKURA_VITALIY_GITHUB, PROSCKURA_VITALIY_LIFE,
  PROSCKURA_VITALIY_NAME, PROSCKURA_VITALIY_ROLE, PROSCKURA_VITALIY_WHY_IN_PROJECT,
  PROSCKURA_YURIY_BOAST, PROSCKURA_YURIY_EMAIL, PROSCKURA_YURIY_FB, PROSCKURA_YURIY_LIFE, PROSCKURA_YURIY_NAME, PROSCKURA_YURIY_ROLE,
  PROSCKURA_YURIY_WHY_IN_PROJECT, VASYLENKO_SVETLANA_BOAST, VASYLENKO_SVETLANA_EMAIL, VASYLENKO_SVETLANA_FB, VASYLENKO_SVETLANA_LIFE,
  VASYLENKO_SVETLANA_NAME,
  VASYLENKO_SVETLANA_ROLE,
  VASYLENKO_SVETLANA_WHY_IN_PROJECT
} from '../about-project/about-project';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    flip
  ]
})
export class CardComponent implements OnInit {
  // flip = 'inactive';

  prosckura_yuriy_name = `${PROSCKURA_YURIY_NAME}`;
  prosckura_yuriy_role = `${PROSCKURA_YURIY_ROLE}`;
  prosckura_yuriy_boast = `${PROSCKURA_YURIY_BOAST}`;
  prosckura_yuriy_life = `${PROSCKURA_YURIY_LIFE}`;
  prosckura_yuriy_why_in_project = `${PROSCKURA_YURIY_WHY_IN_PROJECT}`;
  prosckura_yuriy_email = `${PROSCKURA_YURIY_EMAIL}`;
  prosckura_yuriy_fb = `${PROSCKURA_YURIY_FB}`;

  prosckura_vitaliy_name = `${PROSCKURA_VITALIY_NAME}`;
  prosckura_vitaliy_role = `${PROSCKURA_VITALIY_ROLE}`;
  prosckura_vitaliy_boast = `${PROSCKURA_VITALIY_BOAST}`;
  prosckura_vitaliy_life = `${PROSCKURA_VITALIY_LIFE}`;
  prosckura_vitaliy_why_in_project = `${PROSCKURA_VITALIY_WHY_IN_PROJECT}`;
  prosckura_vitaliy_email = `${PROSCKURA_VITALIY_EMAIL}`;
  prosckura_vitaliy_fb = `${PROSCKURA_VITALIY_FB}`;
  prosckura_vitaliy_github = `${PROSCKURA_VITALIY_GITHUB}`;

  kontar_maryna_name = `${KONTAR_MARYNA_NAME}`;
  kontar_maryna_role = `${KONTAR_MARYNA_ROLE}`;
  kontar_maryna_boast = `${KONTAR_MARYNA_BOAST}`;
  kontar_maryna_life = `${KONTAR_MARYNA_LIFE}`;
  kontar_maryna_why_in_project = `${KONTAR_MARYNA_WHY_IN_PROJECT}`;
  kontar_maryna_email = `${KONTAR_MARYNA_EMAIL}`;
  kontar_maryna_fb = `${KONTAR_MARYNA_FB}`;
  kontar_maryna_github = `${KONTAR_MARYNA_GITHUB}`;

  vasylenko_svetlana_name = `${VASYLENKO_SVETLANA_NAME}`;
  vasylenko_svetlana_role = `${VASYLENKO_SVETLANA_ROLE}`;
  vasylenko_svetlana_boast = `${VASYLENKO_SVETLANA_BOAST}`;
  vasylenko_svetlana_life = `${VASYLENKO_SVETLANA_LIFE}`;
  vasylenko_svetlana_why_in_project = `${VASYLENKO_SVETLANA_WHY_IN_PROJECT}`;
  vasylenko_svetlana_email = `${VASYLENKO_SVETLANA_EMAIL}`;
  vasylenko_svetlana_fb = `${VASYLENKO_SVETLANA_FB}`;

  constructor() { }

  ngOnInit() {
  }

  // для поворота карточек, если делать это с помощью TS. Но пока поворот сделан с помощью css и эта анимация не используется
  // toggleFlip() {
  //   this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
  // }
}