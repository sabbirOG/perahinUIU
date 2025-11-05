/**
 * CGPA CALCULATOR - Optimized for UIU Students
 * 
 * Simplified, maintainable code with correct UIU CGPA rules:
 * - Retakes: Latest grade counts for CGPA, both attempts count for attempted credits
 * - Completed credits: Only courses with D or higher
 * - Overall CGPA: Combines previous trimester(s) with current
 */

(function() {
    'use strict';

    // ========== CONFIGURATION ==========
    const GRADE_POINTS = {
        'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00, 'B-': 2.67,
        'C+': 2.33, 'C': 2.00, 'C-': 1.67, 'D+': 1.33, 'D': 1.00, 'F': 0.00
    };
    const PASSING_GRADE = 1.00; // D minimum

    // ========== DOM REFERENCES ==========
    const DOM = {
        currentTable: document.getElementById('currentCoursesTable'),
        retakeTable: document.getElementById('retakeCoursesTable'),
        addCourse: document.getElementById('addCourse'),
        addRetake: document.getElementById('addRetake'),
        resetAll: document.getElementById('resetAll'),
        calculate: document.getElementById('calculateCgpa'),
        trimesterGpa: document.getElementById('currentCgpa'),
        overallCgpa: document.getElementById('overallCgpa'),
        totalCredits: document.getElementById('totalCredits'),
        previousCgpa: document.getElementById('previousCgpa'),
        previousCredits: document.getElementById('previousCredits')
    };

    // Exit if required tables don't exist
    if (!DOM.currentTable || !DOM.retakeTable) return;

    // ========== UTILITY FUNCTIONS ==========
    function round(num) {
        return Math.round(num * 100) / 100;
    }

    function getMotivationalMessage(gpa) {
        if (gpa < 2.50) {
            return {
                text: "Don't give up! Every setback is a setup for a comeback.",
                emoji: '💪',
                color: '#F44336',
                bg: 'rgba(244, 67, 54, 0.1)'
            };
        } else if (gpa < 3.00) {
            return {
                text: "Push a little harder, success is just ahead.",
                emoji: '😅',
                color: '#FF9800',
                bg: 'rgba(255, 152, 0, 0.1)'
            };
        } else if (gpa < 3.50) {
            return {
                text: "You're doing well! Stay focused and keep moving forward.",
                emoji: '🚣',
                color: '#2196F3',
                bg: 'rgba(33, 150, 243, 0.1)'
            };
        } else {
            return {
                text: "Excellent work! Keep up the great momentum.",
                emoji: '🌟',
                color: '#4CAF50',
                bg: 'rgba(76, 175, 80, 0.1)'
            };
        }
    }

    function getGradeLetter(select) {
        if (!select?.value) return null;
        const text = select.options[select.selectedIndex]?.text?.trim();
        return GRADE_POINTS.hasOwnProperty(text) ? text : null;
    }

    function parseCourse(row, isRetake) {
        const name = row.querySelector('input')?.value?.trim() || '';
        const credits = parseFloat(row.querySelector('.credit-select')?.value) || 0;
        const gradeSelects = row.querySelectorAll('.grade-select');
        
        if (isRetake) {
            return {
                name,
                credits,
                oldGrade: getGradeLetter(gradeSelects[0]),
                newGrade: getGradeLetter(gradeSelects[1]),
                isRetake: true,
                row
            };
        }
        return {
            name,
            credits,
            grade: getGradeLetter(gradeSelects[0]),
            isRetake: false,
            row
        };
    }

    function isCourseEmpty(course) {
        if (course.isRetake) {
            // Empty retake row: nothing entered at all
            return (
                !course.name &&
                course.credits === 0 &&
                !course.oldGrade &&
                !course.newGrade
            );
        }
        // Empty current course row: nothing entered at all
        return (!course.name && course.credits === 0 && !course.grade);
    }

    function validateCourse(course) {
        const gradeToCheck = course.isRetake ? course.newGrade : course.grade;
        const isValid = course.credits > 0 && gradeToCheck !== null;
        
        // Visual feedback
        const creditSelect = course.row.querySelector('.credit-select');
        const gradeSelect = course.row.querySelector('.grade-select:last-of-type');
        
        creditSelect?.classList.toggle('invalid', course.credits <= 0);
        gradeSelect?.classList.toggle('invalid', !gradeToCheck);
        
        return isValid;
    }

    // ========== CALCULATION ENGINE ==========
    function calculateResults() {
        // Parse all courses
        const currentCourses = Array.from(DOM.currentTable.querySelectorAll('tbody tr'))
            .map(row => parseCourse(row, false));
        const retakeCourses = Array.from(DOM.retakeTable.querySelectorAll('tbody tr'))
            .map(row => parseCourse(row, true));
        
        // Ignore completely empty rows (especially important for optional retakes)
        const filteredCurrent = currentCourses.filter(c => !isCourseEmpty(c));
        const filteredRetake = retakeCourses.filter(c => !isCourseEmpty(c));
        const allCourses = [...filteredCurrent, ...filteredRetake];
        
        // Require at least one non-empty row overall
        if (allCourses.length === 0) {
            alert('Please add at least one course (current or retake) before calculating.');
            return null;
        }
        
        // Validate only non-empty rows
        const invalidCourses = allCourses.filter(c => !validateCourse(c));
        if (invalidCourses.length > 0) {
            alert('Please fill in all credits and grades before calculating.');
            return null;
        }


        // Calculate metrics
        let creditsForGpa = 0;
        let weightedPoints = 0;
        let attemptedCredits = 0;
        let completedCredits = 0;
        const breakdown = [];

        // Map for latest attempt per course
        const latestCourseMap = new Map();
        // For attempted credits, keep a list of all attempts for F grades
        const attemptedCreditList = [];

        // First, collect latest attempt for each course
        allCourses.forEach(course => {
            const courseKey = course.name?.trim().toLowerCase() || 'untitled';
            if (!latestCourseMap.has(courseKey) || course.isRetake) {
                latestCourseMap.set(courseKey, course);
            }
        });

        // For attempted credits: count all attempts for F grades, only latest for D or higher
        allCourses.forEach(course => {
            const courseKey = course.name?.trim().toLowerCase() || 'untitled';
            if (course.isRetake && course.oldGrade === 'F') {
                // Retake after F: count both original and retake
                attemptedCreditList.push({ credits: course.credits }); // retake attempt
                // Find the original attempt (currentCourses)
                const orig = filteredCurrent.find(c => (c.name?.trim().toLowerCase() || 'untitled') === courseKey);
                if (orig) {
                    attemptedCreditList.push({ credits: orig.credits }); // original attempt
                }
            } else if (course.isRetake && course.oldGrade !== 'F') {
                // Improvement: only count latest
                attemptedCreditList.push({ credits: course.credits });
            } else if (!course.isRetake) {
                // Regular course: only count latest
                // If this course is not retaken, count it
                const isRetaken = filteredRetake.some(r => (r.name?.trim().toLowerCase() || 'untitled') === courseKey);
                if (!isRetaken) {
                    attemptedCreditList.push({ credits: course.credits });
                }
            }
        });

        // Remove duplicate credits for original attempt if already counted
        // (If a course is retaken after F, both attempts are counted)
        attemptedCredits = attemptedCreditList.reduce((sum, c) => sum + c.credits, 0);

        // Now process only unique courses (latest grade for retakes)
        Array.from(latestCourseMap.values()).forEach(course => {
            const finalGrade = course.isRetake ? course.newGrade : course.grade;
            const gradePoint = GRADE_POINTS[finalGrade];
            const weighted = gradePoint * course.credits;

            creditsForGpa += course.credits;
            weightedPoints += weighted;

            // Completed credits logic:
            if (course.isRetake) {
                if (course.oldGrade === 'F') {
                    // Retake after F: only add if new grade is passing
                    if (gradePoint >= PASSING_GRADE) {
                        completedCredits += course.credits;
                    }
                } else {
                    // Improvement: do NOT add credits again (already completed)
                }
            } else {
                // Regular course: add if passing
                if (gradePoint >= PASSING_GRADE) {
                    completedCredits += course.credits;
                }
            }

            breakdown.push({
                name: course.name || 'Untitled Course',
                credits: course.credits,
                grade: finalGrade,
                oldGrade: course.oldGrade || null,
                gradePoint,
                weighted,
                isPassing: gradePoint >= PASSING_GRADE,
                isRetake: course.isRetake,
                isImprovement: course.isRetake && course.oldGrade !== 'F'
            });
        });

        // Cap GPA at 4.0
        let gpa = creditsForGpa > 0 ? weightedPoints / creditsForGpa : 0;
        if (gpa > 4.0) gpa = 4.0;

        return {
            gpa: round(gpa),
            creditsForGpa,
            weightedPoints,
            attemptedCredits,
            completedCredits,
            breakdown
        };
    }

    function calculateOverallCgpa(result, prevCgpa, prevCredits) {
        if (prevCredits <= 0 || prevCgpa <= 0) return result.gpa;

        // To avoid double-counting improvement retake credits, subtract credits for improvement retakes from previous credits
        // Find improvement retake credits
        let improvementRetakeCredits = 0;
        if (result.breakdown && Array.isArray(result.breakdown)) {
            result.breakdown.forEach(course => {
                if (course.isRetake && course.isImprovement) {
                    improvementRetakeCredits += course.credits;
                }
            });
        }

        const adjustedPrevCredits = prevCredits - improvementRetakeCredits;
        const totalGradePoints = (prevCgpa * adjustedPrevCredits) + result.weightedPoints;
        const totalCredits = adjustedPrevCredits + result.creditsForGpa;

        return totalCredits > 0 ? round(totalGradePoints / totalCredits) : result.gpa;
    }

    // ========== UI RENDERING ==========
    function getSummaryContainer() {
        let container = document.getElementById('cgpaSummary');
        if (container) return container;
        
        container = document.createElement('div');
        container.id = 'cgpaSummary';
        container.style.cssText = 'margin-top:16px;padding:16px;border:1px solid var(--border-color);border-radius:8px;background:var(--bg-light)';
        
        const controls = document.querySelector('.calculator-controls');
        if (controls?.parentNode) {
            controls.parentNode.insertBefore(container, controls.nextSibling);
        }
        return container;
    }

    function renderCourseRow(course) {
        const bg = course.isPassing ? 'rgba(76,175,80,0.05)' : 'rgba(244,67,54,0.05)';
        const color = course.isPassing ? '#4CAF50' : '#F44336';
        const status = course.isPassing ? '✓ Pass' : '✗ Fail';
        
        let retakeInfo = '';
        if (course.isRetake) {
            const label = course.isImprovement ? 'Improvement' : 'Retake';
            retakeInfo = ` <em style="color:var(--text-secondary);font-size:12px">(${label}: ${course.oldGrade} → ${course.grade})</em>`;
        }

        return `
            <div style="display:flex;justify-content:space-between;gap:12px;padding:8px;border-bottom:1px solid var(--border-color);background:${bg}">
                <span style="flex:2">${course.name}${retakeInfo}</span>
                <span>Cr: <strong>${course.credits}</strong></span>
                <span>GP: <strong>${course.gradePoint.toFixed(2)}</strong></span>
                <span>Wt: <strong>${round(course.weighted).toFixed(2)}</strong></span>
                <span style="color:${color}">${status}</span>
            </div>
        `;
    }

    function displayResults(result, overallCgpa, prevCgpa, prevCredits) {
        const container = getSummaryContainer();
        if (!result) {
            container.innerHTML = '';
            return;
        }

        const courseList = result.breakdown.map(renderCourseRow).join('');
        const hasPrevious = prevCredits > 0 && prevCgpa > 0;
        
        // Get motivational message based on overall CGPA if available, otherwise current GPA
        const gpaForMotivation = hasPrevious ? overallCgpa : result.gpa;
        const motivation = getMotivationalMessage(gpaForMotivation);
        
        const motivationBox = `
            <div style="margin-top:16px;padding:16px;background:${motivation.bg};border-left:4px solid ${motivation.color};border-radius:8px;text-align:center">
                <div style="font-size:24px;margin-bottom:8px">${motivation.emoji}</div>
                <div style="font-size:16px;font-weight:600;color:${motivation.color}">${motivation.text}</div>
            </div>
        `;
        
        const overallSection = hasPrevious ? `
            <div style="margin-top:16px;padding:16px;border-top:2px solid var(--primary-color);background:var(--surface-hover);border-radius:8px">
                <h4 style="margin:0 0 12px;color:var(--primary-color)">Overall CGPA Calculation</h4>
                <div style="font-size:14px;line-height:1.8">
                    <div>• Previous: ${prevCgpa.toFixed(2)} × ${prevCredits} credits = ${round(prevCgpa * prevCredits).toFixed(2)} points</div>
                    <div>• Current: ${result.gpa.toFixed(2)} × ${result.creditsForGpa} credits = ${round(result.weightedPoints).toFixed(2)} points</div>
                    <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border-color);font-size:18px;color:var(--primary-color)">
                        <strong>Overall CGPA: ${overallCgpa.toFixed(2)}</strong>
                        <span style="font-size:12px;color:var(--text-secondary);margin-left:8px">(${prevCredits + result.creditsForGpa} total credits)</span>
                    </div>
                </div>
            </div>
        ` : '';

        container.innerHTML = `
            <h3 style="margin:0 0 12px;color:var(--text-primary)">This Trimester's Summary</h3>
            ${courseList || '<em>No courses entered</em>'}
            <div style="margin-top:16px;padding:12px;background:var(--surface-hover);border-radius:8px;line-height:1.8">
                <div><strong>Attempted Credits:</strong> ${result.attemptedCredits} <em style="font-size:12px;color:var(--text-secondary)">(includes retakes)</em></div>
                <div><strong>Completed Credits:</strong> ${result.completedCredits} <em style="font-size:12px;color:var(--text-secondary)">(D or higher)</em></div>
                <div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border-color)">
                    <strong>This Trimester's GPA:</strong> <span style="font-size:18px;color:var(--primary-color)">${result.gpa.toFixed(2)}</span>
                </div>
            </div>
            ${overallSection}
            ${motivationBox}
        `;
    }

    // ========== ROW TEMPLATES ==========
    function createCourseRow() {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" class="input" placeholder="e.g., DSA"></td>
            <td>
                <select class="input credit-select">
                    <option value="" disabled selected>Credits</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </td>
            <td>
                <select class="input grade-select">
                    <option value="" disabled selected>Grade</option>
                    <option value="4.00">A</option>
                    <option value="3.67">A-</option>
                    <option value="3.33">B+</option>
                    <option value="3.00">B</option>
                    <option value="2.67">B-</option>
                    <option value="2.33">C+</option>
                    <option value="2.00">C</option>
                    <option value="1.67">C-</option>
                    <option value="1.33">D+</option>
                    <option value="1.00">D</option>
                    <option value="0.00">F</option>
                </select>
            </td>
            <td><button class="btn remove-btn">×</button></td>
        `;
        return tr;
    }

    function createRetakeRow() {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" class="input" placeholder="e.g., DSA"></td>
            <td>
                <select class="input credit-select">
                    <option value="" disabled selected>Credits</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </td>
            <td>
                <select class="input grade-select">
                    <option value="" disabled selected>Old Grade</option>
                    <option value="4.00">A</option>
                    <option value="3.67">A-</option>
                    <option value="3.33">B+</option>
                    <option value="3.00">B</option>
                    <option value="2.67">B-</option>
                    <option value="2.33">C+</option>
                    <option value="2.00">C</option>
                    <option value="1.67">C-</option>
                    <option value="1.33">D+</option>
                    <option value="1.00">D</option>
                    <option value="0.00">F</option>
                </select>
            </td>
            <td>
                <select class="input grade-select">
                    <option value="" disabled selected>New Grade</option>
                    <option value="4.00">A</option>
                    <option value="3.67">A-</option>
                    <option value="3.33">B+</option>
                    <option value="3.00">B</option>
                    <option value="2.67">B-</option>
                    <option value="2.33">C+</option>
                    <option value="2.00">C</option>
                    <option value="1.67">C-</option>
                    <option value="1.33">D+</option>
                    <option value="1.00">D</option>
                    <option value="0.00">F</option>
                </select>
            </td>
            <td><button class="btn remove-btn">×</button></td>
        `;
        return tr;
    }

    // ========== EVENT HANDLERS ==========
    
    // Calculate button
    DOM.calculate?.addEventListener('click', () => {
        const result = calculateResults();
        if (!result) return;
        
        // Update display cards
        DOM.trimesterGpa.textContent = result.gpa.toFixed(2);
        DOM.totalCredits.textContent = result.attemptedCredits;
        
        // Calculate overall CGPA
        const prevCgpa = parseFloat(DOM.previousCgpa?.value || 0);
        const prevCredits = parseFloat(DOM.previousCredits?.value || 0);
        const overallCgpa = calculateOverallCgpa(result, prevCgpa, prevCredits);
        
        DOM.overallCgpa.textContent = overallCgpa.toFixed(2);
        
        // Display detailed summary
        displayResults(result, overallCgpa, prevCgpa, prevCredits);
    });

    // Add course buttons
    DOM.addCourse?.addEventListener('click', () => {
        DOM.currentTable.querySelector('tbody').appendChild(createCourseRow());
    });

    DOM.addRetake?.addEventListener('click', () => {
        DOM.retakeTable.querySelector('tbody').appendChild(createRetakeRow());
    });

    // Remove row handler (delegated)
    function setupRemoveHandler(table) {
        table.addEventListener('click', (e) => {
            if (!e.target.closest('.remove-btn')) return;
            
            const row = e.target.closest('tr');
            const tbody = table.querySelector('tbody');
            
            if (tbody.children.length > 1) {
                row.remove();
            } else {
                // Keep at least one row, just clear it
                row.querySelector('input').value = '';
                row.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
            }
        });
    }
    setupRemoveHandler(DOM.currentTable);
    setupRemoveHandler(DOM.retakeTable);

    // Reset all button (immediate reset, no confirmation)
    DOM.resetAll?.addEventListener('click', () => {
        // Reset tables
        const currentTbody = DOM.currentTable.querySelector('tbody');
        const retakeTbody = DOM.retakeTable.querySelector('tbody');
        currentTbody.innerHTML = '';
        currentTbody.appendChild(createCourseRow());
        retakeTbody.innerHTML = '';

        // Reset inputs and displays
        DOM.trimesterGpa.textContent = '0.00';
        DOM.overallCgpa.textContent = '0.00';
        DOM.totalCredits.textContent = '0';
        if (DOM.previousCgpa) DOM.previousCgpa.value = '';
        if (DOM.previousCredits) DOM.previousCredits.value = '';

        // Clear any validation styles on selects in the new row
        currentTbody.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

        // Clear summary
        displayResults(null);
    });

})();
