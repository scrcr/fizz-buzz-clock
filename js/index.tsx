import { h, app } from 'hyperapp'
import format from 'date-fns/format'

const FIZZ_ELEMENT = h("div", { class: "fizz" }, ['Fi', h('br'), 'zz'])
const BUZZ_ELEMENT = h("div", { class: "buzz" }, ['Bu', h('br'), 'zz'])
const FIZZ_BUZZ_ELEMENT = h("div", { class: "fizz-buzz" }, [FIZZ_ELEMENT, BUZZ_ELEMENT])

const isFizz = (number:number) => !(number % 3);
const isBuzz = (number:number) => !(number % 5);
const isFizzBuzz = (number:number) => isFizz(number) && isBuzz(number);

const fizzBuzzify = (number:number) => {
  if(isFizzBuzz(number)) {
    return FIZZ_BUZZ_ELEMENT;
  } else if(isFizz(number)) {
    return FIZZ_ELEMENT;
  } else if(isBuzz(number)) {
    return BUZZ_ELEMENT;
  } else {
    return number;
  }
}

const state = {
  currentTime: {
    year: '0000',
    month: '00',
    day: '00',
    hour: '00',
    minute: '00',
    second: '00'
  }
}

const actions = {
  setCurrentTime: (currentDate:date) => (state: State) => ({
    currentTime: {
      year: fizzBuzzify(currentDate, 'YYYY')),
      month: fizzBuzzify(format(currentDate, 'MM')),
      day: fizzBuzzify(format(currentDate, 'DD')),
      hour: fizzBuzzify(format(currentDate, 'HH')),
      minute: fizzBuzzify(format(currentDate, 'mm')),
      second: fizzBuzzify(format(currentDate, 'ss'))
    }
  }),
  tick: () => (state: State action: Actions) => {
    action.setCurrentTime(new Date());
  }
}

type State = typeof state;
type Actions = typeof actions;

const view = (state: State, actions: Actions) => (
  <div class='fizz-buzz-clock-bg'>
    <div class="fizz-buzz-clock">
      <div>{state.currentTime.hour}</div>
      <span>:</span>
      <div>{state.currentTime.minute}</div>
      <span>:</span>
      <div>{state.currentTime.second}</div>
    </div>
  </div>
)

const main = app(state, actions, view, document.body)
setInterval(main.tick, 1000)
