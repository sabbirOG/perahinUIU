'use strict';

/**
 * CALCULATOR.JS - BODMAS Calculator with Widget Toggle
 * Features: Basic arithmetic, BODMAS precedence, keyboard support, widget toggle
 */

// ========== WIDGET TOGGLE ==========
(function() {
    const DOM = {
        openBtn: document.getElementById('openCalcBtn'),
        closeBtn: document.getElementById('closeCalcBtn'),
        widget: document.getElementById('calcWidget')
    };
    
    if (!DOM.widget) return;
    
    if (DOM.openBtn) {
        DOM.openBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            DOM.widget.classList.toggle('hidden');
        });
    }
    
    if (DOM.closeBtn) {
        DOM.closeBtn.addEventListener('click', () => DOM.widget.classList.add('hidden'));
    }
    
    document.addEventListener('click', (e) => {
        const clickedOutside = !DOM.widget.contains(e.target) && 
                              !DOM.openBtn.contains(e.target);
        if (clickedOutside) DOM.widget.classList.add('hidden');
    });
})();

// ========== CALCULATOR LOGIC ==========
(function() {
    const display = document.getElementById('calcDisplay');
    if (!display) return;
    
    // State
    let current = '0';
    let tokens = [];
    let afterEquals = false;
    
    // Operator conversion
    const OPS = {
        toInternal: (sym) => ({ '×': '*', '÷': '/', '−': '-', '+': '+' }[sym] || sym),
        toDisplay: (op) => ({ '*': '×', '/': '÷', '-': '−', '+': '+' }[op])
    };
    
    // Display helpers
    const isOperator = (t) => typeof t === 'string' && ['+', '-', '*', '/'].includes(t);
    
    const formatExpression = () => tokens
        .map(t => isOperator(t) ? OPS.toDisplay(t) : String(t))
        .join(' ');
    
    const updateDisplay = () => {
        if (!tokens.length) {
            display.value = current;
        } else if (!current || afterEquals) {
            display.value = `${formatExpression()} ^`;
        } else {
            display.value = `${formatExpression()} ${current}`;
        }
    };
    
    // Operations
    const clear = () => {
        current = '0';
        tokens = [];
        afterEquals = false;
        updateDisplay();
    };
    
    const appendNumber = (num) => {
        if (afterEquals && !tokens.length) {
            current = '0';
            afterEquals = false;
        }
        
        if (current === '0' && num !== '.') {
            current = num;
        } else if (num === '.' && current.includes('.')) {
            return;
        } else if (!current && num === '.') {
            current = '0.';
        } else {
            current += num;
        }
        updateDisplay();
    };
    
    const setOperation = (sym) => {
        const op = OPS.toInternal(sym);
        
        if (afterEquals && !tokens.length) {
            tokens = [parseFloat(current)];
            afterEquals = false;
            current = '';
        }
        
        if (current) {
            tokens.push(parseFloat(current));
            current = '';
        } else if (!tokens.length) {
            updateDisplay();
            return;
        }
        
        // Replace operator if user changes mind
        if (tokens.length && isOperator(tokens[tokens.length - 1])) {
            tokens[tokens.length - 1] = op;
        } else {
            tokens.push(op);
        }
        updateDisplay();
    };
    
    const calculate = () => {
        if (current) {
            tokens.push(parseFloat(current));
            current = '';
        }
        
        if (tokens.length < 3) {
            updateDisplay();
            return;
        }
        
        // BODMAS: First pass - multiply and divide
        let i = 0;
        while (i < tokens.length) {
            if (typeof tokens[i] === 'number' && 
                i + 2 < tokens.length && 
                ['*', '/'].includes(tokens[i + 1])) {
                
                const [left, op, right] = tokens.slice(i, i + 3);
                
                if (op === '/' && right === 0) {
                    current = 'Error';
                    tokens = [];
                    afterEquals = true;
                    updateDisplay();
                    return;
                }
                
                const result = op === '*' ? left * right : left / right;
                tokens.splice(i, 3, result);
            } else {
                i++;
            }
        }
        
        // Second pass - add and subtract
        let result = tokens[0];
        for (let j = 1; j < tokens.length; j += 2) {
            const op = tokens[j];
            const right = tokens[j + 1];
            result = op === '+' ? result + right : result - right;
        }
        
        current = String(Math.round(result * 1e8) / 1e8);
        tokens = [];
        afterEquals = true;
        updateDisplay();
    };
    
    // Event Handlers
    const buttonsContainer = document.querySelector('.calc-buttons');
    if (buttonsContainer) {
        buttonsContainer.addEventListener('click', (e) => {
            const btn = e.target;
            if (!btn.classList.contains('calc-btn')) return;
            
            const actions = {
                'calc-clear': clear,
                'calc-equals': calculate,
                'calc-operator': () => setOperation(btn.textContent.trim()),
                'calc-number': () => appendNumber(btn.textContent)
            };
            
            for (const [cls, action] of Object.entries(actions)) {
                if (btn.classList.contains(cls)) action();
            }
        });
    }
    
    // Keyboard Support
    const keyMap = {
        'Enter': calculate,
        '=': calculate,
        'Escape': clear,
        'c': clear,
        'C': clear
    };
    
    document.addEventListener('keydown', (e) => {
        if (!display) return;
        
        if (keyMap[e.key]) {
            if (e.key === '/') e.preventDefault();
            keyMap[e.key]();
        } else if (/^[0-9.]$/.test(e.key)) {
            appendNumber(e.key);
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            if (e.key === '/') e.preventDefault();
            setOperation(e.key);
        } else if (e.key === 'Backspace') {
            current = current.length > 1 ? current.slice(0, -1) : '0';
            updateDisplay();
        }
    });
})();
