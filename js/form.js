const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const apartmentTypeElement = adForm.querySelector('#type');
const priceElement = adForm.querySelector('#price');
const timeContainer = adForm.querySelector('.ad-form__element--time');
const timeElements = timeContainer.querySelectorAll('select');
const sliderElement = document.querySelector('.ad-form__slider');

const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const guestToRooms = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
};

const housingTypeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const toggleElementsState = (elements, state) => {
  for (const elem of elements) {
    elem.disabled = state;
  }
};

const blockForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');

  toggleElementsState(adForm.children, true);
  toggleElementsState(mapFilters.children, true);
};

const unblockForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');

  toggleElementsState(adForm.children, false);
  toggleElementsState(mapFilters.children, false);
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    from: function(value) {
      return parseInt(value);
    },
    to: function(value) {
      return parseInt(value);
    }
  }
});

sliderElement.noUiSlider.on('update', (...rest) => {
  priceElement.value = sliderElement.noUiSlider.get();
});

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
}, true);

const validateRoomNumber = () => roomsToGuests[roomNumberElement.value].includes(capacityElement.value);
const validatePrice = () => Number(priceElement.value) >= housingTypeToMinPrice[apartmentTypeElement.value];

const getRoomNumberErrorMessage = () => `Для указанного количества гостей требуется ${guestToRooms[capacityElement.value].join(' или ')} комнаты`;
const getCapacityErrorMessage = () => `Указанное количество комнат вмещает ${roomsToGuests[roomNumberElement.value].join(' или ')} гостей`;
const getPriceErrorMessage = () => `Минимальное значение — ${housingTypeToMinPrice[apartmentTypeElement.value]}`;

const onCapacityChange = () => {
  pristine.validate();
};

const onTimeChange = (evt) => {
  timeElements.forEach((item) => {
    item.value = evt.target.value;
  });
};

const onApartmentTypeChange = (evt) => {
  const minPrice = housingTypeToMinPrice[evt.target.value];
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: 100000,
    },
  });
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
  priceElement.dataset.pristineMinMessage = `Минимальное значение — ${minPrice}`;
  pristine.validate(priceElement);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Можно отправлять');
  } else {
    // eslint-disable-next-line no-console
    console.log('Форма невалидна');
  }
};

const initValidation = () => {
  pristine.addValidator(roomNumberElement, validateRoomNumber, getRoomNumberErrorMessage);
  pristine.addValidator(capacityElement, validateRoomNumber, getCapacityErrorMessage);
  pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

  capacityElement.addEventListener('change', onCapacityChange);
  roomNumberElement.addEventListener('change', onCapacityChange);
  apartmentTypeElement.addEventListener('change', onApartmentTypeChange);
  priceElement.addEventListener('change', onApartmentTypeChange);
  timeContainer.addEventListener('change', onTimeChange);
  adForm.addEventListener('submit', onFormSubmit);
};

export {blockForm, unblockForm, initValidation};
