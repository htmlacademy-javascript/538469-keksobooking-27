const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');

const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const guestToRooms = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['1', '2'],
  3: ['1'],
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

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
}, true);

const validateRoomNumber = () => roomsToGuests[roomNumberElement.value].includes(capacityElement.value);

const getRoomNumberErrorMessage = () => `Для указанного количества гостей требуется ${guestToRooms[capacityElement.value].join(' или ')} комнаты`;
const getCapacityErrorMessage = () => `Указанное количество комнат вмещает ${roomsToGuests[roomNumberElement.value].join(' или ')} гостей`;

const onCapacityChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};

const onRoomNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};

pristine.addValidator(roomNumberElement, validateRoomNumber, getRoomNumberErrorMessage);
pristine.addValidator(capacityElement, validateRoomNumber, getCapacityErrorMessage);

capacityElement.addEventListener('change', onCapacityChange);
roomNumberElement.addEventListener('change', onRoomNumberChange);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Можно отправлять');
  } else {
    // eslint-disable-next-line no-console
    console.log('Форма невалидна');
  }
});

export {blockForm, unblockForm};
