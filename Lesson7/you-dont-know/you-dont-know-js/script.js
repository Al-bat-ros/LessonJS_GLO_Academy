'use strict';

//Первое задание

 let books = document.querySelectorAll('.books'), book = document.querySelectorAll('.book');

 books[0].insertBefore(book[5], book[2]);
 books[0].insertBefore(book[3], book[5]);
 books[0].insertBefore(book[4], book[3]);
 books[0].insertBefore(book[0], book[4]);
 

document.querySelector('body').style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

let elem = document.querySelectorAll('a');
elem[2].innerText = 'Книга 3. this и Прототипы Объектов';

let spam = document.querySelector('.adv');

spam.parentNode.removeChild(spam);



let ulText = document.querySelectorAll('ul'), liText = document.querySelectorAll('li');

ulText[1].insertBefore(liText[14], liText[10]);
ulText[1].insertBefore(liText[12], liText[14]);

ulText[4].insertBefore(liText[45], liText[39]);
ulText[4].insertBefore(liText[38], liText[42]);
ulText[4].insertBefore(liText[41], liText[44]);

let elemLi = document.createElement('li');
elemLi.textContent = 'Глава 8: За пределами ES6';
ulText[5].appendChild(elemLi);




