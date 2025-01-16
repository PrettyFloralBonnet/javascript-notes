# The `new Function` syntax

There is one more, rarely used way to create a function:

```js
let func = new Function([arg1, arg2, ...argN], functionBody);
```

For example:

```js
let sum = new Function('a', 'b', 'return a + b');

console.log(sum(1, 2));
```

The function is literally created from a string passed at runtime. The `new Function` syntax turns any string into a function.

It's used in very specific cases, e.g. when we receive code from a server, or when we need to dynamically compile a function from a template.

Functions created using this syntax have their `[[Environment]]` set to reference the global Lexical Environment, not current one:

```js
function getFunc() {
    let value = "test";
    let func = new Function('console.log(value)');
    return func;
}

getFunc()();  // error: value is not defined
```

This means they can't reference outer variables. This is on purpose, mainly in order to protect from errors and avoid problems with minifiers.
