const getData = (onSuccess, onFail, unblockFilters) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
      unblockFilters();
    })
    .catch(() => {
      onFail('При загрузке данных с сервера произошла ошибка');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess('Объявление успешно отправлено');
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
