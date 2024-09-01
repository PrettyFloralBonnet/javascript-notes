// ----- SCOPE -----

// Code blocks

// If a variable is declared inside a code block {...}, it is only accessible inside that block.
// This applies to any variable declared inside of an if, for or while statement.
// Actually, with for loops and while loops, variables declared outside of the curly brackets,
// but within the loop construct (typically let i) are considered part of the block.

// Nested functions

// A function is nested when it is created inside of another function.
// A nested function can be returned by another function (either on its own or as a property of an object).

// Lexical environment

// Variables

// In Javascript, every executed function, code block and the script itself have an internal (hidden)
// object associated with them, called Lexical Environment.

// The Lexical Environment is a specification object (meaning it only exists in the language specification,
// and cannot be directly interacted with from the code) that consists of two parts:
//
// 1. Environment Record - an object that stores all local variables as its properties (along with some
//    other info, such as the value of *this*)
// 2. the outer reference - a reference to the outer lexical environment, associated with the outer scope.
//
// This means a "variable" is actually a property of a special internal object, the Environment Record.
// To change a variable is to change the property of this object.

// A global Lexical Environment has no outer reference (or this reference points to null).

// As the code is executed, the Lexical Environment changes:

// When the script starts, it is pre-populated with all declared variables. Initially, they are "uninitialized",
// which is a special internal state where the a variable is known to the engine, but it cannot be referenced
// until it has been declared (with let/const/var). This state is almost the same as when the variable doesn't exist.

// Then, the variable definition appears. There is no assignment yet, so its value is undefined, but the variable is usable.
// This means it can be assigned a value, and then that value can be changed (assuming it was declared using let/var).

// Function declarations

// A function is a value just like a variable. However, a function declaration is instantly fully initialized.
// When a Lexical Environment is created, a function declaration immediately becomes ready to use.
// That's why, unlike with function expressions, a function created with a function declaration can be used
// even if the call is placed earlier in the code than the declaration itself.

// Inner and outer Lexical Environment

// When a function runs, a new Lexical Environment is created at the beginning of the call, to store local variables
// and call parameters. During the function call, two Lexical Environments exist: an inner one (for the call itself)
// and an outer one (global). The inner LE has also a reference to the outer one.

// When access to a variable is needed, the inner LE is searched first, then the outer one, etc. all the way towards
// the outermost one and finally the global one.

// Closures

// A closure is a function that remembers its outer variables and can access them. In some languages, that's not possible
// (or requires special handling). In JavaScript, all functions are closures out of the gate (except for those created
// with the "new Function" syntax) -- they remember where they were created thanks to the hidden [[Environment]] property,
// and their code can access outer variables.

// Garbage collection

// A Lexical Environment is usually removed from memory after the function call is done. As with any JavaScript object,
// it's only kept in memory as long as it's reachable.

// However, if a nested function exists and is still reachable after the end of the outer function call, then it has the
// [[Environment]] property referencing the Lexical Environment. In such a case, the Lexical Environment would still be
// reachable even after the function call is concluded, and would therefore remain in memory:

function f() {
    let enclosedNumber = 451;
    return function () {
        console.log(enclosedNumber);
    }
}

let g = f();  // g.[[Environment]] stores a reference to the Lexical Environment of the corresponding f() call

// If f() is called multiple times, and the resulting functions are saved, all corresponding LE objects will be retained
// in memory. They can be explicitly cleaned up later, e.g.:

g = null;  // memory is cleaned up, and the value of enclosedNumber is removed from memory

// At least that's how it works in theory. In practice, JavaScript engines try to optimize that. They analyze variable usage,
// and if it's "obvious" (from the code) that an outer variable is not used, it gets removed. An important side effect in V8
// (Chrome, Opera) is that such a variable will become unavailable for debugging:

function f() {
    let randomNumber = Math.random();
    function g() {
        debugger;  // console.log(randomNumber) --> Error: variable `randomNumber' has been optimized out
    }
    return g;
}

let g = f();
g();

// At least the console error is verbose in this case.

// TASK: Write a function sum() that works like this: sum(a)(b) = a + b (yes, use double parentheses).
// -->

function sum(a) {
    return function (b) {
        return a + b;
    }
}

console.log(sum(1)(2))  // 3

// TASK: Using the Array.filter(f) method, make a set of reusable filters:
//
//  inBetween(a, b) – between a and b or equal to them (inclusively)
//  inArray([...]) – in the given array
//
// ...that can be used in the following way:
//
//  arr.filter(inBetween(3,6)) – selects only values between 3 and 6.
//  arr.filter(inArray([1,2,3])) – selects only elements matching with one of the members of [1,2,3].
// -->

function inBetween(a, b) {
    return (x) => {
        return x > a && x < b;
    };
}

function inArray(arr) {
    return (x) => {
        return arr.includes(x);
    };
}

// TASK: Write a function byField(fieldName) that can be used as an argument for the sort() method
// in order to sort the following array:

let users = [
    { name: "John", age: 20, surname: "Johnson" },
    { name: "Pete", age: 18, surname: "Peterson" },
    { name: "Ann", age: 19, surname: "Hathaway" }
];

function byField(fieldName) {
    return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}

// TASK: The following code:

function makeArmy() {
    let shooters = [];

    let i = 0;
    while (i < 10) {
        let shooter = function () {
            console.log(i);
        };
        shooters.push(shooter);
        i++;
    }

    return shooters;
}

let army = makeArmy();

// ...has an error that results in all elements of the array logging the same value (10),

army[0]();  // 10
army[5]();  // also 10

// Change the code to make the functions in the array return numbers from 0 to 10.
// -->

function makeArmy() {
    let shooters = [];

    for (let i = 0; i < 10; i++) {  // moved the i declaration into the loop
        let shooter = function () {
            console.log(i);
        };
        shooters.push(shooter);
        i++;
    }

    return shooters;
}
