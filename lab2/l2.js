
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    let resColor = 0
    let themeColor = 1
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    body = document.getElementById("body")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
      if (!selectedOperation) {
          if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
              a += digit
          }
          outputElement.innerHTML = a
      } else {
          if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
              b += digit
              outputElement.innerHTML = b        
          }
      }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
      button.onclick = function() {
          const digitValue = button.innerHTML
          onDigitButtonClicked(digitValue)
      }
    })
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
      if (a === '' || b !== '') return
      selectedOperation = 'x'
    }

    document.getElementById("btn_op_plus").onclick = function() { 
      if (a === '') return
      if (b !== '' && selectedOperation === '+') {
        a = ((+a) + (+b)).toString()
        b = ''
      }
      selectedOperation = '+'
    }

    document.getElementById("btn_op_minus").onclick = function() { 
      if (a === '') return
      if (b !== '' && selectedOperation === '-') {
        a = ((+a) - (+b)).toString()
        b = ''
      }
      selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
      if (a === '' || b !== '') return
      selectedOperation = '/'
    }
    document.getElementById("btn_op_percent").onclick = function() { 
        if (a === '' || b !== '') return
        selectedOperation = '%'
    }
    
    // кнопка смены знака
    document.getElementById("btn_op_sign").onclick = function() {
        if (b !== '') {
            b = (-a).toString()
            outputElement.innerHTML = b
        }
        else if (a !== '') {
            a = (-a).toString()
            outputElement.innerHTML = a
        }
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
      a = ''
      b = ''
      selectedOperation = ''
      expressionResult = ''
      outputElement.innerHTML = 0
    }
    
    // кнопка backspace
    document.getElementById("btn_op_backspace").onclick = function() {
        if (b !== '') {
            b = b.slice(0, -1)
            if (b !== '' && b !== '-') {
                outputElement.innerHTML = b
            }
            else {
                b = ''
                outputElement.innerHTML = 0
            }
        }
        else if (a !== '') {
            a = a.slice(0, -1)
            if (a !== '' && a !== '-') {
                outputElement.innerHTML = a
            }
            else {
                a = ''
                outputElement.innerHTML = 0
            }
        }
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() {
      if (a === '' || b === '' || !selectedOperation)
          return
          
      switch(selectedOperation) { 
          case 'x':
              expressionResult = (+a) * (+b)
              break;
          case '+':
              expressionResult = (+a) + (+b)
              break;
          case '-':
              expressionResult = (+a) - (+b)
              break;
          case '/':
              expressionResult = (+a) / (+b)
              break;
        case '%':
            expressionResult = (+a) / (+b) * 100
              break;
      }
     
      a = expressionResult.toString()
      b = ''
      selectedOperation = null
    
      outputElement.innerHTML = a
    }
    
  
    
    // кнопка вычисления корня
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (a === '' || b !== '') return
        
        a = Math.sqrt(+a).toString()
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
    }
    
    // кнопка возведения в квадрат
    document.getElementById("btn_op_square").onclick = function() {
        if (a === '' || b !== '') return
        
        a = ((+a) * (+a)).toString()
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
    }
    
    // кнопка вычисления факториала
    document.getElementById("btn_op_factorial").onclick = function() {
        if (a === '' || b !== '') return
        
        if ((+a) >= 22) {
            outputElement.innerHTML = 'error'
            return
        }
    
        a = factorial(Math.floor((+a))).toString()
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
    }
    
    function factorial(n) {
        if (n === 0) {
          return 1;
        } else {
          return n * factorial(n - 1);
        }
    }
      
   
   // Высота на Марсе
   document.getElementById("btn_op_mars_height").onclick = function() {
        let pressure = a;
        if (!pressure || pressure <= 0) {
            updateResult('Ошибка');
            currentInput = '';
            return;
        }

        const coefficient = 0.699;
        const rate = 0.00009;
        const ratio = pressure / coefficient;
        const logValue = Math.log(ratio);
        const height = -logValue / rate;

        const currentInput = height.toString();
        outputElement.innerHTML= currentInput;
    }

  
    // Переключение темы с рандомным фоном
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', toggleTheme);

    function toggleTheme() {
        const body = document.body;
        const randomColor = getRandomColor();
        body.style.backgroundColor = randomColor;
        body.classList.toggle('light-theme');

        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }

    // Функция для генерации случайного HEX-цвета
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
};
