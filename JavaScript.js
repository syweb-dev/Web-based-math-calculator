// 多语言翻译数据
const translations = {
    zh: {
        standard: '标准',
        scientific: '科学',
        github: '点击跳转GitHub仓库',
        developer: '点击跳转开发者个人网站',
        errorDivideZero: '错误：不能除以零！',
        errorLogNegative: '错误：对数的输入必须大于零！',
        errorLnNegative: '错误：自然对数的输入必须大于零！',
        errorSqrtNegative: '错误：不能对负数开平方根！',
        errorFactorialNegative: '错误：阶乘只能对非负整数计算！',
        errorFactorialTooLarge: '错误：数值过大，无法计算阶乘！'
    },
    en: {
        standard: 'Standard',
        scientific: 'Scientific',
        github: 'Click to visit GitHub',
        developer: 'Click to visit Developer Site',
        errorDivideZero: 'Error: Cannot divide by zero!',
        errorLogNegative: 'Error: Logarithm input must be greater than zero!',
        errorLnNegative: 'Error: Natural logarithm input must be greater than zero!',
        errorSqrtNegative: 'Error: Cannot take square root of negative number!',
        errorFactorialNegative: 'Error: Factorial only works with non-negative integers!',
        errorFactorialTooLarge: 'Error: Number too large to calculate factorial!'
    },
    ja: {
        standard: '標準',
        scientific: '科学',
        github: 'GitHubリポジトリへ',
        developer: '開発者サイトへ',
        errorDivideZero: 'エラー：ゼロで割ることはできません！',
        errorLogNegative: 'エラー：対数の入力はゼロより大きい必要があります！',
        errorLnNegative: 'エラー：自然対数の入力はゼロより大きい必要があります！',
        errorSqrtNegative: 'エラー：負の数の平方根は計算できません！',
        errorFactorialNegative: 'エラー：階乗は非負整数でのみ計算できます！',
        errorFactorialTooLarge: 'エラー：数値が大きすぎて階乗を計算できません！'
    },
    ko: {
        standard: '표준',
        scientific: '과학',
        github: 'GitHub 저장소로 이동',
        developer: '개발자 웹사이트로 이동',
        errorDivideZero: '오류: 0으로 나눌 수 없습니다!',
        errorLogNegative: '오류: 로그 입력은 0보다 커야 합니다!',
        errorLnNegative: '오류: 자연로그 입력은 0보다 커야 합니다!',
        errorSqrtNegative: '오류: 음수의 제곱근을 계산할 수 없습니다!',
        errorFactorialNegative: '오류: 팩토리얼은 음이 아닌 정수에만 사용할 수 있습니다!',
        errorFactorialTooLarge: '오류: 숫자가 너무 커서 팩토리얼을 계산할 수 없습니다!'
    },
    fr: {
        standard: 'Standard',
        scientific: 'Scientifique',
        github: 'Accéder au dépôt GitHub',
        developer: 'Accéder au site du développeur',
        errorDivideZero: 'Erreur : Impossible de diviser par zéro !',
        errorLogNegative: 'Erreur : L\'entrée du logarithme doit être supérieure à zéro !',
        errorLnNegative: 'Erreur : L\'entrée du logarithme naturel doit être supérieure à zéro !',
        errorSqrtNegative: 'Erreur : Impossible de calculer la racine carrée d\'un nombre négatif !',
        errorFactorialNegative: 'Erreur : La factorielle ne fonctionne qu\'avec des entiers non négatifs !',
        errorFactorialTooLarge: 'Erreur : Nombre trop grand pour calculer la factorielle !'
    },
    es: {
        standard: 'Estándar',
        scientific: 'Científica',
        github: 'Ir al repositorio GitHub',
        developer: 'Ir al sitio del desarrollador',
        errorDivideZero: 'Error: ¡No se puede dividir por cero!',
        errorLogNegative: 'Error: ¡La entrada del logaritmo debe ser mayor que cero!',
        errorLnNegative: 'Error: ¡La entrada del logaritmo natural debe ser mayor que cero!',
        errorSqrtNegative: 'Error: ¡No se puede calcular la raíz cuadrada de un número negativo!',
        errorFactorialNegative: 'Error: ¡El factorial solo funciona con enteros no negativos!',
        errorFactorialTooLarge: 'Error: ¡Número demasiado grande para calcular el factorial!'
    }
};

let currentLanguage = 'zh';

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert(translations[currentLanguage].errorDivideZero);
                    this.clear();
                    return;
                }
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }
        
        this.currentOperand = this.roundResult(computation).toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    roundResult(number) {
        return Math.round(number * 1000000000) / 1000000000;
    }

    percent() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = (current / 100).toString();
    }

    // 科学计算器功能
    sin() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = this.roundResult(Math.sin(current)).toString();
        this.shouldResetScreen = true;
    }

    cos() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = this.roundResult(Math.cos(current)).toString();
        this.shouldResetScreen = true;
    }

    tan() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = this.roundResult(Math.tan(current)).toString();
        this.shouldResetScreen = true;
    }

    log() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current <= 0) {
            alert(translations[currentLanguage].errorLogNegative);
            return;
        }
        this.currentOperand = this.roundResult(Math.log10(current)).toString();
        this.shouldResetScreen = true;
    }

    ln() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current <= 0) {
            alert(translations[currentLanguage].errorLnNegative);
            return;
        }
        this.currentOperand = this.roundResult(Math.log(current)).toString();
        this.shouldResetScreen = true;
    }

    sqrt() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current < 0) {
            alert(translations[currentLanguage].errorSqrtNegative);
            return;
        }
        this.currentOperand = this.roundResult(Math.sqrt(current)).toString();
        this.shouldResetScreen = true;
    }

    pow() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = this.roundResult(Math.pow(current, 2)).toString();
        this.shouldResetScreen = true;
    }

    pow3() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = this.roundResult(Math.pow(current, 3)).toString();
        this.shouldResetScreen = true;
    }

    powx() {
        this.chooseOperation('^');
    }

    factorial() {
        const current = parseInt(this.currentOperand);
        if (isNaN(current) || current < 0) {
            alert(translations[currentLanguage].errorFactorialNegative);
            return;
        }
        if (current > 170) {
            alert(translations[currentLanguage].errorFactorialTooLarge);
            return;
        }
        let result = 1;
        for (let i = 2; i <= current; i++) {
            result *= i;
        }
        this.currentOperand = result.toString();
        this.shouldResetScreen = true;
    }

    setPi() {
        this.currentOperand = Math.PI.toString();
        this.shouldResetScreen = true;
    }

    setE() {
        this.currentOperand = Math.E.toString();
        this.shouldResetScreen = true;
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.currentOperand;
        if (this.operation != null) {
            const operatorSymbol = {
                '+': '+',
                '-': '−',
                '*': '×',
                '/': '÷',
                '^': '^'
            };
            this.previousOperandElement.textContent = 
                `${this.previousOperand} ${operatorSymbol[this.operation] || this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }
}

// 初始化计算器
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// 数字按钮
document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
    });
});

// 运算符按钮
document.querySelectorAll('[data-operator]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
        calculator.updateDisplay();
    });
});

// 功能按钮
document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        switch(action) {
            case 'clear':
                calculator.clear();
                break;
            case 'delete':
                calculator.delete();
                break;
            case 'equals':
                calculator.compute();
                break;
            case 'percent':
                calculator.percent();
                break;
            case 'sin':
                calculator.sin();
                break;
            case 'cos':
                calculator.cos();
                break;
            case 'tan':
                calculator.tan();
                break;
            case 'log':
                calculator.log();
                break;
            case 'ln':
                calculator.ln();
                break;
            case 'sqrt':
                calculator.sqrt();
                break;
            case 'pow':
                calculator.pow();
                break;
            case 'pow3':
                calculator.pow3();
                break;
            case 'powx':
                calculator.powx();
                break;
            case 'factorial':
                calculator.factorial();
                break;
            case 'pi':
                calculator.setPi();
                break;
            case 'e':
                calculator.setE();
                break;
        }
        calculator.updateDisplay();
    });
});

// 键盘支持
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        calculator.chooseOperation(e.key);
        calculator.updateDisplay();
    }
    if (e.key === 'Enter' || e.key === '=') {
        calculator.compute();
        calculator.updateDisplay();
    }
    if (e.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
    if (e.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
});

// 模式切换
const standardModeBtn = document.getElementById('standardMode');
const scientificModeBtn = document.getElementById('scientificMode');
const scientificButtons = document.getElementById('scientific-buttons');

standardModeBtn.addEventListener('click', () => {
    standardModeBtn.classList.add('active');
    scientificModeBtn.classList.remove('active');
    scientificButtons.classList.add('hidden');
});

scientificModeBtn.addEventListener('click', () => {
    scientificModeBtn.classList.add('active');
    standardModeBtn.classList.remove('active');
    scientificButtons.classList.remove('hidden');
});

// 初始化显示
calculator.updateDisplay();

// 语言切换功能
const languageSelect = document.getElementById('languageSelect');

function updateLanguage(lang) {
    currentLanguage = lang;
    
    // 更新按钮文本
    document.getElementById('standardMode').textContent = translations[lang].standard;
    document.getElementById('scientificMode').textContent = translations[lang].scientific;
    
    // 更新链接按钮文本
    const githubBtn = document.querySelector('[data-lang="github"]');
    const devBtn = document.querySelector('[data-lang="developer"]');
    if (githubBtn) githubBtn.textContent = translations[lang].github;
    if (devBtn) devBtn.textContent = translations[lang].developer;
    
    // 保存语言选择到本地存储
    localStorage.setItem('calculatorLanguage', lang);
}

languageSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

// 页面加载时恢复语言设置
window.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('calculatorLanguage') || 'zh';
    languageSelect.value = savedLanguage;
    updateLanguage(savedLanguage);
});