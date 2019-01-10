import {Component, Input, OnInit, Output} from '@angular/core';
import {ValueCompatibilityService} from '../value-compatibility.service';
import {animationTime, Scale, tests, ValueCompatibilityAnswers} from './value-compatibility-answers';
import {FormBuilder} from '@angular/forms';
import {slide, fade, vanish} from '../../../animations/testing-page-animation';
import {ActivatedRoute, Router} from '@angular/router';
import 'chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js';
import {URL} from '../../utils/config';
import {LoginService} from '../../login/login.service';


@Component({
  selector: 'app-value-compatibility',
  templateUrl: './value-compatibility.component.html',
  styleUrls: ['./value-compatibility.component.scss'],
  animations: [
    fade, slide, vanish
  ]
})
export class ValueCompatibilityComponent implements OnInit {

  tests: ValueCompatibilityAnswers;
  isGoalsDone = false;
  isStatesDone = false;
  isQualitiesDone = false;
  ind = 0;
  isNotPassed = true;
  itemState = [];
  token: string;
  @Output() links;
  linkArray = [];
  uri = `${URL}`;

  /** For setTimeout. Нужна пауза, чтобы успела пройти анимация 'active => unactive' (пауза должна быть такой же как в анимации "slide") */
  animationTime = animationTime;

  // data: Observable<ValueCompatibilityAnswers>;

  constructor(private valueCompatibilityService: ValueCompatibilityService,
              private loginService: LoginService,
              private formBuilder: FormBuilder,
              private router: Router, private route: ActivatedRoute) {
  }


  public initRoute() {
    //  если приходит ссылка с токеном в параметрах, то вытаскиваем этот токен и засовываем его в хедер запроса на бекенд
    // (передаем в метод saveGoalArray), вызывая initRoute() в ngOnInit()

    // Если кто-то прошел тест на своем компьютере, то на этом же компьютере может пройти тест кто-то другой по высланному токену
    // this.token = this.route.snapshot.queryParams.token;
    if (this.route.snapshot.queryParamMap.has('token')) {
      this.loginService.logout();
      this.token = 'Bearer ' + this.route.snapshot.queryParamMap.get('token');
      console.log(this.token);
    } else {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
      }
    }
    // if (this.route.snapshot.queryParamMap.has('token')) {
    //   this.token = this.route.snapshot.queryParamMap.get('token');
    //   console.log(this.token);
    // } else { this.token = localStorage.getItem('token'); }
    // this.route.queryParams.subscribe(params => {
    //   this.token = params['token'];
    //   console.log('this.route.queryParams.subscribe(params => {\n' +
    //     'this.token = params[\'token\']: ' + this.token); });
  }

  ngOnInit() {
    this.initRoute();
    // this.tests = tests; // TODO можно не ходить на сервер
    this.valueCompatibilityService.getTestList()
      .subscribe(data => {
        this.tests = data;
        console.log(data);
        }
      );

    for (let i = 0; i < 15; i++) {
      if (i === 0) {
        this.itemState[i] = 'active';
      } else {
        this.itemState[i] = 'unactive';
      }
    }
    // this.createLinksWithToken();
  }


  isActive(i: number) {
    return i === this.ind;
  }

  isChosen(i: number) {
    return this.tests.goal[i].chosenScale !== null;
  }

  setGoal(i: number, scale: Scale) {
    this.itemState[i] = 'unactive';
    this.tests.goal[i].chosenScale = scale;
    this.setTimeout(i);
  }

  setState(i: number, scale: Scale) {
    this.itemState[i] = 'unactive';
    this.tests.state[i].chosenScale = scale;
    this.setTimeout(i);
  }

  setQuality(i: number, scale: Scale) {
    this.itemState[i] = 'unactive';
    this.tests.quality[i].chosenScale = scale;
    this.setTimeout(i);
  }

  private setTimeout(i: number) {
    // нужна пауза, чтобы успела пройти анимация 'active => unactive' (пауза должна быть такой же как в анимации "slide")
    setTimeout(() => {
      this.ind = i + 1;
      this.itemState[i + 1] = 'active';
      // Добавить проверку на Passed
      if (this.ind === 15) {
        this.isNotPassed = false;
      }
      // this.router.navigate(['register']);
    }, this.animationTime);
  }

//        !!!!!!!!!!! GOAL !!!!!!!!!!
  // saveGoals(tests: ValueCompatibilityAnswers): void {
  saveGoals() {
    // localStorage.clear();
    this.valueCompatibilityService.saveGoalArray(this.tests, this.token).subscribe(data => {
        console.log(data);
        localStorage.setItem('token', data.headers.get('AUTHORIZATION'));
        console.log('token', data.headers.get('AUTHORIZATION'));
      }
    );
    console.log(this.tests.goal);
    this.isGoalsDone = true;
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
    this.router.navigate(['value-compatibility-test']);
  }

  resetGoals() {
    this.valueCompatibilityService.getTestList()
      .subscribe(data => {
          console.log(data);
          this.tests.goal = data.goal;
        }
      );
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
    this.router.navigate(['value-compatibility-test']);
  }

//        !!!!!!!!!!! STATE !!!!!!!!!!
  saveStates() {
    this.valueCompatibilityService.saveStateArray(this.tests).subscribe(data =>
      console.log(data));
    console.log(this.tests.state);
    this.isStatesDone = true;
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
    this.router.navigate(['value-compatibility-test']);
  }

  resetStates() {
    this.valueCompatibilityService.getTestList()
      .subscribe(data => {
          console.log(data);
          this.tests.state = data.state;
        }
      );
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
    this.router.navigate(['value-compatibility-test']);
  }

//        !!!!!!!!!!! QUALITIES !!!!!!!!!!
  saveQualities() {
    this.valueCompatibilityService.saveQualityArray(this.tests).subscribe(data =>
      console.log(data));
    console.log(this.tests.quality);
    this.isQualitiesDone = true;
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
    // this.router.navigate(['user-test']);
    this.afterTestActions();
  }

  resetQualities() {
    this.valueCompatibilityService.getTestList()
      .subscribe(data => {
          console.log(data);
          this.tests.quality = data.quality;
        }
      );
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
    this.router.navigate(['value-compatibility-test']);
  }

  isFirstTestItem(i): boolean {
    if (i === 0) {
      return true;
    }
    return false;
  }

  isLastTestItem(i): boolean {
    if (i === 14) {
      return true;
    }
    return false;
  }

  afterTestActions() {
    this.createFriendsTokens();
    this.router.navigate(['value-profile']);
  }

  testAnotherUser() {
    this.loginService.logout();
    this.router.navigate(['value-compatibility-test']);
  }

  private createFriendsTokens() {
    this.valueCompatibilityService.createFriendsTokens();
  }
}
