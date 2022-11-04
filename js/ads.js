const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const APARTMENT_TYPE_RUS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const renderFeaturesList = (cardElement, data ) => {
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const modifiers = data.map((feature) => `popup__feature--${feature}`);

  featuresList.forEach((featuresListItem) => {
    const modifier = featuresListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featuresListItem.remove();
    }
  });
};

const renderPhotosList = (cardElement, data) => {
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');
  photosContainer.removeChild(photoTemplate);

  data.forEach((element) => {
    const photo = photoTemplate.cloneNode();
    photo.src = element;
    photosContainer.appendChild(photo);
  });
};

const renderAd = ({ author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);
  const span = cardElement.querySelector('.popup__text--price span').cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} `;
  cardElement.querySelector('.popup__text--price').insertAdjacentElement('beforeend', span);
  cardElement.querySelector('.popup__type').textContent = APARTMENT_TYPE_RUS[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (offer.features.length) {
    renderFeaturesList(cardElement, offer.features);
  } else {
    cardElement.querySelector('.popup__features').classList.add('hidden');
  }

  if (offer.description) {
    cardElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }

  if (offer.photos.length) {
    renderPhotosList(cardElement, offer.photos);
  } else {
    cardElement.querySelector('.popup__photos').classList.add('hidden');
  }

  cardElement.querySelector('.popup__avatar').src = author.avatar;

  return cardElement;
};

export {renderAd};
