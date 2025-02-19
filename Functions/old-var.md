# The old `var`

While in general `var` is no longer used in modern scripts, it's important to understand the differences between it and `let` when migrating old scripts, to avoid odd errors.

## `var` has no block scope

Normally variables declared inside code blocks are not visible outside of the block scope:

```js
if (true) {
    let test = true;  // use "let"
}

console.log(test);  // Error: test is not defined
```

...but if we use `var` instead:

```js
if (true) {
    var test = true;  // use "let"
}

console.log(test);  // true
```

Variables declared with `var` are either function-wide or global (they're visible through blocks). The same thing applies to loops:

```js
for (var i = 0; i < 10; i++) {
    // ...
}

console.log(i);  // 10 (i is visible after the loop)
```

However, if a code block is inside of a function, `var` becomes a function-level variable:

```js
function sayHi() {
    if (true) {
        var phrase = "Hello";
    }
    console.log(phrase);
}

sayHi();
console.log(phrase);  // Error: phrase is not defined
```

This happens because back when `var` was in use, code blocks didn't have Lexical Environments.

## var accepts redeclarations

With `var`, we can redeclare a variable any number of times. If we use `var` with a variable that's already declared, the original value is ignored:

```js
var user = "Pete";
var user = "John";  // no error

console.log(user);  // John
```

## `var` allows variables to be declared after they are used

Declarations made using `var` are processed when the function (or script) starts:

```js
function sayHi() {
    phrase = "Hello";
    console.log(phrase);
    var phrase;
}
sayHi();
```

The code above will work. Such behaviour is commonly referred to as **hoisting** (raising). All variables declared with `var` are "hoisted" to the top of the function.

Note that while declarations are hoisted, assignments are not. All `var` declarations are processed at the start of the function, so they can be referenced at any time, but they will be `undefined` until a value is assigned to them.

## IIFE

Since there was no block-level visibility in the past, programmers found a way to emulate it with IIFE - Immediately Invoked Function Expressions.

IIFE can look like this:

```js
(function () {
    let message = "Hello";
    console.log(message);
})();
```

In the example above, a sort of jury-rigged function expression is created and immediately called. It executes right away and has its own private variables.

The reason the IIFE is wrapped in parentheses is that when the interpreter encounters the `function` keyword in the code, it parses it as a start of a function declaration. However, a function declaration requires a function name, so the code would error out. And then even if we do add a name, it would still error out, because function declarations cannot be called immediately:

```js
function go() {
    // do sth
}();  // <-- Expression expected (cannot immediately call a function declaration)
```

The parentheses are a trick to make the JavaScript interpreter see the function as created in the context of another expression, and therefore treat it as a function expression (so that it doesn't need a name, and can be called immediately).

There are in fact multiple ways to create an IIFE:

```js
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
```

Again, this is mostly for historical purposes - nowadays there should be no reason to write code like this.
