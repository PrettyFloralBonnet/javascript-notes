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

// ----- THE OLD "VAR" -----

// While in general "var" is no longer used in modern scripts, it’s important to understand the differences
// between it and "let" when migrating old scripts, to avoid odd errors.

// var has no block scope

// Normally variables declared inside code blocks are not visible outside of the block scope:

if (true) {
    let test = true;  // use "let"
}

console.log(test);  // Error: test is not defined

// ...but if we use "var":

if (true) {
    var test = true;  // use "let"
}

console.log(test);  // true

// Variables declared with "var" are either function-wide or global (they're visible through blocks).
// The same thing applies to loops:

for (var i = 0; i < 10; i++) {
    // ...
}

console.log(i);  // 10 (i is visible after the loop)

// If a code block is inside of a function, "var" becomes a function-level variable:

function sayHi() {
    if (true) {
        var phrase = "Hello";
    }
    console.log(phrase);
}

sayHi();
console.log(phrase);  // Error: phrase is not defined

// The above happens because back when "var" was in use, JavaScript code blocks didn't have Lexical Environments.

// var accepts redeclarations

// With "var", we can redeclare a variable any number of times. If we use var with a variable that's already
// declared, it simply gets ignored:

var user = "Pete";
var user = "John";  // this "var" does nothing (already declared, no error)

console.log(user);  // John

// var allows variables to be declared after they are used

// Declarations made using "var" are processed when the function (or script) starts:

function sayHi() {
    phrase = "Hello";
    console.log(phrase);
    var phrase;
}
sayHi();

// The code above will work. Such behaviour is referred to as hoisting, because all variables declared with
// "var" are "hoisted" (raised) to the top of the function.

// Declarations are hoisted. Assignments are not. All "var" declarations are processed at the start of the function,
// so they can be referenced at any time, but they will be undefined until a value is assigned to them.

// IIFE

// Since there was no block-level visibility in the past, programmers found a way to emulate it with IIFE - 
// Immediately Invoked Function Expressions.

// An IIFE can look like this:

(function () {
    let message = "Hello";
    console.log(message);
})();

// In the example above, a function expression is created and immediately called, so it executes right away
// and has its own private variables.

// The reason the IIFE is wrapped in parentheses is when the interpreter encounters the "function" keyword in the code,
// it parses it as a start of a function declaration. However, a function declaration requires a function name,
// so the code would error out. And then even if we do add a name, it would still error out, because function declarations
// cannot be called immediately:

// function go() {
// do sth
// }();  // <-- Expression expected (cannot immediately call a function declaration)

// The parentheses are a trick to make the JavaScript interpreter see the function as created in the context of another
// expression, and therefore treat it as a function expression (so that it doesn't need a name and can be called immediately).

// There are in fact multiple ways to create an IIFE:

(function () {
    console.log("Parentheses around the function");
})();

(function () {
    console.log("Parentheses around the entire expression");
}());

!function () {
    console.log("Bitwise operator NOT at the beginning of the expression");
}();

+function () {
    console.log("Unary plus at the beginning of the expression");
}();

// Again, this is mostly for historical purposes - nowadays there should be no reason to write code like this.

// ----- GLOBAL OBJECT -----

// The global object provides variables and functions available anywhere (built into the language or the environment).

// In the browser, the global object is named 'window'. For node.js it is 'global'. For other environments it may have
// yet another name. A keyword 'globalThis' was added to the language as a standardized name for the global object,
// and it should work in all environments.

// All properties of the global object can be accessed directly:

alert("Hello");  // is the same as:
window.alert("Hello");

// In a browser, global functions and variables declared with var (not let/const) become a property of the global object:

var gVar = 5;
console.log(window.gVar);  // 5

// However, this behavior only exists for compatibility reasons. Modern JavaScript modules may not use it.
// Also, if we use let instead, it doesn't happen:

let gLet = 5;
console.log(window.gLet);  // undefined

// If a value is so important that it needs to be available globally, it should be directly declared as a property:

window.currentUser = {
    name: "John"
};

// somewhere else in code
alert(currentUser.name);  // John

// That said, the use of global variables is generally discouraged, and there should be as few of them as possible
// (for the sake of clarity, avoiding errors and ease of testing).

// Use for polyfills

// The global object can be used to test for support of modern language features. For instance, test if a built-in
// Promise object exists (in really old browsers it does not):

if (!window.Promise) {
    console.log("Your browser is really old!");
}

// Afterwards, polyfills may be created to make up for the lack of modern functionality.

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

// ----- THE "NEW FUNCTION" SYNTAX -----

// There is one more, rarely used way to create a function:

let func = new Function([arg1, arg2, ...argN], functionBody);

// ...e.g.:

let sum = new Function('a', 'b', 'return a + b');

console.log(sum(1, 2));

// The function is literally created from a string passed at runtime. "New function" turns any string into a function.
// It's used in very specific cases, e.g. when we receive code from a server, or when we need to dynamically
// compile a function from a template.

// Functions created using this syntax have their [[Environment]] set to reference the global Lexical Environment,
// not the outer one:

function getFunc() {
    let value = "test";
    let func = new Function('console.log(value)');
    return func;
}

getFunc()();  // error: value is not defined

// This means they can't reference outer variables (in order to protect from errors and avoid problems with minifiers).

// ----- SCHEDULING: SETTIMEOUT AND SETINTERVAL -----

// We may decide not to call a function right now, but at a specified later time. It's called "scheduling a call".

// There are two methods for it:
//
//      setTimeout allows to run a function once, after a given time interval,
//      setInterval allows to run a function repeatedly, starting after a given time interval, and then again and again
//      after that same interval.

// These methods are not part of the JavaScript specifications, but most emvironments provide them (e.g. most browsers,
// Node.js).

// setTimeout

let timerId = setTimeout(func | code, [delay], [arg1], [arg2]) //, ...)

// func|code
//      A function (or a string containing the code, for historical reasons) to be executed.
// delay
//      The delay before the call, in milliseconds (1000 ms = 1 second), 0 by default.
// arg1, arg2…
//      Arguments for the function (not supported in IE9-).

// Cancelling with clearTimeout

// A call to setTimeout returns a "timer identifier" called timerId, which can be used to cancel the execution.

let timerId = setTimeout(
    // ...
);

clearTimeout(timerId);

// In the code below, the function is scheduled for execution and then it is cancelled. As a result, nothing happens:

let timerId = setTimeout(() => console.log("This is never executed."), 1000);
console.log(timerId);  // timer identifier
clearTimeout(timerId);
console.log(timerId);  // same identifier (does not become null after cancelling)

// In a browser, the timer identifier is a number. In other environments, it can be something else (e.g. in Node.js
// it returns a timer object with additional methods).

// setInterval

// The syntax is identical to that of setTimeout. To stop repeating calls, clearInterval(timerId) should be called:

let timerId = setInterval(() => console.log('tick'), 2000);
setTimeout(() => { clearInterval(timerId); confirm.length('stop'); }, 5000);  // stop after 5 seconds

// Nested setTimeout

// There is another way (besides setInterval) to run a piece of code repeatedly:

let timerId = setTimeout(function tick() {
    console.log('tick');
    timerId = setTimeout(tick, 2000);
}, 2000);

// This setTimeout schedules the next call right at the end of the current one.

// The nested setTimeout is a more flexible method than setInterval - the next call may be scheduled differently,
// depending on the results of the current one. It also guarantees a fixed delay (unlike setInterval, where part
// of the interval is consumed by the execution of the scheduled function).

// When a function is passed to setInterval or setTimeout, an internal reference to it is created and saved
// in the scheduler. It prevents the function from being garbage collected, even if there are no other references to it.
// The function stays in memory until the scheduler calls it. There’s a side-effect, however:
// a function references the outer lexical environment, so, as long as it lives, the outer variables live as well.
// They may take much more memory than the function itself. So when the scheduled function is not needed anymore,
// it’s better for it to be cancelled, even if it's very small.

// Zero delay setTimeout

// A special use case exists: setTimeout(func, 0), or just setTimeout(func).

// This schedules the execution of func as soon as possible, but only after the currently executing script is complete.
// The function is effectively scheduled to run right after the current script:

setTimeout(() => console.log("World"));
console.log("Hello");

// The first line puts the call in the "calendar" after 0 ms. But the scheduler will only "check the calendar"
// after the current script is complete. As a result, "Hello" is first, and "World" comes second.
// There are advanced browser-related use cases for the zero delay timeout (related to event loop microtasks and macrotasks).

// In the browser, there is a limitation of how often nested timers can run. As per the HTML5 standard, after five nested timers,
// the interval is forced to be at least 4 milliseconds. For server-side JavaScript, that limitation does not exist,
// and also there are other ways to schedule an immediate asynchronous job (e.g. setImmediate in Node.js).

// TASK: Write a function printNumbers(from, to) that outputs a number every second, starting with from and ending with to.
// Provide two solutions: using setInterval, and using nested setTimeout.
// -->

let printNumbers = (from, to) => {
    let num = from;
    let timerId = setInterval(() => {
        console.log(num);
        if (num === to) clearInterval(timerId);
        num++;
    }, 1000)
}

let printNumbers = (from, to) => {
    let num = from;
    setTimeout(function go() {
        console.log(num);
        if (num < to) {
            setTimeout(go, 1000);
        }
        num++;
    }, 1000);
}

// ----- DECORATORS AND FORWARDING, CALL/APPLY -----

// Transparent caching

function slow(x) {
    // e.g. CPU heavy job
    console.log(`Called with ${x}`);
    return x;
}

function cachingDecorator(func) {
    let cache = new Map();

    return function (x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func(x);

        cache.set(x, result);
        return result;
    };
}

slow = cachingDecorator(slow);

console.log(slow(1));  // slow(1) is cached
console.log(slow(2));  // slow(2) is cached

// We can call cachingDecorator for any function, and it will return the caching wrapper.
// By separating caching from the main function code, we keep the latter more simple.

// Using func.call for the context

// The caching decorator is not suited to work with object methods. E.g. in the code below,
// worker.slow() stops working:

let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        // CPU-heavy task here
        console.log("Called with " + x);
        return x * this.someMethod();
    }
};

function cachingDecorator(func) {
    let cache = new Map();
    return function (x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func(x);
        cache.set(x, result);
        return result;
    };
}

console.log(worker.slow(1));  // the original method works
worker.slow = cachingDecorator(worker.slow);
console.log(worker.slow(2));  // Error: Cannot read property 'someMethod' of undefined

// The error occurs when the code tries to access this.someMethod and fails.
// The reason is that the wrapper calls the original function as func(x) in the line,
// and the function receives *this* equal to undefined.

// So, the wrapper passes the call to the original method, but without the context. Let’s fix it.

// There's a special built-in function method func.call(context, ...args) that allows to call a function
// and explicitly set *this*:

// func.call(context, arg1, arg2, ...)

// It runs func and provides the first argument as *this*.
// These two calls do almost the same:

func(1, 2, 3);
func.call(obj, 1, 2, 3)

// They both call func with arguments 1, 2 and 3. The only difference is that func.call also sets *this* to obj.

// We can call sayHi in the context of different objects: sayHi.call(user):

function sayHi() {
    console.log(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// use call to pass different objects as *this*
sayHi.call(user);  // John
sayHi.call(admin);  // Admin

// So, we can use call in the wrapper to pass the context to the original function:

let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        console.log("Called with " + x);
        return x * this.someMethod();
    }
};

function cachingDecorator(func) {
    let cache = new Map();
    return function (x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func.call(this, x);  // *this* is passed correctly now
        cache.set(x, result);
        return result;
    };
}

worker.slow = cachingDecorator(worker.slow);
console.log(worker.slow(2));  // works
console.log(worker.slow(2));  // works, doesn't call the original (cached)

// Accomodating multiple arguments

// For now, the cachingDecorator only works with single-argument functions.
// How to cache the multi-argument worker.slow method?

let worker = {
    slow(min, max) {
        return min + max; // CPU heavy task
    }
};

// should remember same-argument calls
worker.slow = cachingDecorator(worker.slow);

// Previously, with a single argument (x), we could have just saved the result with cache.set(x, result),
// and retrieve it with cache.get(x). But now we need the result for a combination of arguments (min,max),
// and the native Map only takes a single value as the key.

// Possible solutions:
//
// * Implement or import a new, more versatile data structure similar to Map that would allow for multi-keys
// * Use nested maps: cache.set(min) would store the pair (max, result), and the result would be retrieved with
//   cache.get(min).get(max)
// * Join two values into one (e.g. string "min,max" as the Map key)

// The third variant is good enough for most practical applications, so we'll stick to it:

let worker = {
    slow(min, max) {
        console.log(`Called with ${min},${max}`);
        return min + max;
    }
};

function cachingDecorator(func, hash) {
    let cache = new Map();
    return function () {
        let key = hash(arguments);
        if (cache.has(key)) {
            return cache.get(key);
        }

        let result = func.call(this, ...arguments);

        cache.set(key, result);
        return result;
    };
}

function hash(args) {
    return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

console.log(worker.slow(3, 5));
console.log("Again: " + worker.slow(3, 5));

// Now the function works with any number of arguments (though the hash function would also need to be adjusted
// to allow any number of arguments. Also, more complex cases may require different hasing functions.

// func.apply

// Instead of func.call(this, ...arguments), func.apply(this, arguments) can be used:

func.apply(context, args)

// It runs the function func while setting *this* to context and using an array-like object args as the list of arguments.
// The only syntax difference between it and func.call is that while call expects a list of arguments,
// apply takes an array-like object. So these two calls are almost the same:

func.call(context, ...args);  // pass an array as list with spread syntax
func.apply(context, args);  // pass an array-like object

// For objects that are both iterable and array-like, like an actual array, either can be used -- 
// though apply will probably be faster, because most JavaScript engines have better internal optimization for it.

// Passing all arguments along with the context to another function is referred to as call forwarding.

// Borrowing a method

// Let's make one more minor improvement to the hashing function:

function hash(args) {
    return args[0] + ',' + args[1];
}

// Thus far, it works only with two arguments. To make it accept more, a solution could be to use arr.join method:

function hash(args) {
    return args.join();
}

// ...but unfortunately, that won't work, because when hash(arguments) is called, the args object is not a real array
// (despite being both an array-like and an iterable)

// However, arr.join() can still be used in the following way:

function hash() {
    alert([].join.call(arguments));
}

hash(1, 2);

// This trick is called method borrowing. We take a join method from a regular array([].join) and use[].join.call
// to run it in the context of arguments.

// Decorators and function properties

// It is generally safe to replace a function or a method with a decorated one -- except when the original function
// had properties on it (e.g. func.calledCount or something along those lines). In such a case the decorated function
// will not provide them (as it's just a wrapper).

// Some decorators may provide their own properties. A decorator may, for example, count how many times
// a function was invoked, and how much time it took, and provide this information via wrapper properties.

// There is a way to create decorators that keep access to function properties, but this requires
// using a special Proxy object to wrap functions.

// TASK: Create a decorator spy(func) that returns a wrapper that saves all calls to the function in its calls property.
// Have every call saved as an array of arguments:

function work(a, b) {
    console.log(a + b); // work is an arbitrary function or method
}

work = spy(work);

work(1, 2);
work(4, 5);

for (let args of work.calls) {
    console.log('call:' + args.join());  // "call:1,2", "call:4,5"
}

// -->

function spy(func) {
    function wrapper(...args) {
        wrapper.calls.push(args);
        return func.apply(this, args);
    }
    wrapper.calls = [];
    return wrapper;
}

// TASK: Create a decorator delay(f, ms) that delays each call to f by ms milliseconds:

function f(x) {
    console.log(x);
}

let delay1000 = delay(f, 1000);
let delay1500 = delay(f, 1500);

f1000("test");  // shows "test" after 1000 ms
f1500("test");  // shows "test" after 1500 ms

// Have the solution accept multiple arguments.
// -->

function delay(func, ms) {
    function wrapper(...args) {
        setTimeout(() => func.apply(this, args), ms);
    };
    return wrapper;
}

let f1000 = delay(f, 1000)
f1000('test')

// TASK: The result of debounce(f, ms) decorator is a wrapper which:
//
// 1) suspends calls to f until there’s ms milliseconds of inactivity ("cooldown period" of no calls),
// 2) invokes f with the latest arguments (arguments from previous calls are ignored).
//
// For instance, we had a function f and replaced it with f = debounce(f, 1000).
// The cooldown period is calculated from the last attempted call.

let f = _.debounce(console.log, 1000);

f("a");
setTimeout(() => f("b"), 200);
setTimeout(() => f("c"), 500);

// This is a useful way of processing sequences of events, e.g. handling user inputs
// (no need to call a function on every letter).

// Implement a debounce decorator.
// -->

function debounce(func, ms) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), ms);
    };
}

// TASK: Create a "throttling" decorator throttle(f, ms) that returns a wrapper which,
// when called multiple times, passes the call to f at a maximum rate of 1 per ms (milliseconds).

// This type of decorator is useful for processing regular updates which should have intervals between them
// (e.g. tracking mouse movements).

// Example code:

function f(a) {
  console.log(a);
}

let f1000 = throttle(f, 1000);

f1000(1);  // shows 1
f1000(2);  // (throttling, 1000ms not out yet)
f1000(3);  // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored
// -->

function throttle(func, ms) {

    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);
        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }
    return wrapper;
}

// ----- FUNCTION BINDING -----

// When object methods are passed as callbacks (e.g. to setTimeout), *this* is lost:

let user = {
    firstName: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};

setTimeout(user.sayHi, 1000);  // undefined

// The reason for the undefined is setTimeout got the function user.sayHi separately from the object.
// This is a known problem, but it can be fixed.

// Solution 1: a wrapper

// The simplest solution is to use a wrapping function:

let user = {
    firstName: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};

setTimeout(function () {
    user.sayHi();  // Hello, John!
}, 1000);
  
// Now it works, because it receives user from the outer lexical environment, and then calls the method normally.
// Shorter version:
  
  setTimeout(() => user.sayHi(), 1000);  // Hello, John!
  
// However, if the user variable is reassigned, the function will reference the wrong object.
// The next solution guarantees such a thing won't happen.

// Solution 2: bind

let boundFunc = func.bind(context);  // simplified syntax

// The result of func.bind(context) is a special function-like object that is callable as a function,
// and transparently passes the call to func, while setting this equal to the provided context argument.
// In other words, calling boundFunc is like calling func, but with a fixed *this*:

let user = {
    firstName: "John"
};

function func() {
    console.log(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // John

// It also works with object methods:

let user = {
    firstName: "John",
    sayHi() {
        console.log;(`Hello, ${this.firstName}!`);
    }
};

let sayHi = user.sayHi.bind(user);
sayHi();  // Hello, John!
setTimeout(sayHi, 1000);  // Hello, John!
  
// Even if the value of user changes within 1 second, sayHi uses the pre-bound value,
// which is a reference to the old user object.
  
// We take the method user.sayHi and bind it to user. The sayHi variable is a bound function
// and it can be called alone or passed to setTimeout. Regardless, the context will be correct.
  
// Arguments are passed as is -- only this is fixed by bind:

let user = {
    firstName: "John",
    say(phrase) {
        console.log(`${phrase}, ${this.firstName}!`);
    }
};

let say = user.say.bind(user);

say("Hello");  // Hello, John ("Hello" argument is passed to say)
say("Bye");  // Bye, John ("Bye" is passed to say)

// Note: a function cannot be rebound (the bound function object only remembers the context
// at the time of creation). Moreover, the result of bind is an object separate from the original.
  
// bindAll -- for convenience
  
// If an object has many methods that need to be passed around a lot, they can all be bound in a loop:
  
for (let key in user) {
    if (typeof user[key] == 'function') {
        user[key] = user[key].bind(user);
    }
}
  
// JavaScript libraries also provide functions for convenient mass binding, e.g.
// _.bindAll(object, methodNames) in lodash.

// Partial function application

// Arguments can be bound in the same way *this* can:

// let bound = func.bind(context, [arg1], [arg2], ...);

// Given a multiplication function multiply(a,b)...

function multiply(a, b) {
    return a * b;
}

// ...let's use bind to create a function double():

let double = multiply.bind(null, 2);

console.log(double(3));  // = multiply(2, 3) = 6
console.log(double(4));  // = multiply(2, 4) = 8
console.log(double(5));  // = multiply(2, 5) = 10

// The call to multiply.bind(null, 2) creates a new function double() that passes calls to multiply,
// fixing null as the context and 2 as the first argument. Subsequent arguments are passed as they appear.

// This is referred to as partial function application -- we create a new function by fixing some
// parameters of the existing one.

// Partial application is useful when we have a very generic function and want a less universal variant for convenience
// (e.g. we have a function send(from, to, text), but inside of a user object we may want to use a partial variant of it
// like sendTo(to, text) that always sends from the current user).

// Going partial without context

// The native bind() does not allow to fix arguments only, without context. However, a function which does allow it
// it can be easily implemented:

function partial(func, ...argsBound) {
    return function(...args) {
        return func.call(this, ...argsBound, ...args);
    }
}

let user = {
    firstName: "John",
    say(time, phrase) {
        console.log(`[${time}] ${this.firstName}: ${phrase}!`);
    }
};

user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");  // [10:00] John: Hello!

// The result of partial() is a wrapper that calls func with the same context it has received (for user.sayNow
// it's user), arguments from the partial call (in that case, the date and hour) and the arguments given to
// the wrapper ("Hello").

// The lodash library already contains an implementation of this (_.partial).

// TASK: The call to askForPassword() in the code below should check the password
// and then call user.loginOk/loginFail, depending on the answer.
// However, currently it results in an error. Why?
// Fix the call without changing the code in the function or the user object.

function askForPassword(ok, fail) {
    let password = prompt("Password?", '');
    if (password == "rockstar") ok();
    else fail();
}

let user = {
    name: 'John',

    loginOk() {
        console.log(`${this.name} logged in`);
    },

    loginFail() {
        console.log(`${this.name} failed to log in`);
    },

};

askForPassword(user.loginOk, user.loginFail)  // error: this is not defined

// -->

askForPassword = askForPassword.bind(user);
askForPassword(user.loginOk, user.loginFail);

// or:

askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

// or:

askPassword(() => user.loginOk(), () => user.loginFail());  // no context for arrow functions

// TASK: The user object from aboce was modified. Now instead of two functions loginOk/loginFail,
// it only has a single function user.login(true/false).

// What should be passed to askPassword in the code below, so that it calls user.login(true) as ok
// and user.login(false) as fail?

// Like before, only modify the call.

function askPassword(ok, fail) {
    let password = prompt("Password?", '');
    if (password == "rockstar") ok();
    else fail();
}

let user = {
    name: 'John',

    login(result) {
        console.log(this.name + (result ? ' logged in' : ' failed to log in'));
    }
};

// -->

askPassword(user.login.bind(user, true), user.login.bind(user, false));

// or:

askPassword(() => user.login(true), () => user.login(false));

// ----- Arrow functions revisited -----

// When coding in JavaScript, you will often encounter situations where a small function is needed
// to be executed somewhere else (e.g. arr.forEach(func), setTimeout(func) and more).

// Functions in JS are very much intended to be passed around, usually without their current context.
// That's where arrow functions come in handy.

// Arrow functions have no *this*

// If *this* is accessed within an arrow function, it is taken from the outside.
// E.g. they can be used to iterate over an object property from within an object method:

let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(  // this refers to group, not showList()
            student => console.log(this.title + ': ' + student)
        );
    }
};

group.showList();

// Another result is that arrow functions cannot be used as constructors (with the 'new' operator).

// Arrow functions have no arguments (of their own)

// That is handy for decorators, when we need to forward a call with the current this and arguments:

function defer(f, ms) {
    return function () {
        setTimeout(() => f.apply(this, arguments), ms)
    };
}

function sayHi(who) {
    console.log('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John");

// The same without an arrow function would look like:

function defer(f, ms) {
    return function (...args) {
        let context = this;
        setTimeout(function () {
            return f.apply(context, args);
        }, ms);
    };
}

// Note how additional variables args and context had to be created so that the function
// inside setTimeout could take them.

// Arrow functions don't have super

// This will be explored more in the chapter Class inheritance.
