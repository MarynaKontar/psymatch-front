import { Component, OnInit } from '@angular/core';
import {ValueCompatibilityService} from '../value-compatibility.service';
import {Scale, ValueCompatibilityAnswers} from './value-compatibility-answers';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-value-compatibility',
  templateUrl: './value-compatibility.component.html',
  styleUrls: ['./value-compatibility.component.scss'],
  animations: [
    trigger('test', [
      state('void', style({ opacity: 0 })), // полностью прозрачен в состоянии void
      transition(':enter, :leave', [ // void <=> *
        animate('3s ease-in-out')
      ])
    ])
  ]
})
export class ValueCompatibilityComponent implements OnInit {
  tests: ValueCompatibilityAnswers;

  constructor(private valueCompatibilityService: ValueCompatibilityService) {
  }

  ngOnInit() {
    this.valueCompatibilityService.getTestList()
      .subscribe(data => {
          console.log(data);
          this.tests = data;
        }
      );
  }


  setGoal(i: number, scale: Scale) {
    this.tests.goal[i].chosenScale = scale;
  }

  setState(i: number, scale: Scale) {
    this.tests.state[i].chosenScale = scale;
  }

  setQuality(i: number, scale: Scale) {
    this.tests.quality[i].chosenScale = scale;
  }

  saveGoals() {
    this.valueCompatibilityService.saveGoalArray(this.tests.goal).subscribe(data =>
    console.log(data));
    console.log(this.tests.goal);
  }

  saveStates() {
    this.valueCompatibilityService.saveStateArray(this.tests.state).subscribe(data =>
      console.log(data));
    console.log(this.tests.state);
  }

  saveQualities() {
    this.valueCompatibilityService.saveQualityArray(this.tests.quality).subscribe(data =>
      console.log(data));
    console.log(this.tests.quality);
  }

}
