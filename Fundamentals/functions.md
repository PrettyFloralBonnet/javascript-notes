## Functions

Functions are the main building blocks of a program. They allow the code to be called many times without repetition.

## Function declarations

To create a function, we can use a function declaration:

```js
function showMessage() {
    let message = 'Hello World!';
    console.log(message);
    return message;
}
```

A variable declared inside a function is only visible inside that function (local variables). However, a function can access (and modify) outer variables.

If a function does not explicitly return a specific value, it returns `undefined`.

JS assumes a semicolon at the end of the line which contains `return`.

## Function expressions

Another way to create a function is through a function expression:

```js
let showMessage = function() {
    let message = 'Hello, World!';
    console.log(message);
    return message;
};
```

Unlike a function declaration, which can be called earlier in the code than it is defined, a function expression is created when the execution reaches it, and is only usable from that moment on.

## Arrow functions

Arrow functions are a shorthand way to create function expressions:

```js
let func = (arg1, arg2, ...argN) => expression
```

If there is only one argument, the parentheses can be omitted. If there are no arguments, the parentheses must be present, but empty.
