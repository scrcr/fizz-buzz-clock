// import format from 'date-fns/format'
//
// const FIZZ_ELEMENT = '<div class="fizz">Fi<br>zz</div>'
// const BUZZ_ELEMENT = '<div class="fizz">Bu<br>zz</div>'
// const FIZZ_BUZZ_ELEMENT = `<div class="fizz-buzz">${FIZZ_ELEMENT}${BUZZ_ELEMENT}</div>`
//
// const isFizz = number => !(number % 3);
// const isBuzz = number => !(number % 5);
// const isFizzBuzz = number => isFizz(number) && isBuzz(number);
//
// const fizzBuzzify = number => {
//   if(isFizzBuzz(number)) {
//     return FIZZ_BUZZ_ELEMENT;
//   } else if(isFizz(number)) {
//     return FIZZ_ELEMENT;
//   } else if(isBuzz(number)) {
//     return BUZZ_ELEMENT;
//   } else {
//     return number;
//   }
// }
//
// const currentTime = () => {
//   const currentDate = Date.now()
//   return {
//     year: fizzBuzzify(format(currentDate, 'yyyy')),
//     month: fizzBuzzify(format(currentDate, 'MM')),
//     day: fizzBuzzify(format(currentDate, 'dd')),
//     hour: fizzBuzzify(format(currentDate, 'HH')),
//     minute: fizzBuzzify(format(currentDate, 'mm')),
//     second: fizzBuzzify(format(currentDate, 'ss'))
//   }
// }
//
// const tick = () => {
//   document.querySelector('#app').innerHTML = `
//   <div class='fizz-buzz-clock-bg'>
//     <div class="fizz-buzz-clock">
//       <div>${currentTime().hour}</div>
//       <span>:</span>
//       <div>${currentTime().minute}</div>
//       <span>:</span>
//       <div>${currentTime().second}</div>
//     </div>
//   </div>
//   `
// }
//
// setInterval(() => { tick() }, 1000)

import { h, app } from "hyperapp"
import { interval } from "@hyperapp/time"

const FIZZ_ELEMENT = h('div',{class: "fizz"},['FI',h('br',{}),'ZZ'])
const BUZZ_ELEMENT = h('div',{class: "buzz"},['BU',h('br',{}),'ZZ'])
const FIZZ_BUZZ_ELEMENT = h('div',{class: "fizz-buzz"},[FIZZ_ELEMENT, BUZZ_ELEMENT])

const isFizz = number => !(number % 3);
const isBuzz = number => !(number % 5);
const isFizzBuzz = number => isFizz(number) && isBuzz(number);

const fizzBuzzify = number => {
  if(isFizzBuzz(number)) {
    return FIZZ_BUZZ_ELEMENT;
  } else if(isFizz(number)) {
    return FIZZ_ELEMENT;
  } else if(isBuzz(number)) {
    return BUZZ_ELEMENT;
  } else {
    return h('div', {}, number);
  }
}

const timeToUnits = t => [t.getHours(), t.getMinutes(), t.getSeconds()]

const formatTime = (hours, minutes, seconds) =>
  [
    fizzBuzzify(hours),
    h('span', {}, ":"),
    fizzBuzzify(`${minutes}`.padStart(2, '0')),
    h('span', {}, ":"),
    fizzBuzzify(`${seconds}`.padStart(2, '0'))
  ]

const posixToHumanTime = (time) =>
  formatTime(...timeToUnits(new Date(time)))

const Tick = (state, time) => ({
  ...state,
  time
})

const ToggleFormat = state => ({
  ...state,
  use24: !state.use24
})

const getInitialState = time => ({
  time,
  use24: false
})

app({
  init: getInitialState(Date.now()),
  view: state =>
    h("div", {class: 'fizz-buzz-clock-bg'}, [
      h("div", {class: 'fizz-buzz-clock'}, posixToHumanTime(state.time)),
    ]),
  subscriptions: state => interval(Tick, { delay: 1000 }),
  node: document.getElementById('app')
})
