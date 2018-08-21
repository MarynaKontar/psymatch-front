import {Component, OnInit} from '@angular/core';
import {ValueCompatibilityService} from '../value-compatibility.service';
import {Scale, tests, ValueCompatibilityAnswers} from './value-compatibility-answers';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {slide, fade} from '../../../animations/testing-page-animation';
import {Router} from '@angular/router';


@Component({
  selector: 'app-value-compatibility',
  templateUrl: './value-compatibility.component.html',
  styleUrls: ['./value-compatibility.component.scss'],
  animations: [
    fade, slide
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
  isGoalsDone = false;
  isStatesDone = false;
  isQualitiesDone = false;
  answer = [];
  ind = 0;
  isNotPassed = true;
  itemState = [];
  animationTime = 500;

  // data: Observable<ValueCompatibilityAnswers>;

  constructor(private valueCompatibilityService: ValueCompatibilityService,
              private formBuilder: FormBuilder,
              private router: Router) {
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
    console.log(this.tests);
    this.itemState[0] = 'active';
    this.itemState[1] = 'unactive';
    this.itemState[2] = 'unactive';
    this.itemState[3] = 'unactive';
    this.itemState[4] = 'unactive';
    this.itemState[5] = 'unactive';
    this.itemState[6] = 'unactive';
    this.itemState[7] = 'unactive';
    this.itemState[8] = 'unactive';
    this.itemState[9] = 'unactive';
    this.itemState[10] = 'unactive';
    this.itemState[11] = 'unactive';
    this.itemState[12] = 'unactive';
    this.itemState[13] = 'unactive';
    this.itemState[14] = 'unactive';
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

  isActive(i: number) {
   return i === this.ind;
  }
  isChosen(i: number) {
    return this.tests.goal[i].chosenScale !== null;
  }
  setGoal(i: number, scale: Scale) {
    this.itemState[i] = 'unactive';
    this.tests.goal[i].chosenScale = scale;

    // нужна пауза, чтобы успела пройти анимация 'active => unactive' (пауза должна быть такой же как в анимации "slide")
    setTimeout (() => {
      this.ind = i + 1;
      this.itemState[i + 1] = 'active';
      // Добавить проверку на Passed
      if (this.ind === 15) {
        this.isNotPassed = false;
      }
      // this.router.navigate(['register']);
    }, this.animationTime);
  }

  setState(i: number, scale: Scale) {
    this.itemState[i] = 'unactive';
    this.tests.state[i].chosenScale = scale;

    // нужна пауза, чтобы успела пройти анимация 'active => unactive' (пауза должна быть такой же как в анимации "slide")
    setTimeout (() => {
      this.ind = i + 1;
      this.itemState[i + 1] = 'active';
      // Добавить проверку на Passed
      if (this.ind === 15) {
        this.isNotPassed = false;
      }
      // this.router.navigate(['register']);
    }, this.animationTime);
  }

  setQuality(i: number, scale: Scale) {
    this.itemState[i] = 'unactive';
    this.tests.quality[i].chosenScale = scale;

    // нужна пауза, чтобы успела пройти анимация 'active => unactive' (пауза должна быть такой же как в анимации "slide")
    setTimeout (() => {
      this.ind = i + 1;
      this.itemState[i + 1] = 'active';
      // Добавить проверку на Passed
      if (this.ind === 15) {
        this.isNotPassed = false;
      }
      // this.router.navigate(['register']);
    }, this.animationTime);
  }

  // saveGoals(tests: ValueCompatibilityAnswers): void {
  saveGoals() {
    // this.valueCompatibilityService.saveGoalArray(this.tests.goal).subscribe(data =>
    // console.log(data));
    // console.log(this.tests.goal);
      console.log(this.tests);
      this.isGoalsDone = true;
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
    this.router.navigate(['user-test']);
  }
  resetGoals() {
    // this.valueCompatibilityService.getTestList()
    //   .subscribe(data => {
    //       console.log(data);
    //       this.tests.goal = data.goal;
    //     }
    //   );
    this.itemState[0] = 'active';
    this.tests.goal = tests.goal;
    this.ind = 0;
    this.isNotPassed = true;
    this.router.navigate(['user-test']);
  }

  saveStates() {
    // this.valueCompatibilityService.saveStateArray(this.tests.state).subscribe(data =>
      // console.log(data));
    // console.log(this.tests.state);
    console.log(this.tests);
    this.isStatesDone = true;
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
    this.router.navigate(['user-test']);
  }
  resetStates() {
    // this.valueCompatibilityService.getTestList()
    //   .subscribe(data => {
    //       console.log(data);
    //       this.tests.state = data.state;
    //     }
    //   );
    this.itemState[0] = 'active';
    this.tests.state = tests.state;
    this.ind = 0;
    this.isNotPassed = true;
    this.router.navigate(['user-test']);
  }

  saveQualities() {
    // this.valueCompatibilityService.saveQualityArray(this.tests.quality).subscribe(data =>
      // console.log(data));
    // console.log(this.tests.quality);
      console.log(this.tests);
      this.isQualitiesDone = true;
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
    this.router.navigate(['user-test']);
  }
  resetQualities() {
    // this.valueCompatibilityService.getTestList()
    //   .subscribe(data => {
    //       console.log(data);
    //       this.tests.quality = data.quality;
    //     }
    //   );
    this.itemState[0] = 'active';
    this.tests.quality = tests.quality;
    this.ind = 0;
    this.isNotPassed = true;
    this.router.navigate(['user-test']);
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
