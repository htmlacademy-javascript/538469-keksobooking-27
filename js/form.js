const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

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

export {blockForm, unblockForm};
