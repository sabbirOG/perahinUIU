/**
 * CGPA.JS - Enhanced CGPA Calculator functionality
 * 
 * Features:
 * - Dynamic course management
 * - Real-time CGPA calculation
 * - Data persistence
 * - Input validation
 * - Quick course addition
 * - Copy results functionality
 */

(function(){
    // ===== ROW TEMPLATE GENERATOR =====
    function rowTemplate() {
        return `
            <tr>
                <td class="course-col">
                    <div class="course-inputs">
                        <input class="input code-input" type="text" placeholder="Course Code (e.g., CSE101)" required>
                        <input class="input name-input" type="text" placeholder="Course Name" required>
                    </div>
                </td>
                <td class="credit-col">
                    <select class="input credit-select" required>
                        <option value="" disabled selected>Credits</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </td>
                <td class="grade-col">
                    <select class="input grade-select" required title="Select grade">
                        <option value="" disabled selected>Grade</option>
                        <option value="4.0">A (90-100)</option>
                        <option value="3.67">A- (86-89)</option>
                        <option value="3.33">B+ (83-85)</option>
                        <option value="3.0">B (78-81)</option>
                        <option value="2.67">B- (74-77)</option>
                        <option value="2.33">C+ (70-73)</option>
                        <option value="2.0">C (66-69)</option>
                        <option value="1.67">C- (62-65)</option>
                        <option value="1.33">D+ (58-61)</option>
                        <option value="1.0">D (55-57)</option>
                        <option value="0.0">F (0-54)</option>
                    </select>
                </td>
                <td class="action-col">
                    <button class="btn remove-btn" data-remove title="Remove course">×</button>
                </td>
            </tr>
        `;
    }

    // ===== ELEMENT REFERENCES =====
    const elements = {
        table: document.getElementById('cgpaTable'),
        tbody: document.querySelector('#cgpaTable tbody'),
        calcBtn: document.getElementById('calcCgpa'),
        resetBtn: document.getElementById('resetRows'),
        cgpaResult: document.getElementById('cgpaResult'),
        totalCredits: document.getElementById('totalCredits'),
        copyBtn: document.getElementById('copyResult'),
        saveIndicator: document.getElementById('saveIndicator'),
        quickCreditsButtons: document.querySelectorAll('[data-credits]')
    };

    if (!elements.table) return; // Exit if table not found

    // ===== DATA PERSISTENCE =====
    function saveData() {
        const rows = Array.from(elements.tbody.querySelectorAll('tr')).map(row => ({
            code: row.querySelector('.code-input').value,
            name: row.querySelector('.name-input').value,
            credits: row.querySelector('.credit-select').value,
            grade: row.querySelector('.grade-select').value
        }));
        
        localStorage.setItem('cgpaData', JSON.stringify(rows));
        showSaveIndicator('Changes saved');
    }

    function loadData() {
        const saved = localStorage.getItem('cgpaData');
        if (saved) {
            const rows = JSON.parse(saved);
            elements.tbody.innerHTML = '';
            rows.forEach(row => {
                elements.tbody.insertAdjacentHTML('beforeend', rowTemplate());
                const newRow = elements.tbody.lastElementChild;
                newRow.querySelector('.code-input').value = row.code;
                newRow.querySelector('.name-input').value = row.name;
                newRow.querySelector('.credit-select').value = row.credits;
                newRow.querySelector('.grade-select').value = row.grade;
            });
            updateResults();
        }
    }

    // ===== CALCULATIONS =====
    function calculateGPA() {
        let totalCredits = 0;
        let totalPoints = 0;
        let isValid = true;

        Array.from(elements.tbody.querySelectorAll('tr')).forEach(row => {
            const credits = parseFloat(row.querySelector('.credit-select').value || '0');
            const grade = parseFloat(row.querySelector('.grade-select').value || '0');
            const inputs = row.querySelectorAll('input, select');

            // Validate inputs
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.classList.add('invalid');
                    isValid = false;
                } else {
                    input.classList.remove('invalid');
                }
            });

            if (credits > 0 && !isNaN(grade)) {
                totalCredits += credits;
                totalPoints += credits * grade;
            }
        });

        if (!isValid) {
            showSaveIndicator('Please fill in all required fields');
            return null;
        }

        return {
            gpa: totalCredits > 0 ? totalPoints / totalCredits : 0,
            credits: totalCredits
        };
    }

    // ===== UI UPDATES =====
    function updateResults() {
        const results = calculateGPA();
        if (results) {
            elements.cgpaResult.textContent = results.gpa.toFixed(2);
            elements.totalCredits.textContent = results.credits;
            saveData();
        }
    }

    function showSaveIndicator(message) {
        elements.saveIndicator.textContent = message;
        elements.saveIndicator.classList.add('show');
        setTimeout(() => {
            elements.saveIndicator.classList.remove('show');
        }, 2000);
    }

    // ===== EVENT HANDLERS =====
    // Calculate CGPA
    elements.calcBtn.addEventListener('click', updateResults);

    // Reset form
    elements.resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all courses?')) {
            elements.tbody.innerHTML = rowTemplate();
            updateResults();
            showSaveIndicator('All courses cleared');
        }
    });

    // Copy result
    elements.copyBtn.addEventListener('click', () => {
        const cgpa = elements.cgpaResult.textContent;
        navigator.clipboard.writeText(cgpa).then(() => {
            showSaveIndicator('CGPA copied to clipboard');
        });
    });

    // Quick add course with preset credits
    elements.quickCreditsButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const credits = btn.dataset.credits;
            elements.tbody.insertAdjacentHTML('beforeend', rowTemplate());
            const newRow = elements.tbody.lastElementChild;
            const creditSelect = newRow.querySelector('.credit-select');
            creditSelect.value = credits;
            showSaveIndicator(`${credits} credit course added`);
        });
    });

    // Remove course row
    elements.tbody.addEventListener('click', (e) => {
        if (e.target.closest('[data-remove]')) {
            const row = e.target.closest('tr');
            if (elements.tbody.children.length > 1) {
                row.remove();
                updateResults();
            } else {
                showSaveIndicator('Cannot remove last course');
            }
        }
    });

    // Auto-save on input
    elements.tbody.addEventListener('input', (e) => {
        if (e.target.matches('input, select')) {
            updateResults();
        }
    });

    // Initialize
    loadData();
})();


