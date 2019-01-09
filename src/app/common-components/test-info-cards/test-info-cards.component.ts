import { Component, OnInit } from '@angular/core';
import {
  LOVE_COMPATIBILITY_TEST_DESCRIPTION1,
  LOVE_COMPATIBILITY_TEST_DESCRIPTION2,
  LOVE_COMPATIBILITY_TEST_HEADER,
  ROLE_COMPATIBILITY_TEST_DESCRIPTION,
  ROLE_COMPATIBILITY_TEST_HEADER,
  SEXUAL_COMPATIBILITY_TEST_DESCRIPTION1,
  SEXUAL_COMPATIBILITY_TEST_DESCRIPTION2,
  SEXUAL_COMPATIBILITY_TEST_HEADER, TEST_IS_PASSED, TEST_ISNT_PASSED,
  VALUE_COMPATIBILITY_TEST_DESCRIPTION,
  VALUE_COMPATIBILITY_TEST_HEADER
} from '../../home/home';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-test-info-cards',
  templateUrl: './test-info-cards.component.html',
  styleUrls: ['./test-info-cards.component.scss']
})
export class TestInfoCardsComponent implements OnInit {

  isValueCompatibilityTestPassed = false;

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

  valueCompatibilityTestPassed = `${TEST_IS_PASSED}`;
  valueCompatibilityTestIsNotPassed = `${TEST_ISNT_PASSED}`;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.isValueCompatibilityTestPassed = this.loginService.isValueCompatibilityTestPassed();
  }


}
