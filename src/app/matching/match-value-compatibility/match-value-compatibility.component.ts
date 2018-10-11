import { Component, OnInit } from '@angular/core';
import { matchUser1User8 } from './match-value-compatibility';
import {fade} from '../../../animations/testing-page-animation';
import { Chart } from 'chart.js';
import {MatchValueCompatibilityService} from '../match-value-compatibility.service';

@Component({
  selector: 'app-match-value-compatibility',
  templateUrl: './match-value-compatibility.component.html',
  styleUrls: ['./match-value-compatibility.component.scss'],
  animations: [
     fade
   ]
})
export class MatchValueCompatibilityComponent implements OnInit {

  matchUser1User8;
  chart = [];
  constructor(private matchValueCompatibilityService: MatchValueCompatibilityService) { }

  ngOnInit() {
    this.matchUser1User8 = matchUser1User8.matches;
    this.matchValueCompatibilityService.matchPearson().
      subscribe(data => {
        console.log(data);
        let labels = data['matches'].map(res => res.area);
        labels = [labels[0], labels[1], labels[2]];
        let match = data['matches'].map(res => res.result.number);
        // match = [match[0], match[1], match[2]]
        match = [0.5, 0.4, 0.8];
        this.chart = new Chart('canvas', {
          type: 'polarArea',
          data: {
            labels: labels,
            datasets: [{
              data: match,
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scale: {
              ticks: {
                max: 1
              },
            scales: {
              // yAxes: [{
              //   ticks: {
              //     // beginAtZero: true
              //     max: 1
              //   }
              // }],
              // xAxes: [{
              //   ticks: {
              //     beginAtZero: true,
              //     max: 1
              //   }
              // }]
            },
            // legend: {
            //   display: false
            // }
          }
        }});
        console.log(this.chart);
      });
  }

}
