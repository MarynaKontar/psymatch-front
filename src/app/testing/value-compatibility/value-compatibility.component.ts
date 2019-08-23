import {Component, OnInit} from '@angular/core';
import {ValueCompatibilityService} from '../value-compatibility.service';
import {animationTime, AreaItem, Scale, tests, ValueCompatibilityAnswers} from './value-compatibility-answers';
import {FormBuilder} from '@angular/forms';
import {slide, fade, vanish} from '../../../animations/testing-page-animation';
import {ActivatedRoute, Router} from '@angular/router';
import 'chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js';
import {URL} from '../../utils/config';
import {LoginService} from '../../auth/authentication/login.service';
import {SendingTokensService} from '../../common-components/sending-tokens/sending-tokens.service';
import {UserAccountService} from '../../profile/user-account.service';
import {LogService} from '../../common-components/services/log.service';
import {STATE_COLOR} from '../../../assets/colorStyle';
import {ComponentName} from '../../common-components/services/component-name';
import {User, UserAccount} from '../../profile/user';


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
  uri = `${URL}`;
  scaleColor = `${STATE_COLOR}`.split(' ');
  private retrieveDataResolver;
  /** For setTimeout. Нужна пауза, чтобы успела пройти анимация 'active => unactive' (пауза должна быть такой же как в анимации "slide") */
  animationTime = animationTime;

  constructor(private valueCompatibilityService: ValueCompatibilityService,
              private loginService: LoginService,
              private userAccountService: UserAccountService,
              private sendingTokensService: SendingTokensService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private log: LogService) {
  }

  initRoute() {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` initRoute()`);
    // if a link comes with a token in the parameters, then pull out this token
    // and insert it into the request header for the backend
    // (pass in the saveGoalArray method), calling initRoute () in ngOnInit ()

    // If someone passed the test on his computer, then on the same computer,
    // someone else can take the test using the token sent.
    // this.token = this.route.snapshot.queryParams.token;
    if (this.route.snapshot.queryParamMap.has('token')) {
      this.route.queryParams.subscribe(params => {
        this.token = params['token']; });
      this.loginService.logout();
      this.token = 'Bearer ' + this.route.snapshot.queryParamMap.get('token');
      this.log.log(ComponentName.VALUE_COMPATIBILITY, ` initRoute(): has token as query param: ${this.token}`);
    } else {
      let token = localStorage.getItem('token');
      if (token) {
        this.log.log(ComponentName.VALUE_COMPATIBILITY, ` initRoute(): hasn't token as query param, but has token in local storage: ${token}`);
        this.token = token;
      }
    }
  }

  ngOnInit() {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, `ngOnInit`);
    this.initRoute();
    this.isGoalsDone = localStorage.getItem('isGoalsDone') === 'true';
    this.isStatesDone = localStorage.getItem('isStatesDone') === 'true';
    this.isQualitiesDone = localStorage.getItem('isQualitiesDone') === 'true';
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` ngOnInit: isStatesDone: ${this.isStatesDone}`);
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` ngOnInit: isGoalsDone: ${this.isGoalsDone}`);
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` ngOnInit: isQualitiesDone: ${this.isQualitiesDone}`);

    // ============GET INITIAL TESTS =================
    // you can not go to the server to get the initial tests
    // this.tests = tests;
    // this.shaffle(this.tests.goal);
    // this.shaffle(this.tests.state);
    // this.shaffle(this.tests.quality);

    // go to the server to get the initial tests
    this.valueCompatibilityService.getTestList()
      .subscribe(data => {
          this.tests = data;
          this.log.log(ComponentName.VALUE_COMPATIBILITY, ` ngOnInit: tests: ${data}`);
          }
      );

    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` ngOnInit: initial test: `, this.tests);

    // marks active and unactive card-deck for @slide animation
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
    // a pause is needed for the animation to go through 'active => unactive' (the pause should be the same as in the animation "slide")
    setTimeout(() => {
      this.ind = i + 1;
      this.itemState[i + 1] = 'active';
      // test if passed
      if (this.ind === 15) {
        this.isNotPassed = false;
      }
    }, this.animationTime);
  }

//        !!!!!!!!!!! GOAL !!!!!!!!!!
  saveGoals() {
    // SYNCHRONOUS: doing a serial sequence of async tasks with PROMISE, using chaining "then" calls.
    // without Promise, all commands async, and there is can be "navigate" before retrieve data from server
    this.log.log(ComponentName.VALUE_COMPATIBILITY, `saveGoals()`);
    this.retrieveGoalPromise().then(() => { this.afterSaveGoalActions(); });
  }

  resetGoals() {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` resetGoals()`);
    this.resetItemsAfterSaveAreaArrays();
  }

//        !!!!!!!!!!! STATE !!!!!!!!!!
  saveStates() {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` saveStates()`);
    this.retrieveStatePromise().then(() => { this.afterSaveStateActions(); });
  }

  resetStates() {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` resetStates()`);
    this.resetItemsAfterSaveAreaArrays();
  }

//        !!!!!!!!!!! QUALITIES !!!!!!!!!!
  saveQualities() {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` saveQualities()`);
    this.retrieveQualityPromise().then(() => { this.afterSaveQualityActions(); });
  }

  resetQualities() {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` resetQualities()`);
    this.resetItemsAfterSaveAreaArrays();
  }

  private setPossibilityToPassTestsAgain() {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` setPossibilityToPassTestsAgain()`);
    if (this.isGoalsDone === true && this.isStatesDone === true && this.isQualitiesDone === true) {
      localStorage.setItem('isGoalsDone', 'false');
      localStorage.setItem('isStatesDone', 'false');
      localStorage.setItem('isQualitiesDone', 'false');
    }
  }

 private afterTestActions() {
   this.log.log(ComponentName.VALUE_COMPATIBILITY, ` afterTestActions()`);
    if (localStorage.getItem('friendsTokens') === null) {
      this.log.log(ComponentName.VALUE_COMPATIBILITY, ` afterTestActions(): createFriendsTokens()`);
      this.createFriendsTokens();
    }
      if (this.userAccountService.isUserForMatchingToken()) {
        this.log.log(ComponentName.VALUE_COMPATIBILITY, ` afterTestActions(): there is userForMatchingToken, so navigate to /match`);
        this.router.navigate(['match']);
      } else {
        this.log.log(ComponentName.VALUE_COMPATIBILITY, ` afterTestActions(): navigate to /value-profile`);
        this.router.navigate(['value-profile']);
      }
  }


//        !!!!!!!!!!!!!!!!!!!! SYNCHRONIZE RETRIEVING DATA FROM SERVER !!!!!!!!!!!!!!!!!!

//        !!!!!!!!!!! GOAL !!!!!!!!!!
  private afterSaveGoalActions(): void {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` afterSaveGoalActions()`);
    this.resetItemsAfterSaveAreaArrays();
    this.setPossibilityToPassTestsAgain();
  }
  private saveGoalArray(): void {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` saveGoalArray()`);
      this.valueCompatibilityService.saveGoalArray(this.tests, this.token).subscribe(httpResponse => {
          localStorage.setItem('token', httpResponse.headers.get('Authorization'));
          localStorage.setItem('isValueCompatibilityTestPassed', httpResponse.body.passed === true ? 'true' : 'false');
          localStorage.setItem('isGoalsDone', 'true');

          // set userId to userAccount if userAccount isn't in localStorage
          if (!this.userAccountService.isUserAccount()) {
            const user: User = new User();
            user.id = httpResponse.body.userId;
            const userAccount: UserAccount = new UserAccount();
            userAccount.user = user;
            this.userAccountService.setUserAccount(userAccount);
          }

          this.isGoalsDone = true;
          this.retrieveDataResolver(); // <--- This must be called as soon as the data are ready to be displayed
        }
      );
  }
  private retrieveGoalPromise(): Promise<any> {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` retrieveGoalPromise()`);
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.saveGoalArray();
    });
  }

//        !!!!!!!!!!! STATE !!!!!!!!!!
  private afterSaveStateActions(): void {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` afterSaveStateActions()`);
    this.resetItemsAfterSaveAreaArrays();
    this.setPossibilityToPassTestsAgain();
  }
  private saveStateArray(): void {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` saveStateArray()`);
    this.valueCompatibilityService.saveStateArray(this.tests).subscribe(data => {
      this.log.log(ComponentName.VALUE_COMPATIBILITY, ` saveStateArray(): `, data.state);
      localStorage.setItem('isValueCompatibilityTestPassed', data.passed === true ? 'true' : 'false');
      localStorage.setItem('isStatesDone', 'true');
      this.isStatesDone = true;
      this.retrieveDataResolver(); // <--- This must be called as soon as the data are ready to be displayed
      }
    );
  }
  private retrieveStatePromise(): Promise<any> {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` retrieveStatePromise()`);
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.saveStateArray();
    });
  }

//        !!!!!!!!!!! QUALITIES !!!!!!!!!!
  private afterSaveQualityActions(): void {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` afterSaveQualityActions()`);
    console.log(this.tests.quality);
    this.resetItemsAfterSaveAreaArrays();
    this.setPossibilityToPassTestsAgain();
    this.afterTestActions();
  }
  private saveQualityArray(): void {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` saveQualityArray()`);
    this.valueCompatibilityService.saveQualityArray(this.tests).subscribe(data => {
      this.log.log(ComponentName.VALUE_COMPATIBILITY, ` saveQualityArray(): `, data.quality);
      localStorage.setItem('isValueCompatibilityTestPassed', data.passed === true ? 'true' : 'false');
      localStorage.setItem('isQualitiesDone', 'true');
      this.isQualitiesDone = true;
      this.retrieveDataResolver(); // <--- This must be called as soon as the data are ready to be displayed
    });
  }
  private retrieveQualityPromise(): Promise<any> {
    this.log.log(ComponentName.VALUE_COMPATIBILITY, ` retrieveQualityPromise()`);
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.saveQualityArray();
    });
  }
  private resetItemsAfterSaveAreaArrays(): void {
    this.itemState[0] = 'active';
    this.ind = 0;
    this.isNotPassed = true;
  }

  private createFriendsTokens() {
    this.sendingTokensService.createFriendsTokens();
  }

  // =============== SHAFFLE TEST ARRAYS ==========
  private shaffle( array: AreaItem[] ) {
    if (array.length <= 1) { return; }
    for (let n = 0; n < array.length; n++) {
      // choose a random not-yet-placed item to place there
      // must be an item AFTER the current item, because the stuff
      // before has all already been placed
      const randomChoiceIndex = this.getRandom(n, array.length - 1);
      // place our random choice in the spot by swapping
      [array[n], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[n]];
    }
  }

  private getRandom(floor: number, ceiling: number) {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
  }

}
