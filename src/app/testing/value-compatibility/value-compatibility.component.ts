import {Component, OnInit} from '@angular/core';
import {ValueCompatibilityService} from '../value-compatibility.service';
import {Scale, ValueCompatibilityAnswers} from './value-compatibility-answers';
import {FormBuilder} from '@angular/forms';
import {slide, fade, vanish} from '../../../animations/testing-page-animation';
import {ActivatedRoute, Router} from '@angular/router';
import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js';


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
  valueProfile;
  links;
  linkArray = [];

  //           FIGURES
  /** Arrays for different value-compatibility figures*/
  chartBar = [];
  chartRadar = [];
  chartDoughnut = [];
  chartPolarArea = [];

  /** For setTimeout. Нужна пауза, чтобы успела пройти анимация 'active => unactive' (пауза должна быть такой же как в анимации "slide") */
  animationTime = 500;

  // data: Observable<ValueCompatibilityAnswers>;

  constructor(private valueCompatibilityService: ValueCompatibilityService,
              private formBuilder: FormBuilder,
              private router: Router, private route: ActivatedRoute) {
  }


  public initRoute() {
    //  если приходит ссылка с токеном в параметрах, то вытаскиваем этот токен и засовываем его в хедер запроса на бекенд
    // (передаем в метод saveGoalArray), вызывая initRoute() в ngOnInit()

    // this.token = this.route.snapshot.queryParams.token;
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      if (this.route.snapshot.queryParamMap.has('token')) {
        this.token = 'Bearer ' + this.route.snapshot.queryParamMap.get('token');
        console.log(this.token);
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
    this.valueCompatibilityService.getTestList()
      .subscribe(data => {
        this.tests = data;
        console.log(data);
        }
      );

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

//        !!!!!!!!!!! GOAL !!!!!!!!!!
  // saveGoals(tests: ValueCompatibilityAnswers): void {
  saveGoals() {
    localStorage.clear();
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
    this.router.navigate(['user-test']);
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
    this.router.navigate(['user-test']);
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
    this.router.navigate(['user-test']);
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
    this.router.navigate(['user-test']);
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

    // this.afterTestActions();
    // this.router.navigate(['user-test']);
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

  afterTestActions() {
    this.plotValueProfileBar();
    // this.getLinksWithToken();
  }

  private getLinksWithToken() {
    this.valueCompatibilityService.getLinksWithToken().subscribe(response => {
      this.links = response;
      const l = response;
      this.links = ['http://localhost:4200/user-test?token=' + l[0], 'http://localhost:4200/user-test?token=' + l[1],
        'http://localhost:4200/user-test?token=' + l[2]];
    });
  }

//            !!!!!!!!!!! FIGURE !!!!!!!!!!!1
  plotValueProfileBar() {
    this.valueProfile = this.valueCompatibilityService.getValueProfile().subscribe(response => {
      // let data = response.body;
      const data = response;
      console.log(response);
      // ДЛЯ ДАННЫХ СДЕЛАТЬ ОТДЕЛЬНЫЙ КЛАСС (ВОЗМОЖНО И НА БЕКЕНДЕ)
      const labels = [data[0].scaleName, data[1].scaleName, data[2].scaleName,
                      data[3].scaleName, data[4].scaleName, data[5].scaleName];
      const match1 = [data[0].percentResult, data[1].percentResult, data[2].percentResult,
        data[3].percentResult, data[4].percentResult, data[5].percentResult];
      const match = [Math.round(data[0].percentResult / 5) * 5, Math.round(data[1].percentResult / 5) * 5,
                     Math.round(data[2].percentResult / 5) * 5, Math.round(data[3].percentResult / 5) * 5,
                     Math.round(data[4].percentResult / 5) * 5, Math.round(data[5].percentResult / 5) * 5];
      const title = 'Ваш индивидуальный ценностный профиль';
      const xLabel = 'Значимость ценности';
      let maxXAxes = Math.ceil((Math.max.apply(null, match) + 0.5) / 10) * 10;
      if ( maxXAxes > 100 ) { maxXAxes = 100; }

      console.log(match1);

      // change default font size (defaultFontSize = 12) for all text in chart (except radialLinear scale point labels).
      // The global font settings only apply when more specific options are not included in the config.
      Chart.defaults.global.defaultFontSize = 14;

      //                    CANVASBAR
      this.chartBar = new Chart('canvasBar', {
        type: 'horizontalBar',
        data: {
          labels: labels,
          datasets: [{
            data: match,
            backgroundColor: [
              'rgba(201, 166, 220, 1)',
              'rgba(186,225,255, 1)',
              'rgba(186,255,201, 1)',
              'rgba(255,255,186, 1)',
              'rgba(255,223,186, 1)',
              'rgba(255,179,186, 1)',
            ],
            // borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: title,
            fontSize: 15,
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                max: maxXAxes,
                // Include a percent sign in the ticks
                callback: function(value, index, values) {
                  return value + '%';
                }
              },
              scaleLabel: {
                display: true,
                labelString: xLabel,
                padding: 20 // отступ подписи оси х
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
                weight: 'bold'
              },
              formatter: function(value, context) {
                  return value > 4 ? value + '%' : ''; // подписи будут только для значений, начиная с 5 %; в подписях будет знак %
                }
            }
          }
        }
      });

      //                         CANVASRADAR
        this.chartRadar = new Chart('canvasRadar', {
          type: 'radar',
          data: {
            labels: labels,
            datasets: [{
              data: match,
              backgroundColor: [
                'rgba(75, 192, 192, 0.4)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            legend: {
              display: false
            },
            scale: {
              ticks: {
                max: maxXAxes,
                min: 0,
                // suggestedMin: 0,
                // suggestedMax: 80
              }
            }
          }
        });

        //                   CANVASDOUGHNUT
        this.chartDoughnut = new Chart('canvasDoughnut', {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: match,
              backgroundColor: [
                'rgba(75, 0, 130, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 255, 0, 1)',
                'rgba(255, 255, 0, 1)',
                'rgba(255, 127, 0, 1)',
                'rgba(255, 0 , 0, 1)',
              ],
              borderColor: [
                'rgba(75, 0, 130, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 255, 0, 1)',
                'rgba(255, 255, 0, 1)',
                'rgba(255, 127, 0, 1)',
                'rgba(255, 0 , 0, 1)',
              ],
              // borderWidth: 1
            }]
          },
          options: {
            // cutoutPercentage: 20
          }
        });

        //                   CANVASPOLARAREA
        this.chartPolarArea = new Chart('canvasPolarArea', {
          type: 'polarArea',
          data: {
            labels: labels,
            datasets: [{
              data: match,
              backgroundColor: [
                'rgba(75, 0, 130, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 255, 0, 1)',
                'rgba(255, 255, 0, 1)',
                'rgba(255, 127, 0, 1)',
                'rgba(255, 0 , 0, 1)',
              ],
              borderColor: [
                'rgba(75, 0, 130, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 255, 0, 1)',
                'rgba(255, 255, 0, 1)',
                'rgba(255, 127, 0, 1)',
                'rgba(255, 0 , 0, 1)',
              ],
              // borderWidth: 1
            }]
          },
          options: {
            scale: {
              scaleLabel: {
                display: true
              },
              ticks: {
                max: maxXAxes,
                min: 0,
                // suggestedMin: 0,
                // suggestedMax: 80
              }
            }
            // cutoutPercentage: 20
          }
        });
    });
  }

}



// this.valueProfile = this.valueCompatibilityService.getValueProfile().
// subscribe(response => {
//   let data = response.body;
//   // ДЛЯ ДАННЫХ СДЕЛАТЬ ОТДЕЛЬНЫЙ КЛАСС (ВОЗМОЖНО И НА БЕКЕНДЕ)
//   let labels = [data[0].scaleName, data[1].scaleName, data[2].scaleName,
//     data[3].scaleName, data[4].scaleName, data[5].scaleName];
//   // labels = ['Развитие', 'Творчество', 'Гармоничные отношения', 'Достижения', 'Комфорт', 'Безопасность'];
//   let match = [data[0].percentResult, data[1].percentResult, data[2].percentResult,
//     data[3].percentResult, data[4].percentResult, data[5].percentResult];
//   let title = 'Ваш индивидуальный ценностный профиль';
//   // match = [match[0], match[1], match[2]]
//   // match = [70, 65, 60, 45, 30, 20];
//   let maxXAxes = Math.ceil(Math.max.apply(null, match) / 10) * 10 + 10;
//   console.log(labels);
//   console.log(match);
//   this.chartBar = new Chart('canvasBar', {
//     type: 'horizontalBar',
//     data: {
//       labels: labels,
//       datasets: [{
//         // datalabels: {
//         // color: 'green',
//         // color: ['green', 'green', 'green', 'green', 'red', 'green'],
//         // display: function(context) {
//         //   console.log('Algo: ' + context.dataIndex);
//         //   // return context.dataset.data[context.dataIndex] > 15;
//         //   // return context.dataIndex % 2;
//         //   return context.chart.data.labels[context.dataIndex];
//         // },
//         // font: {
//         //   size: 10,
//         //   weight: 'bold'
//         // },
//         // formatter: function(value, context) {
//         //   return context.dataIndex + ': ' + Math.round(value) + '%';
//         // }
//         // },
//         data: match,
//         backgroundColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(255, 150, 132, 1)',
//           'rgba(100, 150, 235, 1)',
//         ],
//         // borderColor: [
//         //   'rgba(255, 99, 132, 1)',
//         //   'rgba(54, 162, 235, 1)',
//         //   'rgba(255, 206, 86, 1)',
//         //   'rgba(75, 192, 192, 1)',
//         //   'rgba(255, 99, 132, 1)',
//         //   'rgba(54, 162, 235, 1)',
//         // ],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       title: {
//         display: true,
//         text: title
//       },
//       scales: {
//         xAxes: [{
//           ticks: {
//             beginAtZero: true,
//             max: maxXAxes
//           }
//         }],
//         // scaleLabel: {
//         //   display: true
//         // }
//       },
//       legend: {
//         display: false
//       },
//       plugins: {
//         datalabels: {
//           //   // color: 'green',
//           //   // color: ['green', 'green', 'green', 'green', 'red', 'green'],
//           //   display: function(context) {
//           //     console.log('Algo: ' + context.dataIndex);
//           //     // return context.dataset.data[context.dataIndex] > 15;
//           //     // return context.dataIndex % 2;
//           //     return context.chart.data.labels[context.dataIndex];
//           //   },
//           //   font: {
//           //     size: 10,
//           //     weight: 'bold'
//           //   },
//           //   formatter: function(value, context) {
//           //     return context.dataIndex + ': ' + Math.round(value) + '%';
//           //   }
//         }
//       }
//     }
//   });
//
//   this.chartRadar = new Chart('canvasRadar', {
//     type: 'radar',
//     data: {
//       labels: labels,
//       datasets: [{
//         data: match,
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.4)',
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//         ],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       legend: {
//         display: false
//       },
//       scale: {
//         ticks: {
//           max: maxXAxes,
//           min: 0,
//           // suggestedMin: 0,
//           // suggestedMax: 80
//         }
//       }
//     }
//   });
//   this.chartDoughnut = new Chart('canvasDoughnut', {
//     type: 'doughnut',
//     data: {
//       labels: labels,
//       datasets: [{
//         data: match,
//         backgroundColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(255, 150, 132, 1)',
//           'rgba(100, 150, 150, 1)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 150, 1)',
//         ],
//         // borderWidth: 1
//       }]
//     },
//     options: {
//       // cutoutPercentage: 20
//     }
//   });
//   this.chartPolarArea = new Chart('canvasPolarArea', {
//     type: 'polarArea',
//     data: {
//       labels: labels,
//       datasets: [{
//         data: match,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.3)',
//           'rgba(54, 162, 235, 0.3)',
//           'rgba(255, 206, 86, 0.3)',
//           'rgba(75, 192, 192, 0.3)',
//           'rgba(255, 150, 132, 0.3)',
//           'rgba(100, 150, 150, 0.3)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 150, 1)',
//         ],
//         // borderWidth: 1
//       }]
//     },
//     options: {
//       scale: {
//         scaleLabel: {
//           display: true
//         },
//         ticks: {
//           max: maxXAxes,
//           min: 0,
//           // suggestedMin: 0,
//           // suggestedMax: 80
//         }
//       }
//       // cutoutPercentage: 20
//     }
//   });
// });
