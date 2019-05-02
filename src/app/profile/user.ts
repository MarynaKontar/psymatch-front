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
  // ANOTHER = 'ANOTHER',
}

export class UserAccount {
  user: User;
  isValueCompatibilityTestPassed: boolean;
  inviteTokens: string[];
}
