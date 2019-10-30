'use strict';

let week = [];
week.push('Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье');

let date = new Date();
let dayWeek;


for (let i = 0; i < week.length; i++){
    
        if (i === 5 || i === 6 ){
            dayWeek = week[i].italics(); 
        } else if (i === date.getDay()-1){    
            dayWeek = week[i].bold();
        } else {
            dayWeek = week[i];
        }
        document.write(dayWeek + '<br/>');
}
