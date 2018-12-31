import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
