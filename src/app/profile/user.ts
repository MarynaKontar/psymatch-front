export class User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: Gender;
  password: string;
  constructor() { }
}

export enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

export enum AccountType {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE'
}

export class UserAccount {
  user: User;
  accountType: AccountType;
  isValueCompatibilityTestPassed: boolean;
  inviteTokens: string[];
  usersForMatching: User[];
  usersWhoYouInvite: User[];
  usersWhoInvitedYou: User[];
}
