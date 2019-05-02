import {Component, OnInit} from '@angular/core';
import {ValueProfileComment} from './value-profile';
import {ValueCompatibilityService} from '../value-compatibility.service';
import { Chart } from 'chart.js';
import {URL} from '../../utils/config';
import {LoginService} from '../../login/login.service';
import {doughnutCenterTextColor, doughnutsBorderColor, stateColor} from '../../../assets/colorStyle';
import {SendingTokensService} from '../../common-components/sending-tokens/sending-tokens.service';


@Component({
  selector: 'app-value-compatibility-profile',
  templateUrl: './value-compatibility-profile.component.html',
  styleUrls: ['./value-compatibility-profile.component.scss']
})
export class ValueCompatibilityProfileComponent implements OnInit {
  uri = `${URL}`;

  //           VALUE PROFILE
  valueProfile;
  isValueCompatibilityTestPassed: boolean;

  //           FIGURES
  /** Arrays for different value-compatibility figures*/
  // пастельная радуга
  stateColors: string[] = `${stateColor}`.split(' ');
  doughnutsBorderColor = `${doughnutsBorderColor}`;
  doughnutCenterTextColor = `${doughnutCenterTextColor}`;
  chartBar: Chart = [];
  chartDoughnuts: Chart[] = [];
  canvasId: string[] = [];
  chartNames: string[] = ['Development', 'Creativity', 'HarmoniousRelationship', 'Achievements', 'Comfort', 'Safety'];

  //          COMMENTS
  comments: ValueProfileComment[] = [];

  links;

  constructor(private valueCompatibilityService: ValueCompatibilityService,
              private loginService: LoginService,
              private sendingTokensService: SendingTokensService) {
  }

  ngOnInit() {
    this.isValueCompatibilityTestPassed = this.loginService.isValueCompatibilityTestPassed();
    console.log('ValueCompatibilityProfileComponent');
    if (this.loginService.isLogin() && this.loginService.isValueCompatibilityTestPassed()) {
      console.log('isValueCompatibilityTestPassed: ', this.isValueCompatibilityTestPassed);
      this.plotValueProfileBar(); // не могу под if внести, так как в этом случае ссылка в <app-test-not-passed></app-test-not-passed> не активна, пока не знаю почему
      this.getFriendsTokens();
    }
    // setTimeout(() => {
    //   this.plotValueProfileBar();
    //   this.getFriendsTokens();
    // }, 1000); // set timeout because after testing we navigate to value-profile, but we need time to save test to db
  }

  private getFriendsTokens() {
    const tokens = this.sendingTokensService.getFriendsTokens();
    if (tokens) {
      this.links = [this.uri + '/user-test?token=' + tokens[0], this.uri + '/user-test?token=' + tokens[1],
                    this.uri + '/user-test?token=' + tokens[2]];
    }
  }

  //            !!!!!!!!!!! FIGURE !!!!!!!!!!!1
  private plotValueProfileBar() {

    const labels: string[] = [];
    const match: number[] = [];
    this.valueProfile = this.valueCompatibilityService.getValueProfile(null).subscribe(response => {
      console.log(response);
      response.valueProfile.valueProfileElements.forEach(valueProfileElement => {
        labels.push(valueProfileElement.scaleName.toUpperCase());
        match.push( Math.round(valueProfileElement.percentResult / 5) * 5);
        // this.comments.push(valueProfileElement.comment);
      });
      this.comments = response.valueProfileComments;

      console.log('response: ');
      console.log(response);
      console.log('messages: ' );
      console.log(this.comments[5]);

      const title = 'Ваш индивидуальный ценностный профиль';
      const xLabel = 'Значимость ценности';
      const color: string[] = this.stateColors;
      const fontSizeDoughnut = 24;
      const fontSizeBar = 18;

      // max value of x axe (ближайшее большее кратное 5)
      let maxXAxes = Math.ceil((Math.max.apply(null, match) + 0.5) / 10) * 10;
      if ( maxXAxes > 100 ) { maxXAxes = 100; }

      // change default font size (defaultFontSize = 12) for all text in chart (except radialLinear scale point labels).
      // The global font settings only apply when more specific options are not included in the config.
      Chart.defaults.global.defaultFontSize = 14;


      //                    CANVASBAR
      this.chartBar = new Chart('canvasBar', {
        type: 'horizontalBar',
        data: {
          // labels: labels,
          labels: [
            labels[0],
            labels[1],
            labels[2].split(' '),
            labels[3],
            labels[4],
            labels[5],
            ],
          datasets: [{
            data: match,
            backgroundColor: [
              color[0],
              color[1],
              color[2],
              color[3],
              color[4],
              color[5],
            ],
            // borderWidth: 1
          }]
        },
        options: {
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
                // Include a percent sign in the ticks
                callback: function(value) {
                  return value + '%';
                }
              },
              scaleLabel: {
                display: true,
                labelString: xLabel,
                fontSize: fontSizeBar,
                fontWeight: 'bold',
                padding: 20 // отступ подписи оси х
              },
            }],
            yAxes: [{
              barPercentage: 1.2,
              // barThickness: 50,
              ticks: {
                fontSize: fontSizeBar,
              },
            }],
          },
          legend: {
            display: false
          },
          plugins: {
            datalabels: {
              display: true,
              align: 'start',
              anchor: 'end', // подписи будут "заякорены" с правого окончания горизонт. столбика, а текст в них будет слева (align: 'start')
              font: {
                size: fontSizeBar,
                weight: 'bold'
              },
              formatter: function(value, context) {
                return value > 4 ? value + '%' : ''; // подписи будут только для значений, начиная с 5 %; в подписях будет знак %
              }
            }
          }
        }
      });


      //                 PLUGIN TO DISPLAY TEXT IN THE MIDDLE OF DOUGHNUT (CHART.JS)
      // new service ("elements.center") registration (для выведения текста посередине doughnut)
      Chart.pluginService.register({
        beforeDraw: function(chart) {
          if (chart.config.options.elements.center) {
            // Get ctx from string
            let ctx = chart.chart.ctx;

            // Get options from the center object in options
            const centerConfig = chart.config.options.elements.center;
            const fontStyle = centerConfig.fontStyle || 'Arial';
            const txt = centerConfig.text;
            const textColor = centerConfig.color || '#000';
            const sidePadding = centerConfig.sidePadding || 20;
            const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
            // Start with a base font of 30px
            ctx.font = '30px ' + fontStyle;

            // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            const stringWidth = ctx.measureText(txt).width;
            const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            const widthRatio = elementWidth / stringWidth;
            const newFontSize = Math.floor(25 * widthRatio);
            const elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            const fontSizeToUse = Math.min(newFontSize, elementHeight);

            // Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse + 'px ' + fontStyle;
            ctx.fillStyle = textColor;

            // Draw text in center
            ctx.fillText(txt, centerX, centerY);
          }

          // let width = chart.chart.width;
          //   let height = chart.chart.height;
          // let ctx = chart.chart.ctx;
          //
          // ctx.restore();
          // let fontSize = (height / 114).toFixed(2);
          // ctx.font = fontSize + 'em sans-serif';
          // ctx.textBaseline = 'middle';
          //
          // let text = '75%';
          // let textX = Math.round((width - ctx.measureText(text).width) / 2);
          // let textY = height / 2;
          //
          // ctx.fillText(text, textX, textY);
          // ctx.save();
        }
      });


      // let gradient = Chart.createLinearGradient(0, 0, 0, 400);
      // gradient.addColorStop(0, 'rgba(243, 103, 101,0.5)');
      // gradient.addColorStop(1, 'rgba(0, 89, 179,0.5)');

      // создаем 6 doughnuts в цикле в chartDoughnuts[]
      //                    CANVASDOUGHNUT
      for (let i = 0; i < 6; i++) {
        this.canvasId[i] = 'chartDoughnut' + this.chartNames[i];
        console.log(this.chartNames[i]);
        console.log(this.canvasId[i]);
        this.chartDoughnuts[i] = new Chart(this.canvasId[i], {
          type: 'doughnut',
          data: {
            labels: [labels[i]],
            datasets: [{
              data: [match[i], 100 - match[i]], // две части "бублика"
              backgroundColor: [
                color[i],
                // doughnutsBorder,
                // gradient,
              ],
              borderColor: [
                color[i],
                this.doughnutsBorderColor,
              ],
            }]
          },
          options: {
            // cutoutPercentage: 20,
            legend: {
              display: true,
              labels: {
                boxWidth: 0,
                fontSize: fontSizeDoughnut,
                fontStyle: 'bold',
              }
            },
            // зарегестрировала новый сервис (chart.config.options.elements.center) в Chart.pluginService.register({...
            elements: {
              center: {
                text: match[i] + '%',
                color: this.doughnutCenterTextColor,
              }
            },
            plugins: {
              datalabels: {
                display: false,
                align: 'start',
                anchor: 'start',
                font: {
                  size: fontSizeDoughnut,
                  weight: 'bold'
                },
                formatter: function(value, context) {
                  return value === match[i] ? value + '%' : '';
                }
              }
            }
          }
        });
        console.log(this.chartDoughnuts[i]);
      }

    });
  }
}
