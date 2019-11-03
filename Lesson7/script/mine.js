'use strict';

let tegUl = document.querySelector('ul');
let input = document.querySelector('input');
let btn = document.querySelector('button');


btn.addEventListener('click', function(){
    let elem = document.createElement('li');
    elem.textContent = input.value;
    tegUl.appendChild(elem); 
})
