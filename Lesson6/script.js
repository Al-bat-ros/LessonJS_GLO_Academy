'use strict';

let money,
    start = function(){
        do {
          money = +prompt('Ваш месячный доход?');   
        } while (isNaN(money) || money === '' || money === 0);
    };
start();

let question1, question2;

 let appData = {
         income: {},
         addIncome: [],
         expenses: {},
         addExpenses: [],
         deposit: false,
         mission: 50000,
         period: 3,
         asking: function(){
                appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
                appData.addExpenses = appData.addExpenses.toLowerCase().split();
                appData.deposit = confirm('Есть ли у вас депозит в банке?');
                for (let i = 0; i < 2; i++){
                    let question;
                    
                    if( i === 0){
                        question = prompt('Введите обязательные ежемесячные расходы у вас есть?', 'Садик');    
                    }
                    if(i === 1){
                        question =  prompt('Введите обязательные ежемесячные расходы у вас есть?', 'КвартПлата');
                    }

                    let res = +prompt('Во сколько это обойдется?');

                    while (isNaN(res) || res === '' || res === 0) {
                        res = +prompt('Во сколько это обойдется?');
                    }
                   appData.expenses[question] = res;
                }
         },
         budget: money,
         budgetDay: 0,
         budgetManth: 0,
         expensesMonth: 0,
         //возвращает сумму всех расходов за месяц
         getExpensesMonth: function(){
                let sum = 0;
                for (let variable in appData.expenses){
                     sum += appData.expenses[variable];   
                }
                appData.expensesMonth = sum;
        },
        //возвращает Накопления за месяц (Доходы минус расходы)
        getBudget: function(option){
            let budgetManth = Math.floor(money - appData.expensesMonth);
            let budgetDay = Math.floor((budgetManth / 30));
            if (option == 'budgetManth'){
                return budgetManth;
            } else if (option == 'budgetDay'){
                return budgetDay;
            }
                
        },
        // за какой период достигнута цель
        getTargetMonth: function(){
            let targetText;
            let targetSum = Math.floor(appData.mission / accumulatedMonth);
            if (targetSum < 0) {
                    targetText = ' не будет достигнута';
            } else {
                    targetText = 'будет достигнута за ' + targetSum + ' м.';
            }
            return targetText;
        },
        // уровень дохода
        getStatusIncome: function(){
            let resBudgetDay = appData.getBudget('budgetDay'); 
            if (resBudgetDay >= 800) {
                return 'Высокий уровень дохода';
                
        } else if (resBudgetDay >= 300 && resBudgetDay < 800) {
                return'Средний уровень дохода';

        } else if (resBudgetDay >= 0 && resBudgetDay < 300) {
                return 'Низкий уровень дохода';

        } else if (resBudgetDay < 0) {
                return 'Что то пошло не так';
        }
        }


 }

appData.asking();

let expensesAmount = appData.getExpensesMonth();
let accumulatedMonth = appData.getBudget('budgetManth');
console.log('Наша программа включает в себя данные: ')
for (let data in appData){
    console.log(data + ': ' + appData[data]);
}

console.log('сумму всех расходов за месяц: '+ appData.expensesMonth);
console.log('Накопления за месяц: '+ appData.getBudget('budgetManth'));
console.log('Цель в ' + appData.mission + ' рублей ' + appData.getTargetMonth());
console.log('бюджет на день: ' + appData.getBudget('budgetDay'));
console.log(appData.getStatusIncome());

console.log(appData.deposit);


