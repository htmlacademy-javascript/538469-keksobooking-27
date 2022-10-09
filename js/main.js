function UserException (message) {
  this.message = message;
  this.name = 'User exception';
}

const getRandomInt = (lower, upper) => {
  if (lower >= upper || lower < 0) {
    throw new UserException('Неверно переданны аргументы при вызове функции');
  }

  const min = Math.ceil(lower);
  const max = Math.floor(upper);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, fractionDigits) => {
  if (min >= max || min < 0) {
    throw new Error('Аргументы функции должны быть положительными');
  }

  return Number((Math.random() * (max - min) + min).toFixed(fractionDigits));
};

try {
  getRandomInt(10, 12);
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err.message);
}

try {
  getRandomFloat(10, 12, 4);
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err.message);
}

// eslint-disable-next-line no-console
console.log(getRandomInt(10, 12));
// eslint-disable-next-line no-console
console.log(getRandomFloat(10, 12, 4));
