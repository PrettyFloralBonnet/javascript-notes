// ----- FUNCTION OBJECT, NFE -----

// Functions are objects in JavaScript - we can call them, but also add or remove properties to them,
// pass by reference etc.

// Functions have built-in properites such as name (default ones are created based on context), length
// (returns the number of parameters the function has, not counting rest parameters).

// Custom properties can be added as well. Note that a property assigned to a function, e.g. sayHi.counter = 0,
// does not define a local variable "counter" inside it. In other words, a "counter" property and a "counter" variable
// are two different things.

// Named Function Expression

// Function expressions can be given names:

let sayHi = function func(who) {
    console.log(`Hello, ${who}`);
};

// This is still a function expression (not a declaration), nothing broke, and the function is still available as "sayHi()".
// However, now the function can be referenced internally (all the while the name is not visible outside of the function):

let sayHi = function func(who) {
    if (who) {
        console.log(`Hello, ${who}`);
    } else {
        func("Guest");  // internal function call to itself
    };
};
sayHi(); // Hello, Guest

func(); // Error, func is not defined (not visible outside of the function)

// The above can be done without NFE as well, but then if the function gets reassigned in the outer scope, e.g.:

let welcome = sayHi;
sayHi = null;

// ...it stops working, because the function uses the sayHi variable from the outer lexical environment (there is no
// local sayHi, so the outer one is used, and at the moment of the call it equals to null). NFE is local to the function,
// and so it solves that problem.

// NFE syntax does not exist for function declarations.

// Many widely used JavaScript libraries make use of the NFE feature by creating a "main" function and attaching "helper"
// functions to it (so that the function is useful by itself, but also carries other functionalities as properties).
// E.g. the jQuery library creates a function named $, and the lodash library creates a function _ (and then adds _.clone,
// _.keyBy and other properties to it). Doing so also mitigates the pollution of the global space, so that one library
// only provides a single global variable, reducing the possibility of name conflicts.

// TASK: Modify the code below so that the counter can also be decreased and set the number:
//
// - counter() should return the next number (as before)
// - counter.set(value) should set the counter to value
// - counter.decrease() should decrease the counter by 1

function makeCounter() {
    function counter() {
        return counter.count++;
    };

    counter.count = 0;
    return counter;
}

let counter = makeCounter();

// Use either a closure or a function property to keep the current count (or write both variants).
// -->

function makeCounter() {
    function counter() {
        return counter.count++;
    };

    counter.set = function (value) {
        counter.count = value;
        return counter.count;
    };

    counter.decrease = function () {
        return counter.count--;
    };

    counter.count = 0;
    return counter;
}

// ...or:

function makeCounter() {
    let count = 0;

    function counter() {
        return count++;
    }

    counter.set = value => count = value;

    counter.decrease = () => count--;

    return counter;
}

// TASK: Write a function sum() that would work like this:

sum(1)(2) == 3;  // 1 + 2
sum(1)(2)(3) == 6;  // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15

// You may need to set up a custom object to primitive conversion for your function.
// -->

function sum(a) {

    let currentSum = a;

    function f(b) {
        currentSum += b;
        return f;
    }

    f.toString = function () {
        return currentSum;
    };

    return f;
}
