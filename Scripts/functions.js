import { GetLocalStorageBudgetValue, GetLocalStorageExpenses, RemoveExpenseFromLocalStorage } from "./localStorage.js";

let appTitle = document.getElementById('appTitle');
let balanceValue = document.getElementById('balanceValue');
let transLogCol = document.getElementById('transLogCol');
let manageExpensesModalBody = document.getElementById('manageExpensesModalBody');

function OnStart () {
    balanceValue.textContent = UpdateBudgetBalance();
    CreateTransLog();
}

function BalanceCheck(balance){
    if(balance < 0) { appTitle.textContent = 'What You Expected Me to Tell You When You Went Over Budget? You Have Eyes' }
    else { appTitle.textContent = 'This Yo Budget Foo'; }
}

function UpdateBudgetBalance() {
    let balance = Number(GetLocalStorageBudgetValue());

    for(let i = 0; i < GetLocalStorageExpenses().length; i++){ balance -= Number(GetLocalStorageExpenses()[i].expenseValue); }
    BalanceCheck(balance);
    return balance.toFixed(2);
}

function CreateTransLog(){
    transLogCol.innerHTML = '';

    let budgetName = document.createElement('p');
    budgetName.className = 'transLogName';
    budgetName.textContent = 'Budget: ';
    
    let budgetValue = document.createElement('p');
    budgetValue.className = 'transLogValue';
    budgetValue.textContent = GetLocalStorageBudgetValue();

    let budgetValueDiv = document.createElement('div');
    budgetValueDiv.className = 'transLogBalDiv';
    budgetValueDiv.appendChild(budgetName);
    budgetValueDiv.appendChild(budgetValue);
    transLogCol.appendChild(budgetValueDiv);

    for(let i = 0; i < GetLocalStorageExpenses().length; i++){
        let expenseName = document.createElement('p');
        expenseName.className = 'transLogName';
        expenseName.textContent = GetLocalStorageExpenses()[i].expenseName + ': ';

        let expenseValue = document.createElement('p')
        expenseValue.className = 'transLogValue';
        expenseValue.textContent = '-' + GetLocalStorageExpenses()[i].expenseValue;

        let expenseValueDiv = document.createElement('div');
        expenseValueDiv.className = 'transLogExpenseDiv';
        expenseValueDiv.appendChild(expenseName);
        expenseValueDiv.appendChild(expenseValue);
        transLogCol.appendChild(expenseValueDiv);
    }
}

function AddExpneseToTransLog(){
    let addedExpense = document.createElement('p');
    addedExpense.className = 'transLogName';
    addedExpense.textContent = 'Added ' + GetLocalStorageExpenses()[GetLocalStorageExpenses().length -1].expenseName + ': ';

    let addedExpenseValue = document.createElement('p');
    addedExpenseValue.className = 'transLogValue';
    addedExpenseValue.textContent = '-' + GetLocalStorageExpenses()[GetLocalStorageExpenses().length -1].expenseValue;

    let addedExpenseDiv = document.createElement('div');
    addedExpenseDiv.className = 'transLogExpenseDiv';
    addedExpenseDiv.appendChild(addedExpense);
    addedExpenseDiv.appendChild(addedExpenseValue);
    transLogCol.appendChild(addedExpenseDiv);
}

function RemovedExpneseToTransLog(index){
    let expenses = GetLocalStorageExpenses();

    let removedExpense = document.createElement('p');
    removedExpense.className = 'transLogName';
    removedExpense.textContent = 'Removed ' + expenses[index].expenseName + ': ';

    let removedExpenseValue = document.createElement('p');
    removedExpenseValue.className = 'transLogValue';
    removedExpenseValue.textContent = '+' + expenses[index].expenseValue;

    let removedExpenseDiv = document.createElement('div');
    removedExpenseDiv.className = 'transLogExpenseRemovedDiv';
    removedExpenseDiv.appendChild(removedExpense);
    removedExpenseDiv.appendChild(removedExpenseValue);
    transLogCol.appendChild(removedExpenseDiv);
}

function ManageExpensesModal(){
    manageExpensesModalBody.innerHTML = '';

    for(let i = 0; i < GetLocalStorageExpenses().length; i++){
        let expense = document.createElement('p');
        expense.textContent = GetLocalStorageExpenses()[i].expenseName +': ';

        let leftCol = document.createElement('div');
        leftCol.className = 'col-6 manageExpenseNameCol';
        leftCol.appendChild(expense);

        let expenseValue = document.createElement('p');
        expenseValue.textContent = '-' + GetLocalStorageExpenses()[i].expenseValue;

        let rightCol = document.createElement('div');
        rightCol.className = 'col-6 manageExpenseValueCol';
        rightCol.appendChild(expenseValue)

        let row = document.createElement('div');
        row.className = 'row';
        row.appendChild(leftCol);
        row.appendChild(rightCol);

        let removeExpenseBtn = document.createElement('button');
        removeExpenseBtn.className = 'btn btn-danger removeExpenseModalBtn';
        removeExpenseBtn.textContent = 'remove expense';
        removeExpenseBtn.addEventListener('click', function(){
            RemovedExpneseToTransLog(i);
            RemoveExpenseFromLocalStorage(GetLocalStorageExpenses()[i]);
            ManageExpensesModal();
            balanceValue.textContent = UpdateBudgetBalance();
        })

        let btnCol = document.createElement('div');
        btnCol.className = 'col-12 removeExpenseBtnCol';
        btnCol.appendChild(removeExpenseBtn);

        let bottomRow = document.createElement('div');
        bottomRow.className = 'row';
        bottomRow.appendChild(btnCol);

        let div = document.createElement('div');
        div.className = 'manageExpenseModalSpacing';
        div.appendChild(row);
        div.appendChild(bottomRow);
        manageExpensesModalBody.appendChild(div);
    }
}

export { OnStart ,UpdateBudgetBalance, CreateTransLog, AddExpneseToTransLog, ManageExpensesModal }