// operators
const operators = ["÷", "×", "+", "-"];

// add
function add(a, b) {
    return a + b;
}

// subtract
function subtract(a, b) {
    return a - b;
}

// multiply
function multiply(a, b) {
    return a * b;
}

// divide
function divide(a, b) {
    return a / b;
}

function operate (operator, a, b) {
    let result;
    // console.log(a, b);
    a = Number(a);
    b = Number(b);
    if (operator === "+") {
        result = add(a,b);
    } else if (operator === "-") {
        result = subtract(a, b);
    } else if (operator === "×") {
        result = multiply(a, b);
    } else if (operator === "÷") {
        result = divide(a, b);
    }
    console.log(a, b);
    return strip(result);
}



// belows are the calculator ui
// this is the base
const container = document.querySelector(".container");

// create the display part
const display = document.createElement("div");
display.setAttribute("class", "display");
container.appendChild(display);

// this is the number input
const input = document.createElement("p");
input.setAttribute("class", "display-show");
input.setAttribute("id", "input");
// input.textContent = "this is the input";
// this is the number output
const output = document.createElement("p");
output.setAttribute("class", "display-show");
output.setAttribute("id", "output");
// output.textContent = "this is the output";
display.appendChild(input);
display.appendChild(output);

// this is the keypad
const keypad = document.createElement("div");
keypad.setAttribute("class", "keypad");
container.appendChild(keypad);

// create all the buttons - 19
const ROWS = 5;
const COLS = 4;
const buttonArray = ["AC", "C", "+/-", "÷", "7", "8", "9", "×", "4", "5", "6","-", 
                "1", "2", "3","+", "0", ".", "="];
const buttonID = ["allClear", "clear", "sign", "divide", "n7", "n8", "n9", "multiply",
                "n4", "n5", "n6", "subtract", "n1", "n2", "n3", "add", "n0", "dot",
                "equal"];
for (let i = 0; i < ROWS; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < COLS; j++) {
        if (i == ROWS-1 && j == COLS-1) continue
        const btn = document.createElement("button");
        btn.textContent = buttonArray[i*4+j];
        if (parseInt(buttonArray[i*4+j]) === Number(buttonArray[i*4+j])) {
            // console.log("It is a number!");
            btn.classList.add("number");
        } else if (j == 3 && i != 4) {
            // console.log(buttonArray[i*4+j]);
            btn.classList.add("operator");
        }
        btn.setAttribute("id", buttonID[i*4+j])
        row.appendChild(btn);
    }
    keypad.appendChild(row);
}


const buttonNumber = document.querySelectorAll(".number");
buttonNumber.forEach(button => button.addEventListener("click", getInput));

function getInput(e) {
    // console.log(e);
    const numberSelection = e.target.textContent;
    input.textContent += numberSelection;
}

const buttonOperator = document.querySelectorAll(".operator");
buttonOperator.forEach(button => button.addEventListener("click", test));

function test (e) {
    let expression = input.textContent;
    let [ifContained, operator] = detectOperator(expression);
    if (ifContained) {
        let nbs = expression.split(` ${operator} `);
        let result = operate(operator, nbs[0], nbs[1]);
        input.textContent = result;
        output.textContent = result;
        // console.log(result);
    }
    input.textContent += ' ' + e.target.textContent + ' ';
}

const buttonEqual = document.querySelector("#equal");
buttonEqual.addEventListener("click", equation);

function equation () {
    const expression = input.textContent;
    let [ifContained, operator] = detectOperator(expression);
    if (ifContained) {
        let nbs = expression.split(` ${operator} `);
        let result = operate(operator, nbs[0], nbs[1]);
        output.textContent = result;
    }

    if (operator === undefined) {
        output.textContent = '0';
    }
}

const buttonDot = document.querySelector("#dot");
buttonDot.addEventListener("click", addDot);

function addDot () {
    const expression = input.textContent;
    let [ifContained, operator] = detectOperator(expression);
    if (ifContained) {
        let nbs = expression.split(` ${operator} `);
        if (!nbs[1].includes('.')) input.textContent += '.';
    } else {
        if (!expression.includes('.')) input.textContent += '.';
    }
}


const buttonAllClear = document.querySelector("#allClear");
buttonAllClear.addEventListener("click", clear);
function clear () {
    input.textContent = '';
    output.textContent = '';
}

const buttonBack = document.querySelector("#clear");
buttonBack.addEventListener("click", deleteChar);
function deleteChar () {
    const expression = input.textContent;
    if (!expression) {
        output.textContent = '';
    }
    if (expression[expression.length-1] == ' ') {
        input.textContent = input.textContent.slice(0, -3);
    } else {
        input.textContent = input.textContent.slice(0, -1);
    }
}

const buttonSign = document.querySelector("#sign");
buttonSign.addEventListener("click", changeSign);
function changeSign () {
    const expression = input.textContent;
    const lastChar = expression[expression.length-1];
    if (lastChar === "-") {
        input.textContent = input.textContent.slice(0, -1);
    } else if (lastChar === undefined || lastChar === ' ') {
        input.textContent += '-';
    } else if (output.textContent) {
        input.textContent = '-' + output.textContent;
    }
}

// get two numbers and the operator
function detectOperator (expression) {
    for (let i = 0; i < 4; i++) {
        if (expression.includes(` ${operators[i]} `)) {
            return [true, operators[i]];
        }
    }
    return [false, undefined];
}

// improve precision
const strip = val => Number.parseFloat(val.toPrecision(15))

