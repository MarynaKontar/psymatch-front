import { Component, OnInit } from '@angular/core';
import {
  FOR_WHOM_OUR_SITE1,
  FOR_WHOM_OUR_SITE2,
  FOR_WHOM_OUR_SITE3,
  FOR_WHOM_OUR_SITE4,
  FOR_WHOM_OUR_SITE_HEADER1,
  FOR_WHOM_OUR_SITE_HEADER2,
  FOR_WHOM_OUR_SITE_HEADER3,
  FOR_WHOM_OUR_SITE_HEADER4
} from '../../home/home';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  for_whom_our_site_header1 = `${FOR_WHOM_OUR_SITE_HEADER1}`;
  for_whom_our_site_header2 = `${FOR_WHOM_OUR_SITE_HEADER2}`;
  for_whom_our_site_header3 = `${FOR_WHOM_OUR_SITE_HEADER3}`;
  for_whom_our_site_header4 = `${FOR_WHOM_OUR_SITE_HEADER4}`;
  for_whom_our_site1 = `${FOR_WHOM_OUR_SITE1}`;
  for_whom_our_site2 = `${FOR_WHOM_OUR_SITE2}`;
  for_whom_our_site3 = `${FOR_WHOM_OUR_SITE3}`;
  for_whom_our_site4 = `${FOR_WHOM_OUR_SITE4}`;

  constructor() { }

  ngOnInit() {
  }

}
