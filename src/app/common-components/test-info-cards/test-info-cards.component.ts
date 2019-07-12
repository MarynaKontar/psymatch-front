import { Component, OnInit } from '@angular/core';
import {
  VALUE_COMPATIBILITY_TEST_HEADER,
  VALUE_COMPATIBILITY_TEST_MAIN_TEXT,
  VALUE_COMPATIBILITY_TEST_DESCRIPTION1,
  VALUE_COMPATIBILITY_TEST_DESCRIPTION2,

  ROLE_COMPATIBILITY_TEST_HEADER,
  ROLE_COMPATIBILITY_TEST_MAIN_TEXT,
  ROLE_COMPATIBILITY_TEST_DESCRIPTION1,
  ROLE_COMPATIBILITY_TEST_DESCRIPTION2,

  LOVE_COMPATIBILITY_TEST_HEADER,
  LOVE_COMPATIBILITY_TEST_MAIN_TEXT,
  LOVE_COMPATIBILITY_TEST_DESCRIPTION1,
  LOVE_COMPATIBILITY_TEST_DESCRIPTION2,
  LOVE_COMPATIBILITY_TEST_DESCRIPTION3,

  SEXUAL_COMPATIBILITY_TEST_HEADER,
  SEXUAL_COMPATIBILITY_TEST_DESCRIPTION1,
  SEXUAL_COMPATIBILITY_TEST_DESCRIPTION2,
  SEXUAL_COMPATIBILITY_TEST_MAIN_TEXT,

  TEST_IS_PASSED, TEST_ISNT_PASSED,

} from './test-info-cards';
import {LoginService} from '../../auth/authentication/login.service';

@Component({
  selector: 'app-test-info-cards',
  templateUrl: './test-info-cards.component.html',
  styleUrls: ['./test-info-cards.component.scss']
})
export class TestInfoCardsComponent implements OnInit {

  isValueCompatibilityTestPassed = false;
  isRoleCompatibilityTestPassed = false;
  isLoveCompatibilityTestPassed = false;
  isSexualCompatibilityTestPassed = false;

  value_compatibility_test_header = `${VALUE_COMPATIBILITY_TEST_HEADER}`;
  value_compatibility_test_main_text = `${VALUE_COMPATIBILITY_TEST_MAIN_TEXT}`;
  value_compatibility_test_description1 = `${VALUE_COMPATIBILITY_TEST_DESCRIPTION1}`;
  value_compatibility_test_description2 = `${VALUE_COMPATIBILITY_TEST_DESCRIPTION2}`;

  role_compatibility_test_header = `${ROLE_COMPATIBILITY_TEST_HEADER}`;
  role_compatibility_test_main_text = `${ROLE_COMPATIBILITY_TEST_MAIN_TEXT}`;
  role_compatibility_test_description1 = `${ROLE_COMPATIBILITY_TEST_DESCRIPTION1}`;
  role_compatibility_test_description2 = `${ROLE_COMPATIBILITY_TEST_DESCRIPTION2}`;

  love_compatibility_test_header = `${LOVE_COMPATIBILITY_TEST_HEADER}`;
  love_compatibility_test_main_text = `${LOVE_COMPATIBILITY_TEST_MAIN_TEXT}`;
  love_compatibility_test_description1 = `${LOVE_COMPATIBILITY_TEST_DESCRIPTION1}`;
  love_compatibility_test_description2 = `${LOVE_COMPATIBILITY_TEST_DESCRIPTION2}`;
  love_compatibility_test_description3 = `${LOVE_COMPATIBILITY_TEST_DESCRIPTION3}`;

  sexual_compatibility_test_header = `${SEXUAL_COMPATIBILITY_TEST_HEADER}`;
  sexual_compatibility_test_main_text = `${SEXUAL_COMPATIBILITY_TEST_MAIN_TEXT}`;
  sexual_compatibility_test_description1 = `${SEXUAL_COMPATIBILITY_TEST_DESCRIPTION1}`;
  sexual_compatibility_test_description2 = `${SEXUAL_COMPATIBILITY_TEST_DESCRIPTION2}`;

  valueCompatibilityTestPassed = `${TEST_IS_PASSED}`;
  valueCompatibilityTestIsNotPassed = `${TEST_ISNT_PASSED}`;

  roleCompatibilityTestPassed = `${TEST_IS_PASSED}`;
  roleCompatibilityTestIsNotPassed = `${TEST_ISNT_PASSED}`;

  loveCompatibilityTestPassed = `${TEST_IS_PASSED}`;
  loveCompatibilityTestIsNotPassed = `${TEST_ISNT_PASSED}`;

  sexualCompatibilityTestPassed = `${TEST_IS_PASSED}`;
  sexualCompatibilityTestIsNotPassed = `${TEST_ISNT_PASSED}`;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.isValueCompatibilityTestPassed = this.loginService.isValueCompatibilityTestPassed();
  }


}
