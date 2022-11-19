import {blockForm, unblockFilters, initValidation} from './form.js';
import {initMap, createAdsMarkers} from './map.js';
import {getData} from './api.js';
import {showMessageError} from './util.js';

blockForm();
initValidation();
initMap();

getData((ads) => {
  createAdsMarkers(ads);
}, showMessageError, unblockFilters);

