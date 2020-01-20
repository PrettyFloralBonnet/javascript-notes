'use strict';  // introduced in 2009 with ES5 (unnecessary when using ES6 modules)
console.log('Hello, World!');

// ----- VARIABLES -----

let hello = 'Hello, World!', message = hello;
alert(hello);
alert(message);

// legal characters: letters, digits, $, _
let _ = 'This is not python!';  // in JS, _ has no special meaning as variable name

const pageLoadTime = 0  // constant calculated at runtime

// constants known ahead of runtime (note the naming convention)
const COLOR_RED = '#F00';
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

let color = COLOR_BLUE;

var oldType = ''  // the old 'var'

// ----- DATA TYPES -----

// Number

let n = 123;
n = 12.345;

console.log(1 / 0);  // Infinity
console.log('' / 2);  // NaN
// NaN is 'sticky' (any further operation on NaN will return NaN)
// Mathematical operations are 'safe' in the sense that the script will not error out

// BigInt

// 'number' type cannot represent integer values larger than 2**53
const bigInt = 1234567890123456789012345678901234567890n;  // note the 'n' at the end

// String

let name = 'Mal';
// backticks ()``) allow for embedding:
let message = `They cannot stop the signal, ${name}!`;
let ultimateAnswer = `It is ${6 * 7}`;

// Boolean

let nameFieldChecked = true;
let ageFieldChecked = false;
let isGreater = 4 > 1;

// null

let age = null;  // reference to a non-existing object (nothing, empty, value unknown)

// undefined

let x;
console.log(x);  // shows 'undefined'
// 'undefined' means 'value is not assigned'.
// use undefined for checks if variable has been assigned
// for 'empty' or 'unknown' values, use null

// Objects and Symbols

// The object type is used for more complex data structures
// The symbol type is used to create unique identifiers for objects

// The typeof operator

typeof undefined  // "undefined"
typeof 0  // "number"
typeof 10n  // "bigint"
typeof true  // "boolean"
typeof "foo"  // "string"
typeof Symbol("id")  // "symbol"
typeof Math  // "object"
typeof null  // "object" (that's wrong - it's a known error)
typeof alert  // "function" (functions are objects, but typeof treats them differently)

// typeof can also be used as a function: typeof(value)

// ----- TYPE CONVERSIONS -----

// string conversion

String(null)  // 'null'
String(3)  // '3'

// numeric conversion

Number(null)  // 0
Number(undefined)  // NaN
Number(true)  // 1
Number('3')  // 3
Number('')  // 0
Number('0')  // 0
Number('hello')  // NaN

// boolean conversion

Boolean('0')  // true (string is not empty)
const FALSY_VALUES = [0, '', null, undefined, NaN];

// ----- OPERATORS -----

// increment/decrement

// operators ++ and -- can be placed before ('prefix') and after ('postfix') a variable
let counter = 1;
let a = ++counter;
alert(a);  // 2

// but...
let counter = 1;
let a = counter++;  // 'postfix' form increments counter but returns old value
alert(a);  // 1

// bitwise operators

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators

// Bitwise operators treat arguments as 32-bit integers.
// They work on the level of their binary representation,
// but return standard JavaScript numbers.

// comma

// The comma operator allows us to evaluate several expressions:

let a = (1 + 2, 3 + 4);
console.log(a);  // 7; 1 + 2 is evaluated and immediately discarded

// Each of them is evaluated, but only the result of the last one is returned.
// Comma has a very low precedence (lower than '='), so parentheses are needed in the example above.

// ----- COMPARISONS -----

// for string comparison, JavaScript uses a dictionary/lexographical order
// where strings are compared letter by letter:

console.log('Z' > 'A');  // true
console.log('Glow' > 'Glee');  // true
console.log('Bee' > 'Be');  // true

// lowercase characters have greater indices in Unicode than uppercase ones

// it's possible that two values are equal, but one of them is true as boolean, whereas the other is false

let a = 0;
console.log(Boolean(a));  // false
let b = "0";
console.log(Boolean(b));  // true

console.log(a == b);  // true!

// strict equality operator

/// The '===' operator checks for equality without type conversion:

console.log(null === undefined);  // false

// null and undefined

// the standard (non-strict) equality check '==' for undefined and null is defined
// so that (without any conversions) they are equal to each other, and are not equal to anything else:

console.log(null == 0);  // false
console.log(null == undefined);  // true

// NaN in comparisons

console.log(NaN == NaN);  // false

// NaN returns false for all comparisons. To check if a value is a NaN, use isNaN() function.

// ----- INTERACTION: ALERT, PROMPT, CONFIRM -----

// alert()

let message = '!';
alert(message);

// This shows a message in a modal window and pauses script execution until 'OK' is pressed

// prompt()

result = prompt(title, _default);

// 'title' is the text to show to the user
// _default is the optional default value of the input field

// prompt() returns the text from the input field or null if the input was cancelled

// confirm()

question = 'Is this podracing?'
result = confirm(`${question}`);

// This shows a modal window with the question and two buttons: OK and Cancel
// Returns true if OK was pressed and false otherwise

// ----- CONDITIONAL OPERATORS -----

// TASK: Using if..else, write the code which gets a number via prompt, and then alerts:

//     1, if the value is greater than zero,
//     -1, if it's less than zero,
//     0, if it equals zero.

// -->
let num = prompt('Enter a number', 0);

if (!isNaN(+num)) {
    if (num > 0) {
        alert(1);
    } else if (num < 0) {
        alert(-1);
    } else {
        alert(0);
    }
} else {
    alert('Could not evaluate input as a number.');
};

// TASK: Rewrite the code below using the conditional operator '?':

let result;

if (a + b < 4) {
    result = 'Below';
} else {
    result = 'Over';
}

// -->
let result = (a + b < 4) ? 'Below' : 'Over';

// ----- LOGICAL OPERATORS -----

// There are three logical operators in JavaScript: || (OR), && (AND), ! (NOT).

// || (OR)

// a chain of OR "||" returns the first truthy value, or the last one if no truthy value is found:

alert(1 || 0);  // 1
alert(true || 'no matter what');  // true
alert(null || 1);  // 1
alert(null || 0 || 1);  // 1
alert(undefined || null || 0);  // 0 (returns the last value because all are falsy)

// && (AND)

// a chain of AND "&&" returns the first falsy value, or the last value if none were found:

alert(1 && 0);  // 0
alert(1 && 5);  // 5
alert(null && 5);  // null
alert(0 && "no matter what");  // 0
alert(1 && 2 && null && 3);  // null
alert(1 && 2 && 3);  // 3 (the last one)

// ! (NOT)

// The NOT "!" operator converts the operand to boolean and returns the inverse value.

alert(!true);  // false
alert(!!"non-empty string");  // true (note the two '!' operators)

// Precedence of NOT is lower than OR is lower than AND.


// TASK: Write a conditional statement to check that age is NOT between 14 and 90 inclusively.
// Create two variants: the first one using NOT !, the second one – without it.
// -->

let age = prompt('Enter your age', '');

if (!(age >= 14 && age <= 90)) {
    alert('Age condition met.');
} else {
    alert('Age condition not met.');
};

let age = prompt('Enter your age', '');

if ((age < 14) || (age > 90)) {
    alert('Age condition met.');
} else {
    alert('Age condition NOT met.');
};


// TASK: Write the code asking for a login with prompt.
// If the input is "Admin" - prompt for a password.
// If the input is empty (or Esc) - show “Login cancelled.”
// If it’s something else - show “Incorrect username.”

// The password is checked as follows:

//     If it equals “TheMaster”, then show “Welcome!”
//     Another string – show “Incorrect password.”
//     For an empty string or cancelled input, show “Login cancelled.”
// -->

let login = prompt('Enter username:', '');

if (login == 'Admin') {
    let password = prompt('Enter password:', '');

    if (password == 'TheMaster') {
        alert('Welcome!');
    } else if (!password) {
        alert('Login cancelled.');
    } else {
        alert('Incorrect password.');
    };
} else if (!login) {
    alert('Login cancelled');
} else {
    alert('Incorrect username.');
};

// ----- LOOPS: WHILE AND FOR -----

// the do while loop

do {
    // loop body
} while (condition);

// The condition check can be moved below the while loop body -
// the loop will first execute the body, then check the condition.
// This syntax should only be used when it's preferable that the body of the loop
// executes at least once, regardless of the condition.

// variables declared inline are only visible inside the loop:

for (let i = 0; i < 3; i++) {
    alert(i); // 0, 1, 2
}
alert(i); // error, no such variable

// omitting parts of the for loop
// for (;;) {
// repeats endlessly
// };

// labels for break and continue

outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let input = prompt(`Value at coords (${i},${j})`, '');

        // if empty string or canceled, break out of both loops
        if (!input) break outer;
        // do something with the value...
    }
};
alert('Done!');

// TASK: Use the for loop to output even numbers from 2 to 10.
// -->

for (let i = 2; i < 11; i += 2) {
    console.log(i);
};

// ...or:

for (let i = 2; i < 11; i++) {
    if (i % 2 != 0) continue;
    console.log(i);
};

// ...or:

for (let i = 2; i <= 10; i++) {
    if (i % 2 == 0) {
        console.log(i);
    }
};

// TASK: Rewrite the code by changing the for loop to a while loop without altering its behavior:

for (let i = 0; i < 3; i++) {
    alert(`number ${i}!`);
};

// -->:

while (i < 3) {
    alert(`number ${i}!`);
    i++;
};


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
