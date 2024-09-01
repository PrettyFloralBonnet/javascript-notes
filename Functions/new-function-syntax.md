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
