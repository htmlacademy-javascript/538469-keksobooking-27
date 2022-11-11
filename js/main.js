import {createSimilarAds} from './data.js';
import {renderAd} from './ads.js';
import {blockForm, unblockForm, initValidation} from './form.js';

const map = document.querySelector('.map__canvas');

const ads = createSimilarAds();
const ad = renderAd(ads[0]);

map.appendChild(ad);

blockForm();
unblockForm();
initValidation();
