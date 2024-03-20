document.addEventListener('DOMContentLoaded', function() {
    const calculator = document.querySelector('.calculator');
    const keys = calculator.querySelector('.calculator-keys');
    const display = calculator.querySelector('.calculator-input');

    let currentInput = '';
    let calculation = [];
    let operatorSelected = false;

    keys.addEventListener('click', function(e) {
        if (e.target.matches('button')) {
            const key = e.target;
            const keyValue = key.textContent;

            if (!isNaN(keyValue) || keyValue === '.') {
                handleNumber(keyValue);
            } else if (keyValue === '+' || keyValue === '-' || keyValue === '×' || keyValue === '÷') {
                handleOperator(keyValue);
            } else if (keyValue === '=') {
                calculateResult();
            } else if (keyValue === 'AC') {
                clearDisplay();
            }
            display.value = currentInput;
        }
    });

    function handleNumber(keyValue) {
        currentInput += keyValue;
        operatorSelected = false;
    }

    function handleOperator(keyValue) {
        if (!operatorSelected) {
            currentInput += keyValue;
            operatorSelected = true;
        }
    }

    function calculateResult() {
        if (currentInput && !operatorSelected) {
            calculation = currentInput.split(/([+×÷-])/);
            for (let i = 0; i < calculation.length; i++) {
                if (calculation[i] === '×') {
                    calculation[i - 1] = parseFloat(calculation[i - 1]) * parseFloat(calculation[i + 1]);
                    calculation.splice(i, 2);
                    i--;
                } else if (calculation[i] === '÷') {
                    calculation[i - 1] = parseFloat(calculation[i - 1]) / parseFloat(calculation[i + 1]);
                    calculation.splice(i, 2);
                    i--;
                }
            }
            const result = calculation.reduce((total, current) => {
                if (!isNaN(current)) {
                    return total + parseFloat(current);
                } else {
                    return total;
                }
            }, 0);
            currentInput = result.toString();
            calculation = [];
        }
    }

    function clearDisplay() {
        currentInput = '';
        calculation = [];
        operatorSelected = false;
    }
});
