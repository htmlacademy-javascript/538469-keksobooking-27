import {unblockForm} from './form.js';
import {renderAd} from './ads.js';

const addressField = document.querySelector('#address');

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const regularIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const createAdMarker = (point) => {
  const {lat, lng} = point.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: regularIcon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(renderAd(point));
};

const initMap = (coordinates) => {
  map.setView(coordinates, 13);
  map.on('load', unblockForm());

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.setLatLng(coordinates);
  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const location = evt.target.getLatLng();
    addressField.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
  });
};

const createAdsMarkers = (adsList) => {
  adsList.forEach((ad) => {
    createAdMarker(ad);
  });
};

export {initMap, createAdsMarkers};
