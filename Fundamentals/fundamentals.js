// ----- FUNCTIONS -----

// function declaration

function showMessage() {
    let message = 'Hello World!';
    console.log(message);
    return message;
}

// TASK: Rewrite the function in a single line, retaining the way it works,
// but without using the if statement.
// Make two variants:
//  
//  a) Using a question mark operator ?,
//  b) Using OR ||.
  

function checkAge(age) {
    if (age > 18) {
        return true;
    } else {
        return confirm('Do you have your parents permission to access this page?');
    }
}

// -->
  
function checkAge(age) {
    return (age > 18) ? true : confirm('Do you have your parents permission to access this page?');
}

function checkAge(age) {
    return (age > 18) || confirm('Do you have your parents permission to access this page?');
}

// TASK: Write a function min(a,b) which returns the smaller of two numbers a and b.
// If the numbers are equal, return either one.
// -->

function min(a,b) {
    if (+a > +b) {
        return b;
    } else if (a < b) {
        return a;
    } else {
        console.log('Values are equal, returning the first one.')
        return a;
    }
}

// TASK: Write a function pow(x,n) that returns x to the power n.
// Then create prompts for x, n and show the result of the function.
// The function should only support natural values of n (integers from 1 up).
// -->

function pow(x,n) {
    if (typeof(+x) == "number" && +x % 1 == 0
    && typeof(+n) == "number" && +n % 1 == 0) {
        return x**n;
    }
}

let num = prompt('Enter the number.', 0);
let power = prompt('Enter the power.', 1);

pow(num, power);

// ----- FUNCTION EXPRESSIONS -----

let showMessage = function() {
    let message = 'Hello, World!';
    console.log(message);
    return message
};

// a function declaration can be called earlier than it is defined.
// a function expression is created when the execution reaches it and is usable only from that moment.

// ----- ARROW FUNCTIONS (THE BASICS) -----

let func = (arg1, arg2, ...argN) => expression

// arrow functions are a shorthand way to create function expressions
// they can be single or multiline

// TASK: Replace function expressions with arrow functions in the code below:

function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
}

ask(
    "Do you agree?",
    function () { alert("You agreed."); },
    function () { alert("You canceled the execution."); }
);

// -->

ask(
    "Do you agree?",
    () => alert("You agreed."),
    () => alert("You canceled the execution.")
);
