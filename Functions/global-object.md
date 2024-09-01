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
