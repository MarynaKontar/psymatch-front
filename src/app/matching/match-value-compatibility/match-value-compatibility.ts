import {User} from '../../profile/user';
import {ValueProfile} from '../../testing/value-compatibility-profile/value-profile';

export interface UserMatch {
  users: User[];
  matches: Matching[];
}

export interface ValueProfileMatching {
  valueProfiles: ValueProfile[];
  valuesDifferencesComments: ValuesDifferencesComment[];
}

export interface AspectComment {
  // result: number;
  aspect: string; // Goal, Quality, State, Total
  aspectDescription: string;
  level: AspectLevel; // LOW, SUFFICIENT, GOOD, EXCELLENT
  levelName: string;
  header: string; // "Поздравляем!"
  foreword: string; // предисловие
  accent: string; // то, что будем выделять (bold,...)
  mainText: string;
}

export enum AspectLevel {
  LOW = 'LOW',
  SUFFICIENT = 'SUFFICIENT',
  GOOD = 'GOOD',
  EXCELLENT = 'EXCELLENT'
}

export interface ValuesDifferencesComment {
  result: number;
  scale: string;
  level: ScaleLevel; // FULL_MATCH, MINOR_DIFFERENCES, MODERATE_DIFFERENCES, STRONG_DIFFERENCES
  levelName: string;
  text: string[];
}

export enum ScaleLevel {
  FULL_MATCH = 'FULL_MATCH',
  MINOR_DIFFERENCES = 'MINOR_DIFFERENCES',
  MODERATE_DIFFERENCES = 'MODERATE_DIFFERENCES',
  STRONG_DIFFERENCES = 'STRONG_DIFFERENCES'
}

interface Matching {
  matchMethod: string;
  area: string;
  result: Result;
  userMatchComment: AspectComment;
}

interface Result {
  number: number;
}

export let matchUser1User8 = {

'users': [
  {
    'name': 'user8',
    'email': 'user8@gmail.com',
    'password': 'user8'
  },
  {
    'name': 'user1',
    'email': 'user1@gmail.com',
    'password': 'user1'
  }
],
  'matches': [
  {
    'matchMethod': 'PEARSONCORRELATION',
    'area': 'GOAL',
    'result': {
      'number': 0.75
    }
  },
  {
    'matchMethod': 'PEARSONCORRELATION',
    'area': 'QUALITY',
    'result': {
      'number': 0.3
    }
  },
  {
    'matchMethod': 'PEARSONCORRELATION',
    'area': 'STATE',
    'result': {
      'number': 0.65
    }
  },
  {
    'matchMethod': 'PEARSONCORRELATION',
    'area': 'TOTAL',
    'result': {
      'number': 0.87
    }
  }
],
  'advice': 'There is no one advice was written yet GOAL PEARSONCORRELATION....СОВПАДАЕТЕ  GOAL PEARSONCORRELATION....' +
  'НЕ СОВПАДАЕТЕ  GOAL PEARSONCORRELATION....НЕ СОВПАДАЕТЕ  GOAL PEARSONCORRELATION....НЕ СОВПАДАЕТЕ  QUALITY PEARSONCORRELATION....' +
  'НЕ СОВПАДАЕТЕ  QUALITY PEARSONCORRELATION....СОВПАДАЕТЕ  QUALITY PEARSONCORRELATION....НЕ СОВПАДАЕТЕ  QUALITY PEARSONCORRELATION....' +
  'НЕ СОВПАДАЕТЕ  STATE PEARSONCORRELATION....НЕ СОВПАДАЕТЕ  STATE PEARSONCORRELATION....НЕ СОВПАДАЕТЕ  STATE PEARSONCORRELATION....' +
  'СОВПАДАЕТЕ  STATE PEARSONCORRELATION....НЕ СОВПАДАЕТЕ  '
};
