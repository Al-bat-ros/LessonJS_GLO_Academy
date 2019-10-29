// задача 1
let arr = [];
arr.push('124', '555', '28', '455', '333', '2450', '44');

for (let i = 0; i < arr.length; i++){

    let arrText = +arr[i].substr(0, 1);

        if ( arrText === 2 || arrText === 4){
        console.log(arr[i]);
        }
} 

// задача 2

for (let i = 1; i <= 100; i++){
    let count = 0;
    for (let x = 1; x <= i; x++){
        
        if (i % x == 0){
            count++;
        }  

    }
    if(count == 2){
        document.write(i, ': Делители этого числа: 1 и ' + i +'<br/>');
    }
}

