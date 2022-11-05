const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const blockForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');

  for (const elem of adForm.children) {
    elem.disabled = true;
  }

  for (const elem of mapFilters.children) {
    elem.disabled = true;
  }
};

const unblockForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');

  for (const elem of adForm.children) {
    elem.disabled = false;
  }

  for (const elem of mapFilters.children) {
    elem.disabled = false;
  }
};

export {blockForm, unblockForm};
