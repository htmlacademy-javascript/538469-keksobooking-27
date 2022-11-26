import {blockForm, unblockFilters, initValidation} from './form.js';
import {initMap, createAdsMarkers} from './map.js';
import {getData} from './api.js';
import {showMessageError} from './popup.js';
import {setFilterListener} from './filter.js';

blockForm();
initValidation();

initMap(() => {
  getData((ads) => {
    unblockFilters();
    createAdsMarkers(ads);
    setFilterListener(ads);
  }, () => showMessageError());
});

