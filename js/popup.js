const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const isEscKey = (evt) => evt.key === 'Escape';

const showMessageSuccess = () => {
  const message = successMessageTemplate.cloneNode(true);

  document.body.append(message);

  const onClose = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
  };

  function onDocumentKeyDown (evt) {
    if(isEscKey(evt)) {
      onClose();
    }
  }

  document.addEventListener('keydown', onDocumentKeyDown);

  message.addEventListener('click', () => onClose());
};

const showMessageError = () => {
  const message = errorMessageTemplate.cloneNode(true);

  document.body.append(message);

  const onClose = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
  };

  function onDocumentKeyDown (evt) {
    if(isEscKey(evt)) {
      onClose();
    }
  }

  document.addEventListener('keydown', onDocumentKeyDown);

  message.addEventListener('click', () => onClose());
};

export {
  showMessageSuccess,
  showMessageError,
};
