import {Component, Input, OnInit} from '@angular/core';
import {fade} from '../../../animations/testing-page-animation';
import { Chart } from 'chart.js';
import {MatchValueCompatibilityService} from '../match-value-compatibility.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ValueCompatibilityService} from '../../testing/value-compatibility.service';
import {User, UserAccount} from '../../profile/user';
import {AspectComment, ValuesDifferencesComment, ScaleLevel, AspectLevel, UserMatch} from './match-value-compatibility';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginService} from '../../auth/authentication/login.service';
import {DeactivationLoginRegistrationGuarded} from '../../guard/can-deactivate.guard';
import {RegistrationService} from '../../auth/registration/registration.service';
import {UserAccountService} from '../../profile/user-account.service';
import {LogService} from '../../common-components/services/log.service';
import {ComponentName} from '../../common-components/services/component-name';
import {
  BACKGROUND_BAR_COLOR,
  SCALE_LEVEL_COLORS, STATE_COLOR,
  VALUE_COMPATIBILITY_REPORT_COLORS, VALUE_COMPATIBILITY_REPORT_COLORS_TRANSPARENT03,
  VALUE_COMPATIBILITY_REPORT_COLORS_TRANSPARENT075
} from '../../../assets/colorStyle';
import {FONT_SIZE_BAR} from '../../../assets/fonts';

@Component({
  selector: 'app-match-value-compatibility',
  templateUrl: './match-value-compatibility.component.html',
  styleUrls: ['./match-value-compatibility.component.scss'],
  animations: [
     fade
   ]
})
export class MatchValueCompatibilityComponent extends DeactivationLoginRegistrationGuarded implements OnInit {
  isLogin;
  ifUserForMatchingToken;
  isValueCompatibilityTestPassed;
  userForMatching: User;
  usersForMatching: User[] = [];
  matches;
  valueProfilesForMatching;
  chart: Chart = [];
  chartBar: Chart = [];
  chartBars: Chart[] = [];
  canvasId: string[] = [];
  aspectLabels: string[];
  aspectMatches: number[];
  aspectComments: AspectComment[] = [];
  scaleLabels: string[] = [];
  scalesComments: ValuesDifferencesComment[] = [];
  token: string;
  icons: string[] = ['++', '+', '~', '!', '?']; // &#8776;
  icon: string[] = ['', '', '', '', '', ''];
  valueCompatibilityReportColors = `${VALUE_COMPATIBILITY_REPORT_COLORS}`.split(' ');
  valueCompatibilityReportColorsTransparent03 = `${VALUE_COMPATIBILITY_REPORT_COLORS_TRANSPARENT03}`.split(' ');
  valueCompatibilityReportColorsTransparent08 = `${VALUE_COMPATIBILITY_REPORT_COLORS_TRANSPARENT075}`.split(' ');
  valueCompatibilityReportColor: string[] = [];
  scaleLevelColors = `${SCALE_LEVEL_COLORS}`.split(' ');
  scaleLevelColor: string[] = [];
  linearGradient = [];
  boxShadow = [];
  userMatch: UserMatch;
  private retrieveDataResolver;
  private retrieveDataResolver1;
  private principalName: string;

  constructor(private matchValueCompatibilityService: MatchValueCompatibilityService,
              private valueCompatibilityService: ValueCompatibilityService,
              loginService: LoginService,
              registrationService: RegistrationService,
              userAccountService: UserAccountService,
              router: Router,
              activatedRoute: ActivatedRoute,
              log: LogService,
              private sanitizer: DomSanitizer) {
    super( loginService, registrationService, userAccountService, router, activatedRoute, log);
  }

  ngOnInit() {
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY, `ngOnInit()`);
    this.ifUserForMatchingToken = this.userAccountService.isUserForMatchingToken();
    this.isValueCompatibilityTestPassed = this.loginService.isValueCompatibilityTestPassed();
    this.isLogin = this.loginService.isLogin();
    const userAccount = this.userAccountService.getUserAccount();
    this.principalName = ((userAccount) && userAccount.user != null && userAccount.user.name != null) ?
      this.userAccountService.getUserAccount().user.name : ' Вы';
    if (this.isLogin && this.isValueCompatibilityTestPassed) {
      new Promise((resolve) => {
        this.retrieveDataResolver1 = resolve;
        this.getUsersForMatching();
      }).then(() => {
        this.retrieveValueProfileReportPromise()
          .then(() => {
            this.plotValueProfilesMatching(this.userForMatching); } );
      });
    }
  }

  private getUsersForMatching() {
    this.userForMatching = this.matchValueCompatibilityService.getUserForMatching();
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY, `getUsersForMatching(): userForMatching: `, this.userForMatching);
    if (this.userForMatching === undefined || this.userForMatching === null ) {
      this.matchValueCompatibilityService.getUsersForMatching()
        .subscribe(data => {
          this.usersForMatching = data;
          this.userForMatching = this.usersForMatching[0];
          this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY, `getUsersForMatching(): userForMatching: `, this.userForMatching);
          // this.retrieveDataResolver(); // <--- This must be called as soon as the data are ready to be displayed
        });
    } else  { // if there is userForMatching then create array this.usersForMatching with one value
      this.usersForMatching = new Array<User>(this.userForMatching);
    }
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY, `getUsersForMatching(): usersForMatching: `, this.usersForMatching);
    this.retrieveDataResolver1(); // <--- This must be called as soon as the data are ready to be displayed
  }

  private retrieveValueProfileReportPromise(): Promise<any> {
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY, ` retrieveValueProfileReportPromise()`);
    return new Promise((resolve) => {
      this.retrieveDataResolver1 = resolve;
      this.plotRectangle(this.userForMatching);
    });
  }

  private plotRectangle(userForMatching: User) {
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY, `plotRectangle(): userForMatching: `, userForMatching);
    this.matches = this.matchValueCompatibilityService.matchPercent(userForMatching).
    subscribe(data => {
      this.userMatch = data;
      this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY, `plotRectangle(): matchPercent: `, this.userMatch);

      //   DATA
      this.aspectLabels = data['matches'].map(res => res.area);
      this.aspectMatches = data['matches'].map(res => Math.round(res.result.number / 5) * 5);
      this.aspectComments = data['matches'].map(res => res.userMatchComment);

      let i = 0;

      // ------------------------GRADIENT---------------------
      for (i = 0; i < this.aspectComments.length; i++) {
        const colorNumber =  this.getAspectColorNumber(this.aspectComments[i].level);
        this.valueCompatibilityReportColor[i] = this.valueCompatibilityReportColors[colorNumber];
        this.linearGradient[i] = this.sanitizer.bypassSecurityTrustStyle(
          'linear-gradient(to bottom, '
                                   + this.valueCompatibilityReportColorsTransparent03[colorNumber] + ' 0%, '
                                   + this.valueCompatibilityReportColorsTransparent08[colorNumber] + ' 5%, '
                                   + this.valueCompatibilityReportColors[colorNumber] + ' 100%)');
        // sanitizer.bypassSecurityTrustStyle нужен для того, чтобы не выводило Warning о style security

       this.boxShadow[i] = this.sanitizer.bypassSecurityTrustStyle(
        '15px 15px 20px ' + this.valueCompatibilityReportColorsTransparent08[colorNumber]);
      }
    });
    this.retrieveDataResolver1(); // <--- This must be called as soon as the data are ready to be displayed
  }

  private plotValueProfilesMatching(userForMatching: User) {
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY, `plotValueProfilesMatching()`);
    const principalMatch = [];
    const userForMatchingMatch = [];
    let userForMatchingStick;

    this.valueProfilesForMatching = this.matchValueCompatibilityService.getValueProfilesForMatching(userForMatching.id)
      .subscribe(response => {
        this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY, `plotValueProfilesMatching(): `, response);

        response.valueProfiles.forEach(valueProfile => {
          if (valueProfile.isPrincipalUser) {
            valueProfile.valueProfileElements.forEach(valueProfileElement => {
              this.scaleLabels.push(valueProfileElement.scaleName.toUpperCase());
              principalMatch.push(Math.round(valueProfileElement.percentResult / 5) * 5);
            });
            userForMatchingStick = '';
          } else {
            valueProfile.valueProfileElements.forEach(valueProfileElement => {
              // userForMatchingLabels.push(valueProfileElement.scaleName.toUpperCase());
              userForMatchingMatch.push(Math.round(valueProfileElement.percentResult / 5) * 5);
            });
            userForMatchingStick = this.userForMatching.name;
          }
        });

        let i = 0;
        response.valuesDifferencesComments.forEach(valueDifferencesComment => {
          this.scalesComments.push(valueDifferencesComment);
          const level: ScaleLevel = valueDifferencesComment.level;
          const iconAndColor = this.getValuesDifferencesIconAndColor(level);
          this.icon[i] = iconAndColor[0];
          this.scaleLevelColor[i] = iconAndColor[1];
          i = i + 1;
        });

        const title = 'Сопоставление ценностных профилей';
        const xLabel = 'Значимость ценности';
        const userForMatchingName = this.userForMatching.name;

        // max value of x axe (ближайшее большее, кратное 5)
        let maxXAxes = Math.ceil((Math.max(Math.max(...userForMatchingMatch), Math.max(...principalMatch)) + 0.5) / 10) * 10;
        if ( maxXAxes >= 100 ) { maxXAxes = 100; }

        // Chart.defaults.global.defaultFontSize = 14;
        const color = `${STATE_COLOR}`.split(' ');
        const backgroundColor = `${BACKGROUND_BAR_COLOR}`;
        const fontSizeBar: number = FONT_SIZE_BAR;

        //                    CANVASBAR
        this.chartBar = new Chart('canvasBar', {
          type: 'horizontalBar',
          data: {
            // labels: this.scaleLabels,
            labels: [
              this.scaleLabels[0],
              this.scaleLabels[1],
              this.scaleLabels[2].split(' '),
              this.scaleLabels[3],
              this.scaleLabels[4],
              this.scaleLabels[5],
            ],
            datasets: [
              {
                // label: userForMatchingStick,
                label: userForMatchingName, // your partner name
                data: userForMatchingMatch,
                borderColor: [
                  color[0],
                  color[1],
                  color[2],
                  color[3],
                  color[4],
                  color[5],
                ],
                backgroundColor: [
                  backgroundColor,
                  backgroundColor,
                  backgroundColor,
                  backgroundColor,
                  backgroundColor,
                  backgroundColor,
                ],
                borderWidth: 3,
              },
              {
                label: this.principalName,
                data: principalMatch,
                backgroundColor: color,
                borderWidth: 0
              },
            ]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: title,
              fontSize: fontSizeBar + 2,
            },
            scales: {
              xAxes: [{
                ticks: {
                  fontSize: fontSizeBar,
                  beginAtZero: true,
                  max: maxXAxes,
                  callback: function(value) { // Include a percent sign in the ticks
                    return value + '%';
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: xLabel,
                  fontSize: fontSizeBar,
                  fontWeight: 'bold',
                  padding: 20, // отступ подписи оси х
                },
              }],
              yAxes: [{
                barPercentage: 1.1,
                ticks: {
                  fontSize: fontSizeBar,
                },
              }],
            },
            legend: {
              display: true,
              labels: {
                text: 'rgb(255, 99, 132)'
              }
            },
            plugins: {
              datalabels: {
                display: true,
                align: 'start',
                anchor: 'end', // labels will be "anchor" ("заякорены") on the right side of horizontal bar, and text in it will be on the left (align: 'start')
                font: {
                  size: fontSizeBar,
                  weight: 'bold'
                },
                formatter: function(value, context, item) {
                  // return value > 4 ? value + '%' : ''; // labels will be only for values more then 5%;
                  if (value > 4) {
                    if ( context.chart.data.datasets[0] ) { //  НЕ РАБОТАЕТ if (true ВСЕГДА); context.chart.config.data.datasets[0]
                      return value + '%'; // ПОКА НЕ РАБОТАЕТ if не буду добавлять имя
                      // return userForMatchingName.slice(0, 7) + ' ' + value + '%'; // first 7 letters of user name
                    } else { return value + '%'; }
                  } else { return ''; }
                }
              }
            } // end plugins
          } // end options
        }); // end Chart
      });
  }

  private getValuesDifferencesIconAndColor(level: ScaleLevel): string[] {
    let icon;
    let color;

    if (level === ScaleLevel.FULL_MATCH) {
      icon = this.icons[0];
      color = this.scaleLevelColors[2];
    } else if (level === ScaleLevel.MINOR_DIFFERENCES) {
      icon = this.icons[1];
      color = this.scaleLevelColors[2];
    } else if (level === ScaleLevel.MODERATE_DIFFERENCES) {
      icon = this.icons[2];
      color = this.scaleLevelColors[1];
    } else if (level === ScaleLevel.STRONG_DIFFERENCES) {
      icon = this.icons[3];
      color = this.scaleLevelColors[0];
    } else { icon = this.icons[4]; }
    return [icon, color] ;
  }


  private getAspectColorNumber(level: AspectLevel): number {
    let colorNumber;
    if (level === AspectLevel.EXCELLENT) {
      colorNumber = 0;
    } else if (level === AspectLevel.GOOD) {
      colorNumber = 1;
    } else if (level === AspectLevel.SUFFICIENT) {
      colorNumber = 2;
    } else if (level === AspectLevel.LOW) {
      colorNumber = 3;
    } else { colorNumber = 4; }
    return colorNumber;
  }
}
