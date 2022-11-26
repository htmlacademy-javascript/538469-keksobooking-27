import {sendData} from './api.js';
import {showMessageSuccess, showMessageError} from './popup.js';
import {setDefaultLocationMainPin, closeAllPopup, setMapDefaultCoordinates, clearMarkerGroup} from './map.js';

const MAX_RANGE_SLIDER = 100000;
const START_SLIDER = 1000;
const STEP_SLIDER = 1;

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const apartmentTypeElement = adForm.querySelector('#type');
const priceElement = adForm.querySelector('#price');
const timeContainer = adForm.querySelector('.ad-form__element--time');
const timeElements = timeContainer.querySelectorAll('select');
const sliderElement = document.querySelector('.ad-form__slider');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');
const uploadYourPhoto = adForm.querySelector('.ad-form-header__input');
const previewYourPhoto = adForm.querySelector('.ad-form-header__preview img');
const uploadPhotoApartment = adForm.querySelector('.ad-form__input');
const previewPhotoApartment = adForm.querySelector('.ad-form__photo');
const defaultPathYourPhoto = 'img/muffin-grey.svg';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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
  toggleElementsState(adForm.children, false);
};

const unblockFilters = () => {
  mapFilters.classList.remove('ad-form--disabled');
  toggleElementsState(mapFilters.children, false);
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_RANGE_SLIDER,
  },
  start: START_SLIDER,
  step: STEP_SLIDER,
  connect: 'lower',
  format: {
    from: function (value) {
      return parseInt(value, 10);
    },
    to: function (value) {
      return parseInt(value, 10);
    }
  }
});

sliderElement.noUiSlider.on('update', () => {
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
      max: MAX_RANGE_SLIDER,
    },
  });
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
  priceElement.dataset.pristineMinMessage = `Минимальное значение — ${minPrice}`;
  pristine.validate(priceElement);
};

const onPriceChange = () => {
  pristine.validate(priceElement);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetPage = () => {
  clearMarkerGroup();
  adForm.reset();
  mapFilters.reset();
  priceElement.value = housingTypeToMinPrice[apartmentTypeElement.value];
  priceElement.placeholder = housingTypeToMinPrice[apartmentTypeElement.value];
  sliderElement.noUiSlider.set(0);
  setDefaultLocationMainPin();
  pristine.reset();
  closeAllPopup();
  setMapDefaultCoordinates();
  previewYourPhoto.src = defaultPathYourPhoto;
  if (previewPhotoApartment.firstChild) {
    previewPhotoApartment.removeChild(previewPhotoApartment.firstChild);
  }
};

resetButton.addEventListener('click', resetPage);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendData(
      () => {
        unblockSubmitButton();
        resetPage();
        showMessageSuccess();
      },
      () => {
        showMessageError();
        unblockSubmitButton();
      },
      formData
    );
  }
};

uploadYourPhoto.addEventListener('change', () => {
  const file = uploadYourPhoto.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewYourPhoto.src = URL.createObjectURL(file);
  }
});

uploadPhotoApartment.addEventListener('change', () => {
  const file = uploadPhotoApartment.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    previewPhotoApartment.style.display = 'flex';
    previewPhotoApartment.style.alignItems = 'center';
    if (previewPhotoApartment.firstChild) {
      previewPhotoApartment.removeChild(previewPhotoApartment.firstChild);
    }
    previewPhotoApartment.insertAdjacentElement('afterbegin', img);
  }
});

const initValidation = () => {
  pristine.addValidator(roomNumberElement, validateRoomNumber, getRoomNumberErrorMessage);
  pristine.addValidator(capacityElement, validateRoomNumber, getCapacityErrorMessage);
  pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

  capacityElement.addEventListener('change', onCapacityChange);
  roomNumberElement.addEventListener('change', onCapacityChange);
  apartmentTypeElement.addEventListener('change', onApartmentTypeChange);
  priceElement.addEventListener('change', onPriceChange);
  timeContainer.addEventListener('change', onTimeChange);
  adForm.addEventListener('submit', onFormSubmit);
};

export {blockForm, unblockForm, unblockFilters, initValidation, resetPage};
