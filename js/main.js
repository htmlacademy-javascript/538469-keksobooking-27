const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (element) => element[getRandomPositiveInteger(0, element.length - 1)];

const getArray = (stringArray) => {
  const array = [];

  for(let i = 0; i < getRandomPositiveInteger(1, stringArray.length); i++) {
    const index = getRandomPositiveInteger(0, stringArray.length - 1);
    const element = stringArray[index];

    if (!array.includes(element)) {
      array.push(element);
    }
  }
  return array;
};

const SIMILAR_ADS_COUNT = 10;

const TITLE_ADS = [
  'Маленькая квартирка рядом с парком',
  'Чёткая хата',
  'Небольшая лавочка в парке',
  'Уютное гнездышко для молодоженов',
  'Тихая квартирка недалеко от метро',
  'Стандартная квартира в центре',
  'Квартира студия в престижном районе',
  'Милое гнездышко для фанатов Анимэ',
  'Императорский дворец в центре Токио',
  'Загородный дом для спокойного отдыха',
  'Милейший чердачок',
  'Хостел «Для друзей»',
  'Отель-музей',
  'Небольшая бюджетная комната для студентов',
];

const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;

const COST_MIN = 10000;
const COST_MAX = 100000;

const ROOMS_QUANTITY = [1, 2, 3, 100];
const GUESTS_QUANTITY = [0, 1, 2, 3];

const APARTMENT_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const TIME = ['12:00', '13:00', '14:00'];

const TYPE_FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTION_ADS = [
  'Хейтеров просьба не беспокоить.',
  'Комната в трёхкомнатной квартире, подойдёт молодым путешественникам.',
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Маленькая квартирка на чердаке. Для самых не требовательных.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
  'Отель для ценителей истории. Почуствуй себя героем из прошлого.',
  'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
  'Великолепная квартира-студия в центре Токио. Подходит как туристам, там и бизнесменам. Квартира полностью укомплектована и имеет свежий ремонт.',
  'Один из лучших хостелов для душевного общения. Ужинаем вместе и играем в «Мафию» по вечерам, вкусно готовим. Ежедневная уборка, бесплатный Wi-Fi, чистое постельное белье.',
  'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createAds = () => {
  const latitude = getRandomPositiveFloat(LATITUDE_MIN, LATITUDE_MAX, 5);
  const longitude = getRandomPositiveFloat(LONGITUDE_MIN, LONGITUDE_MAX, 5);

  return {
    author: {
      avatar: `img/avatars/user${String(getRandomPositiveInteger(1, 10)).padStart(2, 0)}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLE_ADS),
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(COST_MIN, COST_MAX),
      type: getRandomArrayElement(APARTMENT_TYPE),
      rooms: getRandomArrayElement(ROOMS_QUANTITY),
      guests: getRandomArrayElement(GUESTS_QUANTITY),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getArray(TYPE_FACILITIES),
      description: getRandomArrayElement(DESCRIPTION_ADS),
      photos: getArray(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    }
  };
};

const similarAds = Array.from({length: SIMILAR_ADS_COUNT}, createAds);

// eslint-disable-next-line no-console
console.log(similarAds);
