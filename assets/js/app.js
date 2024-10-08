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
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
//////////////////////////////////////////////////
// Application Functions
//////////////////////////////////////////////////
const addTransaction = (e) => {
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter a valid amount');
    } else {
        const transaction = {
            id: generateRandomId(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}
const generateRandomId = () => {
    return Math.floor(Math.random() * 1000578478);
}
const addTransactionDOM = (transaction) => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus': 'plus');
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-button" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}
const updateValues = () => {
    const amounts = transactions
        .map((transaction) => transaction.amount);
    const total = amounts
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);
    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}
const removeTransaction = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
//////////////////////////////////////////////////
// Application Initializer
//////////////////////////////////////////////////
const init = () => {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}
init();
//////////////////////////////////////////////////
// Application Event Handlers
//////////////////////////////////////////////////
form.addEventListener('submit', addTransaction);