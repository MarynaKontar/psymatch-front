export interface ValueCompatibilityAnswers {
  // id: string;
  userName: string;
  goal: GoalItem[];
  quality: QualityItem[];
  state: StateItem[];
  // passDate: Date;
  passed: boolean;
}

export interface GoalItem {
  area: Area;
  chosenScale: Scale;
  firstScale: Scale;
  secondScale: Scale;
}


export interface StateItem {
  area: Area;
  chosenScale: Scale;
  firstScale: Scale;
  secondScale: Scale;
}

export interface QualityItem {
  area: Area;
  chosenScale: Scale;
  firstScale: Scale;
  secondScale: Scale;
}

export interface Scale {
  scale: string;
  scaleName: string;
}

export interface Area {
  area: string;
  areaName: string;
  areaQuestion: string;
}
