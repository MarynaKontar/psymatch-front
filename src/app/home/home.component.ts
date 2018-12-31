import { Component, OnInit } from '@angular/core';
import {
  FOR_WHOM_OUR_SITE1, FOR_WHOM_OUR_SITE2, FOR_WHOM_OUR_SITE3, FOR_WHOM_OUR_SITE4, FOR_WHOM_OUR_SITE_HEADER1,
  FOR_WHOM_OUR_SITE_HEADER2, FOR_WHOM_OUR_SITE_HEADER3, FOR_WHOM_OUR_SITE_HEADER4,
  LOVE_COMPATIBILITY_TEST_DESCRIPTION1, LOVE_COMPATIBILITY_TEST_DESCRIPTION2,
  LOVE_COMPATIBILITY_TEST_HEADER,
  ROLE_COMPATIBILITY_TEST_DESCRIPTION,
  ROLE_COMPATIBILITY_TEST_HEADER,
  SEXUAL_COMPATIBILITY_TEST_DESCRIPTION1, SEXUAL_COMPATIBILITY_TEST_DESCRIPTION2,
  SEXUAL_COMPATIBILITY_TEST_HEADER,
  VALUE_COMPATIBILITY_TEST_DESCRIPTION,
  VALUE_COMPATIBILITY_TEST_HEADER
} from './home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  for_whom_our_site_header1 = `${FOR_WHOM_OUR_SITE_HEADER1}`;
  for_whom_our_site_header2 = `${FOR_WHOM_OUR_SITE_HEADER2}`;
  for_whom_our_site_header3 = `${FOR_WHOM_OUR_SITE_HEADER3}`;
  for_whom_our_site_header4 = `${FOR_WHOM_OUR_SITE_HEADER4}`;
  for_whom_our_site1 = `${FOR_WHOM_OUR_SITE1}`;
  for_whom_our_site2 = `${FOR_WHOM_OUR_SITE2}`;
  for_whom_our_site3 = `${FOR_WHOM_OUR_SITE3}`;
  for_whom_our_site4 = `${FOR_WHOM_OUR_SITE4}`;

  value_compatibility_test_header = `${VALUE_COMPATIBILITY_TEST_HEADER}`;
  value_compatibility_test_description = `${VALUE_COMPATIBILITY_TEST_DESCRIPTION}`;
  role_compatibility_test_header = `${ROLE_COMPATIBILITY_TEST_HEADER}`;
  role_compatibility_test_description = `${ROLE_COMPATIBILITY_TEST_DESCRIPTION}`;
  love_compatibility_test_header = `${LOVE_COMPATIBILITY_TEST_HEADER}`;
  love_compatibility_test_description1 = `${LOVE_COMPATIBILITY_TEST_DESCRIPTION1}`;
  love_compatibility_test_description2 = `${LOVE_COMPATIBILITY_TEST_DESCRIPTION2}`;
  sexual_compatibility_test_header = `${SEXUAL_COMPATIBILITY_TEST_HEADER}`;
  sexual_compatibility_test_description1 = `${SEXUAL_COMPATIBILITY_TEST_DESCRIPTION1}`;
  sexual_compatibility_test_description2 = `${SEXUAL_COMPATIBILITY_TEST_DESCRIPTION2}`;

  constructor() { }

  ngOnInit() {
  }

}
