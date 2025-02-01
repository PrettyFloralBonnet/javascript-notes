# `async` / `await`

The `async` / `await` syntax allows to work with promises in a more comfortable fashion.

## Async functions

The `async` keyword can be placed before a function:

```js
async function foo() {
    return 1;
}
```

It makes the function **always return a promise**. Non-promise values are automatically wrapped in a resolved promise.

## `await`

The `await` keyword only works inside async functions. It makes the JS engine wait until the promise is settled, and its result is returned.

```js
async function foo() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('Done!'), 1000)
    });

    let result = await promise;

    console.log(result);
}
```

The function execution is **suspended** at the line that contains the `await` keyword, and **resumed** when the promise settles.

The wait doesn't take any resources, because the JS engine can do other jobs in the meantime (execute other scripts, handle events etc.). Overall, it's a more elegant and legible way of obtaining promise results than `promise.then()`.

Using `await` in regular functions leads to a syntax error.