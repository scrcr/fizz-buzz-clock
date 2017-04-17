class FizzBuzzClock {
  constructor(currentDate){
    this.currentDate = currentDate;
    this.currentTime = {};
    this.currentTime.hour = this.fizzBuzzify(this.currentDate.getHours());
    this.currentTime.minute = this.fizzBuzzify(this.currentDate.getMinutes());
    this.currentTime.second = this.fizzBuzzify(this.currentDate.getSeconds());
  }

  doZeroPadding(number) {
    if(!isFinite(number)){
      return number;
    }
    
    return (Array(2).join('0') + number).slice(-2);
  }

  fizzBuzzify(number) {
    if(number === 0){
      return this.doZeroPadding(number);
    }
    
    let fizzElement = '<div class="fizz">Fi<br>zz</div>';
    let buzzElement = '<div class="buzz">Bu<br>zz</div>';
    let fizzBuzzElement = `<div class="fizz-buzz">${fizzElement}${buzzElement}</div>`;
    let fizz = number % 3 ? false : fizzElement;
    let fizzBuzzedNumber =  number % 5 ? fizz || number : fizz ? fizzBuzzElement: buzzElement;
    
    return this.doZeroPadding(fizzBuzzedNumber);
  }

  tick() {
    document.getElementById("jsi-fizz-buzz-clock-hour").innerHTML = this.currentTime.hour;
    document.getElementById("jsi-fizz-buzz-clock-minute").innerHTML = this.currentTime.minute;
    document.getElementById("jsi-fizz-buzz-clock-second").innerHTML = this.currentTime.second;
  }
}

setInterval(() => {
  let fizzBuzzClock = new FizzBuzzClock(new Date());
  fizzBuzzClock.tick();
},1000);