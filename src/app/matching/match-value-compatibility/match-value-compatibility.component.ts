import { Component, OnInit } from '@angular/core';
import {fade} from '../../../animations/testing-page-animation';
import { Chart } from 'chart.js';
import {MatchValueCompatibilityService} from '../match-value-compatibility.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ValueCompatibilityService} from '../../testing/value-compatibility.service';
import {User} from '../../profile/user';
import {AspectComments} from './match-value-compatibility';

@Component({
  selector: 'app-match-value-compatibility',
  templateUrl: './match-value-compatibility.component.html',
  styleUrls: ['./match-value-compatibility.component.scss'
    // , '../../testing/value-compatibility-profile/value-compatibility-profile.component.scss'
  ],
  animations: [
     fade
   ]
})
export class MatchValueCompatibilityComponent implements OnInit {

  usersForMatching: User[] = [];
  matches;
  chart: Chart = [];
  chartBar: Chart = [];
  chartBars: Chart[] = [];
  canvasId: string[] = [];
  aspectLabels: string[];
  aspectMatches: number[];
  aspectComments: AspectComments[] = [];
  token: string;
  aspectLabelsConstant: string[] = ['ЦЕЛИ', 'ЛИЧНЫЕ КАЧЕСТВА', 'СОСТОЯНИЯ', 'ИТОГО'];
  aspectDescription: string[] = ['Значимость  жизненных целей и приоритетов', 'Важность личных качеств и способностей',
                                 'Ценность и привлекательность психологических состояний', 'Общая совместимость'];

  constructor(private matchValueCompatibilityService: MatchValueCompatibilityService,
              private valueCompatibilityService: ValueCompatibilityService,
              private router: Router) { }

  ngOnInit() {
    this.getUsersForMatching();
    this.router.navigate(['match']);
    this.plotRectangle();
  }

  private getUsersForMatching() {
    this.matchValueCompatibilityService.getUsersForMatching()
      .subscribe(data => {
        this.usersForMatching = data;
        console.log('getUsersForMatching(): ');
        console.log(data);
        console.log(this.usersForMatching);
      });
  }
  private match() {
    // this.plotRectangle();
    // this.plotMatchDoughnut();
    this.plotValueProfilesMatching();
  }

  private plotRectangle() {
    this.matches = this.matchValueCompatibilityService.matchPercent().
    subscribe(data => {
      console.log('matchPercent: ');
      console.log(data);

      //   DATA
      this.aspectLabels = data['matches'].map(res => res.area);
      this.aspectMatches = data['matches'].map(res => Math.round(res.result.number / 5) * 5);
      this.aspectComments = data['matches'].map(res => res.userMatchComment);
      console.log(this.aspectComments);
      // this.users = data['users'];

      //  STYLE
      const valueCompotibilityReportColor = [
        // 'rgba(255,69,0, 1)', // red
        // 'rgba(255,215,0, 1)', // yellow
        // 'rgba(255,165,0, 1)', // orange
        // 'rgba(173,255,47, 1)', // green
        'rgba(192,80,77, 1)', // red
        'rgba(75,172,198, 1)', // blue
        'rgba(247,150,70, 1)', // orange
        'rgba(155,187,89, 1)', // green
    ];
      const greyColor = 'rgba(242, 242, 239, 1)';
      const blackColor = 'rgba(0, 0, 10, 1)';
      const fontSizeDoughnut = 16;
      const fontSizeBar = 16;


      //                 PLUGIN TO CHANGE COLOR DEPENDING ON ASPECT VALUE
      // https://jsfiddle.net/4f3y1yLx/
      const backgroundColorPlugin = {
        // Affects the `beforeUpdate` event
        beforeUpdate: function(chart) {
          const options = chart.config.options;
          if (options.colorChange) {
            const backgroundColor = [];
            const borderColor = [];

            // For every data we have ...
            for (let i = 0; i < chart.config.data.datasets[0].data.length; i++) {

              let bacColor = valueCompotibilityReportColor[0];
              // const dat = chart.config.data.datasets[0].data[i].r; // for type: 'bubble',
              const dat = chart.config.data.datasets[0].data[i];

              if (dat < 20) {
                bacColor = valueCompotibilityReportColor[0];
              } else {
                if (dat < 40) {
                  bacColor = valueCompotibilityReportColor[1];
                } else {
                  if (dat < 60) {
                    bacColor = valueCompotibilityReportColor[2];
                  } else {
                    bacColor = valueCompotibilityReportColor[3];
                  }
                }
              }
              // Push this new valueCompotibilityReportColor to both background and border arrays
              backgroundColor.push(bacColor);
              borderColor.push(greyColor);
            }

            // Updates the chart bars valueCompotibilityReportColor properties
            chart.config.data.datasets[0].backgroundColor = backgroundColor;
            chart.config.data.datasets[0].borderColor = borderColor;
          }
        }
      };

// Register the plugin to the chart's plugin service to activate it
      Chart.pluginService.register(backgroundColorPlugin);


      //                    CANVASBAR
      for (let i = 0; i < 4; i++) {
        this.canvasId[i] = 'chartBar' + this.aspectLabels[i];
        const label = this.aspectLabels[i];
        const max: number = this.aspectMatches[i];
        const gradation = this.aspectComments[i].header;
        console.log('canvasId[i]: ');
        console.log(this.canvasId[i]);
        this.chartBars[i] = new Chart(this.canvasId[i], {
          type: 'horizontalBar',
          data: {
            labels: [this.aspectLabels[i]],
            datasets: [
              {
                data: [this.aspectMatches[i]],
                // borderColor: [valueCompotibilityReportColor[i]],
                // backgroundColor: [valueCompotibilityReportColor[i]],
                borderWidth: 1.5,
              },
            ],
            // datasets: [ // for type: 'bubble',
            //   {
            //     data: [{x: max / 2, y: max / 2, r: max }],
            //     // borderColor: [valueCompotibilityReportColor[i]],
            //     // backgroundColor: [valueCompotibilityReportColor[i]],
            //     borderWidth: 1.5,
            //     // radius: 50,
            //     // hitRadius: 40,
            //     hoverRadius: 10,
            //     pointStyle: 'rectRounded',
            //     rotation: 50,
            //   },
            // ],
          },
          options: {
            // cutoutPercentage: 20,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [{
                display: false, // hide x axe
                ticks: { // подписи по х
                  display: false,
                  beginAtZero: true,
                  max: max,
                  // min: max,
                },
                gridLines: {
                  display: false, // hide grid
                },
                // scaleLabel: { // название оси х
                //   display: true,
                //   labelString: this.aspectLabels[i],
                //   fontSize: fontSizeBar,
                //   fontWeight: 'bold',
                //   padding: 20 // отступ подписи оси х
                // },
              }],
              yAxes: [{
                display: false, // hide y axe
                ticks: {
                  display: false,
                  // fontSize: fontSizeBar,
                },
                gridLines: {
                  display: false, // hide grid
                },
              }],
            },
            colorChange: {
            backgroundColor: greyColor,
          },
            plugins: {
              datalabels: {
                display: true,
                align: 'center',
                anchor: 'center',
                font: {
                  size: fontSizeBar,
                  weight: 'bold'
                },
                formatter: function(value, context) {
                  // let gradation = 'ДОСТАТОЧНЫЙ';
                  // if (value < 20) {
                  //   gradation = 'НЕДОСТАТОЧНЫЙ';
                  // } else {
                  //   if (value < 40) {
                  //     gradation = 'ДОСТАТОЧНЫЙ';
                  //   } else {
                  //     if (value < 60) {
                  //       gradation = 'ХОРОШИЙ';
                  //     } else {
                  //       gradation = 'ОТЛИЧНЫЙ';
                  //     }
                  //   }
                  // }
                  return '      ' + value + '%' + '\n' + '\n' + gradation ;
                }
              }
            }
          }
        });
      }



    });
  }

//   private plotMatchDoughnut() {
//     this.matchValueCompatibilityService.matchPercent().
//     subscribe(data => {
//       console.log(data);
//
//       this.aspectLabels = data['matches'].map(res => res.area);
//       this.aspectMatches = data['matches'].map(res => Math.round(res.result.number / 5) * 5);
//       // this.users = data['users'];
//
//       const valueCompotibilityReportColor = [
//         'rgba(255,69,0, 1)', // red
//         'rgba(255,215,0, 1)', // yellow
//         'rgba(255,165,0, 1)', // orange
//         'rgba(173,255,47, 1)', // green
//       ];
//       const greyColor = 'rgba(242, 242, 239, 1)';
//       const blackColor = 'rgba(0, 0, 10, 1)';
//       const fontSizeDoughnut = 16;
//
//
//       this.chart = new Chart('canvas', {
//         type: 'doughnut',
//         data: {
//           labels: this.aspectLabels,
//           datasets: [
//             {
//             data: this.aspectMatches,
//             // backgroundColor: backgroundColorPlugin,
//           }]
//         },
//
//         options: {
//           // cutoutPercentage: 20,
//           legend: {
//             display: true,
//             labels: {
//               boxWidth: 5,
//               fontSize: fontSizeDoughnut,
//               fontStyle: 'bold',
//               // valueCompotibilityReportColor: [
//               //   valueCompotibilityReportColor[0],
//               //   valueCompotibilityReportColor[1],
//               //   valueCompotibilityReportColor[2],
//               //   valueCompotibilityReportColor[3],
//               // ]
//             }
//           },
//           colorChange: {
//             backgroundColor: blackColor,
//             // borderColor: greyColor,
//           },
//           // зарегестрировала новый сервис (chart.config.options.elements.center) в Chart.pluginService.register({...
//           elements: {
//             center: {
//               // text: this.aspectMatches[3] + '%',
//               color: blackColor,
//               // fontStyle: 'Helvetica', // Default Arial
//               // sidePadding: 15 //Default 20 (as a percentage)
//             }
//           },
//
//           plugins: {
//             datalabels: {
//               display: true,
//               align: 'center',
//               anchor: 'center',
//               font: {
//                 size: fontSizeDoughnut,
//                 weight: 'bold'
//               },
//               formatter: function(value) {
//                 return value + '%';
//               }
//             }
//           }
//         }
//       });
//       console.log(this.chart);
//     });
//   }

  private plotValueProfilesMatching() {
    const principalLabels: string[] = [];
    const principalMatch = [];
    // const userForMatchingLabels: string[] = [];
    const userForMatchingMatch = [];
    let userForMatchingStick;

    this.valueCompatibilityService.getValueProfiles(this.usersForMatching[0])
      .subscribe(response => {
        console.log(response);

        response.forEach(valueProfile => {
          if (valueProfile.isPrincipalUser) {
            valueProfile.valueProfileElements.forEach(valueProfileElement => {
              principalLabels.push(valueProfileElement.scaleName.toUpperCase());
              principalMatch.push(Math.round(valueProfileElement.percentResult / 5) * 5);
            });
            userForMatchingStick = '';
          } else {
            valueProfile.valueProfileElements.forEach(valueProfileElement => {
              // userForMatchingLabels.push(valueProfileElement.scaleName.toUpperCase());
              userForMatchingMatch.push(Math.round(valueProfileElement.percentResult / 5) * 5);
            });
            userForMatchingStick = this.usersForMatching[0].name;
          }
        });

        console.log('principal: ');
        console.log(principalLabels);
        console.log(principalMatch);

        const title = 'Сопоставление ценностных профилей';
        const xLabel = 'Значимость ценности';
        const userForMatchingName = this.usersForMatching[0].name;

        // max value of x axe (ближайшее большее, кратное 5)
        let maxXAxes = Math.ceil((Math.max(Math.max(...userForMatchingMatch), Math.max(...principalMatch)) + 0.5) / 10) * 10;
        if ( maxXAxes >= 100 ) { maxXAxes = 100; }
        //
        // let maxXAxes = Math.ceil((Math.max.apply(null, match) + 0.5) / 10) * 10;
        // if ( maxXAxes > 100 ) { maxXAxes = 100; }

        Chart.defaults.global.defaultFontSize = 14;
        // const color = ['rgba(201,166,220, 1)',
        //                'rgba(186,225,255, 1)',
        //                'rgba(186,255,201, 1)',
        //                'rgba(255,255,186, 1)',
        //                'rgba(255,223,186, 1)',
        //                'rgba(255,179,186, 1)'];
        const color = ['rgba(108,88,255,1)',
                       'rgba(0,240,255,1)',
                       'rgba(113,218,0, 1)',
                       'rgba(255,237,0, 1)',
                       'rgba(255,148,0, 1)',
                       'rgba(255,0,0, 1)'];
        const greyColor = 'rgba(242, 242, 239, 1)';
        const fontSizeBar = 16;
        //                    CANVASBAR
        this.chartBar = new Chart('canvasBar', {
          type: 'horizontalBar',
          data: {
            labels: principalLabels,
            datasets: [
              {
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
                  greyColor,
                  greyColor,
                  greyColor,
                  greyColor,
                  greyColor,
                  greyColor,
                ],
                borderWidth: 3,
              },
              {
                data: principalMatch,
                backgroundColor: [
                  color[0],
                  color[1],
                  color[2],
                  color[3],
                  color[4],
                  color[5],
                ],
                // borderWidth: 1
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
                  padding: 20, // отступ подписи оси х
                },
              }],
              yAxes: [{
                ticks: {
                  fontSize: fontSizeBar,
                },
              }],
            },
            legend: {
              display: false
            },
            // tooltips: { // Всплывающие подписи
            //   callbacks: {
            //     label: function(tooltipItem, data1) {
            //       let label = data1.datasets[tooltipItem.datasetIndex].data[tooltipItem.datasetIndex] || '';
            //
            //       if (label) {
            //         label += ': ';
            //       }
            //       return label;
            //     }
            //   }
            // },
            plugins: {
              datalabels: {
                display: true,
                align: 'start',
                anchor: 'end', // подписи будут "заякорены" с правого окончания горизонт.столбика,а текст в них будет слева (align: 'start')
                font: {
                  size: fontSizeBar,
                  weight: 'bold'
                },
                formatter: function(value, context, item) {
                  // return value > 4 ? value + '%' : ''; // подписи будут только для значений, начиная с 5%;
                  if (value > 4) {
                    if ( context.chart.data.datasets[0] ) { //  НЕ РАБОТАЕТ if (true ВСЕГДА); context.chart.config.data.datasets[0]
                      return value + '%'; // ПОКА НЕ РАБОТАЕТ if не буду добавлять имя
                      // return userForMatchingName.slice(0, 7) + ' ' + value + '%'; // first 7 letters of user name
                    } else { return value + '%'; }
                  } else { return ''; }
                }

              }
            }
          }
        });


      });

  }
}



// Chart.defaults.global.animationSteps = 50;
// Chart.defaults.global.tooltipYPadding = 16;
// Chart.defaults.global.tooltipCornerRadius = 0;
// Chart.defaults.global.tooltipTitleFontStyle = "normal";
// Chart.defaults.global.tooltipFillColor = "rgba(0,160,0,0.8)";
// Chart.defaults.global.animationEasing = "easeOutBounce";
// Chart.defaults.global.responsive = true;
// Chart.defaults.global.scaleLineColor = "black";
// Chart.defaults.global.scaleFontSize = 16;
