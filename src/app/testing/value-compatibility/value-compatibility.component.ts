import { Component, OnInit } from '@angular/core';
import {ValueCompatibilityService} from '../value-compatibility.service';
import {Scale, tests, ValueCompatibilityAnswers} from './value-compatibility-answers';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {User} from '../../profile/user';
import {test} from '../../../animations/testing-page-animation';


@Component({
  selector: 'app-value-compatibility',
  templateUrl: './value-compatibility.component.html',
  styleUrls: ['./value-compatibility.component.scss'],
  animations: [
    test
  ]
})
export class ValueCompatibilityComponent implements OnInit {
  tests: ValueCompatibilityAnswers;

  // form: FormGroup;
  // orders = [
  //   { id: 1, name: 'order 1' },
  //   { id: 2, name: 'order 2' },
  //   { id: 3, name: 'order 3' },
  //   { id: 4, name: 'order 4' }
  // ];
  answer = [];
  // data: Observable<ValueCompatibilityAnswers>;

  constructor(private valueCompatibilityService: ValueCompatibilityService,
              private formBuilder: FormBuilder) {
    // Create a new array with a form control for each order
    // const controls = this.orders.map(c => new FormControl(false));
    // controls[0].setValue(true); // Set the first checkbox to true (checked)
    //
    // this.form = this.formBuilder.group({
    //   orders: new FormArray(controls)
    // });
  }

  ngOnInit() {
    // this.valueCompatibilityService.getTestList()
    //   .subscribe(data => {
    //       console.log(data);
    //       this.tests = data;
    //     }
    //   );
    this.tests = tests;
  }


  // submit() {
  //
  //   const selectedOrderIds = this.form.value.orders
  //     .map((v, i) => v ? this.orders[i].id : null)
  //     .filter(v => v !== null);
  //   console.log(this.form.value);
  //   console.log(selectedOrderIds);
  // }
  //
  // onSelectionChange(order: any) {
  //   if (!this.answer.includes(order)) {
  //     this.answer.push(order);
  //   }
  //   console.log(this.answer);
  // }
  //
  // onSelection() {
  //   console.log(this.answer);
  // }

  setGoal(i: number, scale: Scale) {
    this.tests.goal[i].chosenScale = scale;
  }

  setState(i: number, scale: Scale) {
    this.tests.state[i].chosenScale = scale;
  }

  setQuality(i: number, scale: Scale) {
    this.tests.quality[i].chosenScale = scale;
  }

  // saveGoals(tests: ValueCompatibilityAnswers): void {
  saveGoals() {
    this.valueCompatibilityService.saveGoalArray(this.tests.goal).subscribe(data =>
    // console.log(data));
    // console.log(this.tests.goal);
      console.log(this.tests));
  }


  saveStates() {
    this.valueCompatibilityService.saveStateArray(this.tests.state).subscribe(data =>
      // console.log(data));
    // console.log(this.tests.state);
    console.log(this.tests));
  }

  saveQualities() {
    this.valueCompatibilityService.saveQualityArray(this.tests.quality).subscribe(data =>
      // console.log(data));
    // console.log(this.tests.quality);
      console.log(this.tests));
  }

  isFirstTestItem(i): boolean {
    if (i ===  0 ) { return true; }
    return false;
  }
  isLastTestItem(i): boolean {
    if (i === 14) { return true; }
    return false;
  }

}
