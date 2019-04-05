
const FIZZ_ELEMENT = '<div class="fizz">Fi<br>zz</div>';
const BUZZ_ELEMENT = '<div class="buzz">Bu<br>zz</div>';
const FIZZ_BUZZ_ELEMENT = `<div class="fizz-buzz">${FIZZ_ELEMENT}${BUZZ_ELEMENT}</div>`;

const HOUR_ELEMENT = document.querySelector('#jsi-fizz-buzz-clock-hour');
const MINUTE_ELEMENT = document.querySelector('#jsi-fizz-buzz-clock-minute');
const SECOND_ELEMENT = document.querySelector('#jsi-fizz-buzz-clock-second');

const isFizz = (number) => !(number % 3);
const isBuzz = (number) => !(number % 5);
const isFizzBuzz = (number) => isFizz(number) && isBuzz(number);

function fizzBuzzify(number) {
  if(isFizzBuzz(number)) {
    return FIZZ_BUZZ_ELEMENT;
  } else if(isFizz(number)) {
    return FIZZ_ELEMENT;
  } else if(isBuzz(number)) {
    return BUZZ_ELEMENT;
  } else {
    return String(number).padStart(2, '0');
  }
}

function tick() {
  const currentDate = new Date();
  HOUR_ELEMENT.innerHTML = fizzBuzzify(currentDate.getHours());
  MINUTE_ELEMENT.innerHTML = fizzBuzzify(currentDate.getMinutes());
  SECOND_ELEMENT.innerHTML = fizzBuzzify(currentDate.getSeconds());
}

setInterval(tick, 1000);
