const API_BASE_URL = 'http://localhost:3000/products';

// Функция для GET-запросов
function get(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(null, JSON.parse(xhr.responseText));
            } else {
                callback(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`));
            }
        }
    };
    xhr.onerror = function() {
        callback(new Error('Ошибка сети'));
    };
    xhr.send();
}

// Функция для POST-запросов
function post(url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(null, JSON.parse(xhr.responseText));
            } else {
                callback(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`));
            }
        }
    };
    xhr.onerror = function() {
        callback(new Error('Ошибка сети'));
    };
    xhr.send(JSON.stringify(data));
}

// Функция для PATCH-запросов
function patch(url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(null, JSON.parse(xhr.responseText));
            } else {
                callback(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`));
            }
        }
    };
    xhr.onerror = function() {
        callback(new Error('Ошибка сети'));
    };
    xhr.send(JSON.stringify(data));
}

// Функция для DELETE-запросов
function del(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 204) {
                callback(null);
            } else {
                callback(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`));
            }
        }
    };
    xhr.onerror = function() {
        callback(new Error('Ошибка сети'));
    };
    xhr.send();
}

// Экспортируем API-функции в глобальный объект
window.API = {
    get,
    post,
    patch,
    del,
};