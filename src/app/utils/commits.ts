// !!!!!!!!!!!!!!!--FRONTEND--!!!!!!!!!!!!!!!!!!!
// PROMISE: synchronized receiving data from the server for saving value-compatibility area arrays; change modal author-card size; replace value-compatibility colors to separate file; change background color(to rgba(245,245,245,0.4)) for ValueProfilesMatching figure for noPrincipal user; add redirect after registration; fix bug in RegistrationService: consider the case when in httpOptions there isnt token; fix bug in RegistrationComponent and LoginComponent: reload home page after redirect from register/login page (use Promise);
// done scroll-spy for match component (scrolling by page with navbar); add login-error notification; fix bag in send-tokens - not visible if there isnt links
// add possibility to show inviteTokenList only 2 times per session on value-profile component, than shows only value-profile without links; scale sending-tokens for all device sizes;
// add user-account component and write update method for UserAccount
// change age-gender-registration to Incomplete-registration (add not only age and gender, but name too);
// add test-friend button component and use it in value-profile; add auth guard service and use it to guard /account  component;
// add test-friend component with two button for send invite and test on that device; change send-token page from modal to not modal and increase/change-color copy botton;
// made redirect after login and registration to the previous page(this.router.navigate(['register'], { queryParams: { returnUrl: state.url }});); add tooltip to sending-token;
// add user names to match: Value Profiles For Matching figure; test-cards: card-body not linked; in header Pass test;
// add returnToFriendAccount button, method, endpoint (when friends test on one device); add canDeactivate guard, but not work navigate on it;
//add logServiceand enum for component names and add/replace console.log(...) to service.log(...)
// collected all auth form scss in one file auth.scss; refactor author-cards, profile, auth, common-components and header scss files: arranged in order and adjusted to the size of all screens, collected button scss in ine file test-button.scss, collected all colosr scss in one file color.scss; add logService methods to auth module, profile module and common-components;
// made it possible to load the initial view of the tests on the frontend, rather than loading it from the server each time; added the ability to randomly mix tests for each area; refactor value-compatibility, value-compatibility-profile, value-compatibility-test-inctruction, value-compatibility-service, match-home-page, match-value-compatibility-service, match-value-compatibility scss and ts files: arranged in order and adjusted to the size of all screens, add log service; offers to rotate device for devices with width less than 578px on chart-bar container on value-compatibility-profile and match-value-compatibility; on account page view registration page instead of contact information when isn't registered; synchronize retrieving data in match-value-compatibility (nested Promise); add confirm to return to user account (nested confirm) in return-to-friend-account;

// add user accounts that was match or was invited with loggin user on match-home-page; add return-to-friend-account on user-account;
// replace areaQuestion from Area to AreaItem; replace all "anonim" occurrence to "incomplete"; when go to test another user, add to local storage userForMatching item with value of first user; added the ability to receive a userForMatching by userForMatchingToken in match-value-compatibility.component
// NOT COMMITED fixes bug with incomplete registration (add user id to userAccount item in localStorage); fix bug with getUsersForMatching() headers;



// !!!!!!!!!!!!!!!--BACKEND--!!!!!!!!!!!!!!!!!!!
// add UserAccount, UserAccoutService, UserAccounDto, UserAccountDtoConverter and change in /login controller method ResponseEntity from SimpleUserDto to UserAccountDto. Now can return after login not only user info, but what test is passed, invite tokens (write method UserAccount getUserAccount(User user));
// change endpoint /addAgeAndGender to /incompleteRegistration, where save/update not only age and gender, but name too; /registration endpoint return ResponseEntity<UserAccountDto> (before was ResponseEntity<SimpleUserDto>); addUserForMatching method (ValueCompatibilityAnswersServiceImpl): add userForMatching to both users;
// change all @DbRef to manual references (https://docs.mongodb.com/manual/reference/database-references/); add UserAccountEntity to store to db;
// save userAccount when register
// fix bag when check if passwords are equals in changePassword method
// adds COMMENT DOC for all controller, util, model/  object, enums, entity, security, dto directories; adds to addNameAgeAndGender(User user) method in UserService checking on null and name or email existing; adds to getUsersForMatching() method in UserAccountService userForMatchingToken for receiving userForMatching by his token; transfer areaQuestion field from AreaDto to ChoiceDto; adds comment doc for TokenServiceImpl, CredentialsServiceImpl
// adds COMMENT DOC to service directory; fixes bug in match method: when decide if need insert new UserMatchEntity or get already exists in db, i compare date of creation last UserMatchEntity and passDate of ValueCompatibilityEntity of both users. Bug is that i compate not sutiable date view; replace addUserForMatching(userForMatchingToken, principal) from saveChoice to saveFirstPartOfTests; replace "if" to "switch" in getMatchForMatchMethod method in UserMatchServiceImpl;
// NOT COMMITED




// + profile, auth, author-cards, home-header, header, test-home-page, test-info-cards,
// + psychological-compatibility-info, why-determine-psychological-compatibility,
// + test-friend-button, pass-test-button, test-friend, test-not-passed
// + return-to-friend-account, sending-tokens, error-page, online-advertising
// + testing, matching

// REFACTOR:






// ENDPOINTS:
// GET:
// /test/initTest
// /test/generateTokenList
// /account/getAllRegisteredAndPassedTestUsersForMatching
// /account/getAllRegisteredAndPassedTestUsers
// /match/getUsersForMatching
//
// POST:
// /test/goal
// /test/state
// /test/quality
// /test/value-profile
//
// /registration
// /user/incompleteRegistration
// /registration/changePassword
// /auth/login
// /auth/loginFriendAccount
// /account/inviteForMatching
//
// /match/Percent
// /match/Pearson
// /match/value-profile-for-matching
// PUT:
// /account




// Small, medium, large, extra large devices (landscape phones, tablets, desktops, large desktops, 576px and up)











// ======= ValueCompatibilityComponent =========
// import {AreaItem} from '../testing/value-compatibility/value-compatibility-answers';
// import {ComponentName} from '../common-components/services/component-name';

// resetGoals() {
//   this.tests.goal.forEach(goal => {
//     goal = this.resetAreaItemChosenScaleTest(goal);
//   });
//   this.log.log(ComponentName.VALUE_COMPATIBILITY, ` resetGoals(): `, this.tests.goal);
//   this.resetItemsAfterSaveAreaArrays();
// }
// private resetAreaItemChosenScaleTest(areaItem: AreaItem): AreaItem {
//   // not work, because chosenScale is link to first or second scale (not only value). So if changes some scale, than changed chosenScale
//   if (areaItem.chosenScale.scale === areaItem.firstScale.scale) {
//     const scale = areaItem.firstScale.scale;
//     const scaleHeader = areaItem.firstScale.scaleHeader;
//     const scaleDescription = areaItem.firstScale.scaleDescription;
//     areaItem.chosenScale.scale = null;
//     console.log( areaItem.chosenScale.scale);
//     console.log(this.tests.state[0].chosenScale.scale);
//     console.log(this.tests.state[0].firstScale.scale);
//     areaItem.chosenScale.scaleHeader = null;
//     areaItem.chosenScale.scaleDescription = null;
//     areaItem.firstScale.scale = scale;
//     console.log(areaItem.chosenScale.scale);
//     console.log(this.tests.state[0].chosenScale.scale);
//     console.log(this.tests.state[0].firstScale.scale);
//     areaItem.firstScale.scaleHeader = scaleHeader;
//     areaItem.firstScale.scaleDescription = scaleDescription;
//   } else if (areaItem.chosenScale.scale === areaItem.secondScale.scale) {
//     const scale = areaItem.secondScale.scale;
//     const scaleHeader = areaItem.secondScale.scaleHeader;
//     const scaleDescription = areaItem.secondScale.scaleDescription;
//     areaItem.chosenScale.scale = null;
//     areaItem.chosenScale.scaleHeader = null;
//     areaItem.chosenScale.scaleDescription = null;
//     areaItem.secondScale.scale = scale;
//     areaItem.secondScale.scaleHeader = scaleHeader;
//     areaItem.secondScale.scaleDescription = scaleDescription;
//   }
//   // else {
//   //   this.valueCompatibilityService.getTestList()
//   //     .subscribe(data => {
//   //         this.log.log(ComponentName.VALUE_COMPATIBILITY, ` resetGoals(): getTestList`);
//   //         this.tests.goal = data.goal;
//   //       }
//   //     );
//   // }
//   return areaItem;
// }

// isFirstTestItem(i): boolean {
//   return i === 0;
// }
//
// isLastTestItem(i): boolean {
//   return i === 14;
// }
