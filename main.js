/***************************************************
 * 1. ДАННЫЕ (8 сфер), ТЁМНАЯ ТЕМА И АНГЛИЙСКИЙ ЯЗЫК
 ***************************************************/
let currentLanguage = "en"; // по умолчанию английский
let darkMode = true;        // по умолчанию тёмная тема

// Пастельные цвета для секторов
const pastelColors = [
  "#FFB3BA", // розоватый
  "#FFDFBA", // оранжево-персиковый
  "#FFFFBA", // бледно-жёлтый
  "#BAFFC9", // бледно-зелёный
  "#BAE1FF", // голубой
  "#D7BAFF", // сиреневый
  "#FFBAE8", // розовый
  "#BAFFFA", // бирюзовый
];

// Пример сфер с эмодзи
const spheres = [
    {
      id: "health",
      title: { ru: "Здоровье", en: "Health" },
      color: "#AEDFF7", // пастельный голубой
      questions: [
        {
          id: "appearance",
          title: { ru: "Внешний вид", en: "Appearance" },
          descriptions: {
            1: {
              ru: "Жирный и болячий",
              en: "Overweight and obviously unhealthy",
            },
            2: {
              ru: "Очень запущенный вид",
              en: "Very neglected appearance",
            },
            3: {
              ru: "Плохой внешний вид, не слежу",
              en: "Poor appearance, not taking care",
            },
            4: {
              ru: "Ниже среднего, видны проблемы",
              en: "Below average, visible issues",
            },
            5: {
              ru: "Средний внешний вид",
              en: "Average appearance",
            },
            6: {
              ru: "Чуть лучше среднего",
              en: "Slightly better than average",
            },
            7: {
              ru: "Хороший внешний вид, заметна забота",
              en: "Good appearance, noticeable care",
            },
            8: {
              ru: "Очень хороший, почти спортивный",
              en: "Very good, almost athletic",
            },
            9: {
              ru: "Почти идеальный, излучаю здоровье",
              en: "Nearly perfect, radiating health",
            },
            10: {
              ru: "Спортивный, излучаю здоровье",
              en: "Athletic, radiating health",
            },
          },
        },
        {
          id: "nutrition",
          title: { ru: "Питание", en: "Nutrition" },
          descriptions: {
            1: {
              ru: "Жру всё подряд (макшлак), когда придётся",
              en: "Eat junk (fast food) whenever",
            },
            2: {
              ru: "Очень плохое питание, хаотичное",
              en: "Very poor, chaotic nutrition",
            },
            3: {
              ru: "Плохое питание, нерегулярное",
              en: "Poor, irregular eating habits",
            },
            4: {
              ru: "Ниже среднего, вредное чаще полезного",
              en: "Below average, more junk than healthy",
            },
            5: {
              ru: "Среднее питание, иногда слежу",
              en: "Average diet, sometimes watch it",
            },
            6: {
              ru: "Чуть лучше среднего, стараюсь",
              en: "Slightly better than average, making an effort",
            },
            7: {
              ru: "Хорошее питание, более-менее режим",
              en: "Good nutrition, somewhat scheduled",
            },
            8: {
              ru: "Очень хорошее, в основном здоровая пища",
              en: "Very good, mostly healthy meals",
            },
            9: {
              ru: "Отличное питание, чёткий режим",
              en: "Excellent nutrition, strict schedule",
            },
            10: {
              ru: "Здоровое питание по графику",
              en: "Perfect healthy eating on schedule",
            },
          },
        },
        {
          id: "physical",
          title: { ru: "Физическая культура", en: "Physical Activity" },
          descriptions: {
            1: {
              ru: "Перемещаюсь между диваном и креслом",
              en: "Barely move between couch and chair",
            },
            2: {
              ru: "Почти не занимаюсь спортом",
              en: "Almost no exercise at all",
            },
            3: {
              ru: "Редко, нерегулярные попытки",
              en: "Rare, irregular attempts",
            },
            4: {
              ru: "Ниже среднего, спорт эпизодически",
              en: "Below average, occasional exercise",
            },
            5: {
              ru: "Средний уровень активности",
              en: "Moderate activity",
            },
            6: {
              ru: "Чуть выше среднего, стараюсь двигаться",
              en: "Slightly above average, trying to move",
            },
            7: {
              ru: "Хорошая активность, занимаюсь регулярно",
              en: "Good activity, exercise regularly",
            },
            8: {
              ru: "Очень хорошая активность, почти каждый день",
              en: "Very good, almost daily exercise",
            },
            9: {
              ru: "Отличная активность, спорт важен",
              en: "Excellent activity, sport is key",
            },
            10: {
              ru: "Каждый день занимаюсь спортом",
              en: "Daily exercise",
            },
          },
        },
        {
          id: "sleep",
          title: { ru: "Сон и режим", en: "Sleep & Schedule" },
          descriptions: {
            1: {
              ru: "Постоянно недосыпаю или пересыпаю",
              en: "Always sleep-deprived or oversleeping",
            },
            2: {
              ru: "Очень плохой режим, хроническая усталость",
              en: "Very poor schedule, chronic fatigue",
            },
            3: {
              ru: "Плохой сон, часто сбивается график",
              en: "Poor sleep, schedule often off",
            },
            4: {
              ru: "Ниже среднего, время от времени срываюсь",
              en: "Below average, occasional disruptions",
            },
            5: {
              ru: "Средний режим, более-менее высыпаюсь",
              en: "Average schedule, somewhat rested",
            },
            6: {
              ru: "Немного лучше, слежу за сном",
              en: "Slightly better, track my sleep",
            },
            7: {
              ru: "Хорошо высыпаюсь, режим налажен",
              en: "Good rest, stable schedule",
            },
            8: {
              ru: "Очень хорошее соблюдение режима",
              en: "Very good schedule, consistent",
            },
            9: {
              ru: "Почти идеальный сон и режим",
              en: "Near-perfect sleep and schedule",
            },
            10: {
              ru: "Высыпаюсь по графику, бодр и весел",
              en: "Perfect schedule, always rested",
            },
          },
        },
        {
          id: "healthFeel",
          title: { ru: "Самочувствие и здоровье", en: "Well-Being" },
          descriptions: {
            1: {
              ru: "Хронически болею",
              en: "Chronically ill",
            },
            2: {
              ru: "Очень слабое здоровье",
              en: "Very poor health",
            },
            3: {
              ru: "Часто болею, слабое самочувствие",
              en: "Often sick, feeling weak",
            },
            4: {
              ru: "Ниже среднего, проблемы возникают регулярно",
              en: "Below average, frequent issues",
            },
            5: {
              ru: "Среднее здоровье, иногда простужаюсь",
              en: "Average health, occasional illness",
            },
            6: {
              ru: "Чуть выше среднего, реже болею",
              en: "Slightly above average, less illness",
            },
            7: {
              ru: "Хорошее самочувствие, редко болею",
              en: "Good well-being, rarely sick",
            },
            8: {
              ru: "Очень хорошее здоровье",
              en: "Very good health",
            },
            9: {
              ru: "Почти не болею, всегда бодр",
              en: "Almost never sick, always energetic",
            },
            10: {
              ru: "Не болею вообще, не знаю, что это",
              en: "Never sick at all",
            },
          },
        },
        {
          id: "mood",
          title: { ru: "Настроение", en: "Mood" },
          descriptions: {
            1: {
              ru: "Хроническая депрессия",
              en: "Chronic depression",
            },
            2: {
              ru: "Очень подавленное состояние",
              en: "Very depressed state",
            },
            3: {
              ru: "Часто в плохом настроении",
              en: "Often in a bad mood",
            },
            4: {
              ru: "Ниже среднего, регулярная апатия",
              en: "Below average, frequent apathy",
            },
            5: {
              ru: "Среднее настроение, бывают взлёты/падения",
              en: "Average mood, ups and downs",
            },
            6: {
              ru: "Немного лучше среднего, стараюсь держаться",
              en: "Slightly better than average, try to stay positive",
            },
            7: {
              ru: "Хорошее настроение большую часть времени",
              en: "Good mood most of the time",
            },
            8: {
              ru: "Очень позитивный настрой",
              en: "Very positive attitude",
            },
            9: {
              ru: "Отличное настроение, редко расстраиваюсь",
              en: "Excellent mood, rarely upset",
            },
            10: {
              ru: "Постоянный позитив, будто «вштырился»",
              en: "Constantly positive, almost euphoric",
            },
          },
        },
        {
          id: "bodyEnergy",
          title: { ru: "Телесная активность", en: "Body Energy" },
          descriptions: {
            1: {
              ru: "Едва ползаю",
              en: "Barely crawl",
            },
            2: {
              ru: "Очень мало сил, почти не двигаюсь",
              en: "Very low energy, hardly move",
            },
            3: {
              ru: "Низкая активность, часто упадок сил",
              en: "Low activity, frequent fatigue",
            },
            4: {
              ru: "Ниже среднего, не хватает энергии",
              en: "Below average, lacking energy",
            },
            5: {
              ru: "Средняя активность, могу делать дела",
              en: "Average energy, can handle tasks",
            },
            6: {
              ru: "Чуть выше среднего, хватает сил",
              en: "Slightly above average, enough energy",
            },
            7: {
              ru: "Хорошая активность, многое успеваю",
              en: "Good activity, get a lot done",
            },
            8: {
              ru: "Очень хорошая активность, почти реактор",
              en: "Very active, almost a reactor",
            },
            9: {
              ru: "Отличная активность, энергии много",
              en: "Excellent, abundant energy",
            },
            10: {
              ru: "Гиперактивный, реактор в заднице",
              en: "Hyperactive, unstoppable energy",
            },
          },
        },
      ],
    },
    {
      id: "relationships",
      title: { ru: "Отношения", en: "Relationships" },
      color: "#F7D6AE", // пастельный оранжевый
      questions: [
        {
          id: "communication",
          title: { ru: "Общение", en: "Communication" },
          descriptions: {
            1: {
              ru: "Общаюсь с трудом, только по необходимости",
              en: "Communicate only when forced",
            },
            2: {
              ru: "Очень сложно, избегаю общения",
              en: "Very difficult, avoid contact",
            },
            3: {
              ru: "Низкий уровень, часто испытываю дискомфорт",
              en: "Low level, often uncomfortable",
            },
            4: {
              ru: "Ниже среднего, есть барьеры",
              en: "Below average, some barriers",
            },
            5: {
              ru: "Средний уровень общения, нормально",
              en: "Average communication, okay",
            },
            6: {
              ru: "Выше среднего, могу поддержать беседу",
              en: "Above average, can keep a conversation",
            },
            7: {
              ru: "Хорошо общаюсь, легко нахожу контакт",
              en: "Good communication, easy contact",
            },
            8: {
              ru: "Очень легко схожусь с людьми",
              en: "Very easy to connect with others",
            },
            9: {
              ru: "Отличное общение, почти со всеми нахожу язык",
              en: "Excellent, can talk to almost anyone",
            },
            10: {
              ru: "Легко нахожу общий язык с кем угодно",
              en: "Masterful communication with anyone",
            },
          },
        },
        {
          id: "friends",
          title: { ru: "Друзья", en: "Friends" },
          descriptions: {
            1: {
              ru: "Меня используют и гнобят или их нет",
              en: "No real friends or they exploit me",
            },
            2: {
              ru: "Очень мало друзей, доверие под вопросом",
              en: "Very few friends, low trust",
            },
            3: {
              ru: "Низкое количество, не всегда надёжны",
              en: "Few friends, not always reliable",
            },
            4: {
              ru: "Ниже среднего, друзья есть, но слабая поддержка",
              en: "Below average, limited support",
            },
            5: {
              ru: "Средний круг друзей, иногда поддерживают",
              en: "Average circle, some support",
            },
            6: {
              ru: "Друзья есть, можно положиться",
              en: "Have friends, can rely on them",
            },
            7: {
              ru: "Хороший круг, всегда помогут",
              en: "Good circle, always ready to help",
            },
            8: {
              ru: "Очень крепкая дружба",
              en: "Very strong friendship",
            },
            9: {
              ru: "Отличные друзья, верные и проверенные",
              en: "Excellent, loyal friends",
            },
            10: {
              ru: "Всегда поддержат, дружба на всю жизнь",
              en: "Friends for life, always supportive",
            },
          },
        },
        {
          id: "love",
          title: { ru: "Вторая половина, любовь", en: "Significant Other, Love" },
          descriptions: {
            1: {
              ru: "Отмораживаюсь даже от мысли",
              en: "Avoid even the thought of it",
            },
            2: {
              ru: "Очень не хочу отношений",
              en: "Very reluctant to have a relationship",
            },
            3: {
              ru: "Низкая вовлечённость, нет доверия",
              en: "Low involvement, no trust",
            },
            4: {
              ru: "Ниже среднего, есть барьеры к сближению",
              en: "Below average, barriers to intimacy",
            },
            5: {
              ru: "Средне, иногда задумываюсь",
              en: "Average, sometimes consider it",
            },
            6: {
              ru: "Есть стремление к отношениям",
              en: "Interested in having a relationship",
            },
            7: {
              ru: "Хорошие отношения или в активном поиске",
              en: "Good relationship or actively searching",
            },
            8: {
              ru: "Очень близкие, любящие отношения",
              en: "Very close, loving relationship",
            },
            9: {
              ru: "Отличные, доверительные, сильная любовь",
              en: "Excellent, trusting, strong love",
            },
            10: {
              ru: "Есть любовь до гроба",
              en: "True love, lifelong bond",
            },
          },
        },
        {
          id: "family",
          title: { ru: "Семья (соц. капитал)", en: "Family (Social Capital)" },
          descriptions: {
            1: {
              ru: "Отмораживаюсь от мысли о семье",
              en: "Avoid the thought of having a family",
            },
            2: {
              ru: "Очень слабая связь, не хочу заводить",
              en: "Very weak bond, not interested",
            },
            3: {
              ru: "Низкий приоритет семьи",
              en: "Low priority for family",
            },
            4: {
              ru: "Ниже среднего, не чувствую необходимости",
              en: "Below average, no strong need",
            },
            5: {
              ru: "Среднее отношение к семье",
              en: "Average family involvement",
            },
            6: {
              ru: "Есть семья или планы, но не всё идеально",
              en: "Have or plan a family, not perfect",
            },
            7: {
              ru: "Хорошо отношусь, горд тем, что имею",
              en: "Positive about family, proud",
            },
            8: {
              ru: "Очень ценю семью, чувствую поддержку",
              en: "Value family highly, feel supported",
            },
            9: {
              ru: "Отличная семья, крепкие отношения",
              en: "Excellent family, strong bonds",
            },
            10: {
              ru: "Счастлив и горд, семья – опора",
              en: "Extremely happy and proud, family is everything",
            },
          },
        },
      ],
    },
    {
      id: "environment",
      title: { ru: "Окружение", en: "Environment" },
      color: "#D1F7C4", // пастельный зелёный
      questions: [
        {
          id: "relatives",
          title: { ru: "Родственники", en: "Relatives" },
          descriptions: {
            1: {
              ru: "Ненавидим друг друга",
              en: "We hate each other",
            },
            2: {
              ru: "Очень сложные отношения",
              en: "Very complicated relationships",
            },
            3: {
              ru: "Часто конфликты",
              en: "Frequent conflicts",
            },
            4: {
              ru: "Ниже среднего, мало контакта",
              en: "Below average, little contact",
            },
            5: {
              ru: "Средне, иногда общаемся",
              en: "Average, sometimes in touch",
            },
            6: {
              ru: "Нормальные отношения, поддерживаем связь",
              en: "Okay relationship, keep in touch",
            },
            7: {
              ru: "Хорошие отношения, помогаем друг другу",
              en: "Good, we help each other",
            },
            8: {
              ru: "Очень тёплые отношения",
              en: "Very warm relationship",
            },
            9: {
              ru: "Отлично ладим, часто вместе",
              en: "Excellent, spend time together",
            },
            10: {
              ru: "Идеальные, полное взаимопонимание",
              en: "Ideal, complete understanding",
            },
          },
        },
        {
          id: "colleagues",
          title: { ru: "Коллеги", en: "Colleagues" },
          descriptions: {
            1: {
              ru: "Редкостные гандоны или отсутствуют",
              en: "Terrible or non-existent colleagues",
            },
            2: {
              ru: "Очень плохие отношения на работе",
              en: "Very bad work relations",
            },
            3: {
              ru: "Низкий уровень доверия, конфликты",
              en: "Low trust, conflicts",
            },
            4: {
              ru: "Ниже среднего, часто недопонимания",
              en: "Below average, misunderstandings",
            },
            5: {
              ru: "Средние, более-менее работаем вместе",
              en: "Average, we manage to work together",
            },
            6: {
              ru: "Нормальные, в целом дружелюбно",
              en: "Decent, generally friendly",
            },
            7: {
              ru: "Хорошие отношения, взаимоуважение",
              en: "Good relationships, mutual respect",
            },
            8: {
              ru: "Очень дружные, помогаем друг другу",
              en: "Very friendly, supportive",
            },
            9: {
              ru: "Отличный коллектив, взаимопомощь",
              en: "Excellent team, lots of help",
            },
            10: {
              ru: "Дружба и уважение, идеальные коллеги",
              en: "Friendship and respect, ideal colleagues",
            },
          },
        },
        {
          id: "friendCount",
          title: { ru: "Количество друзей", en: "Number of Friends" },
          descriptions: {
            1: {
              ru: "Я одиночка, друзей нет",
              en: "I'm a loner, no friends",
            },
            2: {
              ru: "1-2 знакомых, не уверен в них",
              en: "1-2 acquaintances, unsure of them",
            },
            3: {
              ru: "Очень узкий круг, редко общаемся",
              en: "Very small circle, rare contact",
            },
            4: {
              ru: "Ниже среднего, мало друзей",
              en: "Below average, few real friends",
            },
            5: {
              ru: "Средне, пара-тройка хороших людей",
              en: "Average, a few good people",
            },
            6: {
              ru: "Выше среднего, достаточно знакомых",
              en: "Above average, enough acquaintances",
            },
            7: {
              ru: "Хорошо, друзей хватает",
              en: "Good, plenty of friends",
            },
            8: {
              ru: "Очень много друзей, активное общение",
              en: "Very large circle, active communication",
            },
            9: {
              ru: "Отлично, множество верных друзей",
              en: "Excellent, many loyal friends",
            },
            10: {
              ru: "Друзей много и все надёжные",
              en: "Lots of reliable friends",
            },
          },
        },
        {
          id: "neighbors",
          title: { ru: "Соседи", en: "Neighbors" },
          descriptions: {
            1: {
              ru: "Знать их не хочу, не знакомы",
              en: "Don't want to know them, not acquainted",
            },
            2: {
              ru: "Очень плохие отношения",
              en: "Very bad relationship",
            },
            3: {
              ru: "Низкий уровень, конфликты или избегание",
              en: "Low level, conflicts or avoidance",
            },
            4: {
              ru: "Ниже среднего, иногда конфликт",
              en: "Below average, occasional conflict",
            },
            5: {
              ru: "Средне, здороваемся и всё",
              en: "Average, just say hello",
            },
            6: {
              ru: "Выше среднего, иногда общаемся",
              en: "Above average, some communication",
            },
            7: {
              ru: "Хорошие соседи, помогаем друг другу",
              en: "Good neighbors, help each other",
            },
            8: {
              ru: "Очень дружные, часто пересекаемся",
              en: "Very friendly, frequent contact",
            },
            9: {
              ru: "Отлично ладим, почти друзья",
              en: "Excellent, almost friends",
            },
            10: {
              ru: "Прекрасные отношения, как одна семья",
              en: "Great relationship, like family",
            },
          },
        },
        {
          id: "otherPeople",
          title: { ru: "Просто люди", en: "Strangers / Others" },
          descriptions: {
            1: {
              ru: "Их для меня не существует",
              en: "They don't exist for me",
            },
            2: {
              ru: "Очень холоден к людям",
              en: "Very cold towards people",
            },
            3: {
              ru: "Низкое взаимодействие, избегаю",
              en: "Low interaction, I avoid them",
            },
            4: {
              ru: "Ниже среднего, вежливость из необходимости",
              en: "Below average, only polite if needed",
            },
            5: {
              ru: "Средне, иногда контактирую",
              en: "Average, occasionally interact",
            },
            6: {
              ru: "Выше среднего, любопытен",
              en: "Above average, somewhat curious",
            },
            7: {
              ru: "Хорошо общаюсь с незнакомцами",
              en: "Comfortable with strangers",
            },
            8: {
              ru: "Очень открыт, легко нахожу контакт",
              en: "Very open, easily engage with people",
            },
            9: {
              ru: "Отлично, с удовольствием общаюсь",
              en: "Excellent, enjoy talking to them",
            },
            10: {
              ru: "Общаюсь с интересом даже с незнакомыми",
              en: "Eagerly communicate even with strangers",
            },
          },
        },
      ],
    },
    {
      id: "calling",
      title: { ru: "Призвание", en: "Calling" },
      color: "#F7F2AE",
      questions: [
        {
          id: "efficiency",
          title: { ru: "КПД в этом вопросе", en: "Efficiency" },
          descriptions: {
            1: {
              ru: "Никогда ничего не успеваю",
              en: "Never manage to get anything done",
            },
            2: {
              ru: "Очень низкая продуктивность",
              en: "Very low productivity",
            },
            3: {
              ru: "Редко успеваю по плану",
              en: "Rarely meet my plans",
            },
            4: {
              ru: "Ниже среднего, много не доделываю",
              en: "Below average, a lot remains unfinished",
            },
            5: {
              ru: "Средний КПД, делаю часть задуманного",
              en: "Average efficiency, get some things done",
            },
            6: {
              ru: "Немного выше среднего, стараюсь",
              en: "Slightly above average, I try",
            },
            7: {
              ru: "Хорошо успеваю, большая часть задач выполнена",
              en: "Good productivity, most tasks done",
            },
            8: {
              ru: "Очень хорошая эффективность",
              en: "Very good efficiency",
            },
            9: {
              ru: "Отличная продуктивность, почти всё успеваю",
              en: "Excellent productivity, almost all done",
            },
            10: {
              ru: "Крайне высока, делаю всё, что задумано",
              en: "Extremely high, do everything I plan",
            },
          },
        },
        {
          id: "qualification",
          title: { ru: "Квалификация", en: "Qualification" },
          descriptions: {
            1: {
              ru: "Ничего не умею",
              en: "I can't do anything",
            },
            2: {
              ru: "Очень низкий уровень навыков",
              en: "Very low skill level",
            },
            3: {
              ru: "Плохие навыки, нет опыта",
              en: "Poor skills, no experience",
            },
            4: {
              ru: "Ниже среднего, мало знаний",
              en: "Below average, limited knowledge",
            },
            5: {
              ru: "Средний уровень, базовые умения",
              en: "Average, basic skills",
            },
            6: {
              ru: "Немного выше среднего, регулярно учусь",
              en: "Slightly above average, learning regularly",
            },
            7: {
              ru: "Хорошая квалификация",
              en: "Good qualification",
            },
            8: {
              ru: "Очень хороший уровень, несколько компетенций",
              en: "Very good, multiple competences",
            },
            9: {
              ru: "Отличный профессионал",
              en: "Excellent professional",
            },
            10: {
              ru: "Имею несколько специальностей, эксперт",
              en: "Multiple specialties, true expert",
            },
          },
        },
        {
          id: "job",
          title: { ru: "Работа-занятость", en: "Work / Occupation" },
          descriptions: {
            1: {
              ru: "Я иждивенец",
              en: "I'm a dependent (no job)",
            },
            2: {
              ru: "Очень нестабильная занятость",
              en: "Very unstable job situation",
            },
            3: {
              ru: "Редкие подработки, нет постоянного места",
              en: "Occasional gigs, no stable job",
            },
            4: {
              ru: "Ниже среднего, неустойчивая работа",
              en: "Below average, insecure job",
            },
            5: {
              ru: "Средне, работа есть, но без перспектив",
              en: "Average, have a job but no prospects",
            },
            6: {
              ru: "Немного выше, есть стабильная занятость",
              en: "Slightly above average, stable job",
            },
            7: {
              ru: "Хорошая работа или свой бизнес",
              en: "Good job or own business",
            },
            8: {
              ru: "Очень хороший уровень занятости",
              en: "Very good job level",
            },
            9: {
              ru: "Отличная работа, я доволен",
              en: "Excellent job, I'm satisfied",
            },
            10: {
              ru: "Успешный бизнес или высокооплачиваемая работа",
              en: "Successful business or high-paying job",
            },
          },
        },
        {
          id: "career",
          title: { ru: "Карьерный рост", en: "Career Growth" },
          descriptions: {
            1: {
              ru: "Никаких перспектив",
              en: "No prospects at all",
            },
            2: {
              ru: "Очень низкие шансы на рост",
              en: "Very low chance of promotion",
            },
            3: {
              ru: "Плохие перспективы, застой",
              en: "Poor prospects, stagnation",
            },
            4: {
              ru: "Ниже среднего, редкие возможности",
              en: "Below average, few opportunities",
            },
            5: {
              ru: "Средние перспективы",
              en: "Average prospects",
            },
            6: {
              ru: "Немного выше среднего, потихоньку расту",
              en: "Slightly above average, slowly growing",
            },
            7: {
              ru: "Хороший рост, перспективы есть",
              en: "Good growth, real prospects",
            },
            8: {
              ru: "Очень хороший рост, всё идёт вверх",
              en: "Very good growth, everything is improving",
            },
            9: {
              ru: "Отличные возможности, стабильно расту",
              en: "Excellent opportunities, steady growth",
            },
            10: {
              ru: "Стабильно расту, лучшие заказы/клиенты",
              en: "Constant growth, top clients or orders",
            },
          },
        },
        {
          id: "status",
          title: { ru: "Статус", en: "Status" },
          descriptions: {
            1: {
              ru: "Безработный",
              en: "Unemployed",
            },
            2: {
              ru: "Очень низкий социальный статус",
              en: "Very low social status",
            },
            3: {
              ru: "Низкий статус, мало признания",
              en: "Low status, little recognition",
            },
            4: {
              ru: "Ниже среднего, незаметен",
              en: "Below average, not noticeable",
            },
            5: {
              ru: "Средний статус, обычный сотрудник",
              en: "Average status, regular employee",
            },
            6: {
              ru: "Немного выше среднего, уважают",
              en: "Slightly above average, some respect",
            },
            7: {
              ru: "Хороший статус, меня ценят",
              en: "Good status, I'm valued",
            },
            8: {
              ru: "Высокий статус, ответственная роль",
              en: "High status, responsible role",
            },
            9: {
              ru: "Отличный статус, руководитель",
              en: "Excellent status, leadership position",
            },
            10: {
              ru: "Владелец бизнеса, сам себе глава",
              en: "Business owner, self-directed",
            },
          },
        },
      ],
    },
    {
      id: "finance",
      title: { ru: "Обеспеченность", en: "Financial Security" },
      color: "#F7AEF0",
      questions: [
        {
          id: "livingConditions",
          title: { ru: "Условия жизни", en: "Living Conditions" },
          descriptions: {
            1: {
              ru: "Живу где придётся",
              en: "Live anywhere, no stable place",
            },
            2: {
              ru: "Очень плохие условия",
              en: "Very poor conditions",
            },
            3: {
              ru: "Съёмное жильё, некомфортно",
              en: "Rented place, uncomfortable",
            },
            4: {
              ru: "Ниже среднего, не всё устраивает",
              en: "Below average, not satisfying",
            },
            5: {
              ru: "Средние условия, терпимо",
              en: "Average conditions, tolerable",
            },
            6: {
              ru: "Немного лучше среднего",
              en: "Slightly better than average",
            },
            7: {
              ru: "Хорошие условия, своя жилплощадь",
              en: "Good, own living space",
            },
            8: {
              ru: "Очень хорошие условия",
              en: "Very good conditions",
            },
            9: {
              ru: "Отличные условия, своя недвижимость",
              en: "Excellent, own real estate",
            },
            10: {
              ru: "Максимальный комфорт, всё своё",
              en: "Maximum comfort, all owned",
            },
          },
        },
        {
          id: "incomeLevel",
          title: { ru: "Уровень дохода", en: "Income Level" },
          descriptions: {
            1: {
              ru: "Отрицательный, живу в кредитах",
              en: "Negative, living on credit",
            },
            2: {
              ru: "Очень низкий доход, долговая яма",
              en: "Very low income, big debts",
            },
            3: {
              ru: "Низкий доход, хватает на базовое",
              en: "Low income, barely enough",
            },
            4: {
              ru: "Ниже среднего, часто не хватает",
              en: "Below average, often short on money",
            },
            5: {
              ru: "Средний доход, закрываю основные расходы",
              en: "Average income, covers main expenses",
            },
            6: {
              ru: "Немного выше среднего, что-то остаётся",
              en: "Slightly above average, some leftover",
            },
            7: {
              ru: "Хороший доход, хватает на хотелки",
              en: "Good income, enough for wants",
            },
            8: {
              ru: "Очень хороший, большая часть желаний реализуется",
              en: "Very good, can afford most desires",
            },
            9: {
              ru: "Отличный доход, всё устраивает",
              en: "Excellent, fully satisfied",
            },
            10: {
              ru: "Высокий и стабильный, любые хотелки",
              en: "High and stable, can fulfill any wish",
            },
          },
        },
        {
          id: "incomeSources",
          title: { ru: "Источники дохода", en: "Income Sources" },
          descriptions: {
            1: {
              ru: "Нахожусь на содержании",
              en: "Fully dependent on others",
            },
            2: {
              ru: "Очень нестабильные подработки",
              en: "Very unstable odd jobs",
            },
            3: {
              ru: "Один источник, очень слабый",
              en: "One source, very weak",
            },
            4: {
              ru: "Ниже среднего, источник слабо устойчив",
              en: "Below average, not stable",
            },
            5: {
              ru: "Средне, один стабильный источник",
              en: "Average, one stable source",
            },
            6: {
              ru: "Немного выше, иногда дополнительные подработки",
              en: "Slightly above, occasional extra gigs",
            },
            7: {
              ru: "Хорошо, есть несколько источников",
              en: "Good, multiple income sources",
            },
            8: {
              ru: "Очень хорошо, несколько стабильных",
              en: "Very good, multiple stable sources",
            },
            9: {
              ru: "Отлично диверсифицированы",
              en: "Excellent, well-diversified",
            },
            10: {
              ru: "Имею несколько источников дохода",
              en: "Multiple streams of income",
            },
          },
        },
        {
          id: "financialCushion",
          title: { ru: "Финансовая подушка", en: "Financial Cushion" },
          descriptions: {
            1: {
              ru: "Нет подушки безопасности",
              en: "No savings at all",
            },
            2: {
              ru: "Очень мало сбережений, не хватит ни на что",
              en: "Very small savings, not enough",
            },
            3: {
              ru: "Скромные накопления, быстро кончатся",
              en: "Modest savings, will run out fast",
            },
            4: {
              ru: "Ниже среднего, немного отложено",
              en: "Below average, a little saved",
            },
            5: {
              ru: "Средняя подушка, на пару месяцев",
              en: "Average cushion, a few months",
            },
            6: {
              ru: "Немного выше, есть ощутимые накопления",
              en: "Slightly above average, noticeable savings",
            },
            7: {
              ru: "Хорошая подушка, чувствую уверенность",
              en: "Good cushion, feel secure",
            },
            8: {
              ru: "Очень хороший запас, недвижимость/активы",
              en: "Very good reserves, real estate/assets",
            },
            9: {
              ru: "Отличная подушка, всё под контролем",
              en: "Excellent cushion, fully secure",
            },
            10: {
              ru: "Крупные накопления, недвижимость, инвестиции",
              en: "Significant savings, property, investments",
            },
          },
        },
        {
          id: "incomeExpenses",
          title: { ru: "Доходы-расходы", en: "Income vs. Expenses" },
          descriptions: {
            1: {
              ru: "Только трачу, дохода нет",
              en: "Only expenses, no income",
            },
            2: {
              ru: "Расходы сильно превышают доходы",
              en: "Expenses far exceed income",
            },
            3: {
              ru: "С трудом выхожу в ноль",
              en: "Barely break even",
            },
            4: {
              ru: "Ниже среднего, частые минуса",
              en: "Below average, often negative",
            },
            5: {
              ru: "Примерно в нуле",
              en: "Roughly balanced",
            },
            6: {
              ru: "Чуть выше расходов, есть небольшой плюс",
              en: "Slight surplus",
            },
            7: {
              ru: "Хороший плюс, можно копить",
              en: "Good surplus, can save money",
            },
            8: {
              ru: "Очень хороший плюс, траты покрыты",
              en: "Very good surplus, all expenses covered",
            },
            9: {
              ru: "Отличный плюс, денег всегда хватает",
              en: "Excellent surplus, always enough",
            },
            10: {
              ru: "Доходы многократно превышают расходы",
              en: "Income far exceeds expenses",
            },
          },
        },
      ],
    },
    {
      id: "selfImprovement",
      title: { ru: "Самосовершенствование", en: "Self-Improvement" },
      color: "#AEBFF7",
      questions: [
        {
          id: "education",
          title: { ru: "Образование", en: "Education" },
          descriptions: {
            1: {
              ru: "Едва закончил школу",
              en: "Barely finished school",
            },
            2: {
              ru: "Очень низкий уровень знаний",
              en: "Very low knowledge",
            },
            3: {
              ru: "Низкий уровень, редко учусь",
              en: "Low level, rarely study",
            },
            4: {
              ru: "Ниже среднего, малообразован",
              en: "Below average, not well educated",
            },
            5: {
              ru: "Средне, базовое образование",
              en: "Average, basic education",
            },
            6: {
              ru: "Немного выше среднего, продолжаю учиться",
              en: "Slightly above average, keep learning",
            },
            7: {
              ru: "Хорошее образование, развиваюсь",
              en: "Good education, continuing growth",
            },
            8: {
              ru: "Очень хорошее, курсы/тренинги",
              en: "Very good, take courses/trainings",
            },
            9: {
              ru: "Отличное, постоянно повышаю квалификацию",
              en: "Excellent, always improving skills",
            },
            10: {
              ru: "Постоянно учусь, высокий уровень",
              en: "Constant learning, very high level",
            },
          },
        },
        {
          id: "innerWork",
          title: { ru: "Проработка (эксергия)", en: "Inner Work" },
          descriptions: {
            1: {
              ru: "Не занимаюсь собой вообще",
              en: "Do nothing for self-improvement",
            },
            2: {
              ru: "Очень низкая осознанность",
              en: "Very low self-awareness",
            },
            3: {
              ru: "Редко работаю над собой",
              en: "Rarely work on myself",
            },
            4: {
              ru: "Ниже среднего, мало вкладываюсь",
              en: "Below average, minimal effort",
            },
            5: {
              ru: "Средне, иногда вытравливаю «тараканов»",
              en: "Average, sometimes deal with personal issues",
            },
            6: {
              ru: "Выше среднего, осознанность растёт",
              en: "Above average, growing awareness",
            },
            7: {
              ru: "Хорошо работаю над собой",
              en: "Good self-improvement efforts",
            },
            8: {
              ru: "Очень глубокая проработка",
              en: "Very deep personal work",
            },
            9: {
              ru: "Отличный уровень, постоянно меняюсь",
              en: "Excellent, constantly evolving",
            },
            10: {
              ru: "Постоянно вытравливаю тараканов, меняю систему",
              en: "Always working on myself, transforming",
            },
          },
        },
        {
          id: "habits",
          title: { ru: "Привычки", en: "Habits" },
          descriptions: {
            1: {
              ru: "Курю, бухаю, залипаю в пивас, токсичные форумы",
              en: "Smoke, drink, waste time, toxic habits",
            },
            2: {
              ru: "Очень вредные привычки",
              en: "Very harmful habits",
            },
            3: {
              ru: "Много плохих привычек",
              en: "Many bad habits",
            },
            4: {
              ru: "Ниже среднего, редко внедряю полезное",
              en: "Below average, rarely adopt good habits",
            },
            5: {
              ru: "Средне, есть и плохие, и хорошие",
              en: "Average, mix of good and bad",
            },
            6: {
              ru: "Выше среднего, стараюсь улучшаться",
              en: "Above average, trying to improve",
            },
            7: {
              ru: "Хорошие привычки, минимально вредные",
              en: "Good habits, minimal bad ones",
            },
            8: {
              ru: "Очень хорошие привычки, почти без вреда",
              en: "Very good habits, almost no harm",
            },
            9: {
              ru: "Отличные привычки, постоянно осваиваю новое",
              en: "Excellent habits, always learning new",
            },
            10: {
              ru: "Не занимаюсь дерьмом, только полезные лайфхаки",
              en: "Only healthy habits, no junk at all",
            },
          },
        },
        {
          id: "personalGrowth",
          title: { ru: "Личностный рост", en: "Personal Growth" },
          descriptions: {
            1: {
              ru: "А чё это?",
              en: "What's that?",
            },
            2: {
              ru: "Очень низкий уровень развития",
              en: "Very low personal development",
            },
            3: {
              ru: "Редко задумываюсь о росте",
              en: "Rarely think about self-growth",
            },
            4: {
              ru: "Ниже среднего, мало действий",
              en: "Below average, minimal action",
            },
            5: {
              ru: "Средний уровень, иногда тренинги",
              en: "Average, occasionally do trainings",
            },
            6: {
              ru: "Немного выше, стараюсь развиваться",
              en: "Slightly above average, trying to improve",
            },
            7: {
              ru: "Хороший прогресс, регулярно работаю",
              en: "Good progress, working regularly",
            },
            8: {
              ru: "Очень активно расту, посещаю тренинги",
              en: "Very active growth, attend courses",
            },
            9: {
              ru: "Отличный уровень, вижу большие изменения",
              en: "Excellent, seeing major changes",
            },
            10: {
              ru: "Постоянно развиваюсь, работаю над качеством жизни",
              en: "Constantly growing, improving life quality",
            },
          },
        },
        {
          id: "erudition",
          title: { ru: "Эрудиция", en: "Erudition" },
          descriptions: {
            1: {
              ru: "Я и так самый умный",
              en: "I think I'm already the smartest",
            },
            2: {
              ru: "Очень мало знаний, но не признаю",
              en: "Very little knowledge, won't admit it",
            },
            3: {
              ru: "Редко читаю, малообразован",
              en: "Rarely read, not well-educated",
            },
            4: {
              ru: "Ниже среднего, иногда что-то смотрю",
              en: "Below average, sometimes watch something",
            },
            5: {
              ru: "Средняя эрудиция, читаю изредка",
              en: "Average erudition, occasional reading",
            },
            6: {
              ru: "Выше среднего, интересуюсь новыми знаниями",
              en: "Above average, interested in new knowledge",
            },
            7: {
              ru: "Хорошая эрудиция, читаю регулярно",
              en: "Good erudition, read regularly",
            },
            8: {
              ru: "Очень широкий кругозор",
              en: "Very broad outlook",
            },
            9: {
              ru: "Отличная эрудиция, знаю языки",
              en: "Excellent erudition, speak languages",
            },
            10: {
              ru: "Постоянно изучаю новое, совершенствую языки",
              en: "Constantly learning, perfecting languages",
            },
          },
        },
      ],
    },
    {
      id: "lifeBrightness",
      title: { ru: "Яркость жизни", en: "Life Brightness" },
      color: "#F7C3AE",
      questions: [
        {
          id: "entertainment",
          title: { ru: "Развлечения", en: "Entertainment" },
          descriptions: {
            1: {
              ru: "Некогда и не на что",
              en: "No time or money for fun",
            },
            2: {
              ru: "Очень редко, почти нет развлечений",
              en: "Very rare, almost no entertainment",
            },
            3: {
              ru: "Редко отдыхаю, мало возможностей",
              en: "Seldom have fun, few opportunities",
            },
            4: {
              ru: "Ниже среднего, иногда позволяю себе",
              en: "Below average, occasional treat",
            },
            5: {
              ru: "Средний уровень, время от времени",
              en: "Average, from time to time",
            },
            6: {
              ru: "Немного выше, стараюсь радоваться",
              en: "Slightly above average, try to have fun",
            },
            7: {
              ru: "Хороший уровень развлечений",
              en: "Good amount of entertainment",
            },
            8: {
              ru: "Очень активный отдых, часто развлекаюсь",
              en: "Very active, frequent fun",
            },
            9: {
              ru: "Отлично отрываюсь, множество вариантов",
              en: "Excellent, many ways to enjoy",
            },
            10: {
              ru: "Отрываюсь по полной, всё доступно",
              en: "Full-on fun, everything is possible",
            },
          },
        },
        {
          id: "rest",
          title: { ru: "Отдых", en: "Rest" },
          descriptions: {
            1: {
              ru: "Лучший отдых на диване",
              en: "Best rest is lying on the couch",
            },
            2: {
              ru: "Очень пассивный отдых, без сил",
              en: "Very passive rest, no energy",
            },
            3: {
              ru: "Редко отдыхаю как следует",
              en: "Rarely get proper rest",
            },
            4: {
              ru: "Ниже среднего, ограничиваюсь минимумом",
              en: "Below average, do the bare minimum",
            },
            5: {
              ru: "Средний отдых, иногда активничаю",
              en: "Average rest, sometimes active",
            },
            6: {
              ru: "Выше среднего, стараюсь активно отдыхать",
              en: "Above average, try to rest actively",
            },
            7: {
              ru: "Хороший отдых, часто двигаюсь",
              en: "Good rest, often on the move",
            },
            8: {
              ru: "Очень активный отдых, много вариантов",
              en: "Very active rest, plenty of variety",
            },
            9: {
              ru: "Отличный отдых, спорт, природа",
              en: "Excellent rest, sports, nature",
            },
            10: {
              ru: "Максимально активный отдых, всегда заряжает",
              en: "Extremely active, always energizing",
            },
          },
        },
        {
          id: "hobby",
          title: { ru: "Хобби", en: "Hobbies" },
          descriptions: {
            1: {
              ru: "Играю в танчики",
              en: "Just playing tank games",
            },
            2: {
              ru: "Очень мало увлечений",
              en: "Very few interests",
            },
            3: {
              ru: "Редко занимаюсь чем-то интересным",
              en: "Rarely do anything interesting",
            },
            4: {
              ru: "Ниже среднего, однообразное хобби",
              en: "Below average, single routine hobby",
            },
            5: {
              ru: "Средний уровень, есть одно хобби",
              en: "Average, have one hobby",
            },
            6: {
              ru: "Выше среднего, 1-2 увлечения",
              en: "Above average, 1-2 interests",
            },
            7: {
              ru: "Хорошие хобби, получаю удовольствие",
              en: "Good hobbies, enjoy them",
            },
            8: {
              ru: "Очень увлечён, есть несколько хобби",
              en: "Very enthusiastic, multiple hobbies",
            },
            9: {
              ru: "Отлично, хобби обогащают жизнь",
              en: "Excellent, hobbies enrich life",
            },
            10: {
              ru: "Полезные и увлекательные хобби, максимум пользы",
              en: "Highly beneficial hobbies, maximum enjoyment",
            },
          },
        },
        {
          id: "travel",
          title: { ru: "Путешествия", en: "Travel" },
          descriptions: {
            1: {
              ru: "Сижу дома",
              en: "Stay at home",
            },
            2: {
              ru: "Очень редко выезжаю",
              en: "Travel very rarely",
            },
            3: {
              ru: "Редко позволяю себе поездки",
              en: "Seldom afford trips",
            },
            4: {
              ru: "Ниже среднего, иногда выезжаю",
              en: "Below average, occasional trips",
            },
            5: {
              ru: "Средне, 1-2 поездки в год",
              en: "Average, 1-2 trips a year",
            },
            6: {
              ru: "Выше среднего, стараюсь выезжать чаще",
              en: "Above average, try to travel more",
            },
            7: {
              ru: "Хорошо, 3-4 поездки в год",
              en: "Good, 3-4 trips a year",
            },
            8: {
              ru: "Очень активно путешествую, несколько месяцев",
              en: "Very active traveler, some months abroad",
            },
            9: {
              ru: "Отлично, много новых мест в год",
              en: "Excellent, many new places yearly",
            },
            10: {
              ru: "Провожу 2-3 месяца в других странах",
              en: "Spend 2-3 months abroad each year",
            },
          },
        },
        {
          id: "impressions",
          title: { ru: "Впечатления", en: "Impressions" },
          descriptions: {
            1: {
              ru: "Жизнь боль, всё мрачно",
              en: "Life is pain, everything is bleak",
            },
            2: {
              ru: "Очень мало радостных моментов",
              en: "Very few joyful moments",
            },
            3: {
              ru: "Редко получаю яркие впечатления",
              en: "Rarely have bright impressions",
            },
            4: {
              ru: "Ниже среднего, однообразие",
              en: "Below average, monotony",
            },
            5: {
              ru: "Средне, иногда что-то яркое",
              en: "Average, occasional highlights",
            },
            6: {
              ru: "Выше среднего, стараюсь разнообразить жизнь",
              en: "Above average, try to add variety",
            },
            7: {
              ru: "Хорошие впечатления, ищу новые эмоции",
              en: "Good impressions, seeking new emotions",
            },
            8: {
              ru: "Очень много ярких моментов",
              en: "Very many vivid moments",
            },
            9: {
              ru: "Отлично, жизнь полна красок",
              en: "Excellent, life is very colorful",
            },
            10: {
              ru: "Жизнь яркая, всегда полна впечатлений",
              en: "Life is vibrant, always full of impressions",
            },
          },
        },
      ],
    },
    {
      id: "spirituality",
      title: { ru: "Духовность", en: "Spirituality" },
      color: "#CAF7AE",
      questions: [
        {
          id: "worldview",
          title: { ru: "Картина мира", en: "Worldview" },
          descriptions: {
            1: {
              ru: "Прожжённый материалист",
              en: "Strict materialist",
            },
            2: {
              ru: "Очень скептичен ко всему",
              en: "Very skeptical about everything",
            },
            3: {
              ru: "Низкий интерес к чему-то за пределами материи",
              en: "Low interest in anything beyond matter",
            },
            4: {
              ru: "Ниже среднего, не особо интересуюсь",
              en: "Below average, not very interested",
            },
            5: {
              ru: "Средний уровень, иногда задумываюсь",
              en: "Average, sometimes think about it",
            },
            6: {
              ru: "Выше среднего, интересуюсь необычным",
              en: "Above average, curious about unusual",
            },
            7: {
              ru: "Хорошо изучаю разные взгляды",
              en: "Study various perspectives",
            },
            8: {
              ru: "Очень открыт к разным концепциям",
              en: "Very open to different concepts",
            },
            9: {
              ru: "Отличное понимание мира, гибкая картина",
              en: "Excellent worldview, flexible mindset",
            },
            10: {
              ru: "Интересуюсь необычными фактами и глубоко их изучаю",
              en: "Deeply interested in unusual facts, in-depth study",
            },
          },
        },
        {
          id: "creativity",
          title: { ru: "Творчество", en: "Creativity" },
          descriptions: {
            1: {
              ru: "Это фигня",
              en: "It's nonsense",
            },
            2: {
              ru: "Очень редко, не считаю нужным",
              en: "Very rarely, don't see the need",
            },
            3: {
              ru: "Редко творю, мало идей",
              en: "Rarely create, few ideas",
            },
            4: {
              ru: "Ниже среднего, не вижу смысла",
              en: "Below average, no real interest",
            },
            5: {
              ru: "Средне, иногда пишу/рисую",
              en: "Average, occasionally write/draw",
            },
            6: {
              ru: "Выше среднего, периодически занимаюсь творчеством",
              en: "Above average, sometimes engage in creativity",
            },
            7: {
              ru: "Хорошо, творчество меня вдохновляет",
              en: "Good, creativity inspires me",
            },
            8: {
              ru: "Очень много идей, часто реализую",
              en: "Very creative, frequently produce ideas",
            },
            9: {
              ru: "Отличное творческое выражение",
              en: "Excellent creative expression",
            },
            10: {
              ru: "Для меня творчество – язык души",
              en: "Creativity is my soul's language",
            },
          },
        },
        {
          id: "art",
          title: { ru: "Искусство", en: "Art" },
          descriptions: {
            1: {
              ru: "Херня это ваше искусство",
              en: "Art is nonsense",
            },
            2: {
              ru: "Очень мало интереса к искусству",
              en: "Very little interest in art",
            },
            3: {
              ru: "Редко соприкасаюсь с искусством",
              en: "Rarely engage with art",
            },
            4: {
              ru: "Ниже среднего, не вдохновляет",
              en: "Below average, not inspiring",
            },
            5: {
              ru: "Средне, изредка посещаю выставки",
              en: "Average, occasionally go to exhibitions",
            },
            6: {
              ru: "Выше среднего, иногда ищу вдохновение",
              en: "Above average, sometimes seek inspiration",
            },
            7: {
              ru: "Хорошо отношусь, люблю искусство",
              en: "Good, I love art",
            },
            8: {
              ru: "Очень увлечён, часто посещаю события",
              en: "Very passionate, often attend events",
            },
            9: {
              ru: "Отлично, искусство – источник вдохновения",
              en: "Excellent, art is a major inspiration",
            },
            10: {
              ru: "Для меня искусство – основа вдохновения",
              en: "Art is a fundamental source of inspiration",
            },
          },
        },
        {
          id: "spiritualPractice",
          title: {
            ru: "Духовные практики, йога, медитации",
            en: "Spiritual Practices (Yoga, Meditation)",
          },
          descriptions: {
            1: {
              ru: "Не занимаюсь, считаю хернёй",
              en: "Don't practice, consider it nonsense",
            },
            2: {
              ru: "Очень редко, не верю в пользу",
              en: "Very rarely, don't believe in benefits",
            },
            3: {
              ru: "Редко пробую, не втянулся",
              en: "Rarely try, not really engaged",
            },
            4: {
              ru: "Ниже среднего, мало времени",
              en: "Below average, little time for it",
            },
            5: {
              ru: "Средне, иногда медитирую/пробую йогу",
              en: "Average, sometimes meditate/do yoga",
            },
            6: {
              ru: "Выше среднего, начинаю практиковать регулярно",
              en: "Above average, starting regular practice",
            },
            7: {
              ru: "Хорошо практикую, чувствую эффект",
              en: "Good practice, feel the effect",
            },
            8: {
              ru: "Очень серьёзно занимаюсь, вижу результаты",
              en: "Very serious, seeing results",
            },
            9: {
              ru: "Отличная регулярная практика, глубокое понимание",
              en: "Excellent regular practice, deep understanding",
            },
            10: {
              ru: "Постоянно практикую, духовно развиваюсь",
              en: "Constant practice, strong spiritual growth",
            },
          },
        },
      ],
    },
  ];

/****************************************
 * 2. СОЗДАНИЕ ВКЛАДОК, ПОЛЗУНКОВ (0..10)
 ****************************************/
function renderTabs() {
  const tabList = document.getElementById("sphereTabs");
  const tabContent = document.getElementById("sphereTabContent");
  tabList.innerHTML = "";
  tabContent.innerHTML = "";

  spheres.forEach((sphere, index) => {
    // Вкладка
    const li = document.createElement("li");
    li.className = "nav-item";
    const btn = document.createElement("button");
    btn.className = "nav-link" + (index === 0 ? " active" : "");
    btn.id = "tab-" + sphere.id;
    btn.type = "button";
    btn.setAttribute("data-bs-toggle", "tab");
    btn.setAttribute("data-bs-target", "#pane-" + sphere.id);
    btn.role = "tab";
    btn.innerText = `${sphere.emoji} ${sphere.title[currentLanguage]} (0.0)`;
    li.appendChild(btn);
    tabList.appendChild(li);

    // Контент вкладки
    const pane = document.createElement("div");
    pane.className = "tab-pane fade" + (index === 0 ? " show active" : "");
    pane.id = "pane-" + sphere.id;
    pane.role = "tabpanel";

    const header = document.createElement("h5");
    header.innerText = `${sphere.emoji} ${sphere.title[currentLanguage]} - 0.0`;
    header.className = "mb-3";
    pane.appendChild(header);

    // Вопросы с ползунками
    sphere.questions.forEach((question) => {
      const formGroup = document.createElement("div");
      formGroup.className = "mb-3";

      const label = document.createElement("label");
      label.className = "form-label sphere-header";
      label.setAttribute("for", `slider_${sphere.id}_${question.id}`);
      label.innerText = question.title[currentLanguage];
      formGroup.appendChild(label);

      const slider = document.createElement("input");
      slider.type = "range";
      slider.className = "form-range";
      slider.id = `slider_${sphere.id}_${question.id}`;
      slider.min = "0";
      slider.max = "10";
      slider.value = "0"; // по умолчанию 0
      slider.addEventListener("input", () => {
        updateSliderDisplay(sphere.id, question.id, slider.value);
        updateSphereAverage(sphere.id);
        drawWheel();
      });
      formGroup.appendChild(slider);

      const desc = document.createElement("div");
      desc.id = `desc_${sphere.id}_${question.id}`;
      desc.className = "form-text";
      // Начальное описание (value=0)
      const d = question.descriptions[0];
      desc.innerText = d ? d[currentLanguage] : "";
      formGroup.appendChild(desc);

      pane.appendChild(formGroup);
    });

    tabContent.appendChild(pane);
  });

  updateOverallAverage();
}

/** При движении ползунка обновляем описание */
function updateSliderDisplay(sphereId, questionId, value) {
  const sphere = spheres.find(s => s.id === sphereId);
  if (!sphere) return;
  const question = sphere.questions.find(q => q.id === questionId);
  if (!question) return;
  const descElem = document.getElementById(`desc_${sphereId}_${questionId}`);
  const dict = question.descriptions[value];
  descElem.innerText = dict ? dict[currentLanguage] : "";
}

/** Обновляем среднее по сфере */
function updateSphereAverage(sphereId) {
  const sphere = spheres.find(s => s.id === sphereId);
  if (!sphere) return;
  let sum = 0, count = 0;
  sphere.questions.forEach((question) => {
    const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
    sum += parseInt(slider.value);
    count++;
  });
  const avg = (sum / (count || 1)).toFixed(1);

  // Обновляем вкладку
  const tabButton = document.getElementById("tab-" + sphere.id);
  tabButton.innerText = `${sphere.emoji} ${sphere.title[currentLanguage]} (${avg})`;

  // Обновляем заголовок во вкладке
  const paneHeader = document.querySelector(`#pane-${sphere.id} h5`);
  paneHeader.innerText = `${sphere.emoji} ${sphere.title[currentLanguage]} - ${avg}`;

  // Пересчитываем общее среднее
  updateOverallAverage();
}

/** Обновляем общее среднее */
function updateOverallAverage() {
  let total = 0, count = 0;
  spheres.forEach((sphere) => {
    sphere.questions.forEach((question) => {
      const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
      total += parseInt(slider.value);
      count++;
    });
  });
  const overall = (total / (count || 1)).toFixed(1);
  document.getElementById("overallAverage").innerText =
    (currentLanguage === "ru" ? "Общее среднее: " : "Overall Average: ") + overall;
}

/****************************************
 * 3. РИСОВАНИЕ «КОЛЕСА» КАК СЕКТОРОВ
 ****************************************/
function drawWheel() {
  const canvas = document.getElementById("balanceWheel");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2 - 30;

  const numSpheres = spheres.length;
  const anglePerSphere = (2 * Math.PI) / numSpheres;
  let startAngle = -Math.PI / 2; // сверху

  spheres.forEach((sphere, index) => {
    let sum = 0, cnt = 0;
    sphere.questions.forEach((question) => {
      const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
      sum += parseInt(slider.value);
      cnt++;
    });
    const avg = sum / (cnt || 1);
    const fraction = avg / 10;
    const sectorRadius = fraction * maxRadius;

    const endAngle = startAngle + anglePerSphere;
    // Рисуем сектор
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, sectorRadius, startAngle, endAngle);
    ctx.closePath();

    const colorIndex = index % pastelColors.length;
    ctx.fillStyle = pastelColors[colorIndex];
    ctx.fill();

    ctx.strokeStyle = darkMode ? "#ccc" : "#666";
    ctx.stroke();

    // Подпись
    const midAngle = startAngle + anglePerSphere / 2;
    const labelRadius = maxRadius + 20;
    let labelX = centerX + labelRadius * Math.cos(midAngle);
    let labelY = centerY + labelRadius * Math.sin(midAngle);
    ctx.fillStyle = darkMode ? "#fff" : "#000";
    ctx.font = "14px sans-serif";

    const text = `${sphere.emoji} ${sphere.title[currentLanguage]} ${avg.toFixed(1)}`;
    const textWidth = ctx.measureText(text).width;
    // Чтобы не обрезалось справа, центрируем текст относительно его ширины
    ctx.fillText(text, labelX - textWidth / 2, labelY);

    // Линия-разделитель от центра
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + maxRadius * Math.cos(startAngle),
      centerY + maxRadius * Math.sin(startAngle)
    );
    ctx.stroke();

    startAngle = endAngle;
  });

  // Закрываем круг последней линией
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX + maxRadius * Math.cos(startAngle),
    centerY + maxRadius * Math.sin(startAngle)
  );
  ctx.stroke();
}

/****************************************
 * 4. ПЕРЕКЛЮЧАТЕЛИ ТЕМЫ И ЯЗЫКА
 ****************************************/
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode", darkMode);
  themeBtn.innerText = darkMode
    ? "🌙 Dark Theme"
    : "🌞 Light Theme";
  drawWheel();
});

const langBtn = document.getElementById("langToggle");
langBtn.addEventListener("click", () => {
  currentLanguage = currentLanguage === "ru" ? "en" : "ru";
  langBtn.innerText = currentLanguage === "ru" ? "🌐 EN" : "🌐 RU";
  // Обновляем текст кнопки темы
  themeBtn.innerText = darkMode
    ? (currentLanguage === "ru" ? "🌙 Тёмная тема" : "🌙 Dark Theme")
    : (currentLanguage === "ru" ? "🌞 Светлая тема" : "🌞 Light Theme");
  renderTabs();
  drawWheel();
});

/****************************************
 * 5. ТЕКУЩАЯ ДАТА + СОХРАНЕНИЕ В JSON/PDF
 ****************************************/

// Встраиваем шрифт DejaVuSans (или другой с поддержкой кириллицы)
// Ниже – укороченный Base64, нужно заменить на реальный
const DejaVuSansTTF = `
AAEAAAAKAIAAAwAgT1MvMj2i7FkAAAC8AAAAYGNtYXBBc48/wAAAZwAAABkZ2FzcAAZ/g8AAAQ8
AAAOZ2x5ZoEF/4IAAABgAAAEMGhlYWQHBgB3AAACMAAAA...
... (ОЧЕНЬ ДЛИННЫЙ BASE64) ...
`;

// Функция инициализации шрифта в jsPDF
function initPdfFonts(doc) {
  doc.addFileToVFS("DejaVuSans.ttf", DejaVuSansTTF);
  doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
  doc.setFont("DejaVuSans", "normal");
}

// Текущая дата (месяц, число, год)
function updateDateDisplay() {
  const now = new Date();
  const monthsEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthsRu = [
    "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
  ];
  const day = now.getDate();
  const monthIndex = now.getMonth();
  const year = now.getFullYear();

  // Выбираем название месяца в зависимости от языка
  const monthName = (currentLanguage === "ru")
    ? monthsRu[monthIndex]
    : monthsEn[monthIndex];

  const dateString = `${monthName} ${day}, ${year}`;
  document.getElementById("currentDate").innerText = `(${dateString})`;
}

// Сохранение в JSON
document.getElementById("saveResults").addEventListener("click", () => {
  let results = {};
  // Добавляем дату
  results.date = new Date().toISOString(); // или более красивый формат
  spheres.forEach((sphere) => {
    let sphereData = {};
    sphere.questions.forEach((question) => {
      const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
      sphereData[question.id] = parseInt(slider.value);
    });
    results[sphere.id] = sphereData;
  });
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "results.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
});

// Сохранение в PDF
document.getElementById("savePDF").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    unit: "px",
    format: "a4",
  });

  // Инициализируем шрифт (чтобы не было кракозябр)
  initPdfFonts(doc);

  // Получаем дату в удобном виде
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const dateString = `${day}.${month}.${year}`;

  // 1) Скриншот canvas
  const canvas = document.getElementById("balanceWheel");
  const canvasData = canvas.toDataURL("image/png");

  let yPos = 20;
  doc.setFontSize(14);
  // Заголовок
  doc.text(`Mentorist Balance Wheel (${dateString})`, 20, yPos);
  yPos += 20;

  // Добавляем изображение колеса
  doc.addImage(canvasData, "PNG", 20, yPos, 200, 200);
  yPos += 220;

  // 2) Сферы + средние
  doc.setFontSize(12);
  let total = 0, count = 0;
  spheres.forEach((sphere) => {
    let sum = 0, cnt = 0;
    sphere.questions.forEach((question) => {
      const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
      sum += parseInt(slider.value);
      cnt++;
      total += parseInt(slider.value);
      count++;
    });
    const avg = (sum / (cnt || 1)).toFixed(1);
    const lineText = `${sphere.emoji} ${sphere.title[currentLanguage]}: ${avg}`;
    doc.text(lineText, 20, yPos);
    yPos += 15;
  });
  const overall = (total / (count || 1)).toFixed(1);
  const overallText = (currentLanguage === "ru" ? "Общее среднее: " : "Overall Average: ") + overall;
  doc.text(overallText, 20, yPos);

  // Сохраняем PDF
  doc.save("results.pdf");
});

/****************************************
 * 6. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
 ****************************************/
document.addEventListener("DOMContentLoaded", () => {
  // Рисуем вкладки/ползунки
  renderTabs();
  // Отображаем дату
  updateDateDisplay();
  // Рисуем колесо
  drawWheel();
  // Обновим кнопку темы (т.к. darkMode = true)
  themeBtn.innerText = "🌙 Dark Theme";
  // Кнопка языка (т.к. currentLanguage = "en")
  langBtn.innerText = "🌐 RU";
});
