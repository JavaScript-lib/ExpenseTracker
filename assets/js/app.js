//////////////////////////////////////////////////
// Application Variables
//////////////////////////////////////////////////
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const dummyTransactions = [
    {id: 1, text: 'Flower', amount: -20},
    {id: 2, text: 'Salary', amount: 300},
    {id: 3, text: 'Book', amount: -10},
    {id: 4, text: 'Camera', amount: 150}
];
const transactions = dummyTransactions;
//////////////////////////////////////////////////
// Application Functions
//////////////////////////////////////////////////
const addTransactionDOM = (transaction) => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus': 'plus');
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-button">x</button>
    `;
    list.appendChild(item);
}
//////////////////////////////////////////////////
// Application Event Listeners
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Application Initializer
//////////////////////////////////////////////////
const init = () => {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
}
init();