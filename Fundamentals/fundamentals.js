// TASK: Write a loop which prompts for a number greater than 100.
// If another number is entered, ask for input again.
// The loop must ask for a number until either the a number greater than 100 is entered,
// or the input is canceled/an empty line is entered.
// Assume that inputs will always be numbers.
// -->

let input;

do {
    input = prompt('Enter a number greater than 100','');
} while (input <= 100 && input);

// TASK: Write code which outputs prime numbers in the interval from 2 to n
// e.g. for n = 10 the result should be 2,3,5,7.
// The code should work for any n, not be hard-tuned for any fixed value.
// -->

function showPrimes(n) {
    nextPrime: for (let i = 2; i < n; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue nextPrime;
        }
    alert(i);
    }
}

// improved version:

function showPrimes(n) {
    for (let i = 2; i < n; i++) {
        if (!isPrime(i)) continue;
        alert(i);
    }
}

function isPrime (n) {
    for (let i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

// ----- THE "SWITCH" STATEMENT -----

let a = 3 + 1;

switch(a) {
    case 3:
        console.log(`Value is lower than target ${a}.`);
        break;
    case 4:
        console.log('The values match!');
        break;
    case 5:
        console.log(`Value is higher than target ${a}.`);
        break;
    default:  // executes if no case matches
        console.log(`All possibilities extinguished, no match found for target ${a}.`)
}

// if there are no break statements, execution will continue to the next case
// both switch and case allow for arbitrary expressions
// switch statements check for strict equality - type matters

// TASK: Rewrite the code below using if..else:

switch (browser) {
    case 'Internet Explorer':
      alert("This browser is not supported.");
      break;
  
    case 'Chrome':
    case 'Firefox':
    case 'Safari':
    case 'Opera':
      alert('We support these browsers!');
      break;
  
    default:
      alert('Displaying your page.');
};
  
// -->

if (browser === 'Internet Explorer') {
    alert('This browser is not supported.');
} else if (browser === 'Chrome'
    || browser === 'Firefox'
    || browser === 'Safari'
    || browser === 'Opera') {
    alert('We support these browsers!');
} else {
    alert('Displaying your page.');
}

// TASK: Rewrite the code below using a single switch statement:

let a = +prompt('a?', '');

if (a === 0) {
  alert(0);
}
if (a === 1) {
  alert(1);
}

if (a === 2 || a == 3) {
  alert('2,3');
};

// -->

switch(a) {
    case 0:
        alert(0);
        break;
    case 1:
        alert(1);
        break;
    case 2:
    case 3:
        alert('2,3');
        break;
}

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
