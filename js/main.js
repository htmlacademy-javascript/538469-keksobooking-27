import {createSimilarAds} from './data.js';
import {blockForm, initValidation} from './form.js';
import {initMap, createAdsMarkers} from './map.js';

const adsList = createSimilarAds();

const START_COORDINATES = {
  lat: 35.68233,
  lng: 139.75421,
};

blockForm();
initValidation();
initMap(START_COORDINATES);
createAdsMarkers(adsList);
