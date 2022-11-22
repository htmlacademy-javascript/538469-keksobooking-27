import {debounce, throttle} from './utils.js';

const OFFERS_COUNT = 10;
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

const filterByType = (offer, type) =>
  type === 'any' || offer.offer.type === type;

const filterByPrice = (offer, price) => {
  switch(price) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < Price.MIDDLE;
    case 'middle':
      return offer.offer.price < Price.HIGH && offer.offer.price > Price.MIDDLE;
    case 'high':
      return offer.offer.price >= Price.HIGH;
  }
};

const filterByRooms = (offer, rooms) =>
  rooms === 'any' || offer.offer.rooms === Number(rooms);

const filterByGuests = (offer, guests) =>
  guests === 'any' || offer.offer.guests === Number(guests);

const filterByFeatures = (offer, features) => {
  if(!features.length) {
    return true;
  }

  if(!offer.offer.features) {
    return false;
  }

  return features.every((feature) => offer.offer.features.includes(feature));
};

const getFilteredOffers = (offers) => {
  const selectedType = housingTypeElement.value;
  const selectedPrice = housingPriceElement.value;
  const selectedRooms = housingRoomsElement.value;
  const selectedGuests = housingGuestsElement.value;

  const selectedFeatures = [];
  housingFeaturesElement.forEach((checkbox) => {
    if(checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });

  const filteredOffers = [];

  for(const offer of offers) {
    if(filteredOffers.length >= OFFERS_COUNT) {
      break;
    }
    if(
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

const setOnFilterChange = (ads, cb) => {
  filtersElement.addEventListener('change', () => {
    debounce(cb(getFilteredOffers(ads)));
  });
};

export {setOnFilterChange, getFilteredOffers};
