// !!!!!!!!!!!!!!!--FRONTEND--!!!!!!!!!!!!!!!!!!!
// PROMISE: synchronized receiving data from the server for saving value-compatibility area arrays; change modal author-card size; replace value-compatibility colors to separate file; change background color(to rgba(245,245,245,0.4)) for ValueProfilesMatching figure for noPrincipal user; add redirect after registration; fix bug in RegistrationService: consider the case when in httpOptions there isnt token; fix bug in RegistrationComponent and LoginComponent: reload home page after redirect from register/login page (use Promise);
// done scroll-spy for match component (scrolling by page with navbar); add login-error notification; fix bag in send-tokens - not visible if there isnt links
// add possibility to show inviteTokenList only 2 times per session on value-profile component, than shows only value-profile without links; scale sending-tokens for all device sizes;
// add user-account component and write update method for UserAccount
// NOT COMMITED  change age-gender-registration to anonim-ragistration (add not only age and gender, but name too);
// NOT COMMITED add test-friend button component and use it in value-profile; add auth guard service and use it to guard /account  component;
// NOT COMMITED add test-friend component with two button for send invite and test on that device; change send-token page from modal to not modal and increase/change-color copy botton;
// NOT COMMITED made redirect after login and registration to the previous page(this.router.navigate(['register'], { queryParams: { returnUrl: state.url }});); add tooltip to sending-token;
// NOT COMMITED add user names to match: Value Profiles For Matching figure; test-cards: card-body not linked; in header "Pass test";
//
// !!!!!!!!!!!!!!!--BACKEND--!!!!!!!!!!!!!!!!!!!
// add UserAccount, UserAccoutService, UserAccounDto, UserAccountDtoConverter and change in /login controller method ResponseEntity from SimpleUserDto to UserAccountDto. Now can return after login not only user info, but what test is passed, invite tokens (write method UserAccount getUserAccount(User user));
// change endpoint /addAgeAndGender to /anonimRegistration, where save/update not only age and gender, but name too; /registration endpoint return ResponseEntity<UserAccountDto> (before was ResponseEntity<SimpleUserDto>); addUserForMatching method (ValueCompatibilityAnswersServiceImpl): add userForMatching to both users;
