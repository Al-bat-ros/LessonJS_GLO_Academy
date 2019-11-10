'use strict';

let btnStart = document.getElementById('start'),
 btnCancel = document.getElementById('cancel'),
 plus = document.querySelectorAll('button'),
 plusIncome = plus[0],
 plusExpenses = plus[1],
 salary_amount = document.querySelector('.salary-amount'),
 checkBox = document.querySelector('#deposit-check'),
 addIncome = document.querySelectorAll('.additional_income-item'),
 addIncome1 = addIncome[0],
 addIncome2 = addIncome[1],
 budgetMonth_value = document.querySelector('.budget_month-value'),
 budgetDay_value = document.querySelector('.budget_day-value'),
 expensesMonth_value = document.querySelector('.expenses_month-value'),
 additionalIncome_value = document.querySelector('.additional_income-value'),
 additionalExpenses_value = document.querySelector('.additional_expenses-value'),
 income_period = document.querySelector('.income_period-value'),
 targetAmount = document.querySelector('.target-amount'),
 targetMonth_value = document.querySelector('.target_month-value'),
 exp_title = document.querySelectorAll('.expenses-title'),
 exp_title2 = exp_title[1],
 exp_amount = document.querySelector('.expenses-amount'), 
 addExpenens_item = document.querySelector('.additional_expenses-item'),
 expensesItems = document.querySelectorAll('.expenses-items'),
 incomeItems = document.querySelectorAll('.income-items'),
 period_select = document.querySelector('.period-select'),
 period_amount = document.querySelector('.period-amount'),
 inputTypeText = document.querySelectorAll('.data'),
 incomeTitle = document.querySelectorAll('.income-title'),
 incomeAmount = document.querySelector('.income-amount'),
 inputData = document.querySelectorAll('input');
 let count2 = 0;
 let count1 = 0;
 
function addExpensValid(count2) {
   console.log(1);
}

 let appData = {
         budget: 0,
         budgetDay: 0,
         budgetManth: 0,
         expensesMonth: 0,
         income: {},
         incomeMonth: 0,
         addIncome: [],
         expenses: {},
         addExpenses: [],
         deposit: false,
         percentDeposite: 0,
         moneyDeposit: 0,
         
         start: function(){

            appData.budget = +salary_amount.value;

            appData.getExpenses();
            appData.getExpensesMonth();
            appData.getIncome();
            appData.getIncomeMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getBudget();
            appData.getTargetMonth();
            appData.rangePeriod();
            appData.inputTypeTextBlock();
            appData.showResult();
            
         },
         showResult: function(){
            budgetMonth_value.value = appData.budgetManth;
            budgetDay_value.value = appData.budgetDay;
            expensesMonth_value.value = appData.expensesMonth;
            additionalExpenses_value.value = appData.addExpenses.join(', ');
            additionalIncome_value.value = appData.addIncome.join(', ');
            targetMonth_value.value = appData.getTargetMonth();
            income_period.value = appData.calcPeriod();
            

         },
         //клонирования блока дополнительный доход
         addIncomeBlock: function(){
           
           let cloneIncomeItem = incomeItems[0].cloneNode(true);
           cloneIncomeItem.children[0].value = '';
           cloneIncomeItem.children[1].value = '';

           incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome );
           incomeItems = document.querySelectorAll('.income-items');
           count1 += 1;

           addItemsValid(count1);
           addItemsValidNum(count1);
           if (incomeItems.length === 3){
               plusIncome.style.display = 'none';
           }
         },
         //клонирования блока обязательные расходы
         addExpenensBlock: function(){
        
             let cloneExpensesItem = expensesItems[0].cloneNode(true);
             cloneExpensesItem.children[0].value = '';
             cloneExpensesItem.children[1].value = '';
             
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
            expensesItems = document.querySelectorAll('.expenses-items');
            count2 += 1;

            addExpensValid(count2);
            addExpensValidNum(count2);
            if (expensesItems.length === 3){
                plusExpenses.style.display = 'none';
            }
         },
         getExpenses: function(){
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if (itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
         },
         getIncome: function(){
            incomeItems.forEach(function(item){
              let incomeTitle = item.querySelector('.income-title').value;
              let incomeAmount = item.querySelector('.income-amount').value;
            
               if (incomeTitle !== '' && incomeAmount !== ''){
                   appData.income[incomeTitle] = incomeAmount;
               }
            });

        },
         getAddExpenses: function(){
                let addExpenses = addExpenens_item.value.split(',');
                addExpenses.forEach(function(item){
                    item = item.trim();
                        if (item !== ''){
                            appData.addExpenses.push(item);
                        }
                });
         },
         getAddIncome: function(){
            addIncome.forEach(function(item){
                let itemValue = item.value.trim();
                if (itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
            });
         },
         //возвращает сумму всех доходов за месяц
         getIncomeMonth: function(){
                let sum = 0;
                for(let variable in appData.income){
                    sum += +appData.income[variable];
                }
                appData.incomeMonth = sum;
         },
         //возвращает сумму всех расходов за месяц
         getExpensesMonth: function(){
                let sum = 0;
                for (let variable in appData.expenses){
                     sum += +appData.expenses[variable];   
                }
                appData.expensesMonth = sum;
        },
        //возвращает Накопления за месяц (Доходы минус расходы)
        getBudget: function(){
            appData.budgetManth = Math.floor(appData.budget + appData.incomeMonth - appData.expensesMonth);
            appData.budgetDay = Math.floor((appData.budgetManth / 30));

                
        },
        // за какой период достигнута цель
        getTargetMonth: function(){
            
            return Math.ceil(targetAmount.value / appData.budgetManth);
            
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
        rangePeriod: function(){
            period_amount = document.querySelector('.period-amount');
            period_amount.innerText = period_select.value;
            
        },
        calcPeriod: function(){
            return appData.budgetexpensesManth * period_select.value;
        },
        //Блокировка инпутов
        inputTypeTextBlock: function(){
            let input1 = inputTypeText[0].getElementsByTagName('input');

            for (let i = 0; i < input1.length; i++){
                if (input1[i].getAttribute('type') === 'text'){
                input1[i].setAttribute('readonly', 'readonly');
                btnStart.style.display = 'none';
                btnCancel.style.display = 'block';
                }
            }
               
        },

        

 };
  //слушаем текст инпут
    let validInput = function(value){
        if (/[^а-я ]/g.test(value)){
        alert('Введите на кириллице');
        }
    };
     //слушаем клоны доходов
        incomeItems[0].children[0].addEventListener('input', function(){
            validInput(incomeItems[0].children[0].value);
        });
        function addItemsValid(count1){
            incomeItems[count1].children[0].addEventListener('input', function(){
                validInput(incomeItems[count1].children[0].value);
            });
        }

    addIncome1.addEventListener('input', function(){
        validInput(addIncome1.value);
    });
    addIncome2.addEventListener('input', function(){
        validInput(addIncome2.value);
    });
        expensesItems[0].children[0].addEventListener('input', function(){
            validInput(expensesItems[0].children[0].value);
        });
        function addExpensValid(count2){
            expensesItems[count2].children[0].addEventListener('input', function(){
                validInput(expensesItems[count2].children[0].value);
            });
        }
    addExpenens_item.addEventListener('input', function(){
        validInput(addExpenens_item.value);
    });

//слушаем числа инпут
let validNumInput = function(num){
if(Number.isNaN(num)){
    alert('Введите число');
}
};
salary_amount.addEventListener('input', function(){
    validNumInput(+salary_amount.value);
});
        //слушаем клоны блоков доходов
        incomeItems[0].children[1].addEventListener('input', function(){
            validNumInput(+incomeItems[0].children[1].value);
        });
        function addItemsValidNum(count1){
            incomeItems[count1].children[1].addEventListener('input', function(){
                validNumInput(+incomeItems[count1].children[1].value);
            });
        }
      
        //слушаем клоны блоков расходов
        expensesItems[0].children[1].addEventListener('input', function(){
            validNumInput(+expensesItems[0].children[1].value);
        });
        function addExpensValidNum(count2){
            expensesItems[count2].children[1].addEventListener('input', function(){
                validNumInput(+expensesItems[count2].children[1].value);
            });
        }


targetAmount.addEventListener('input', function(){
    validNumInput(+targetAmount.value);
});


 period_select.addEventListener('input', appData.rangePeriod);
 period_select.addEventListener('input', appData.showResult);

 plusIncome.addEventListener('click', appData.addIncomeBlock);
 plusExpenses.addEventListener('click', appData.addExpenensBlock);
 btnStart.addEventListener('click', appData.start);







