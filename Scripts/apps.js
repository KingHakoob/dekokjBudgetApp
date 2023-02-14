import { UpdateLocalStorageBudgetValue, SaveExpenseToLocalStorage, GetLocalStorageExpenses, RemoveExpenseFromLocalStorage } from './localStorage.js';
import { OnStart, UpdateBudgetBalance, CreateTransLog, ManageExpensesModal } from './functions.js';

let balanceValue = document.getElementById('balanceValue');
let budgetInput = document.getElementById('budgetInput');
let modalUpdateBudgetBtn = document.getElementById('modalUpdateBudgetBtn');

let expenseInput = document.getElementById('expenseInput');
let expenseNameInput = document.getElementById('expenseNameInput');
let modalAddExpenseBtn = document.getElementById('modalAddExpenseBtn');

let manageExpensesBtn = document.getElementById('manageExpensesBtn'); 

modalUpdateBudgetBtn.addEventListener('click', function(){
    UpdateLocalStorageBudgetValue(budgetInput.value);
    balanceValue.textContent = UpdateBudgetBalance();
    CreateTransLog();
})

manageExpensesBtn.addEventListener('click', function(){
    ManageExpensesModal();
})

modalAddExpenseBtn.addEventListener('click', function(){
    let expense = {
        expenseName: expenseNameInput.value,
        expenseValue: expenseInput.value
    };

    SaveExpenseToLocalStorage(expense);
    expenseNameInput.value = '';
    expenseInput.value = '';
    balanceValue.textContent = UpdateBudgetBalance();
})

OnStart();