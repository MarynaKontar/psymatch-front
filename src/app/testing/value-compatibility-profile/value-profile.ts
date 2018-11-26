
export interface ValueProfileIndividual {
  valueProfile: ValueProfile;
  valueProfileComments: ValueProfileComment[];
}

export interface ValueProfile {
  valueProfileElements: ValueProfileElement[];
  isPrincipalUser: boolean;
}
export interface ValueProfileElement {
  scaleName: string;
  percentResult: number;
  // comment: ValueProfileComment;
}

export interface ValueProfileComment {
  result: number;
  scale: string;
  head: string;
  header: string;
  list: string[];
  footer: string;
}
