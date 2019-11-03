'use strict';

let time = new Date();


let hours = time.getHours();
let minutes = time.getMinutes();
let seconds = time.getSeconds();
let day = time.getDay();
let month = time.getMonth();
let year = time.getFullYear();

let timeDay = function(elem){
    if (elem < 10 || elem === 0){
        return '0' + elem;
    } else {
        return elem;
    }
}

console.log(timeDay(hours) + ':' + timeDay(minutes) + ':' + timeDay(seconds) + ' ' + timeDay(day) + '.' + timeDay(month) + '.' + timeDay(year));