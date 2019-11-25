'use strict';

let btnStart = document.getElementById('start'),
 btnCancel = document.getElementById('cancel'),
 plus = document.querySelectorAll('button'),
 plusIncome = plus[0],
 plusExpenses = plus[1],
 salary_amount = document.querySelector('.salary-amount'),
 checkBox = document.querySelector('#deposit-check'),
 addIncome_item = document.querySelectorAll('.additional_income-item'),
 addIncome1 = addIncome_item[0],
 addIncome2 = addIncome_item[1],
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
 addExpenses_item = document.querySelector('.additional_expenses-item'),
 expensesItems = document.querySelectorAll('.expenses-items'),
 incomeItems = document.querySelectorAll('.income-items'),
 period_select = document.querySelector('.period-select'),
 period_amount = document.querySelector('.period-amount'),
 inputTypeText = document.querySelectorAll('.data'),
 incomeTitle = document.querySelectorAll('.income-title'),
 incomeAmount = document.querySelector('.income-amount'),
 inputData = document.querySelectorAll('input'),
 depositCheck = document.querySelector('#deposit-check'),
 depositBank = document.querySelector('.deposit-bank'),
 depositAmount = document.querySelector('.deposit-amount'),
 depositPercent = document.querySelector('.deposit-percent');

 let count2 = 0;
 let count1 = 0;
 
const AppData = function(){
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetManth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposite = 0;
    this.moneyDeposit = 0;
}; 
AppData.prototype.start = function(){
           
    this.budget = +salary_amount.value;
   
    this.getExpInc();
    // this.getAddExpenses();
    // this.getAddIncome();
    this.getInfoDeposit();
    this.getAddExpInc();
    this.getBudget();
    this.getTargetMonth();
    this.rangePeriod();
    this.inputTypeTextBlock();
    this.showResult();   
 };
 AppData.prototype.showResult = function(){
       
    budgetMonth_value.value = this.budgetManth;
    budgetDay_value.value = this.budgetDay;
    expensesMonth_value.value = this.expensesMonth;  
    additionalExpenses_value.value = this.addExpenses.join(', ');
    additionalIncome_value.value = this.addIncome.join(', ');
    targetMonth_value.value = this.getTargetMonth();
    income_period.value = this.calcPeriod();

 };
 // события 
AppData.prototype.eventListener = function(){
    //слушаем текст инпут
    const validInput = (value) =>{
        if (/[^аА-яЯ, ]/g.test(value)){
        alert('Введите на кириллице');
        }
    };
     //слушаем клоны доходов
        incomeItems[0].children[0].addEventListener('input', () => {
            validInput(incomeItems[0].children[0].value);
        });
        const addItemsValid = (count1) => {
            incomeItems[count1].children[0].addEventListener('input', () => {
                validInput(incomeItems[count1].children[0].value);
            });
        };
        addIncome1.addEventListener('input', () => {
            validInput(addIncome1.value);
        });
        addIncome2.addEventListener('input', () => {
            validInput(addIncome2.value);
        });
        expensesItems[0].children[0].addEventListener('input', () => {
            validInput(expensesItems[0].children[0].value);
        });
        const addExpensValid = count2 => {
            expensesItems[count2].children[0].addEventListener('input', () => {
                validInput(expensesItems[count2].children[0].value);
            });
        };
        addExpenses_item.addEventListener('input', () => {
            validInput(addExpenses_item.value);
        });
 //клонирования блока дополнительный доход
 AppData.prototype.addIncomeBlock = function(){
    
   const cloneIncomeItem = incomeItems[0].cloneNode(true);
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
 };
 //клонирования блока обязательные расходы
 AppData.prototype.addExpensesBlock = function(){

     const cloneExpensesItem = expensesItems[0].cloneNode(true);
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
 };
AppData.prototype.getExpInc = function(){

    const count = item => {
         const startStr = item.className.split('-')[0];
         const itemTitle = item.querySelector(`.${startStr}-title`).value;
         const itemAmount = item.querySelector(`.${startStr}-amount`).value;
         if (itemTitle !== '' && itemAmount !== ''){
            this[startStr][itemTitle] = itemAmount;
        }
    };
    expensesItems.forEach(count);
    incomeItems.forEach(count);

    //возвращает сумму всех расходов и доходов за месяц
    for(let key in appData.income){
        this.incomeMonth += +appData.income[key];
    }
    for (let key in appData.expenses){
        this.expensesMonth += +appData.expenses[key];   
    }
};
AppData.prototype.getInfoDeposit = function(){
    this.percentDeposite = depositPercent.value;
    this.moneyDeposit = depositAmount.value;
};
//=========================================================

//  AppData.prototype.getAddIncome = function(){
    
//     addIncome_item.forEach(item => {
//         let itemValue = item.value.trim();
//         if (itemValue !== ''){
//             this.addIncome.push(itemValue);
//         }
//     });
//  };
//  AppData.prototype.getAddExpenses = function(){
//     let addExpenses = addExpenses_item.value.split(',');
    
//     addExpenses.forEach(item => {
//         item = item.trim();
//             if (item !== ''){
//                 this.addExpenses.push(item);
//             }
//     });
// };
//=========================================================
AppData.prototype.getAddExpInc = function(){
    const arr = [];
    
    let count = item => {
       const startStr = item.className.split('-')[0];
       const itemIncExp = document.querySelector(`.${startStr}-item`);
      
       if (item.className === 'additional_income-item' && itemIncExp.value !== ''){  
          this.addIncome.push(item.value);
 
       }else if(item.className === 'additional_expenses-item' && itemIncExp.value !== ''){
          this.addExpenses.push(itemIncExp.value);
       }
    };

   addIncome_item.forEach(item => arr.push(item));
   arr.push(addExpenses_item);
   //console.log(arr);
   arr.forEach(count);
    console.log(this.addIncome);
    console.log(this.addExpenses);

};

//возвращает Накопления за месяц (Доходы минус расходы)
AppData.prototype.getBudget = function(){
    this.budgetManth = Math.floor(this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposite)/12);
     this.budgetDay = Math.floor((this.budgetManth / 30));     
};
// за какой период достигнута цель
AppData.prototype.getTargetMonth = function(){
    return Math.ceil(targetAmount.value / this.budgetManth);
},

AppData.prototype.rangePeriod = function(){
    period_amount.innerHTML = period_select.value;
    
},
AppData.prototype.calcPeriod = function(){
    return this.budgetManth * period_select.value;
},
//Блокировка инпутов
AppData.prototype.inputTypeTextBlock = function(){
    const input1 = inputTypeText[0].getElementsByTagName('input');

    for (let i = 0; i < input1.length; i++){
        if (input1[i].getAttribute('type') === 'text'){
        input1[i].setAttribute('readonly', 'readonly');
        btnStart.style.display = 'none';
        btnCancel.style.display = 'block';
        }
    }
       
},
//сброс
AppData.prototype.cancel = function(){
    btnStart.style.display = 'block';
    btnCancel.style.display = 'none';
    //Разблокировать импуты
    const input1 = inputTypeText[0].getElementsByTagName('input');
        for (let i = 0; i < input1.length; i++){
            if (input1[i].getAttribute('type') === 'text'){
                input1[i].removeAttribute('readonly');
            }
        }
    //сброс Месячный доход
    salary_amount.value = '';
    appData.budget = 0;
    appData.percentDeposite = 0;
    appData.moneyDeposit = 0;
    depositAmount.value = '';
    depositPercent.value = ''; 

    //сброс дополнительный доход
    for(let elems of incomeItems){
        elems.children[0].value = '';
        elems.children[1].value = '';
       }
    //сброс Возможный доход
    for(let obj of addIncome){ obj.value = '';}

    // Сброс обязательных расходов
    for(let elem of expensesItems){
     elem.children[0].value = '';
     elem.children[1].value = '';
    }
    //сброс возможных расходов
    addExpenses_item.value = '';
    // 
    targetAmount.value = '';   
    //Сброс вывода подсчетов
    
    appData.budgetManth = 0;
    appData.budgetDay = 0;
    appData.expensesMonth = 0;
    // сброс массива возможные доходы
    appData.addIncome.length = 0;
    // сброс массива возможные расходы
    appData.addExpenses.length = 0;
    // чистим expenses
    for(let exp in appData.expenses ){
        delete appData.expenses[exp];
    }
    // чистим income
    for(let inc in appData.income){
        delete appData.income[inc];
    }
    appData.showResult();   
};


//слушаем числа инпут
const validNumInput = (num) => {
if(Number.isNaN(num)){
    alert('Введите число');
}
};
salary_amount.addEventListener('input', () => {
    validNumInput(+salary_amount.value);
});
        //слушаем клоны блоков доходов
        incomeItems[0].children[1].addEventListener('input', ()=> {
            validNumInput(+incomeItems[0].children[1].value);
        });
       const addItemsValidNum = (count1) => {
            incomeItems[count1].children[1].addEventListener('input', () => {
                validNumInput(+incomeItems[count1].children[1].value);
            });
        };
      
        //слушаем клоны блоков расходов
        expensesItems[0].children[1].addEventListener('input', () => {
            validNumInput(+expensesItems[0].children[1].value);
        });
        const addExpensValidNum = (count2) => {
            expensesItems[count2].children[1].addEventListener('input', () =>{
                validNumInput(+expensesItems[count2].children[1].value);
            });
        };


        targetAmount.addEventListener('input', () => {
            validNumInput(+targetAmount.value);
        });
        period_select.addEventListener('input', appData.rangePeriod);
        period_select.addEventListener('input', appData.showResult.bind(appData));

        plusIncome.addEventListener('click', appData.addIncomeBlock.bind(appData));
        plusExpenses.addEventListener('click', appData.addExpensesBlock);


        btnStart.addEventListener('click', appData.start.bind(appData));
        btnCancel.addEventListener('click', appData.cancel.bind(appData));
};

const appData = new AppData();

appData.eventListener();


depositCheck.addEventListener('change', () => {
    if(depositCheck.checked){
       depositBank.style.display = 'inline-block';
       depositAmount.style.display = 'inline-block';
       appData.deposit ='true';
       depositBank.addEventListener('change', function() {
           let selectIndex = this.options[this.selectedIndex].value;
           if (selectIndex === 'other'){
               depositPercent.style.display = 'inline-block';
               depositPercent.value = '';
           }else{
            depositPercent.style.display = 'none';
            depositPercent.value = selectIndex;
           }
       });
    }else{
       depositBank.style.display = 'none';
       depositAmount.style.display = 'none';
       appData.deposit ='false';
    }
});






  
 




