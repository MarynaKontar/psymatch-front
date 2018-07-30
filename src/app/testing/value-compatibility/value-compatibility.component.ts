import { Component, OnInit } from '@angular/core';
import {ValueCompatibilityService} from '../value-compatibility.service';
import {ValueCompatibilityAnswers} from './value-compatibility-answers';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-value-compatibility',
  templateUrl: './value-compatibility.component.html',
  styleUrls: ['./value-compatibility.component.scss']
})
export class ValueCompatibilityComponent implements OnInit {
 tests: ValueCompatibilityAnswers;

  form: FormGroup;
  orders = [
    { id: 1, name: 'order 1' },
    { id: 2, name: 'order 2' },
    { id: 3, name: 'order 3' },
    { id: 4, name: 'order 4' }
  ];
answer = [];
  constructor(private valueCompatibilityService: ValueCompatibilityService,
              private formBuilder: FormBuilder) {
    // Create a new array with a form control for each order
    const controls = this.orders.map(c => new FormControl(false));
    controls[0].setValue(true); // Set the first checkbox to true (checked)

    this.form = this.formBuilder.group({
      orders: new FormArray(controls)
    });
  }

  ngOnInit() {
    this.valueCompatibilityService.getTestList()
      .subscribe(data => { console.log(data);
       this.tests = data; }
      );
  }



  submit() {

    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? this.orders[i].id : null)
      .filter(v => v !== null);
    console.log(this.form.value);
    console.log(selectedOrderIds);
  }

  onSelectionChange(order: any) {
    if (!this.answer.includes(order)) {
      this.answer.push(order);
    }
    console.log(this.answer);
  }

  onSelection() {
    console.log(this.answer);
  }

}
