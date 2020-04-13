'use strict';

var start;
var timer_id;
var elapsedTime = 0;

const start_stop = document.getElementById('start_stop');
const reset = document.getElementById('reset');
const timer = document.getElementById('timer');

//ボタンの処理
start_stop.addEventListener('click', function () {
  if (this.innerHTML === 'START') {
    start = new Date();
    timer_id = setInterval(gotimer, 10);
    this.innerHTML = 'STOP';
    start_stop.style.background = 'red';
  }
  else if (this.innerHTML === 'STOP') {
    clearTimeout(timer_id);
    elapsedTime += Date.now() - start;
    this.innerHTML = 'START';
    start_stop.style.background = 'blue';
  }
});
//RESETボタンの処理
reset.addEventListener('click', function () {
  timer.innerHTML = '00:00:00.000';
  start = new Date();
  elapsedTime = 0;
});
//タイマーの処理
var gotimer = function () {
  var now = new Date();
  var d = new Date(Date.now() - start.getTime() + elapsedTime);
  var milli = now.getTime() - start.getTime() + elapsedTime;
  var seconds = Math.floor(milli / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var ms = String(d.getMilliseconds()).padStart(3, '0');

  seconds = seconds - minutes * 60;
  minutes = minutes - hours * 60;
  timer.innerHTML = addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds) + '.' + ms;
}
//1桁のときに0をつける
var addZero = function (value) {
  if (value < 10) {
    value = '0' + value;
  }
  return value;
}