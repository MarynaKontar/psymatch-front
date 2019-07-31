export interface ValueCompatibilityAnswers {
  id: string;
  userId: string;
  goal: AreaItem[];
  quality: AreaItem[];
  state: AreaItem[];
  passDate: Date;
  passed: boolean;
}

export interface AreaItem {
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
  scale: ScaleEnum;
  scaleHeader: string;
  scaleDescription: string;
  // scaleColor?: string;
}

export interface Area {
  area: string;
  areaName: string;
  areaQuestion: string;
}

export enum AreaEnum {
   GOAL = 'GOAL',
   QUALITY = 'QUALITY',
   STATE = 'STATE',
   TOTAL = 'TOTAL',
}
export enum ScaleEnum {
   ONE = 'ONE',
   TWO = 'TWO',
   THREE = 'THREE',
   FOUR = 'FOUR',
   FIVE = 'FIVE',
   SIX = 'SIX'
}

export const animationTime = 500; // ms

export let tests: ValueCompatibilityAnswers = {
  'id': null,
  'userId': null,
  'goal': [
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'ДОСТИЖЕНИЯ',
        'scaleDescription': 'Профессиональные, спортивные и личные успехи, достижения и победы.'
      },
      'secondScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'РАЗВИТИЕ',
        'scaleDescription': 'Личностное, интеллектуальное и физическое развитие. Самоисследование и самосовершенствование. Раскрытие своего внутреннего потенциала.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ГАРМОНИЧНЫЕ ОТНОШЕНИЯ',
        'scaleDescription': 'Построение и поддержание гармоничных близких, эмоционально тёплых отношений, основанных на взаимной симпатии и душевной близости.'
      },
      'secondScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'РАЗВИТИЕ',
        'scaleDescription': 'Личностное, интеллектуальное и физическое развитие. Самоисследование и самосовершенствование. Раскрытие своего внутреннего потенциала.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'ЗДОРОВЬЕ',
        'scaleDescription': 'Поддержание крепкого физического и душевного здоровья. Обеспечение себя достаточным количеством жизненных сил и энергии.'
      },
      'secondScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'УДОВОЛЬСТВИЯ',
        'scaleDescription': 'Наслаждение жизнью. Получение удовольствия от всего, что ты делаешь (от еды, секса, работы, общения, развлечений и т.д.).'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'УДОВОЛЬСТВИЯ',
        'scaleDescription': 'Наслаждение жизнью. Получение удовольствия от всего, что ты делаешь (от еды, секса, работы, общения, развлечений и т.д.).'
      },
      'secondScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'РАЗВИТИЕ',
        'scaleDescription': 'Личностное, интеллектуальное и физическое развитие. Самоисследование и самосовершенствование. Раскрытие своего внутреннего потенциала.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ГАРМОНИЧНЫЕ ОТНОШЕНИЯ',
        'scaleDescription': 'Построение и поддержание гармоничных близких, эмоционально тёплых отношений, основанных на взаимной симпатии и душевной близости.'
      },
      'secondScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'ДОСТИЖЕНИЯ',
        'scaleDescription': 'Профессиональные, спортивные и личные успехи, достижения и победы.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'ДОСТИЖЕНИЯ',
        'scaleDescription': 'Профессиональные, спортивные и личные успехи, достижения и победы.'
      },
      'secondScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'ЗДОРОВЬЕ',
        'scaleDescription': 'Поддержание крепкого физического и душевного здоровья. Обеспечение себя достаточным количеством жизненных сил и энергии.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'РАЗВИТИЕ',
        'scaleDescription': 'Личностное, интеллектуальное и физическое развитие. Самоисследование и самосовершенствование. Раскрытие своего внутреннего потенциала.'
      },
      'secondScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'ЗДОРОВЬЕ',
        'scaleDescription': 'Поддержание крепкого физического и душевного здоровья. Обеспечение себя достаточным количеством жизненных сил и энергии.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'УДОВОЛЬСТВИЯ',
        'scaleDescription': 'Наслаждение жизнью. Получение удовольствия от всего, что ты делаешь (от еды, секса, работы, общения, развлечений и т.д.).'
      },
      'secondScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'ДОСТИЖЕНИЯ',
        'scaleDescription': 'Профессиональные, спортивные и личные успехи, достижения и победы.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'ТВОРЧЕСТВО',
        'scaleDescription': 'Созидание чего-то нового. Творческая самореализация, творческое самовыражение в том, что ты делаешь.'
      },
      'secondScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'УДОВОЛЬСТВИЯ',
        'scaleDescription': 'Наслаждение жизнью. Получение удовольствия от всего, что ты делаешь (от еды, секса, работы, общения, развлечений и т.д.).'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'ТВОРЧЕСТВО',
        'scaleDescription': 'Созидание чего-то нового. Творческая самореализация, творческое самовыражение в том, что ты делаешь.'
      },
      'secondScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'ДОСТИЖЕНИЯ',
        'scaleDescription': 'Профессиональные, спортивные и личные успехи, достижения и победы.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ГАРМОНИЧНЫЕ ОТНОШЕНИЯ',
        'scaleDescription': 'Построение и поддержание гармоничных близких, эмоционально тёплых отношений, основанных на взаимной симпатии и душевной близости.'
      },
      'secondScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'ЗДОРОВЬЕ',
        'scaleDescription': 'Поддержание крепкого физического и душевного здоровья. Обеспечение себя достаточным количеством жизненных сил и энергии.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'ЗДОРОВЬЕ',
        'scaleDescription': 'Поддержание крепкого физического и душевного здоровья. Обеспечение себя достаточным количеством жизненных сил и энергии.'
      },
      'secondScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'ТВОРЧЕСТВО',
        'scaleDescription': 'Созидание чего-то нового. Творческая самореализация, творческое самовыражение в том, что ты делаешь.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'ТВОРЧЕСТВО',
        'scaleDescription': 'Созидание чего-то нового. Творческая самореализация, творческое самовыражение в том, что ты делаешь.'
      },
      'secondScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ГАРМОНИЧНЫЕ ОТНОШЕНИЯ',
        'scaleDescription': 'Построение и поддержание гармоничных близких, эмоционально тёплых отношений, основанных на взаимной симпатии и душевной близости.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'РАЗВИТИЕ',
        'scaleDescription': 'Личностное, интеллектуальное и физическое развитие. Самоисследование и самосовершенствование. Раскрытие своего внутреннего потенциала.'
      },
      'secondScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'ТВОРЧЕСТВО',
        'scaleDescription': 'Созидание чего-то нового. Творческая самореализация, творческое самовыражение в том, что ты делаешь.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'GOAL',
        'areaName': 'Жизненные цели',
        'areaQuestion': 'Что для вас в жизни более ценно? Что бы вы выбрали в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ГАРМОНИЧНЫЕ ОТНОШЕНИЯ',
        'scaleDescription': 'Построение и поддержание гармоничных близких, эмоционально тёплых отношений, основанных на взаимной симпатии и душевной близости.'
      },
      'secondScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'УДОВОЛЬСТВИЯ',
        'scaleDescription': 'Наслаждение жизнью. Получение удовольствия от всего, что ты делаешь (от еды, секса, работы, общения, развлечений и т.д.).'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    }
  ],
  'quality': [
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'КРЕАТИВНОСТЬ',
        'scaleDescription': 'Способность к творческой деятельности - способность придумывать и создавать что-то новое и оригинальное.'
      },
      'secondScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'ГЕДОНИЗМ',
        'scaleDescription': 'Способность получать удовольствие и наслаждаться жизнью. Способность создавать и поддерживать физический и душевный комфорт.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ДОБРОЖЕЛАТЕЛЬНОСТЬ',
        'scaleDescription': 'Доброта и дружелюбие. Способность к сопереживанию и состраданию, альтруизм. Способность понимать людей и устанавливать с ними гармоничные отношения.'
      },
      'secondScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'СТОЙКОСТЬ',
        'scaleDescription': 'Стрессоустойчивость, способность «крепко стоять на ногах» и успешно противостоять жизненным трудностям и невзгодам.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'КРЕАТИВНОСТЬ',
        'scaleDescription': 'Способность к творческой деятельности - способность придумывать и создавать что-то новое и оригинальное.'
      },
      'secondScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ДОБРОЖЕЛАТЕЛЬНОСТЬ',
        'scaleDescription': 'Доброта и дружелюбие. Способность к сопереживанию и состраданию, альтруизм. Способность понимать людей и устанавливать с ними гармоничные отношения.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'МУДРОСТЬ',
        'scaleDescription': 'Гармоничный союз души и ума: любознательность, здравомыслие, благоразумие. Понимание устройства мира, природы вещей и явлений, самопонимание.'
      },
      'secondScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'СТОЙКОСТЬ',
        'scaleDescription': 'Стрессоустойчивость, способность «крепко стоять на ногах» и успешно противостоять жизненным трудностям и невзгодам.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'СИЛА ВОЛИ',
        'scaleDescription': 'Настойчивость и упорство в преодолении трудностей и достижении цели, целеустремлённость.'
      },
      'secondScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'МУДРОСТЬ',
        'scaleDescription': 'Гармоничный союз души и ума: любознательность, здравомыслие, благоразумие. Понимание устройства мира, природы вещей и явлений, самопонимание.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'СТОЙКОСТЬ',
        'scaleDescription': 'Стрессоустойчивость, способность «крепко стоять на ногах» и успешно противостоять жизненным трудностям и невзгодам.'
      },
      'secondScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'ГЕДОНИЗМ',
        'scaleDescription': 'Способность получать удовольствие и наслаждаться жизнью. Способность создавать и поддерживать физический и душевный комфорт.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'СТОЙКОСТЬ',
        'scaleDescription': 'Стрессоустойчивость, способность «крепко стоять на ногах» и успешно противостоять жизненным трудностям и невзгодам.'
      },
      'secondScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'КРЕАТИВНОСТЬ',
        'scaleDescription': 'Способность к творческой деятельности - способность придумывать и создавать что-то новое и оригинальное.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'ГЕДОНИЗМ',
        'scaleDescription': 'Способность получать удовольствие и наслаждаться жизнью. Способность создавать и поддерживать физический и душевный комфорт.'
      },
      'secondScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'СИЛА ВОЛИ',
        'scaleDescription': 'Настойчивость и упорство в преодолении трудностей и достижении цели, целеустремлённость.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'ГЕДОНИЗМ',
        'scaleDescription': 'Способность получать удовольствие и наслаждаться жизнью. Способность создавать и поддерживать физический и душевный комфорт.'
      },
      'secondScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'МУДРОСТЬ',
        'scaleDescription': 'Гармоничный союз души и ума: любознательность, здравомыслие, благоразумие. Понимание устройства мира, природы вещей и явлений, самопонимание.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'КРЕАТИВНОСТЬ',
        'scaleDescription': 'Способность к творческой деятельности - способность придумывать и создавать что-то новое и оригинальное.'
      },
      'secondScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'СИЛА ВОЛИ',
        'scaleDescription': 'Настойчивость и упорство в преодолении трудностей и достижении цели, целеустремлённость.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ДОБРОЖЕЛАТЕЛЬНОСТЬ',
        'scaleDescription': 'Доброта и дружелюбие. Способность к сопереживанию и состраданию, альтруизм. Способность понимать людей и устанавливать с ними гармоничные отношения.'
      },
      'secondScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'ГЕДОНИЗМ',
        'scaleDescription': 'Способность получать удовольствие и наслаждаться жизнью. Способность создавать и поддерживать физический и душевный комфорт.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ДОБРОЖЕЛАТЕЛЬНОСТЬ',
        'scaleDescription': 'Доброта и дружелюбие. Способность к сопереживанию и состраданию, альтруизм. Способность понимать людей и устанавливать с ними гармоничные отношения.'
      },
      'secondScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'СИЛА ВОЛИ',
        'scaleDescription': 'Настойчивость и упорство в преодолении трудностей и достижении цели, целеустремлённость.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'СТОЙКОСТЬ',
        'scaleDescription': 'Стрессоустойчивость, способность «крепко стоять на ногах» и успешно противостоять жизненным трудностям и невзгодам.'
      },
      'secondScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'СИЛА ВОЛИ',
        'scaleDescription': 'Настойчивость и упорство в преодолении трудностей и достижении цели, целеустремлённость.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'МУДРОСТЬ',
        'scaleDescription': 'Гармоничный союз души и ума: любознательность, здравомыслие, благоразумие. Понимание устройства мира, природы вещей и явлений, самопонимание.'
      },
      'secondScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ДОБРОЖЕЛАТЕЛЬНОСТЬ',
        'scaleDescription': 'Доброта и дружелюбие. Способность к сопереживанию и состраданию, альтруизм. Способность понимать людей и устанавливать с ними гармоничные отношения.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'QUALITY',
        'areaName': 'Личностные качества',
        'areaQuestion': 'Какие качества и способности для вас ценнее? Что бы вы стали развивать в себе в первую очередь?'
      },
      'firstScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'МУДРОСТЬ',
        'scaleDescription': 'Гармоничный союз души и ума: любознательность, здравомыслие, благоразумие. Понимание устройства мира, природы вещей и явлений, самопонимание.'
      },
      'secondScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'КРЕАТИВНОСТЬ',
        'scaleDescription': 'Способность к творческой деятельности - способность придумывать и создавать что-то новое и оригинальное.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    }
  ],
  'state': [
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'ЧУВСТВО БЕЗОПАСНОСТИ',
        'scaleDescription': 'Отсутствие страхов и тревог, умиротворённость. Уверенность в завтрашнем дне, стабильность.'
      },
      'secondScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'ДУШЕВНЫЙ И ФИЗИЧЕСКИЙ КОМФОРТ',
        'scaleDescription': 'Состояние удовлетворённости и комфорта, хорошее самочувствие, переживание удовольствия и его предвкушения.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'ЧУВСТВО БЕЗОПАСНОСТИ',
        'scaleDescription': 'Отсутствие страхов и тревог, умиротворённость. Уверенность в завтрашнем дне, стабильность.'
      },
      'secondScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ЛЮБОВЬ',
        'scaleDescription': 'Любить и чувствовать любовь окружающих. Переживание душевного тепла от контакта с близкими людьми.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'УВЛЕЧЕННОСТЬ',
        'scaleDescription': 'Состояние увлечённости и энтузиазма, жажда деятельности и творчества.'
      },
      'secondScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'УВЕРЕННОСТЬ В СЕБЕ',
        'scaleDescription': 'Переживание уверенности в собственных силах, возможностях и способностях. Осознание собственной силы.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'ЯСНОСТЬ',
        'scaleDescription': 'Ясность восприятия и мышления, осознанность, полнота понимания и осмысления происходящего.'
      },
      'secondScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ЛЮБОВЬ',
        'scaleDescription': 'Любить и чувствовать любовь окружающих. Переживание душевного тепла от контакта с близкими людьми.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'ДУШЕВНЫЙ И ФИЗИЧЕСКИЙ КОМФОРТ',
        'scaleDescription': 'Состояние удовлетворённости и комфорта, хорошее самочувствие, переживание удовольствия и его предвкушения.'
      },
      'secondScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'УВЕРЕННОСТЬ В СЕБЕ',
        'scaleDescription': 'Переживание уверенности в собственных силах, возможностях и способностях. Осознание собственной силы.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'ЯСНОСТЬ',
        'scaleDescription': 'Ясность восприятия и мышления, осознанность, полнота понимания и осмысления происходящего.'
      },
      'secondScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'ЧУВСТВО БЕЗОПАСНОСТИ',
        'scaleDescription': 'Отсутствие страхов и тревог, умиротворённость. Уверенность в завтрашнем дне, стабильность.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'УВЛЕЧЕННОСТЬ',
        'scaleDescription': 'Состояние увлечённости и энтузиазма, жажда деятельности и творчества.'
      },
      'secondScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ЛЮБОВЬ',
        'scaleDescription': 'Любить и чувствовать любовь окружающих. Переживание душевного тепла от контакта с близкими людьми.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ЛЮБОВЬ',
        'scaleDescription': 'Любить и чувствовать любовь окружающих. Переживание душевного тепла от контакта с близкими людьми.'
      },
      'secondScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'ДУШЕВНЫЙ И ФИЗИЧЕСКИЙ КОМФОРТ',
        'scaleDescription': 'Состояние удовлетворённости и комфорта, хорошее самочувствие, переживание удовольствия и его предвкушения.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'ЧУВСТВО БЕЗОПАСНОСТИ',
        'scaleDescription': 'Отсутствие страхов и тревог, умиротворённость. Уверенность в завтрашнем дне, стабильность.'
      },
      'secondScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'УВЛЕЧЕННОСТЬ',
        'scaleDescription': 'Состояние увлечённости и энтузиазма, жажда деятельности и творчества.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.ONE,
        'scaleHeader': 'ЧУВСТВО БЕЗОПАСНОСТИ',
        'scaleDescription': 'Отсутствие страхов и тревог, умиротворённость. Уверенность в завтрашнем дне, стабильность.'
      },
      'secondScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'УВЕРЕННОСТЬ В СЕБЕ',
        'scaleDescription': 'Переживание уверенности в собственных силах, возможностях и способностях. Осознание собственной силы.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'ЯСНОСТЬ',
        'scaleDescription': 'Ясность восприятия и мышления, осознанность, полнота понимания и осмысления происходящего.'
      },
      'secondScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'УВЕРЕННОСТЬ В СЕБЕ',
        'scaleDescription': 'Переживание уверенности в собственных силах, возможностях и способностях. Осознание собственной силы.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'ЯСНОСТЬ',
        'scaleDescription': 'Ясность восприятия и мышления, осознанность, полнота понимания и осмысления происходящего.'
      },
      'secondScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'УВЛЕЧЕННОСТЬ',
        'scaleDescription': 'Состояние увлечённости и энтузиазма, жажда деятельности и творчества.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.SIX,
        'scaleHeader': 'ЯСНОСТЬ',
        'scaleDescription': 'Ясность восприятия и мышления, осознанность, полнота понимания и осмысления происходящего.'
      },
      'secondScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'ДУШЕВНЫЙ И ФИЗИЧЕСКИЙ КОМФОРТ',
        'scaleDescription': 'Состояние удовлетворённости и комфорта, хорошее самочувствие, переживание удовольствия и его предвкушения.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.TWO,
        'scaleHeader': 'ДУШЕВНЫЙ И ФИЗИЧЕСКИЙ КОМФОРТ',
        'scaleDescription': 'Состояние удовлетворённости и комфорта, хорошее самочувствие, переживание удовольствия и его предвкушения.'
      },
      'secondScale': {
        'scale': ScaleEnum.FIVE,
        'scaleHeader': 'УВЛЕЧЕННОСТЬ',
        'scaleDescription': 'Состояние увлечённости и энтузиазма, жажда деятельности и творчества.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    },
    {
      'area': {
        'area': 'STATE',
        'areaName': 'Состояния',
        'areaQuestion': 'Какое состояние для вас более приятно и привлекательно?'
      },
      'firstScale': {
        'scale': ScaleEnum.FOUR,
        'scaleHeader': 'ЛЮБОВЬ',
        'scaleDescription': 'Любить и чувствовать любовь окружающих. Переживание душевного тепла от контакта с близкими людьми.'
      },
      'secondScale': {
        'scale': ScaleEnum.THREE,
        'scaleHeader': 'УВЕРЕННОСТЬ В СЕБЕ',
        'scaleDescription': 'Переживание уверенности в собственных силах, возможностях и способностях. Осознание собственной силы.'
      },
      'chosenScale': {
        'scale': null,
        'scaleHeader': null,
        'scaleDescription': null
      }
    }
  ],
  'passDate': null,
  'passed': null
};

// export const valueProfiles = [
//     {'scale': 'TWO', 'scaleName': 'Комфорт', 'percentResult': 26.666666666666668},
//     {'scale': 'THREE', 'scaleName': 'Достижения', 'percentResult': 6.666666666666667},
//     {'scale': 'FIVE', 'scaleName': 'Творчество', 'percentResult': 13.333333333333334},
//     {'scale': 'FOUR', 'scaleName': 'Гармоничные отношения', 'percentResult': 26.666666666666668},
//     {'scale': 'SIX', 'scaleName': 'Развитие', 'percentResult': 13.333333333333334},
//     {'scale': 'ONE', 'scaleName': 'Безопасность', 'percentResult': 13.333333333333334}
// ];
