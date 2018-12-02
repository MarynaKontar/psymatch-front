import {Component, Input, OnInit} from '@angular/core';
import {ValueProfileComment} from './value-profile';
import {ValueCompatibilityService} from '../value-compatibility.service';
import { Chart } from 'chart.js';
import {Router} from '@angular/router';
import {ValueCompatibilityComponent} from '../value-compatibility/value-compatibility.component';
import {URL} from '../../utils/config';

@Component({
  selector: 'app-value-compatibility-profile',
  templateUrl: './value-compatibility-profile.component.html',
  styleUrls: ['./value-compatibility-profile.component.scss']
})
export class ValueCompatibilityProfileComponent implements OnInit {
  uri = `${URL}`;

  //           VALUE PROFILE
  valueProfile;
  isValueProfileCanSee = true;

  //           FIGURES
  /** Arrays for different value-compatibility figures*/
  chartBar: Chart = [];
  chartDoughnuts: Chart[] = [];
  canvasId: string[] = [];
  chartNames: string[] = ['Development', 'Creativity', 'HarmoniousRelationship', 'Achievements', 'Comfort', 'Safety'];

  //          COMMENTS
  comments: ValueProfileComment[] = [];

  links;
  // @Input() valueCompatibilityComponent: ValueCompatibilityComponent;

  constructor(private valueCompatibilityService: ValueCompatibilityService,
              private router: Router) {
  }

  ngOnInit() {
    this.router.navigate(['value-profile']);
    // this.links = this.valueCompatibilityComponent.links;
    this.plotValueProfileBar();
    this.getLinksWithToken();
  }
  private getLinksWithToken() {
    this.valueCompatibilityService.getLinksWithToken().subscribe(response => {
      this.links = response;
      const l = response;
      this.links = [this.uri + '/user-test?token=' + l[0], this.uri + '/user-test?token=' + l[1],
        this.uri + '/user-test?token=' + l[2]];
    });
  }

  //            !!!!!!!!!!! FIGURE !!!!!!!!!!!1
  plotValueProfileBar() {

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
      // пастельная радуга
      // const color = ['rgba(201,166,220,1)', 'rgba(186,225,255, 1)', 'rgba(186,255,201, 1)',
      //   'rgba(255,255,186, 1)', 'rgba(255,223,186, 1)', 'rgba(255,179,186, 1)'];
      const color = ['rgba(108,88,255,1)', 'rgba(0,240,255,1)', 'rgba(113,218,0, 1)',
        'rgba(255,237,0, 1)', 'rgba(255,148,0, 1)', 'rgba(255,0,0, 1)'];
      // const greyColor = 'rgba(201,166,220,1)';
      // const greyColor = 'rgba(186,225,255, 1)';
      // const greyColor = 'rgba(186,255,201, 1)';
      const greyColor = 'rgba(242, 242, 239, 1)';
      const blackColor = 'rgba(0, 0, 10, 1)';
      const fontSizeDoughnut = 16;
      const fontSizeBar = 16;

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
          labels: labels,
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
              data: [match[i], 100 - match[i]],
              backgroundColor: [
                color[i],
                // greyColor,
                // gradient,
              ],
              borderColor: [
                color[i],
                greyColor,
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
                color: blackColor,
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


// TODO создаем 6 doughnuts не в цикле, а в отдельных переменных (chartDoughnutSafety, chartDoughnutComfort, ...)
      // this.chartDoughnutSafety = new Chart('chartDoughnutSafety', {
      //   type: 'doughnut',
      //   data: {
      //     labels: [labels[5]],
      //     datasets: [{
      //       data: [match[5], 100 - match[5]],
      //       backgroundColor: [
      //         color[5],
      //         'rgba(230, 230, 224, 1)',
      //       ],
      //       borderColor: [
      //         color[5],
      //         'rgba(230, 230, 224, 1)',
      //       ],
      //     }]
      //   },
      //   options: {
      //     // cutoutPercentage: 20,
      //     legend: {
      //       display: true,
      //       labels: {
      //         boxWidth: 0,
      //         fontSize: fontSizeDoughnut,
      //         fontStyle: 'bold',
      //       }
      //     },
      //     elements: {
      //       center: {
      //         text: match[5] + '%',
      //         color: blackColor,
      //         fontStyle: 'Helvetica', //Default Arial
      //         // sidePadding: 15 //Default 20 (as a percentage)
      //       }
      //     },
      //     plugins: {
      //       datalabels: {
      //         display: false,
      //         align: 'start',
      //         anchor: 'start',
      //         font: {
      //           size: fontSizeDoughnut,
      //           weight: 'bold'
      //         },
      //         formatter: function(value, context) {
      //           return value === match[5] ? value + '%' : '';
      //         }
      //       }
      //     }
      //   }
      // });
      //
      // this.chartDoughnutComfort = new Chart('chartDoughnutComfort', {
      //   type: 'doughnut',
      //   data: {
      //     labels: [labels[4]],
      //     datasets: [{
      //       data: [match[4], 100 - match[4]],
      //       backgroundColor: [
      //         color[4],
      //         greyColor,
      //       ],
      //       borderColor: [
      //         color[4],
      //         greyColor,
      //       ],
      //     }]
      //   },
      //   options: {
      //     // cutoutPercentage: 20,
      //     legend: {
      //       display: true,
      //       labels: {
      //         boxWidth: 0,
      //         fontSize: fontSizeDoughnut,
      //         fontStyle: 'bold',
      //       }
      //     },
      //     elements: {
      //       center: {
      //         text: match[4] + '%',
      //         color: color[4],
      //       }
      //     },
      //     plugins: {
      //       datalabels: {
      //         display: false,
      //         align: 'start',
      //         anchor: 'start',
      //         font: {
      //           size: fontSizeDoughnut,
      //           weight: 'bold'
      //         },
      //         formatter: function(value, context) {
      //           return value === match[4] ? value + '%' : '';
      //         }
      //       }
      //     }
      //   }
      // });
      //
      // this.chartDoughnutAchievements = new Chart('chartDoughnutAchievements', {
      //   type: 'doughnut',
      //   data: {
      //     labels: [labels[3]],
      //     datasets: [{
      //       data: [match[3], 100 - match[3]],
      //       backgroundColor: [
      //         color[3],
      //         greyColor,
      //       ],
      //       borderColor: [
      //         color[3],
      //         greyColor,
      //       ],
      //     }]
      //   },
      //   options: {
      //     // cutoutPercentage: 20,
      //     legend: {
      //       display: true,
      //       labels: {
      //         boxWidth: 0,
      //         fontSize: fontSizeDoughnut,
      //         fontStyle: 'bold',
      //       }
      //     },
      //     elements: {
      //       center: {
      //         text: match[3] + '%',
      //         color: color[3],
      //       }
      //     },
      //     plugins: {
      //       datalabels: {
      //         display: false,
      //         align: 'start',
      //         anchor: 'start',
      //         font: {
      //           size: fontSizeDoughnut,
      //           weight: 'bold'
      //         },
      //         formatter: function(value, context) {
      //           return value === match[3] ? value + '%' : '';
      //         }
      //       }
      //     }
      //   }
      // });
      //
      // this.chartDoughnutHarmoniousRelationship = new Chart('chartDoughnutHarmoniousRelationship', {
      //   type: 'doughnut',
      //   data: {
      //     labels: [labels[2].slice(0, 11) + '\n' + labels[2].slice(11, 21) ],
      //     datasets: [{
      //       data: [match[2], 100 - match[2]],
      //       backgroundColor: [
      //         color[2],
      //         greyColor,
      //       ],
      //       borderColor: [
      //         color[2],
      //         greyColor,
      //       ],
      //     }]
      //   },
      //   options: {
      //     // cutoutPercentage: 20,
      //     legend: {
      //       display: true,
      //       labels: {
      //         boxWidth: 0,
      //         fontSize: fontSizeDoughnut,
      //         fontStyle: 'bold',
      //       }
      //     },
      //     elements: {
      //       center: {
      //         text: match[2] + '%',
      //         color: color[2],
      //       }
      //     },
      //     plugins: {
      //       datalabels: {
      //         display: false,
      //         align: 'start',
      //         anchor: 'start',
      //         font: {
      //           size: fontSizeDoughnut,
      //           weight: 'bold'
      //         },
      //         formatter: function(value, context) {
      //           return value === match[2] ? value + '%' : '';
      //         }
      //       }
      //     }
      //   }
      // });
      //
      // this.chartDoughnutCreativity = new Chart('chartDoughnutCreativity', {
      //   type: 'doughnut',
      //   data: {
      //     labels: [labels[1]],
      //     datasets: [{
      //       data: [match[1], 100 - match[1]],
      //       backgroundColor: [
      //         color[1],
      //         greyColor,
      //       ],
      //       borderColor: [
      //         color[1],
      //         greyColor,
      //       ],
      //     }]
      //   },
      //   options: {
      //     // cutoutPercentage: 20,
      //     legend: {
      //       display: true,
      //       labels: {
      //         boxWidth: 0,
      //         fontSize: fontSizeDoughnut,
      //         fontStyle: 'bold',
      //       }
      //     },
      //     elements: {
      //       center: {
      //         text: match[1] + '%',
      //         color: color[1],
      //       }
      //     },
      //     plugins: {
      //       datalabels: {
      //         display: false,
      //         align: 'start',
      //         anchor: 'start',
      //         font: {
      //           size: fontSizeDoughnut,
      //           weight: 'bold'
      //         },
      //         formatter: function(value, context) {
      //           return value === match[1] ? value + '%' : '';
      //         }
      //       }
      //     }
      //   }
      // });
      //
      // this.chartDoughnutDevelopment = new Chart('chartDoughnutDevelopment', {
      //   type: 'doughnut',
      //   data: {
      //     labels: [labels[0]],
      //     datasets: [{
      //       data: [match[0], 100 - match[0]],
      //       backgroundColor: [
      //         color[0],
      //         greyColor,
      //       ],
      //       borderColor: [
      //         color[0],
      //         greyColor,
      //       ],
      //     }]
      //   },
      //   options: {
      //     // cutoutPercentage: 20,
      //     legend: {
      //       display: true,
      //       labels: {
      //         boxWidth: 0,
      //         fontSize: fontSizeDoughnut,
      //         fontStyle: 'bold',
      //       }
      //     },
      //     elements: {
      //       center: {
      //         text: match[0] + '%',
      //         color: color[0],
      //       }
      //     },
      //     plugins: {
      //       datalabels: {
      //         display: false,
      //         align: 'start',
      //         anchor: 'start',
      //         font: {
      //           size: fontSizeDoughnut,
      //           weight: 'bold'
      //         },
      //         formatter: function(value, context) {
      //           return value === match[0] ? value + '%' : '';
      //         }
      //       }
      //     }
      //   }
      // });


      //                    CANVASRADAR
      // this.chartRadar = new Chart('canvasRadar', {
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

      //                   CANVASPOLARAREA
      // this.chartPolarArea = new Chart('canvasPolarArea', {
      //     type: 'polarArea',
      //     data: {
      //       labels: labels,
      //       datasets: [{
      //         data: match,
      //         backgroundColor: [
      //           'rgba(75, 0, 130, 1)',
      //           'rgba(0, 0, 255, 1)',
      //           'rgba(0, 255, 0, 1)',
      //           'rgba(255, 255, 0, 1)',
      //           'rgba(255, 127, 0, 1)',
      //           'rgba(255, 0 , 0, 1)',
      //         ],
      //         borderColor: [
      //           'rgba(75, 0, 130, 1)',
      //           'rgba(0, 0, 255, 1)',
      //           'rgba(0, 255, 0, 1)',
      //           'rgba(255, 255, 0, 1)',
      //           'rgba(255, 127, 0, 1)',
      //           'rgba(255, 0 , 0, 1)',
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

    });
  }
}
