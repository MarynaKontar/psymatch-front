// !!!!!!!!!!!!!!!--FRONTEND--!!!!!!!!!!!!!!!!!!!
// PROMISE: synchronized receiving data from the server for saving value-compatibility area arrays; change modal author-card size; replace value-compatibility colors to separate file; change background color(to rgba(245,245,245,0.4)) for ValueProfilesMatching figure for noPrincipal user; add redirect after registration; fix bug in RegistrationService: consider the case when in httpOptions there isnt token; fix bug in RegistrationComponent and LoginComponent: reload home page after redirect from register/login page (use Promise);
// done scroll-spy for match component (scrolling by page with navbar); add login-error notification; fix bag in send-tokens - not visible if there isnt links
// add possibility to show inviteTokenList only 2 times per session on value-profile component, than shows only value-profile without links; scale sending-tokens for all device sizes;
// add user-account component and write update method for UserAccount
// change age-gender-registration to anonim-registration (add not only age and gender, but name too);
// add test-friend button component and use it in value-profile; add auth guard service and use it to guard /account  component;
// add test-friend component with two button for send invite and test on that device; change send-token page from modal to not modal and increase/change-color copy botton;
// made redirect after login and registration to the previous page(this.router.navigate(['register'], { queryParams: { returnUrl: state.url }});); add tooltip to sending-token;
// add user names to match: Value Profiles For Matching figure; test-cards: card-body not linked; in header Pass test;
// add returnToFriendAccount button, method, endpoint (when friends test on one device); add canDeactivate guard, but not work navigate on it;

//add logServiceand enum for component names and add/replace console.log(...) to service.log(...)

//NOT COMMITED collected all auth form scss in one file auth.scss; refactor author-cards, profile, auth, common-components and header scss files: arranged in order and adjusted to the size of all screens, collected button scss in ine file test-button.scss, collected all colosr scss in one file color.scss; add logService methods to auth module, profile module and common-components;

// !!!!!!!!!!!!!!!--BACKEND--!!!!!!!!!!!!!!!!!!!
// add UserAccount, UserAccoutService, UserAccounDto, UserAccountDtoConverter and change in /login controller method ResponseEntity from SimpleUserDto to UserAccountDto. Now can return after login not only user info, but what test is passed, invite tokens (write method UserAccount getUserAccount(User user));
// change endpoint /addAgeAndGender to /anonimRegistration, where save/update not only age and gender, but name too; /registration endpoint return ResponseEntity<UserAccountDto> (before was ResponseEntity<SimpleUserDto>); addUserForMatching method (ValueCompatibilityAnswersServiceImpl): add userForMatching to both users;
// change all @DbRef to manual references (https://docs.mongodb.com/manual/reference/database-references/); add UserAccountEntity to store to db;
// NO COMMIT save userAccount when register


// + profile, auth, author-cards, home-header, header, test-home-page, test-info-cards,
// + psychological-compatibility-info, why-determine-psychological-compatibility,
// + test-friend-button, pass-test-button, test-friend, test-not-passed
// + return-to-friend-account, sending-tokens, error-page, online-advertising

// REFACTOR:
// interseptor
// common-components


//
//
// Small, medium, large, extra large devices (landscape phones, tablets, desktops, large desktops, 576px and up)
