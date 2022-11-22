import {debounce} from './utils.js';
import {clearMarkerGroup, createAdsMarkers} from './map.js';

const OFFERS_COUNT = 10;
const DEFAULT_FILTER = 'any';
const Price = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const filtersElement = document.querySelector('.map__filters');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const housingFeaturesElement = document.querySelectorAll('.map__checkbox');

const filterByType = ({offer}, type) =>
  type === DEFAULT_FILTER || offer.type === type;

const filterByPrice = ({offer}, price) => {
  switch (price) {
    case DEFAULT_FILTER:
      return true;
    case 'low':
      return offer.price < Price.MIDDLE;
    case 'middle':
      return offer.price < Price.HIGH && offer.price > Price.MIDDLE;
    case 'high':
      return offer.price >= Price.HIGH;
  }
};

const filterByRooms = ({offer}, rooms) =>
  rooms === DEFAULT_FILTER || offer.rooms === Number(rooms);

const filterByGuests = ({offer}, guests) =>
  guests === DEFAULT_FILTER || offer.guests === Number(guests);

const filterByFeatures = ({offer}, features) => {
  if (!features.length) {
    return true;
  }

  if (!offer.features) {
    return false;
  }

  return features.every((feature) => offer.features.includes(feature));
};

const getFilteredOffers = (offers) => {
  const selectedType = housingTypeElement.value;
  const selectedPrice = housingPriceElement.value;
  const selectedRooms = housingRoomsElement.value;
  const selectedGuests = housingGuestsElement.value;

  const selectedFeatures = [];
  housingFeaturesElement.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });

  const filteredOffers = [];

  for (const offer of offers) {
    if (filteredOffers.length >= OFFERS_COUNT) {
      break;
    }

    if (
      filterByType(offer, selectedType) &&
      filterByPrice(offer, selectedPrice) &&
      filterByRooms(offer, selectedRooms) &&
      filterByGuests(offer, selectedGuests) &&
      filterByFeatures(offer, selectedFeatures)
    ) {
      filteredOffers.push(offer);
    }
  }

  return filteredOffers;
};

const onFilterFormChange = (offers) => {
  clearMarkerGroup();
  const filteredOffers = getFilteredOffers(offers);
  createAdsMarkers(filteredOffers);
};

const setFilterListener = (ads) => {
  filtersElement.addEventListener('change', debounce(() => onFilterFormChange(ads)));
  filtersElement.addEventListener('reset', debounce(() => onFilterFormChange(ads)));
};

export {setFilterListener, getFilteredOffers};
