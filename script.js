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
    if (operator === "+") {
        result = add(a,b);
    } else if (operator === "-") {
        result = subtract(a, b);
    } else if (operator === "*") {
        result = multiply(a, b);
    } else if (operator === "/") {
        result = divide(a, b);
    }
    // console.log(result);
    return result;
}



// belows are the calculator ui
// this is the base
const container = document.querySelector(".container");

// create the display
const display = document.createElement("div");
display.classList.add(".display");
container.appendChild(display);
