document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    let currentInput = '';
    let operator = null;
    let previousInput = '';
    let accumulator = 0;

    function updateResult(value) {
        result.textContent = value || '0';
    }

    function appendNumber(number) {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
        updateResult(currentInput);
    }

    // Очистка
    document.getElementById('btn_op_clear').addEventListener('click', () => {
        currentInput = '';
        operator = null;
        previousInput = '';
        accumulator = 0;
        updateResult('');
    });

    // Удаление последнего символа
    document.getElementById('btn_op_backspace').addEventListener('click', () => {
        currentInput = currentInput.slice(0, -1);
        updateResult(currentInput);
    });

    // Смена знака
    document.getElementById('btn_op_sign').addEventListener('click', () => {
        currentInput = (-parseFloat(currentInput) || 0).toString();
        updateResult(currentInput);
    });

    // Процент
    document.getElementById('btn_op_percent').addEventListener('click', () => {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateResult(currentInput);
    });

    // Вычисление квадратного корня
    document.getElementById('btn_op_sqrt').addEventListener('click', () => {
        currentInput = Math.sqrt(parseFloat(currentInput) || 0).toString();
        updateResult(currentInput);
    });

    // Возведение в квадрат
    document.getElementById('btn_op_square').addEventListener('click', () => {
        currentInput = (Math.pow(parseFloat(currentInput) || 0, 2)).toString();
        updateResult(currentInput);
    });

    // Вычисление факториала
    document.getElementById('btn_op_factorial').addEventListener('click', () => {
        let num = parseInt(currentInput) || 0;
        let factorial = 1;
        for (let i = 1; i <= num; i++) factorial *= i;
        currentInput = factorial.toString();
        updateResult(currentInput);
    });

    // Добавление трех нулей
    document.getElementById('btn_op_zeroes').addEventListener('click', () => {
        currentInput += '000';
        updateResult(currentInput);
    });

    // Высота на Марсе
    document.getElementById('btn_op_mars_height').addEventListener('click', () => {
        let pressure = parseFloat(currentInput) || 0;
        currentInput = (0.000006 * pressure).toString();
        updateResult(currentInput);
    });

    // Накапливаемое сложение
    document.getElementById('btn_op_accum_plus').addEventListener('click', () => {
        accumulator += parseFloat(currentInput) || 0;
        currentInput = '';
        updateResult(accumulator.toString());
    });

    // Накапливаемое вычитание
    document.getElementById('btn_op_accum_minus').addEventListener('click', () => {
        accumulator -= parseFloat(currentInput) || 0;
        currentInput = '';
        updateResult(accumulator.toString());
    });

    // Смена цвета фона
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.style.backgroundColor = getRandomColor();
    });

    function getRandomColor() {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }

    // Обработка цифр
    document.querySelectorAll('.my-btn:not(.primary):not(.secondary)').forEach(button => {
        button.addEventListener('click', () => appendNumber(button.textContent));
    });

    // Обработка операторов
    document.querySelectorAll('.primary').forEach(button => {
        button.addEventListener('click', () => {
            if (currentInput === '' && button.textContent !== '=') return;
            
            if (operator && previousInput !== '') {
                // Выполняем предыдущую операцию перед сменой оператора
                calculate();
            }

            operator = button.textContent;
            previousInput = currentInput;
            currentInput = '';
        });
    });

    // Вычисление результата
    document.getElementById('btn_op_equal').addEventListener('click', calculate);

    function calculate() {
        if (!operator || currentInput === '') return;
        
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput || prev); // Если текущее значение пустое, используем предыдущее
        let resultValue;

        switch (operator) {
            case '+': resultValue = prev + current; break;
            case '-': resultValue = prev - current; break;
            case 'x': resultValue = prev * current; break;
            case '/': 
                resultValue = prev / current;
                if (current === 0) resultValue = 'Ошибка';
                break;
            default: return;
        }

        currentInput = resultValue.toString();
        operator = null;
        previousInput = '';
        updateResult(currentInput);
    }
    
});