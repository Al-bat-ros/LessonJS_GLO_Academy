'use strict';

let money,
    start = function(){
        do {
          money = +prompt('Ваш месячный доход?');   
        } while (isNaN(money) || money === '' || money === 0);
    };
start();
 let appData = {
         income: {},
         addIncome: [],
         expenses: {},
         addExpenses: [],
         deposit: false,
         mission: 50000,
         period: 3,
         asking: function(){
                addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
                appData.addExpenses = addExpenses.toLowerCase().split();
                appData.deposit = confirm('Есть ли у вас депозит в банке?');
         }
 }


//возвращает сумму всех расходов за месяц
let question1, question2;
function getExpensesMonth() {
       let sum = 0;
       for (let i = 0; i < 2; i++){
               if( i === 0){
                question1 = prompt('Введите обязательные ежемесячные расходы у вас есть?', 'Садик');    
               }
               if(i === 1){
                question2 =  prompt('Введите обязательные ежемесячные расходы у вас есть?', 'КвартПлата');
               }

               let res = +prompt('Во сколько это обойдется?');

               while (isNaN(res) || res === '' || res === 0) {
                   res = +prompt('Во сколько это обойдется?');
               }
             sum += res ;
       }
       return sum;
}

let expensesAmount = getExpensesMonth();
let budgetManth = money - expensesAmount;
let budgetDay = Math.floor((budgetManth / 30));


//возвращает Накопления за месяц (Доходы минус расходы)
function getAccumulatedMonth() {
        return Math.floor(money - expensesAmount);
}

let accumulatedMonth = getAccumulatedMonth();

// за какой период достигнута цель
function getTargetMonth() { 
        let targetText;
        let targetSum = Math.floor(appData.mission / accumulatedMonth);
        if (targetSum < 0) {
                targetText = ' не будет достигнута';
        } else {
                targetText = 'будет достигнута за ' + targetSum + ' м.';
        }
        return targetText;
}

console.log('сумму всех расходов за месяц: '+ expensesAmount);
console.log('Накопления за месяц: '+ getAccumulatedMonth());
console.log('Цель в ' + appData.mission + ' рублей ' + getTargetMonth());
console.log('бюджет на день: ' + budgetDay);

// уровень дохода
let getStatusIncome = function() {

        if (budgetDay >= 800) {
                return 'Высокий уровень дохода';
                
        } else if (budgetDay >= 300 && budgetDay < 800) {
                return'Средний уровень дохода';

        } else if (budgetDay >= 0 && budgetDay < 300) {
                return 'Низкий уровень дохода';

        } else if (budgetDay < 0) {
                return 'Что то пошло не так';
        }
};

console.log(getStatusIncome());


 let showTypeOf = function(date){
         console.log(date, typeof(date));
 };


console.log(appData.deposit);
showTypeOf(money);
showTypeOf(appData.income);
showTypeOf(appData.deposit);

