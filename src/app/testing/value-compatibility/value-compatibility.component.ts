import {Component, Input, OnInit, Output} from '@angular/core';
import {ValueCompatibilityService} from '../value-compatibility.service';
import {animationTime, Scale, ScaleEnum, ValueCompatibilityAnswers} from './value-compatibility-answers';
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
  scaleColor = ['rgba(255,0,0, 1)', 'rgba(255,148,0, 1)', 'rgba(255,237,0, 1)',
    'rgba(113,218,0, 1)', 'rgba(0,240,255,1)', 'rgba(108,88,255,1)'];

  /** For setTimeout. Нужна пауза, чтобы успела пройти анимация 'active => unactive' (пауза должна быть такой же как в анимации "slide") */
  animationTime = animationTime;
  userId: string;

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

    this.isGoalsDone = localStorage.getItem('isGoalsDone') === 'true';
    console.log('this.isGoalsDone ' + this.isGoalsDone );
    this.isStatesDone = localStorage.getItem('isStatesDone') === 'true';
    console.log('this.isStatesDone ' + this.isStatesDone );
    this.isQualitiesDone = localStorage.getItem('isQualitiesDone') === 'true';


    // this.tests = tests; // TODO можно не ходить на сервер
    this.valueCompatibilityService.getTestList()
      .subscribe(data => {
          this.tests = data;
          console.log(data);

        this.tests.goal.forEach(goal => {
            goal.firstScale.scaleColor = this.setScaleColor(goal.firstScale.scale);
            goal.secondScale.scaleColor = this.setScaleColor(goal.secondScale.scale);
        });
        this.tests.quality.forEach(quality => {
          quality.firstScale.scaleColor = this.setScaleColor(quality.firstScale.scale);
          quality.secondScale.scaleColor = this.setScaleColor(quality.secondScale.scale);
        });
        this.tests.state.forEach(state => {
          state.firstScale.scaleColor = this.setScaleColor(state.firstScale.scale);
          state.secondScale.scaleColor = this.setScaleColor(state.secondScale.scale);
        });
      }
      );

    for (let i = 0; i < 15; i++) {
      if (i === 0) {
        this.itemState[i] = 'active';
      } else {
        this.itemState[i] = 'unactive';
      }
    }
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
    console.log('saveGoals(): ', this.token);
    this.valueCompatibilityService.saveGoalArray(this.tests, this.token).subscribe(httpResponse => {
        localStorage.setItem('token', httpResponse.headers.get('AUTHORIZATION'));
        localStorage.setItem('isValueCompatibilityTestPassed', httpResponse.body.passed === true ? 'true' : 'false');
        console.log('token', httpResponse.headers.get('AUTHORIZATION'));
        this.userId = httpResponse.body.userId;
      }
    );
    console.log(this.tests.goal);
    this.isGoalsDone = true;
    localStorage.setItem('isGoalsDone', 'true');
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
    this.setPossibilityToPassTestsagain();
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
    this.valueCompatibilityService.saveStateArray(this.tests).subscribe(data => {
      console.log('saveState: ' + data);
      localStorage.setItem('isValueCompatibilityTestPassed', data.passed === true ? 'true' : 'false');
    });
    console.log(this.tests.state);
    this.isStatesDone = true;
    localStorage.setItem('isStatesDone', 'true');
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
    this.setPossibilityToPassTestsagain();
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
    this.valueCompatibilityService.saveQualityArray(this.tests).subscribe(data => {
      console.log(data);
      localStorage.setItem('isValueCompatibilityTestPassed', data.passed === true ? 'true' : 'false');
    });
    console.log(this.tests.quality);
    this.isQualitiesDone = true;
    localStorage.setItem('isQualitiesDone', 'true');
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
    this.setPossibilityToPassTestsagain();
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

  setPossibilityToPassTestsagain() {

    if (this.isGoalsDone === true && this.isStatesDone === true && this.isQualitiesDone === true) {
      localStorage.setItem('isGoalsDone', 'false');
      localStorage.setItem('isStatesDone', 'false');
      localStorage.setItem('isQualitiesDone', 'false');
    }
  }

  afterTestActions() {
    this.createFriendsTokens();
    this.router.navigate(['value-profile']);
  }

  testAnotherUser() {
    const token = this.loginService.getToken();
    this.router.navigate(['error']);
    // this.loginService.logout();
    // localStorage.setItem('userForMatchingToken', token);
    // this.router.navigate(['value-compatibility-test']);
  }

  private createFriendsTokens() {
    this.valueCompatibilityService.createFriendsTokens();
  }

  private setScaleColor(scale: ScaleEnum): string {
    switch (scale) {
      case ScaleEnum.ONE: {
        return this.scaleColor[0];
      }
      case ScaleEnum.TWO: {
        return this.scaleColor[1];
      }
      case ScaleEnum.THREE: {
        return this.scaleColor[2];
      }
      case ScaleEnum.FOUR: {
        return this.scaleColor[3];
      }
      case ScaleEnum.FIVE: {
        return this.scaleColor[4];
      }
      case ScaleEnum.SIX: {
        return this.scaleColor[5];
      }
      default: {
        return this.scaleColor[0];
      }
    }
  }
}
