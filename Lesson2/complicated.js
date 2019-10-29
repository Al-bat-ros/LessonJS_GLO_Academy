
let num = 266219;
let str = String(num);
let result = +str[0] * +str[1] * +str[2] * +str[3] * +str[4] * +str[5];
let extent = result ** 3;
console.log(extent);

let exStr = String(extent);
console.log(exStr[0] + exStr[1]);





// либо так (вперёд забегаю)

let res = +str[0];
for (let i = 1; i < str.length; i++){
 res *= +str[i];
}
console.log(res ** 3);
