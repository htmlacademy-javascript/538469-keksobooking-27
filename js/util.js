const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (element) => element[getRandomPositiveInteger(0, element.length - 1)];


const showMessageSuccess = () => {
  const message = successMessageTemplate.cloneNode(true);

  document.body.append(message);

  window.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
      message.remove();
    }
  });

  message.addEventListener('click', () => {
    message.remove();
  });
};

const showMessageError = () => {
  const message = errorMessageTemplate.cloneNode(true);

  document.body.append(message);

  window.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
      message.remove();
    }
  });

  message.querySelector('.error__button').addEventListener('click', () => {
    message.remove();
  });

  message.addEventListener('click', () => {
    message.remove();
  });
};

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  showMessageSuccess,
  showMessageError,
};
