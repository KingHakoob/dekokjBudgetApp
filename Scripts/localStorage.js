import { AddExpneseToTransLog } from "./functions.js";

// Budget Local Storage Start
function GetLocalStorageBudgetValue(){
    let localStorageData = localStorage.getItem('BudgetValue');
    if(localStorageData == null){
        return [0.00];
    }
    return JSON.parse(localStorageData);
}

function UpdateLocalStorageBudgetValue(value){
    let budgetValue = GetLocalStorageBudgetValue();

    budgetValue = Number(value).toFixed(2);
    localStorage.setItem('BudgetValue', JSON.stringify(budgetValue));
    return budgetValue;
}
// Budget Local Storage End

// Expenses Local Storage Start
function SaveExpenseToLocalStorage(object){
    let expenses = GetLocalStorageExpenses();
    let dupeExpense = false;
    for(let i = 0; i < expenses.length; i++){
        if(expenses[i].expenseName == object.expenseName) { dupeExpense = true; }
    }

    if(dupeExpense) { alert('No Dupe Names Bro. How You Going To Tell Them Apart') }
    else {
        expenses.push(object);
        localStorage.setItem('Expenses', JSON.stringify(expenses));
        AddExpneseToTransLog();
    }
}

function GetLocalStorageExpenses(){
    let localStorageData = localStorage.getItem('Expenses');
    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
}

function RemoveExpenseFromLocalStorage(object){
    let expenses = GetLocalStorageExpenses();
    let valueIndex = 0;
    for(let i = 0; i < expenses.length; i++){
        if(expenses[i].expenseName == object.expenseName) { valueIndex = i; }
    }

    expenses.splice(valueIndex, 1);
    localStorage.setItem('Expenses', JSON.stringify(expenses));
}
// Expenses Local Storage End

export { GetLocalStorageBudgetValue, UpdateLocalStorageBudgetValue, SaveExpenseToLocalStorage, GetLocalStorageExpenses, RemoveExpenseFromLocalStorage };