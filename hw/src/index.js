// Данные о пользователях Microsoft Store
const users = [
    { accountNumber: 12345, name: "Alice", products: ["Windows 10", "Office 365"], orderAmounts: [100, 200, 150] },
    { accountNumber: 67890, name: "Bob", products: ["Windows 11", "Visual Studio"], orderAmounts: [50, 250] },
    { accountNumber: 54321, name: "Charlie", products: ["Office 365", "Windows 10"], orderAmounts: [100, 150] },
    { accountNumber: 98765, name: "David", products: ["Windows 11", "Power BI"], orderAmounts: [250, 100] }
];

// Задание 1.3: Функция для суммы квадратов значений массива
function sumOfSquares(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i] * arr[i];
    }
    return sum;
}

// Задание 1.7: Функция для сравнения двух объектов
function isEqualObj(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

// Задание 2.5: Функция для поиска пар целых чисел, сумма которых равна заданному значению
function findCouple(array, number) {
    const result = [];
    const seen = new Set();

    for (let num of array) {
        const complement = number - num;
        if (seen.has(complement)) {
            result.push(`${complement}+${num}`);
        }
        seen.add(num);
    }

    return result.join(', ');
}

// Задание 3.5: Функция для группировки слов-анаграмм
function anagram(words) {
    const anagrams = {};

    for (let word of words) {
        const sortedWord = word.toLowerCase().split('').sort().join('');
        if (!anagrams[sortedWord]) {
            anagrams[sortedWord] = [];
        }
        anagrams[sortedWord].push(word);
    }

    return Object.values(anagrams)
        .filter(group => group.length >= 2)
        .map(group => group.sort().join(', '))
        .sort();
}

// Обработка события клика по кнопке поиска аккаунта
document.getElementById('searchButton').addEventListener('click', () => {
    const accountNumber = parseInt(document.getElementById('accountNumber').value);
    const resultDiv = document.getElementById('accountResult');

    if (isNaN(accountNumber)) {
        resultDiv.innerHTML = '<p class="text-danger">Введите корректный номер аккаунта.</p>';
        return;
    }

    const user = users.find(user => user.accountNumber === accountNumber);

    if (user) {
        const accountInfo = `
            <h2>Аккаунт ${user.name}</h2>
            <p><strong>Номер аккаунта:</strong> ${user.accountNumber}</p>
            <p><strong>Продукты:</strong> ${user.products.join(', ')}</p>
            <p><strong>Суммы заказов:</strong> ${user.orderAmounts.join(', ')}</p>
        `;
        resultDiv.innerHTML = accountInfo;
    } else {
        resultDiv.innerHTML = '<p class="text-danger">Аккаунт не найден.</p>';
    }
});

// Обработка события клика по кнопке поиска пар чисел
document.getElementById('findCoupleButton').addEventListener('click', () => {
    const orderAmountsInput = document.getElementById('orderAmountsInput').value;
    const targetSum = parseInt(document.getElementById('targetSum').value);
    const coupleResultDiv = document.getElementById('coupleResult');

    if (isNaN(targetSum)) {
        coupleResultDiv.innerHTML = '<p class="text-danger">Введите корректную целевую сумму.</p>';
        return;
    }

    const orderAmountsArray = orderAmountsInput.split(',').map(num => parseInt(num.trim()));

    if (orderAmountsArray.some(isNaN)) {
        coupleResultDiv.innerHTML = '<p class="text-danger">Введите корректные суммы заказов.</p>';
        return;
    }

    const result = findCouple(orderAmountsArray, targetSum);
    if (result) {
        coupleResultDiv.innerHTML = `<p>Пары заказов: ${result}</p>`;
    } else {
        coupleResultDiv.innerHTML = '<p>Пары заказов не найдены.</p>';
    }
});

// Обработка события клика по кнопке группировки анаграмм
document.getElementById('anagramButton').addEventListener('click', () => {
    const productNamesInput = document.getElementById('productNamesInput').value;
    const anagramResultDiv = document.getElementById('anagramResult');

    const productNamesArray = productNamesInput.split(',').map(word => word.trim());

    if (productNamesArray.some(word => !word)) {
        anagramResultDiv.innerHTML = '<p class="text-danger">Введите корректные имена продуктов.</p>';
        return;
    }

    const result = anagram(productNamesArray);
    if (result.length > 0) {
        anagramResultDiv.innerHTML = `<p>Группы анаграмм: ${result.join('; ')}</p>`;
    } else {
        anagramResultDiv.innerHTML = '<p>Группы анаграмм не найдены.</p>';
    }
});