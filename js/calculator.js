/**
 * CALCULATOR.JS - Basic Calculator functionality
 * 
 * Features:
 * - Basic arithmetic operations (+, -, ×, ÷)
 * - Keyboard support
 * - Error handling
 * - Decimal numbers support
 * - Popup widget toggle
 */

// Calculator Widget Toggle (for CGPA page)
(function() {
    const openBtn = document.getElementById('openCalcBtn');
    const closeBtn = document.getElementById('closeCalcBtn');
    const widget = document.getElementById('calcWidget');
    
    if (openBtn && widget) {
        openBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            widget.classList.toggle('hidden');
        });
    }
    
    if (closeBtn && widget) {
        closeBtn.addEventListener('click', () => {
            widget.classList.add('hidden');
        });
    }
    
    // Close on outside click
    if (widget) {
        document.addEventListener('click', (e) => {
            if (!widget.contains(e.target) && !openBtn.contains(e.target)) {
                widget.classList.add('hidden');
            }
        });
    }
})();

// Calculator Logic
(function() {
    const display = document.getElementById('calcDisplay');
    if (!display) return; // Exit if calculator doesn't exist
    
    let currentValue = '0';
    let previousValue = null;
    let operation = null;
    let shouldResetDisplay = false;

    function updateDisplay() {
        display.value = currentValue;
    }

    function clear() {
        currentValue = '0';
        previousValue = null;
        operation = null;
        shouldResetDisplay = false;
        updateDisplay();
    }

    function appendNumber(num) {
        if (shouldResetDisplay) {
            currentValue = num;
            shouldResetDisplay = false;
        } else {
            if (currentValue === '0' && num !== '.') {
                currentValue = num;
            } else if (num === '.' && currentValue.includes('.')) {
                return; // Don't add multiple decimals
            } else {
                currentValue += num;
            }
        }
        updateDisplay();
    }

    function setOperation(op) {
        if (operation !== null && !shouldResetDisplay) {
            calculate();
        }
        previousValue = currentValue;
        operation = op;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (operation === null || previousValue === null) return;

        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        let result;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '−':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = current !== 0 ? prev / current : 'Error';
                break;
            default:
                return;
        }

        currentValue = result === 'Error' ? 'Error' : String(Math.round(result * 100000000) / 100000000);
        operation = null;
        previousValue = null;
        shouldResetDisplay = true;
        updateDisplay();
    }

    // Event listeners
    const buttonsContainer = document.querySelector('.calc-buttons');
    if (buttonsContainer) {
        buttonsContainer.addEventListener('click', (e) => {
            if (!e.target.classList.contains('calc-btn')) return;

            const btn = e.target;
            const value = btn.textContent;

            if (btn.classList.contains('calc-clear')) {
                clear();
            } else if (btn.classList.contains('calc-equals')) {
                calculate();
            } else if (btn.classList.contains('calc-operator')) {
                setOperation(value);
            } else if (btn.classList.contains('calc-number')) {
                appendNumber(value);
            }
        });
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (!display) return;
        
        if (e.key >= '0' && e.key <= '9' || e.key === '.') {
            appendNumber(e.key);
        } else if (e.key === '+') {
            setOperation('+');
        } else if (e.key === '-') {
            setOperation('−');
        } else if (e.key === '*') {
            setOperation('×');
        } else if (e.key === '/') {
            e.preventDefault();
            setOperation('÷');
        } else if (e.key === 'Enter' || e.key === '=') {
            calculate();
        } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
            clear();
        } else if (e.key === 'Backspace') {
            if (currentValue.length > 1) {
                currentValue = currentValue.slice(0, -1);
            } else {
                currentValue = '0';
            }
            updateDisplay();
        }
    });
})();
