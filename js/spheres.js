/***************************************************
 * 2. МАССИВ SPHERES (8 сфер) С ЭМОДЗИ, ЦВЕТАМИ, ВОПРОСАМИ
 ***************************************************/
export const spheres = [
    {
      id: "health",
      emoji: "❤️",
      title: { ru: "Здоровье", en: "Health" },
      color: "#C8E6C9",
      // 5 вопросов: внешний вид, питание, физическая активность, сон, общее самочувствие
      questions: [
        {
          id: "appearance",
          title: { ru: "Внешний вид", en: "Appearance" },
          descriptions: {
            0: { ru: "Полное отсутствие ухода, состояние крайне запущено", en: "No self-care at all, extremely neglected state" },
            1: { ru: "Выраженные проблемы, почти не ухаживаю за собой", en: "Significant issues, minimal self-care" },
            2: { ru: "Очень неухоженный вид, редкая забота о себе", en: "Very neglected, barely any self-care" },
            3: { ru: "Плохой вид, часто игнорирую уход", en: "Poor appearance, often ignore self-care" },
            4: { ru: "Ниже среднего, заметны проблемы", en: "Below average, noticeable issues" },
            5: { ru: "Средний внешний вид, стандартный уход", en: "Average appearance, basic care" },
            6: { ru: "Чуть выше среднего, иногда слежу за собой", en: "Slightly above average, occasionally care for myself" },
            7: { ru: "Хороший вид, регулярно ухаживаю за собой", en: "Good appearance, regular self-care" },
            8: { ru: "Очень аккуратный, почти спортивный вид", en: "Very neat, almost athletic" },
            9: { ru: "Отличный внешний вид, излучаю здоровье", en: "Excellent appearance, radiating health" },
            10: { ru: "Спортивный и энергичный, высокое внимание к себе", en: "Athletic, energetic, high-level self-care" }
          }
        },
        {
          id: "nutrition",
          title: { ru: "Питание", en: "Nutrition" },
          descriptions: {
            0: { ru: "Нет режима, сплошной фастфуд", en: "No regimen at all, constant junk food" },
            1: { ru: "Очень хаотичное питание, отсутствие стабильности", en: "Extremely chaotic diet, no routine" },
            2: { ru: "Очень вредное, бессистемное питание", en: "Very unhealthy, unsystematic eating" },
            3: { ru: "Низкое качество питания, нерегулярное", en: "Poor quality, irregular meals" },
            4: { ru: "Ниже среднего, преимущественно вредная пища", en: "Below average, mostly unhealthy foods" },
            5: { ru: "Средний рацион, стандартный уход", en: "Average diet, basic care" },
            6: { ru: "Чуть выше среднего, стараюсь питаться сбалансировано", en: "Slightly above average, attempting a balanced diet" },
            7: { ru: "Хорошее питание, в целом сбалансированное", en: "Good nutrition, generally balanced" },
            8: { ru: "Очень хорошее питание, преимущественно здоровые продукты", en: "Very good nutrition, mostly healthy food" },
            9: { ru: "Почти идеальное питание, строгий режим", en: "Nearly perfect, strict schedule" },
            10: { ru: "Идеально сбалансированный рацион, всегда соблюдаю режим", en: "Ideally balanced diet, always follow schedule" }
          }
        },
        {
          id: "physical",
          title: { ru: "Физическая активность", en: "Physical Activity" },
          descriptions: {
            0: { ru: "Абсолютно нет движения, полный застой", en: "No movement, completely sedentary" },
            1: { ru: "Практически не двигаюсь, крайне пассивен", en: "Hardly move, extremely sedentary" },
            2: { ru: "Редкие занятия, почти не упражняюсь", en: "Very infrequent exercise, almost none" },
            3: { ru: "Низкая активность, нерегулярные тренировки", en: "Low activity, irregular workouts" },
            4: { ru: "Ниже среднего, спонтанные тренировки", en: "Below average, sporadic exercise" },
            5: { ru: "Средний уровень, время от времени занимаюсь", en: "Moderate activity, occasionally exercise" },
            6: { ru: "Чуть выше среднего, стараюсь быть активным", en: "Slightly above average, trying to be active" },
            7: { ru: "Регулярно тренируюсь, активность на хорошем уровне", en: "Exercise regularly, good activity level" },
            8: { ru: "Очень активен, почти ежедневно занимаюсь", en: "Very active, exercise almost daily" },
            9: { ru: "Отличная активность, спорт занимает важное место", en: "Excellent activity, sports play a key role" },
            10: { ru: "Тренируюсь каждый день, высокий уровень физической формы", en: "Train daily, high level of fitness" }
          }
        },
        {
          id: "sleep",
          title: { ru: "Сон и режим", en: "Sleep & Schedule" },
          descriptions: {
            0: { ru: "Сон почти отсутствует, постоянные сбои", en: "Virtually no proper sleep, constant disruptions" },
            1: { ru: "Частые сбои сна, слишком мало или много", en: "Frequent disruptions, too little or too much sleep" },
            2: { ru: "Очень плохой режим, хроническая усталость", en: "Very poor schedule, chronic fatigue" },
            3: { ru: "Нарушенный режим, часто недосыпаю", en: "Irregular schedule, often sleep-deprived" },
            4: { ru: "Ниже среднего, частые нарушения сна", en: "Below average, frequent sleep issues" },
            5: { ru: "Средний режим, иногда не хватает сна", en: "Average schedule, occasional lack of sleep" },
            6: { ru: "Немного лучше среднего, стараюсь соблюдать режим", en: "Slightly above average, try to maintain schedule" },
            7: { ru: "Хороший режим, сон стабильный", en: "Good schedule, stable sleep" },
            8: { ru: "Очень хороший режим, высыпаюсь регулярно", en: "Very good, consistently get enough sleep" },
            9: { ru: "Отличный режим, почти идеальный сон", en: "Excellent schedule, nearly perfect sleep" },
            10: { ru: "Идеальный режим, всегда высыпаюсь, бодр и активен", en: "Perfect schedule, always well-rested and energetic" }
          }
        },
        {
          id: "wellBeing",
          title: { ru: "Общее самочувствие и настроение", en: "General Well-being" },
          descriptions: {
            0: { ru: "Крайне плохое самочувствие, постоянные проблемы и подавленность", en: "Extremely poor condition, constant issues and depression" },
            1: { ru: "Очень плохое, почти не чувствую улучшения", en: "Very poor, hardly any improvement" },
            2: { ru: "Слабое самочувствие, частые проблемы", en: "Weak well-being, frequent issues" },
            3: { ru: "Ниже среднего, постоянная усталость", en: "Below average, constant fatigue" },
            4: { ru: "Слегка ниже среднего, бывают негативные моменты", en: "Slightly below average, occasional negative moments" },
            5: { ru: "Среднее самочувствие, баланс присутствует", en: "Average condition, generally balanced" },
            6: { ru: "Немного лучше среднего, чувствую улучшение", en: "Slightly above average, feeling improvement" },
            7: { ru: "Хорошее самочувствие, редко бывают проблемы", en: "Good condition, rarely any issues" },
            8: { ru: "Очень хорошее самочувствие, энергичен и позитивен", en: "Very good, energetic and positive" },
            9: { ru: "Отличное состояние, практически без проблем", en: "Excellent condition, almost problem-free" },
            10: { ru: "Идеальное состояние, излучаю здоровье и энергию", en: "Perfect condition, radiating health and energy" }
          }
        }
      ]
    },
    {
      id: "relationships",
      emoji: "🤝",
      title: { ru: "Отношения", en: "Relationships" },
      color: "#F8BBD0",
      // 5 вопросов: общение, друзья, любовь, семья, доверие и поддержка
      questions: [
        {
          id: "communication",
          title: { ru: "Общение", en: "Communication" },
          descriptions: {
            0: { ru: "Полный отказ от общения, избегаю контакты", en: "Completely avoid communication, no contacts" },
            1: { ru: "Общаюсь только по необходимости, испытываю трудности", en: "Communicate only when required, with difficulties" },
            2: { ru: "Очень избегаю контактов, сильная стеснительность", en: "Avoid contacts, very shy" },
            3: { ru: "Общаюсь редко, часто неловко", en: "Rarely communicate, often awkward" },
            4: { ru: "Ниже среднего, есть барьеры в общении", en: "Below average, communication barriers" },
            5: { ru: "Средний уровень, могу поддержать разговор", en: "Average, can maintain a conversation" },
            6: { ru: "Выше среднего, общаюсь достаточно уверенно", en: "Above average, communicate confidently" },
            7: { ru: "Хорошие навыки общения, легко нахожу контакт", en: "Good communication, easily connect" },
            8: { ru: "Очень легко общаюсь, открыт к людям", en: "Very open, easily engage with others" },
            9: { ru: "Отличное общение, почти со всеми нахожу общий язык", en: "Excellent, can talk to almost everyone" },
            10: { ru: "Замечательный коммуникатор, строю контакт с любым собеседником", en: "Outstanding communicator, connect with anyone" }
          }
        },
        {
          id: "friends",
          title: { ru: "Друзья", en: "Friends" },
          descriptions: {
            0: { ru: "Совсем нет друзей, полная изоляция", en: "No friends at all, total isolation" },
            1: { ru: "Практически нет друзей, очень слабые связи", en: "Almost no friends, extremely weak ties" },
            2: { ru: "Очень маленький круг, доверие под сомнением", en: "Very small circle, trust questionable" },
            3: { ru: "Низкое количество друзей, не всегда надёжны", en: "Few friends, not always reliable" },
            4: { ru: "Ниже среднего, друзья есть, но слабая поддержка", en: "Below average, some friends but weak support" },
            5: { ru: "Средний круг, периодически общаемся", en: "Average circle, occasional contact" },
            6: { ru: "Есть надёжные друзья, могу положиться", en: "Reliable friends exist, can count on them" },
            7: { ru: "Хорошие, близкие дружеские связи", en: "Good, close friendships" },
            8: { ru: "Очень крепкие узы, постоянная поддержка", en: "Very strong bonds, constant support" },
            9: { ru: "Отличные друзья, проверенные временем", en: "Excellent friends, time-tested" },
            10: { ru: "Лучшие друзья, абсолютно надёжные и неразлучные", en: "Top-tier friends, entirely dependable and inseparable" }
          }
        },
        {
          id: "love",
          title: { ru: "Вторая половина / Любовь", en: "Significant Other / Love" },
          descriptions: {
            0: { ru: "Полностью исключаю возможность отношений", en: "Completely exclude relationships" },
            1: { ru: "Не хочу отношений, избегаю этой темы", en: "Avoid relationships, no interest" },
            2: { ru: "Сильно не настроен, нет желания отношений", en: "Strongly opposed, no desire for a relationship" },
            3: { ru: "Низкая вовлечённость, недостаток доверия", en: "Low involvement, lack of trust" },
            4: { ru: "Ниже среднего, есть барьеры к близости", en: "Below average, barriers to intimacy" },
            5: { ru: "Средняя открытость, иногда задумываюсь о партнере", en: "Moderate openness, occasionally consider a partner" },
            6: { ru: "Постепенно готов к отношениям, есть желание", en: "Gradually open, desire for a relationship" },
            7: { ru: "В отношениях или активно ищу, с доверием", en: "In a relationship or actively seeking, with trust" },
            8: { ru: "Очень крепкая связь, глубокие чувства", en: "Very close bond, deep feelings" },
            9: { ru: "Отличные, гармоничные отношения", en: "Excellent, harmonious relationship" },
            10: { ru: "Глубокая любовь на всю жизнь, полное взаимопонимание", en: "Lifelong profound love, complete understanding" }
          }
        },
        {
          id: "family",
          title: { ru: "Семья (социальный капитал)", en: "Family (Social Capital)" },
          descriptions: {
            0: { ru: "Полностью не признаю ценность семьи, нет контактов", en: "Do not recognize family value at all, no contact" },
            1: { ru: "Полностью дистанцирован, не рассматриваю семью", en: "Completely distant, do not consider family" },
            2: { ru: "Очень слабая связь, не вижу смысла в семье", en: "Very weak bond, see no point in family" },
            3: { ru: "Низкий приоритет, семья не на первом месте", en: "Low priority, family not a main focus" },
            4: { ru: "Ниже среднего, ограниченное общение", en: "Below average, limited interaction" },
            5: { ru: "Среднее отношение, иногда поддерживаю связь", en: "Average involvement, occasional contact" },
            6: { ru: "Есть семья, но не всё идеально", en: "Have or plan a family, though not perfect" },
            7: { ru: "Хорошее отношение, ценю близких", en: "Positive view, appreciate relatives" },
            8: { ru: "Очень тёплые семейные отношения, взаимная поддержка", en: "Very warm family ties, mutual support" },
            9: { ru: "Отличная, дружная семья, крепкие узы", en: "Excellent, close-knit family, strong bonds" },
            10: { ru: "Счастливая семья, главная опора и радость", en: "A happy family, main source of support and joy" }
          }
        },
        {
          id: "trustSupport",
          title: { ru: "Доверие и поддержка", en: "Trust & Support" },
          descriptions: {
            0: { ru: "Полное отсутствие доверия, нет поддержки", en: "No trust at all, no support" },
            1: { ru: "Крайне низкий уровень доверия, почти нет поддержки", en: "Extremely low trust, hardly any support" },
            2: { ru: "Очень низкий уровень, почти не могу положиться", en: "Very low trust, barely reliable" },
            3: { ru: "Низкий уровень доверия, трудности в опоре", en: "Low trust, difficulties relying on others" },
            4: { ru: "Ниже среднего, поддержка бывает редко", en: "Below average, support is occasional" },
            5: { ru: "Средний уровень, иногда могу положиться", en: "Average, sometimes can rely on others" },
            6: { ru: "Немного выше среднего, в основном могу положиться", en: "Slightly above average, mostly reliable" },
            7: { ru: "Хорошее доверие, часто получаю поддержку", en: "Good trust, frequently supported" },
            8: { ru: "Очень хорошее доверие, поддержка всегда рядом", en: "Very good trust, support always present" },
            9: { ru: "Отличное доверие, почти безупречная поддержка", en: "Excellent trust, almost flawless support" },
            10: { ru: "Идеальное доверие и поддержка, полное взаимопонимание", en: "Perfect trust and support, complete understanding" }
          }
        }
      ]
    },
    {
      id: "environment",
      emoji: "🏠",
      title: { ru: "Окружение", en: "Environment" },
      color: "#B2DFDB",
      // 5 вопросов: родственники, коллеги, соседи, просто люди вокруг, вовлечённость в сообщество
      questions: [
        {
          id: "relatives",
          title: { ru: "Родственники", en: "Relatives" },
          descriptions: {
            0: { ru: "Полный разрыв отношений, нет контактов", en: "Complete breakdown, no contact" },
            1: { ru: "Серьёзные конфликты или полное непонимание", en: "Serious conflicts or total lack of understanding" },
            2: { ru: "Очень сложные отношения, почти нет контакта", en: "Very complicated, almost no contact" },
            3: { ru: "Частые споры, напряжённая атмосфера", en: "Frequent quarrels, tense atmosphere" },
            4: { ru: "Ниже среднего, общаемся мало", en: "Below average, limited interaction" },
            5: { ru: "Средний контакт, иногда созваниваемся", en: "Average contact, occasional communication" },
            6: { ru: "В целом нормальные отношения, поддерживаем контакт", en: "Generally decent, maintain some contact" },
            7: { ru: "Хорошо ладим, помогаем друг другу", en: "Get along well, mutual assistance" },
            8: { ru: "Очень тёплые отношения, близки", en: "Very warm relationships, quite close" },
            9: { ru: "Отличное взаимопонимание, часто вместе", en: "Excellent understanding, often together" },
            10: { ru: "Идеальная гармония и поддержка, крепкая семья", en: "Ideal harmony and support, strong family ties" }
          }
        },
        {
          id: "colleagues",
          title: { ru: "Коллеги", en: "Colleagues" },
          descriptions: {
            0: { ru: "Нет никакой коммуникации или крайне враждебно", en: "No communication or extremely hostile" },
            1: { ru: "Плохой опыт или отсутствие взаимодействия", en: "Poor experience or no interaction" },
            2: { ru: "Очень напряжённая атмосфера, конфликты", en: "Highly tense environment, conflicts" },
            3: { ru: "Низкий уровень доверия, частые недоразумения", en: "Low trust, frequent misunderstandings" },
            4: { ru: "Ниже среднего, сложно сработаться", en: "Below average, difficult to cooperate" },
            5: { ru: "Средне, работаем вместе без особого энтузиазма", en: "Average, work together without enthusiasm" },
            6: { ru: "Нормальные отношения, в целом дружелюбно", en: "Okay relationships, generally friendly" },
            7: { ru: "Хорошая команда, взаимоуважение и поддержка", en: "Good team, mutual respect and support" },
            8: { ru: "Очень дружный коллектив, совместная работа эффективна", en: "Very united team, effective collaboration" },
            9: { ru: "Отличная атмосфера, вдохновляющее взаимодействие", en: "Excellent atmosphere, inspiring teamwork" },
            10: { ru: "Идеальные коллеги, полная гармония и взаимопомощь", en: "Ideal colleagues, complete harmony and assistance" }
          }
        },
        {
          id: "neighbors",
          title: { ru: "Соседи", en: "Neighbors" },
          descriptions: {
            0: { ru: "Полное неприятие, либо их не знаю и знать не хочу", en: "Total disregard, either unknown or avoided" },
            1: { ru: "Не контактируем совсем, не хочу общаться", en: "No contact at all, prefer not to interact" },
            2: { ru: "Очень сложные отношения или конфликты", en: "Very problematic relationships or conflicts" },
            3: { ru: "Низкий уровень, стараюсь избегать", en: "Low trust, tend to avoid" },
            4: { ru: "Ниже среднего, бывают недопонимания", en: "Below average, occasional misunderstandings" },
            5: { ru: "Просто здороваемся, без особого общения", en: "Just greet, minimal interaction" },
            6: { ru: "Иногда можем пообщаться, в целом мирно", en: "Occasionally chat, generally peaceful" },
            7: { ru: "Дружеское соседство, взаимопомощь", en: "Friendly neighbors, mutual help" },
            8: { ru: "Очень хорошие отношения, часто пересекаемся", en: "Very good relationships, frequent encounters" },
            9: { ru: "Отлично ладим, почти друзья", en: "Excellent rapport, almost like friends" },
            10: { ru: "Идеальные соседи, чувствуем себя как одна семья", en: "Ideal neighbors, like one family" }
          }
        },
        {
          id: "otherPeople",
          title: { ru: "Просто люди вокруг", en: "Strangers / Others" },
          descriptions: {
            0: { ru: "Полный ноль контактов, полностью отгораживаюсь", en: "No contacts at all, completely isolated" },
            1: { ru: "Полное безразличие, сознательно игнорирую", en: "Complete indifference, deliberately ignore" },
            2: { ru: "Очень мало взаимодействия, замкнутость", en: "Very little interaction, quite reserved" },
            3: { ru: "Избегаю новых знакомств, редко контактирую", en: "Avoid new contacts, seldom interact" },
            4: { ru: "Ниже среднего, общаюсь только при необходимости", en: "Below average, only when necessary" },
            5: { ru: "Средний интерес, иногда могу завести разговор", en: "Average, occasionally start a conversation" },
            6: { ru: "Выше среднего, стараюсь быть открытым", en: "Above average, try to be open" },
            7: { ru: "Хорошо контактирую с незнакомыми людьми", en: "Good at connecting with strangers" },
            8: { ru: "Очень открыт, легко общаюсь с новыми людьми", en: "Very open, easily engage with new people" },
            9: { ru: "Отлично уживаюсь, получаю удовольствие от общения", en: "Excellent at socializing, enjoy interactions" },
            10: { ru: "Общителен в любом окружении, завожу контакты легко и охотно", en: "Highly sociable, make contacts easily" }
          }
        },
        {
          id: "community",
          title: { ru: "Вовлечённость в сообщество", en: "Community Involvement" },
          descriptions: {
            0: { ru: "Полное отсутствие участия, не общаюсь с местными", en: "No involvement at all, completely isolated from the community" },
            1: { ru: "Очень низкая вовлечённость, почти не участвую", en: "Extremely low involvement, barely participate" },
            2: { ru: "Очень скудное участие, почти нет контактов", en: "Very minimal participation, few contacts" },
            3: { ru: "Низкий уровень участия, редко принимаю участие", en: "Low participation, seldom involved" },
            4: { ru: "Ниже среднего, иногда замечаю местные события", en: "Below average, occasionally notice events" },
            5: { ru: "Средний уровень, иногда участвую в мероприятиях", en: "Average, participate in events sometimes" },
            6: { ru: "Немного выше среднего, часто участвую", en: "Slightly above average, frequently involved" },
            7: { ru: "Хорошая вовлечённость, активно участвую в жизни сообщества", en: "Good involvement, actively participate" },
            8: { ru: "Очень высокая вовлечённость, хорошо знаком с местными", en: "Very high involvement, well-connected locally" },
            9: { ru: "Отличная вовлечённость, участвую почти во всех мероприятиях", en: "Excellent involvement, participate almost everywhere" },
            10: { ru: "Полная интеграция, живу и дышу жизнью сообщества", en: "Fully integrated, completely immersed in community life" }
          }
        }
      ]
    },
    {
      id: "calling",
      emoji: "🎯",
      title: { ru: "Призвание", en: "Calling" },
      color: "#FFE0B2",
      // 5 вопросов: эффективность, квалификация, работа, карьерный рост, статус
      questions: [
        {
          id: "efficiency",
          title: { ru: "Эффективность (КПД)", en: "Efficiency" },
          descriptions: {
            0: { ru: "Ничего не довожу до конца, полная дезорганизация", en: "Never finish tasks, total disorganization" },
            1: { ru: "Постоянно не успеваю, всё срывается", en: "Never manage to complete tasks, everything falls apart" },
            2: { ru: "Очень низкая продуктивность, частые провалы", en: "Very low productivity, frequent failures" },
            3: { ru: "Редко укладываюсь в сроки, делаю меньше половины", en: "Rarely meet deadlines, accomplish less than half" },
            4: { ru: "Ниже среднего, много недоделок", en: "Below average, many unfinished tasks" },
            5: { ru: "Средний уровень, выполняю около половины своих планов", en: "Average level, complete about half of what I plan" },
            6: { ru: "Немного выше среднего, стараюсь улучшать результаты", en: "Slightly above average, trying to improve" },
            7: { ru: "Хорошая продуктивность, успеваю большую часть задач", en: "Good productivity, complete most tasks" },
            8: { ru: "Очень высокий КПД, редко откладываю дела", en: "Very high efficiency, seldom procrastinate" },
            9: { ru: "Отличная продуктивность, практически всё выполняю вовремя", en: "Excellent productivity, almost always on time" },
            10: { ru: "Максимальная эффективность, завершаю все планы", en: "Maximum efficiency, accomplish everything planned" }
          }
        },
        {
          id: "qualification",
          title: { ru: "Квалификация и навыки", en: "Qualification" },
          descriptions: {
            0: { ru: "Полное отсутствие профессиональных навыков, ничему не учился", en: "No professional skills at all, never learned anything" },
            1: { ru: "Практически нет профессиональных навыков", en: "Hardly any professional skills" },
            2: { ru: "Очень низкий уровень, почти нет опыта", en: "Very low level, almost no experience" },
            3: { ru: "Небольшие навыки, не хватает знаний", en: "Limited skills, lacking sufficient knowledge" },
            4: { ru: "Ниже среднего, нужно многое подтянуть", en: "Below average, much improvement needed" },
            5: { ru: "Средний уровень, базовые умения", en: "Average skill set, basic competence" },
            6: { ru: "Немного выше среднего, постоянно учусь", en: "Slightly above average, actively learning" },
            7: { ru: "Хорошая квалификация, востребованные навыки", en: "Good qualification, in-demand skills" },
            8: { ru: "Очень высокий уровень в нескольких областях", en: "Very high competence in multiple areas" },
            9: { ru: "Отличный профи, обладаю глубокими знаниями", en: "Excellent professional, deep expertise" },
            10: { ru: "Эксперт с широким спектром навыков, признанный специалист", en: "Expert with a broad skill range, widely recognized" }
          }
        },
        {
          id: "job",
          title: { ru: "Работа / Занятость", en: "Work / Occupation" },
          descriptions: {
            0: { ru: "Совсем не работаю, отсутствует даже временная занятость", en: "Not working at all, not even temporary jobs" },
            1: { ru: "Полностью безработный, зависим от других", en: "Fully unemployed, dependent on others" },
            2: { ru: "Очень нестабильная ситуация, нет постоянной занятости", en: "Very unstable, no steady employment" },
            3: { ru: "Редкие временные подработки, постоянного места нет", en: "Occasional gigs, no permanent position" },
            4: { ru: "Ниже среднего, работа нестабильна", en: "Below average, job security is low" },
            5: { ru: "Средняя должность, без особых перспектив", en: "Average position, limited prospects" },
            6: { ru: "Немного выше среднего, стабильное место", en: "Slightly above average, stable job" },
            7: { ru: "Хорошая работа или собственный бизнес", en: "Good job or own business" },
            8: { ru: "Очень перспективно, растущая занятость", en: "Very promising, growing employment" },
            9: { ru: "Отличная работа, я доволен текущим положением", en: "Excellent job, satisfied with current status" },
            10: { ru: "Высокооплачиваемая / успешный бизнес, полная уверенность", en: "High-paying or successful business, fully secure" }
          }
        },
        {
          id: "career",
          title: { ru: "Карьерный рост", en: "Career Growth" },
          descriptions: {
            0: { ru: "Нет даже идей о карьере, не рассматриваю рост", en: "No career ideas at all, not considering growth" },
            1: { ru: "Нет перспектив вообще", en: "No prospects at all" },
            2: { ru: "Очень низкий шанс вырасти, застой", en: "Very little chance for advancement, stagnation" },
            3: { ru: "Плохие условия, развитие почти не планируется", en: "Poor conditions, nearly no development" },
            4: { ru: "Ниже среднего, редкие возможности", en: "Below average, few opportunities for growth" },
            5: { ru: "Средние шансы расти, иногда появляются варианты", en: "Average prospects, occasional chances" },
            6: { ru: "Немного выше среднего, есть пути развития", en: "Slightly above average, some growth paths" },
            7: { ru: "Хороший прогресс, реальные перспективы", en: "Good progress, real career prospects" },
            8: { ru: "Очень хорошие возможности, стабильный подъём", en: "Very good opportunities, steady advancement" },
            9: { ru: "Отличная динамика, большие шансы на высокие позиции", en: "Excellent momentum, strong chance for high positions" },
            10: { ru: "Стремительный карьерный рост, топовые назначения", en: "Rapid career growth, top-level roles" }
          }
        },
        {
          id: "status",
          title: { ru: "Социальный / Профессиональный статус", en: "Status" },
          descriptions: {
            0: { ru: "Полное отсутствие статуса, не имею роли или положения", en: "No status whatsoever, no role or position" },
            1: { ru: "Нет работы или статуса", en: "Unemployed, no recognized status" },
            2: { ru: "Очень низкий социальный уровень", en: "Very low social standing" },
            3: { ru: "Небольшое признание, мало уважения", en: "Minimal recognition, little respect" },
            4: { ru: "Ниже среднего, незаметная роль", en: "Below average, fairly unnoticed" },
            5: { ru: "Средний статус, обычный сотрудник", en: "Average status, standard employee" },
            6: { ru: "Немного выше, получаю определённое признание", en: "Slightly above, some recognition" },
            7: { ru: "Хорошо уважают, ценят мои заслуги", en: "Well respected, valued for contributions" },
            8: { ru: "Высокая должность / весомая роль", en: "High position or significant role" },
            9: { ru: "Отличный статус, лидерство или руководство", en: "Excellent status, leadership or managerial role" },
            10: { ru: "Владелец бизнеса / известная фигура, максимальное признание", en: "Business owner or prominent figure, top recognition" }
          }
        }
      ]
    },
    {
      id: "finance",
      emoji: "💰",
      title: { ru: "Финансы", en: "Finance" },
      color: "#FFECB3",
      // 5 вопросов: условия жизни, уровень дохода, источники дохода, финансовая подушка, соотношение доходов и расходов
      questions: [
        {
          id: "livingConditions",
          title: { ru: "Условия жизни", en: "Living Conditions" },
          descriptions: {
            0: { ru: "Крайне неблагополучные условия, нет своего жилья", en: "Extremely poor conditions, no place of my own" },
            1: { ru: "Приходится жить в крайне неудобных условиях", en: "Have to live in extremely inconvenient conditions" },
            2: { ru: "Очень плохие условия, не могу их улучшить", en: "Very poor conditions, hard to improve" },
            3: { ru: "Съёмное или некомфортное жильё, мало ресурсов", en: "Rented or uncomfortable, limited resources" },
            4: { ru: "Ниже среднего, не всё устраивает в быту", en: "Below average, many household inconveniences" },
            5: { ru: "Средний уровень, в целом приемлемо", en: "Average, generally acceptable" },
            6: { ru: "Немного выше среднего, есть определённый комфорт", en: "Slightly above average, some comfort" },
            7: { ru: "Хорошие условия, своё жильё или удобная аренда", en: "Good conditions, own place or comfortable rental" },
            8: { ru: "Очень удобно, высокий уровень комфорта", en: "Very comfortable, high standard" },
            9: { ru: "Отличное жильё, полностью доволен", en: "Excellent home, fully satisfied" },
            10: { ru: "Максимальный комфорт, всё своё и качественное", en: "Maximum comfort, fully owned, high quality" }
          }
        },
        {
          id: "incomeLevel",
          title: { ru: "Уровень дохода", en: "Income Level" },
          descriptions: {
            0: { ru: "Нет дохода совсем, ситуация критическая", en: "No income at all, critical situation" },
            1: { ru: "Практически нет дохода, ситуация критическая", en: "Almost no income, critical situation" },
            2: { ru: "Очень низкий доход, долговая нагрузка", en: "Very low income, burdened by debt" },
            3: { ru: "Низкий доход, хватает только на базовые нужды", en: "Low income, barely covers essentials" },
            4: { ru: "Ниже среднего, часто не хватает средств", en: "Below average, funds often insufficient" },
            5: { ru: "Средний доход, покрывает основные расходы", en: "Average income, covers main expenses" },
            6: { ru: "Немного выше среднего, иногда остаются свободные деньги", en: "Slightly above average, occasional discretionary funds" },
            7: { ru: "Хватает не только на потребности, но и на желания", en: "Enough for needs and some wants" },
            8: { ru: "Очень хороший доход, могу позволить большинство желаний", en: "Very good income, can afford most wants" },
            9: { ru: "Отличный доход, полностью доволен уровнем", en: "Excellent income, completely satisfied" },
            10: { ru: "Очень высокий и стабильный доход, любые возможности открыты", en: "Extremely high, stable income, broad possibilities" }
          }
        },
        {
          id: "incomeSources",
          title: { ru: "Источники дохода", en: "Income Sources" },
          descriptions: {
            0: { ru: "Нет никаких источников, полностью завишу от помощи", en: "No sources whatsoever, fully dependent on help" },
            1: { ru: "Нет своих средств, полностью зависим", en: "No personal funds, fully dependent" },
            2: { ru: "Очень нестабильные и редкие поступления", en: "Very unstable, infrequent income" },
            3: { ru: "Один слабый источник дохода", en: "One weak source" },
            4: { ru: "Ниже среднего, едва держится на плаву", en: "Below average, barely afloat" },
            5: { ru: "Средне, один стабильный источник", en: "Average, one stable source" },
            6: { ru: "Немного выше среднего, иногда подработки", en: "Slightly above average, occasional side jobs" },
            7: { ru: "Хорошо, есть несколько источников", en: "Good, have multiple sources" },
            8: { ru: "Очень надёжно, несколько стабильных источников", en: "Very reliable, several stable sources" },
            9: { ru: "Отлично диверсифицирован, несколько постоянных каналов", en: "Excellent diversification, multiple steady channels" },
            10: { ru: "Множество источников, хорошо налаженная система", en: "Many sources, well-established system" }
          }
        },
        {
          id: "financialCushion",
          title: { ru: "Финансовая подушка", en: "Financial Cushion" },
          descriptions: {
            0: { ru: "Вообще нет накоплений, полная финансовая уязвимость", en: "No savings, completely financially vulnerable" },
            1: { ru: "Нет сбережений, живу день за днём", en: "No savings, living day-to-day" },
            2: { ru: "Очень скромные накопления, долго не протяну", en: "Very minimal savings, won't last long" },
            3: { ru: "Небольшой запас, быстро заканчивается", en: "Small reserve, depletes quickly" },
            4: { ru: "Ниже среднего, есть кое-что, но мало", en: "Below average, some savings but limited" },
            5: { ru: "Средний уровень, могу прожить пару месяцев без дохода", en: "Average cushion, could cover a few months" },
            6: { ru: "Немного выше среднего, чувствую себя достаточно уверенно", en: "Slightly above average, feel reasonably secure" },
            7: { ru: "Хорошая подушка, могу не работать несколько месяцев", en: "Good cushion, can manage for months without work" },
            8: { ru: "Очень солидные накопления/активы", en: "Very solid savings or assets" },
            9: { ru: "Отличная финансовая защита, хватает надолго", en: "Excellent safety net, lasts long" },
            10: { ru: "Крупные запасы и инвестиции, полная независимость", en: "Significant assets and investments, fully independent" }
          }
        },
        {
          id: "incomeExpenses",
          title: { ru: "Соотношение доходов и расходов", en: "Income vs. Expenses" },
          descriptions: {
            0: { ru: "Трачу, но дохода нет, ситуация крайне тяжёлая", en: "Spending with zero income, extremely dire" },
            1: { ru: "Практически отсутствует доход, только траты", en: "Almost no income, only spending" },
            2: { ru: "Расходы значительно выше доходов", en: "Expenses far exceed income" },
            3: { ru: "С трудом выхожу в ноль, часто в минусе", en: "Barely break even, often negative" },
            4: { ru: "Ниже среднего, траты часто превышают доход", en: "Below average, expenses frequently exceed income" },
            5: { ru: "Примерно в нуле, редко остаются средства", en: "Roughly balanced, little left over" },
            6: { ru: "Небольшой плюс, удаётся отложить что-то", en: "Slight surplus, can save a little" },
            7: { ru: "Хороший запас, расходы не сильно бьют по бюджету", en: "Good surplus, expenses don’t impact much" },
            8: { ru: "Очень комфортное соотношение, расходы покрыты полностью", en: "Very comfortable, expenses fully covered" },
            9: { ru: "Отличный плюс, доход стабильно перекрывает расходы", en: "Excellent surplus, income reliably covers expenses" },
            10: { ru: "Доход многократно превосходит расходы, финансовая свобода", en: "Income far exceeds expenses, total financial freedom" }
          }
        }
      ]
    },
    {
      id: "selfImprovement",
      emoji: "📚",
      title: { ru: "Саморазвитие", en: "Self-Improvement" },
      color: "#BBDEFB",
      // 5 вопросов: образование, внутренняя работа, привычки, личностный рост, эрудиция
      questions: [
        {
          id: "education",
          title: { ru: "Образование", en: "Education" },
          descriptions: {
            0: { ru: "Никакого образования сверх школьного, даже не окончил", en: "No education beyond or even finishing school" },
            1: { ru: "Минимальный уровень, почти не учился дальше школы", en: "Minimal level, barely pursued further education" },
            2: { ru: "Очень мало знаний, не развиваюсь", en: "Very little knowledge, not pursuing development" },
            3: { ru: "Редко учусь новому, ограниченные знания", en: "Rarely learn new things, limited knowledge" },
            4: { ru: "Ниже среднего, формально что-то имею, но мало практики", en: "Below average, some formal background but little practice" },
            5: { ru: "Среднее образование, базовые навыки", en: "Average education, basic skills" },
            6: { ru: "Немного выше среднего, продолжаю обучаться", en: "Slightly above average, continue to learn" },
            7: { ru: "Хорошая подготовка, развиваю навыки", en: "Good background, actively improving skills" },
            8: { ru: "Очень серьёзно отношусь к обучению, регулярно повышаю квалификацию", en: "Very committed to learning, regularly upskilling" },
            9: { ru: "Отличное образование, постоянно расширяю знания", en: "Excellent education, continuously broadening knowledge" },
            10: { ru: "Высокий уровень, учусь постоянно, не останавливаюсь", en: "Highly educated, never stop learning" }
          }
        },
        {
          id: "innerWork",
          title: { ru: "Внутренняя работа / Осознанность", en: "Inner Work" },
          descriptions: {
            0: { ru: "Полное отсутствие самоанализа, никогда не задумываюсь о внутреннем состоянии", en: "No introspection at all, never think about inner state" },
            1: { ru: "Не занимаюсь самоанализом, не вижу в этом смысла", en: "Don't practice self-analysis, see no point" },
            2: { ru: "Очень низкий уровень осознанности, избегаю самоанализа", en: "Very low self-awareness, avoid introspection" },
            3: { ru: "Редко работаю над собой, мало внимания внутренним проблемам", en: "Rarely work on self, little attention to inner issues" },
            4: { ru: "Ниже среднего, осознанность невысока, но иногда пытаюсь", en: "Below average, limited awareness, occasional attempts" },
            5: { ru: "Средне, иногда занимаюсь самоанализом", en: "Average, sometimes reflect" },
            6: { ru: "Выше среднего, начинаю уделять этому больше времени", en: "Above average, starting to dedicate more time" },
            7: { ru: "Хороший уровень саморефлексии, вижу результаты", en: "Good self-reflection, seeing some results" },
            8: { ru: "Очень глубоко прорабатываю установки и проблемы", en: "Very deeply addressing issues" },
            9: { ru: "Отличная осознанность, регулярно анализирую и корректирую себя", en: "Excellent awareness, regularly reflect and adjust" },
            10: { ru: "Постоянное развитие, непрерывная работа над собой", en: "Constant growth, continuous self-improvement" }
          }
        },
        {
          id: "habits",
          title: { ru: "Привычки", en: "Habits" },
          descriptions: {
            0: { ru: "Все привычки крайне вредные, нет ни одной полезной", en: "All habits are extremely harmful, not a single good one" },
            1: { ru: "Множество нездоровых привычек, почти ничего полезного", en: "Numerous unhealthy habits, hardly anything beneficial" },
            2: { ru: "Очень много вредных привычек, почти не внедряю полезное", en: "Very many harmful habits, rarely adopt good ones" },
            3: { ru: "Много негативных привычек, но есть попытки улучшить", en: "Many negative habits, occasional attempts to improve" },
            4: { ru: "Ниже среднего, редко добавляю что-то полезное", en: "Below average, infrequently adopt positive changes" },
            5: { ru: "Средний набор привычек, есть и хорошие, и плохие", en: "Average mix of habits, both good and bad" },
            6: { ru: "Выше среднего, пытаюсь регулярно менять себя к лучшему", en: "Above average, actively trying to improve" },
            7: { ru: "Много полезных привычек, минимум вредных", en: "Many good habits, minimal harmful ones" },
            8: { ru: "Очень качественный набор привычек, почти нет негативных", en: "Very good set of habits, almost no negatives" },
            9: { ru: "Отличные привычки, постоянно пробую новые полезные практики", en: "Excellent habits, always open to new beneficial routines" },
            10: { ru: "Исключительно здоровые привычки, полностью исключил вредные", en: "Exclusively healthy habits, completely eliminated negatives" }
          }
        },
        {
          id: "personalGrowth",
          title: { ru: "Личностный рост", en: "Personal Growth" },
          descriptions: {
            0: { ru: "Полное отсутствие интереса к развитию, даже не знаю, что это", en: "No interest in development, not even aware of it" },
            1: { ru: "Не интересуюсь развитием, не знаю, что это такое", en: "Not interested in growth, unaware of it" },
            2: { ru: "Очень низкий уровень, не считаю нужным расти", en: "Very low, see no need for growth" },
            3: { ru: "Редко задумываюсь, мало делаю для роста", en: "Rarely reflect, do little for growth" },
            4: { ru: "Ниже среднего, мало уделяю времени развитию", en: "Below average, invest little time in growth" },
            5: { ru: "Средний уровень, иногда посещаю тренинги или читаю", en: "Average, occasionally attend trainings or read" },
            6: { ru: "Немного выше среднего, постепенно работаю над собой", en: "Slightly above average, gradually working on self-improvement" },
            7: { ru: "Хороший прогресс, регулярно занимаюсь развитием", en: "Good progress, regularly engage in growth" },
            8: { ru: "Очень активное развитие, часто учусь и внедряю новое", en: "Very active growth, frequently learn and apply new skills" },
            9: { ru: "Отличные результаты, заметна существенная трансформация", en: "Excellent results, significant transformation" },
            10: { ru: "Постоянное совершенствование, непрерывная работа над собой", en: "Constant self-improvement, continuous effort to evolve" }
          }
        },
        {
          id: "erudition",
          title: { ru: "Эрудиция", en: "Erudition" },
          descriptions: {
            0: { ru: "Абсолютно не интересуюсь знаниями, избегаю любой познавательной деятельности", en: "No interest in knowledge, avoid educational content" },
            1: { ru: "Чрезвычайно ограниченное мировоззрение, не вижу ценности в знаниях", en: "Extremely narrow outlook, see no value in learning" },
            2: { ru: "Очень мало знаний, не стремлюсь узнавать новое", en: "Very little knowledge, no drive to learn" },
            3: { ru: "Редко читаю, не углубляюсь в разные темы", en: "Rarely read, don't delve into topics" },
            4: { ru: "Ниже среднего, интерес к информации слабый", en: "Below average, limited interest in information" },
            5: { ru: "Средний уровень, иногда читаю или смотрю познавательные вещи", en: "Average, occasionally read or watch educational content" },
            6: { ru: "Выше среднего, люблю узнавать что-то новое", en: "Above average, enjoy learning new things" },
            7: { ru: "Достаточно эрудирован, регулярно пополняю багаж знаний", en: "Quite erudite, regularly expand knowledge" },
            8: { ru: "Широкий кругозор, хорошо разбираюсь в нескольких областях", en: "Broad worldview, competent in multiple areas" },
            9: { ru: "Отличная эрудиция, владею несколькими языками", en: "Excellent erudition, proficient in multiple languages" },
            10: { ru: "Постоянно учусь, крайне широкий круг знаний, регулярно практикую языки", en: "Continuous learning, extremely broad knowledge, frequently practice languages" }
          }
        }
      ]
    },
    {
      id: "lifeBrightness",
      emoji: "🎉",
      title: { ru: "Яркость жизни", en: "Life Brightness" },
      color: "#FFF59D",
      // 5 вопросов: развлечения, отдых, хобби, путешествия, новые впечатления
      questions: [
        {
          id: "entertainment",
          title: { ru: "Развлечения", en: "Entertainment" },
          descriptions: {
            0: { ru: "Полное отсутствие досуга, даже не рассматриваю развлечения", en: "No leisure at all, don't consider entertainment" },
            1: { ru: "Нет времени или возможностей для отдыха", en: "No time or resources for leisure" },
            2: { ru: "Очень редко занимаюсь развлечениями", en: "Very rarely engage in leisure" },
            3: { ru: "Редко позволяю себе отдохнуть, ограниченные варианты", en: "Seldom take breaks, limited options" },
            4: { ru: "Ниже среднего, бывают короткие моменты отдыха", en: "Below average, occasional brief breaks" },
            5: { ru: "Средний уровень, периодически развлекаюсь", en: "Average, occasionally entertain myself" },
            6: { ru: "Выше среднего, стараюсь находить время на отдых", en: "Slightly above average, try to make time for leisure" },
            7: { ru: "Хороший уровень развлечений, регулярно отдыхаю", en: "Good leisure, regularly take breaks" },
            8: { ru: "Очень активный досуг, широкий выбор занятий", en: "Very active leisure, wide range of activities" },
            9: { ru: "Отлично провожу время, много вариантов весёлого отдыха", en: "Excellent, many fun options" },
            10: { ru: "Максимальная насыщенность развлечениями, всегда есть идеи для отдыха", en: "Highly enriched with fun, always have new ideas for leisure" }
          }
        },
        {
          id: "rest",
          title: { ru: "Отдых (восстановление)", en: "Rest" },
          descriptions: {
            0: { ru: "Не отдыхаю вообще, всё время занят или нет сил", en: "No rest whatsoever, always busy or exhausted" },
            1: { ru: "Полностью пассивный отдых, лежу на диване", en: "Completely passive rest, lying on the couch" },
            2: { ru: "Очень мало отдыха, практически не восстанавливаюсь", en: "Very little rest, barely recover" },
            3: { ru: "Редко отдыхаю полноценно, нехватка восстановительных пауз", en: "Rarely get full rest, lack recovery breaks" },
            4: { ru: "Ниже среднего, отдых часто поверхностный", en: "Below average, rest is often superficial" },
            5: { ru: "Средний отдых, иногда позволяю себе расслабиться", en: "Average rest, sometimes relax" },
            6: { ru: "Выше среднего, стараюсь уделять внимание качественному отдыху", en: "Above average, try to prioritize quality rest" },
            7: { ru: "Хорошо восстанавливаюсь, регулярно чередую нагрузку и отдых", en: "Good recovery, regularly balance work and rest" },
            8: { ru: "Очень полноценный отдых, много вариантов для расслабления", en: "Very fulfilling rest, many ways to relax" },
            9: { ru: "Отлично отдыхаю, активно переключаюсь на разные виды релакса", en: "Excellent rest, actively switch between relaxation forms" },
            10: { ru: "Всегда нахожу время на качественный отдых, полностью восстанавливаюсь", en: "Always find time for quality rest, fully recover" }
          }
        },
        {
          id: "hobby",
          title: { ru: "Хобби", en: "Hobbies" },
          descriptions: {
            0: { ru: "Нет увлечений вообще, ничто не интересно", en: "No hobbies at all, nothing interests me" },
            1: { ru: "Нет хобби, ничем не увлекаюсь", en: "No hobbies, not interested" },
            2: { ru: "Очень мало увлечений, редко что-то делаю для души", en: "Very few hobbies, rarely do anything for enjoyment" },
            3: { ru: "Редко занимаюсь хобби, не нашёл постоянное", en: "Rarely engage in a hobby, haven't found one" },
            4: { ru: "Ниже среднего, однообразное занятие, мало вдохновляет", en: "Below average, monotonous activity, not inspiring" },
            5: { ru: "Средний уровень, есть одно хобби, периодически занимаюсь", en: "Average, have one hobby, do it occasionally" },
            6: { ru: "Выше среднего, несколько хобби приносят радость", en: "Slightly above average, a couple of hobbies bring joy" },
            7: { ru: "Хорошие увлечения, регулярно занимаюсь, мне это нравится", en: "Good hobbies, regularly practice and enjoy them" },
            8: { ru: "Очень увлечён, имею несколько разнообразных интересов", en: "Very enthusiastic, have multiple interests" },
            9: { ru: "Отлично, хобби заметно обогащают жизнь", en: "Excellent, hobbies enrich life" },
            10: { ru: "Большое количество интересных занятий, приносят максимум пользы и радости", en: "Numerous enjoyable pursuits, maximize benefit and pleasure" }
          }
        },
        {
          id: "travel",
          title: { ru: "Путешествия", en: "Travel" },
          descriptions: {
            0: { ru: "Никуда не выезжаю, не интересуюсь поездками", en: "Never travel, not interested" },
            1: { ru: "Никуда не выезжаю, всё время дома", en: "Never travel, always at home" },
            2: { ru: "Очень редко выезжаю, возможно раз в несколько лет", en: "Very infrequent trips, maybe once in several years" },
            3: { ru: "Редко позволяю себе поездки, мало возможностей", en: "Seldom travel, limited options" },
            4: { ru: "Ниже среднего, иногда выезжаю, но нерегулярно", en: "Below average, occasional trips" },
            5: { ru: "Средний уровень, 1-2 поездки в год", en: "Average, 1-2 trips a year" },
            6: { ru: "Выше среднего, стараюсь путешествовать чаще", en: "Slightly above average, try to travel more" },
            7: { ru: "Хорошо, несколько раз в год выбираюсь на отдых", en: "Good, several trips a year" },
            8: { ru: "Очень активно путешествую, часто меняю локации", en: "Very active traveler, frequently change locations" },
            9: { ru: "Отлично, посещаю много новых мест за год", en: "Excellent, visit many new places annually" },
            10: { ru: "Путешествую несколько месяцев в году, исследую новые регионы", en: "Travel for months each year, exploring various regions" }
          }
        },
        {
          id: "impressions",
          title: { ru: "Новые впечатления", en: "Impressions" },
          descriptions: {
            0: { ru: "Нет ярких моментов, жизнь крайне однообразна", en: "No vivid moments, extremely monotonous" },
            1: { ru: "Жизнь кажется серой, мало радостных моментов", en: "Life seems dull, few positive moments" },
            2: { ru: "Очень мало увлекательного, редко испытываю яркие эмоции", en: "Very little excitement, rarely vivid emotions" },
            3: { ru: "Редко испытываю что-то новое, жизнь однообразна", en: "Rarely experience new things, monotonous" },
            4: { ru: "Ниже среднего, иногда нахожу вдохновение", en: "Below average, occasionally inspired" },
            5: { ru: "Средний уровень, иногда что-то интересное происходит", en: "Average, occasionally something interesting happens" },
            6: { ru: "Выше среднего, стараюсь находить новые впечатления", en: "Above average, try to seek new impressions" },
            7: { ru: "Хорошо, часто радуюсь открытиям", en: "Good, often enjoy new discoveries" },
            8: { ru: "Очень насыщенная жизнь, множество ярких событий", en: "Very eventful, plenty of vivid events" },
            9: { ru: "Отлично, вокруг много красок и позитива", en: "Excellent, lots of color and positivity" },
            10: { ru: "Всегда нахожу яркие моменты, жизнь полна незабываемых впечатлений", en: "Always find vivid moments, life is full of unforgettable experiences" }
          }
        }
      ]
    },
    {
      id: "spirituality",
      emoji: "🌀",
      title: { ru: "Духовность", en: "Spirituality" },
      color: "#E1BEE7",
      // 5 вопросов: картина мира, творчество, восприятие искусства, духовные практики, смысл жизни
      questions: [
        {
          id: "worldview",
          title: { ru: "Картина мира", en: "Worldview" },
          descriptions: {
            0: { ru: "Категорическое отрицание всего, кроме материального", en: "Categorically deny anything beyond the material" },
            1: { ru: "Считаю только материальный мир", en: "Only acknowledge the material world" },
            2: { ru: "Очень скептично отношусь к духовным идеям", en: "Highly skeptical of spiritual ideas" },
            3: { ru: "Низкий интерес к нематериальному", en: "Little interest in the non-material" },
            4: { ru: "Ниже среднего, не углубляюсь в философию", en: "Below average, do not delve into philosophy" },
            5: { ru: "Средний уровень, иногда задумываюсь о духовном", en: "Average, occasionally contemplate spirituality" },
            6: { ru: "Выше среднего, открыт для духовного опыта", en: "Above average, open to spiritual experiences" },
            7: { ru: "Хорошее понимание, принимаю разные взгляды", en: "Good understanding, accept various views" },
            8: { ru: "Очень гибкая картина мира, исследую различные теории", en: "Very flexible worldview, explore various theories" },
            9: { ru: "Отличное понимание, гармонично сочетаю духовное и рациональное", en: "Excellent understanding, harmonize spirituality and rationality" },
            10: { ru: "Углублённо изучаю духовное, чрезвычайно широкая картина мира", en: "Deeply study spirituality, extremely broad worldview" }
          }
        },
        {
          id: "creativity",
          title: { ru: "Творчество", en: "Creativity" },
          descriptions: {
            0: { ru: "Никогда не творю, считаю это пустой тратой времени", en: "Never engage in creativity, a waste of time" },
            1: { ru: "Не вижу пользы в творчестве", en: "See no value in creativity" },
            2: { ru: "Очень редко творю, не считаю нужным", en: "Very rarely creative, don't see the need" },
            3: { ru: "Редко проявляю творчество, недостаточно идей", en: "Rarely creative, lack ideas" },
            4: { ru: "Ниже среднего, редко вдохновляюсь", en: "Below average, seldom inspired" },
            5: { ru: "Средний уровень, иногда создаю что-то новое", en: "Average, occasionally produce something new" },
            6: { ru: "Выше среднего, периодически занимаюсь творчеством", en: "Above average, sometimes creative" },
            7: { ru: "Хорошее творческое самовыражение, часто создаю новое", en: "Good creative expression, frequently produce new works" },
            8: { ru: "Очень много идей, люблю реализовывать проекты", en: "Very creative, love implementing projects" },
            9: { ru: "Отличное творческое самовыражение, регулярно создаю что-то новое", en: "Excellent creative expression, consistently produce new works" },
            10: { ru: "Творчество – неотъемлемая часть моей жизни, источник энергии", en: "Creativity is integral to my life, a core source of energy" }
          }
        },
        {
          id: "art",
          title: { ru: "Восприятие искусства", en: "Art" },
          descriptions: {
            0: { ru: "Ни малейшего интереса к искусству, считаю его бессмысленным", en: "No interest in art, deem it meaningless" },
            1: { ru: "Совсем не интересуюсь искусством", en: "Not interested in art" },
            2: { ru: "Очень редко интересуюсь, не нахожу в этом ценности", en: "Very rarely interested, find little value" },
            3: { ru: "Низкая вовлечённость, редко что-то впечатляет", en: "Low involvement, seldom impressed" },
            4: { ru: "Ниже среднего, не слишком ценю искусство", en: "Below average, don't highly value art" },
            5: { ru: "Средний интерес, иногда получаю эстетическое удовольствие", en: "Average interest, occasionally enjoy art" },
            6: { ru: "Выше среднего, иногда вдохновляюсь искусством", en: "Above average, sometimes inspired by art" },
            7: { ru: "Хорошо ценю разные направления, получаю эстетическое удовольствие", en: "Good appreciation, gain aesthetic pleasure" },
            8: { ru: "Очень люблю искусство, часто посещаю выставки и концерты", en: "Very fond of art, frequently attend exhibits/concerts" },
            9: { ru: "Отличное понимание, искусство приносит радость и идеи", en: "Excellent understanding, art brings joy and ideas" },
            10: { ru: "Глубоко погружён в мир искусства, вдохновляюсь во многих сферах", en: "Deeply immersed in art, inspired in many ways" }
          }
        },
        {
          id: "spiritualPractice",
          title: { ru: "Духовные практики (йога, медитация и т.п.)", en: "Spiritual Practices (Yoga, Meditation, etc.)" },
          descriptions: {
            0: { ru: "Полностью не признаю, считаю это бесполезной тратой времени", en: "Do not accept it at all, deem it a waste of time" },
            1: { ru: "Не занимаюсь духовными практиками, не верю в их пользу", en: "Don't practice, don't believe in their benefits" },
            2: { ru: "Очень редко, считаю их пустой тратой времени", en: "Very rarely, consider them a waste of time" },
            3: { ru: "Редкие попытки, пока не вижу эффекта", en: "Occasional attempts, no noticeable effect yet" },
            4: { ru: "Ниже среднего, не хватает времени или веры", en: "Below average, lack time or faith" },
            5: { ru: "Средне, иногда медитирую/пробую йогу", en: "Average, sometimes practice meditation/yoga" },
            6: { ru: "Выше среднего, стараюсь регулярно заниматься", en: "Above average, try to practice regularly" },
            7: { ru: "Хорошо практикую, чувствую положительные изменения", en: "Practice well, notice positive changes" },
            8: { ru: "Очень серьёзно занимаюсь, вижу явные результаты", en: "Very dedicated, clear results" },
            9: { ru: "Отличная регулярная практика, глубокое понимание", en: "Excellent regular practice, deep understanding" },
            10: { ru: "Практикую постоянно и углублённо, духовное развитие в приоритете", en: "Practice constantly and deeply, spiritual growth is a priority" }
          }
        },
        {
          id: "meaning",
          title: { ru: "Смысл жизни", en: "Life Purpose" },
          descriptions: {
            0: { ru: "Нет понимания смысла жизни, чувствую пустоту", en: "No sense of purpose, feeling empty" },
            1: { ru: "Очень слабое осознание, полное сомнение", en: "Very weak awareness, full of doubts" },
            2: { ru: "Низкое понимание, трудно найти цель", en: "Low sense, struggling to find direction" },
            3: { ru: "Ниже среднего, редко задумываюсь о смысле", en: "Below average, seldom reflect on purpose" },
            4: { ru: "Иногда думаю о смысле, но цель неясна", en: "Occasionally contemplate purpose, but uncertain" },
            5: { ru: "Средний уровень, иногда нахожу направление", en: "Average, sometimes find direction" },
            6: { ru: "Немного выше среднего, ощущаю отголоски цели", en: "Slightly above average, somewhat sense purpose" },
            7: { ru: "Хорошее понимание, часто нахожу мотивацию", en: "Good understanding, often feel motivated" },
            8: { ru: "Очень хорошее, у меня есть ясная цель и мотивация", en: "Very good, have clear goals and motivation" },
            9: { ru: "Отличное понимание, жизнь наполнена смыслом", en: "Excellent understanding, life is full of purpose" },
            10: { ru: "Идеальное чувство, я полностью осознаю свой путь и цель", en: "Perfect, completely aware of my path and purpose" }
          }
        }
      ]
    }
  ];