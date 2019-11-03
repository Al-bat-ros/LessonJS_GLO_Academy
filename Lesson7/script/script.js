'use strict';

let btnStart = document.getElementById('start');
let plus = document.querySelectorAll('button');
let plusIncome = plus[0];
let plusExpenses= plus[1];
let checkBox = document.querySelector('#deposit-check');
let addIncome = document.querySelectorAll('.additional_income-item');
let addIncome1 = addIncome[0];
let addIncome2 = addIncome[1];
let budget_month = document.querySelector('.budget_month-value');
let budget_day = document.querySelector('.budget_day-value');
let expenses_month = document.querySelector('.expenses_month-value');
let additional_income = document.querySelector('.additional_income-value');
let additional_expenses = document.querySelector('.additional_expenses-value');
let income_period = document.querySelector('.income_period-value');
let target_month = document.querySelector('.target_month-value');
let exp_title = document.querySelectorAll('.expenses-title');
let exp_title2 = exp_title[1];
let exp_amount = document.querySelector('.expenses-amount'); 
let addExpenens_item = document.querySelector('.additional_expenses-item');
let target_amount = document.querySelector('.target-amount');
let period_select = document.querySelector('.period-select');
let period_amount = document.querySelector('.period-amount');

'use strict';

let money,
    

let question1, question2;

 let appData = {
         income: {},
         addIncome: [],
         expenses: {},
         addExpenses: [],
         deposit: false,
         percentDeposite: 0,
         moneyDeposit: 0,
         mission: 50000,
         period: 3,
         start: function(){
            do {
              money = +prompt('Ваш месячный доход?');   
            } while (isNaN(money) || money === '' || money === 0);
         },
         asking: function(){

                if(confirm('Есть ли у вас доп.зароботок?')){
    
                    let itemIncome = prompt('Какой у вас есть дополнительный зароботок?', 'пеку блины');
 
                    while(itemIncome === 'string' || itemIncome === '' || !isNaN(itemIncome)){
                        itemIncome = prompt('Какой у вас есть дополнительный зароботок?', 'пеку блины');
                    }

                    let cashIncome = prompt('Скольке в месяц вы на этом заробатываете', 1000);

                    while(isNaN(cashIncome) || cashIncome === '0'){
                        cashIncome = prompt('Скольке в месяц вы на этом заробатываете', 1000);
                    }
                    appData.income[itemIncome] = cashIncome;

                }
                let addExp = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
                let arrAddExp = addExp.toLowerCase().split(',');

                
                for(let elem of arrAddExp){
                  appData.addExpenses.push(elem.charAt(0).toUpperCase() + elem.substring(1, elem.length));        
                }
            
                appData.deposit = confirm('Есть ли у вас депозит в банке?');
                for (let i = 0; i < 2; i++){
                    let question;
                    
                    if( i === 0){
                        question = prompt('Введите обязательные ежемесячные расходы у вас есть?', 'Садик');
                        while(question === '' || !isNaN(question)){
                            question = prompt('Введите обязательные ежемесячные расходы у вас есть?', 'Садик');
                        }    
                    }
                    if(i === 1){
                        question =  prompt('Введите обязательные ежемесячные расходы у вас есть?', 'КвартПлата');
                        while(question === '' || !isNaN(question)){
                            question =  prompt('Введите обязательные ежемесячные расходы у вас есть?', 'КвартПлата');
                        }
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
            appData.budgetManth = Math.floor(money - appData.expensesMonth);
            appData.budgetDay = Math.floor((appData.budgetManth / 30));
            if (option == 'budgetManth'){
                return appData.budgetManth;
            } else if (option == 'budgetDay'){
                return appData.budgetDay;
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
        },
        getInfoDeposit: function(){
            if(appData.deposit){
                let percent = prompt('Какой годовой процент?', 10);
                while(isNaN(percent) || percent === '' || percent === '0'){
                    percent = prompt('Какой годовой процент?', 10);
                }
                appData.percentDeposite = percent;

                let monDep = prompt('Какая сумма заложена?', 10000);
                while(isNaN(monDep) || monDep === '' || monDep === '0'){
                    monDep = prompt('Какая сумма заложена?', 10000);
                }
                appData.moneyDeposit = monDep;
            }
        },
        calcSavedMoney: function(){
            return appData.budgetManth * appData.period;
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
console.log(appData.addExpenses.join(', '));

// appData.getInfoDeposit();
// console.log( appData.moneyDeposit, appData.percentDeposite, appData.calcSavedMoney());




