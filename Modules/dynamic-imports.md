# Dynamic imports

Import and export statements we have covered so far are called **static**. We can't dynamically generate any parameters for `import`. The module path must be a string. It cannot be a function call, so something like `import ... from getModuleName();` won't work.

Also, imports cannot run conditionally, or within any sort of code block:

```js
if (...) {
    import ...;  // error
}

{
    import ...;  // error
}
```

But what if we really need to import something conditionally, or at a specific time?

## The `import()` expression

The `import(module)` expression loads the `module` and returns a promise that resolves into a module object that contains all of its exports. It can be called from any place in the code.

```js
let modulePath = prompt('Enter path of the module to load.');

import(modulePath)
    .then((obj) => {
        // <module object>
    }).catch((error) => {
        // loading error, e.g. no such module
    });
```

We could also use `let module = await import(modulePath)` inside an async function. For example, given the following exports:

```js
// say.js

export function hello() {
    console.log('Hello!');
}

export function bye() {
    console.log('Bye!');
}
```

Then the dynamic import would look like this:

```js
let { hi, bye } = await import('./say.js');
```

Or, if `say.js` has a default export:

```js
let obj = await import('./say.js');

let say = obj.default;
```

Note that dynamic imports work in regular scripts (they don't require `script type="module"`).

Note also that although `import()` looks like a function call, technically it's not a function. It's a special syntax that just happens to use parentheses `()`, similar to `super()`. It doesn't inherit from `Function.prototype`, so you cannot `call` or `apply` it.
