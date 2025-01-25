# Promises

In programming, we often encounter a situation where the "producing code" does something which takes time (e.g. loads some data over the network), and the "consuming code" that needs the results once they are ready.

A **promise** is a JavaScript object which connects the "producing code" and the "consuming code". The former takes whatever time it needs to produce the promised result, and the latter is granted the results by the promise, once the result is available. This is a simplified analogy, but the way it works resembles a subscription list.

Promise syntax:

```js
let promise = new Promise(function(resolve, reject) {
    // executor (the "producing code")
});
```

The function passed to `new Promise` is called the **executor**. It runs automatically when the promise is created. It contains the "producing code" which should eventually produce the result.

The arguments `resolve` and `reject` are callbacks provided by JavaScript itself (our code is only inside the executor).

When the executor obtains the result, it should call one of the callbacks:
* `resolve(value)` - if the job finished successfully (with result `value`)
* `reject(error)` - if an error has occurred (with `error` being the error object)

The `promise` object returned by the `new Promise` constructor has the following internal properties:

* `state`: initially `"pending"`, which changes to `"fulfilled"` when `resolve` is called, or `"rejected"` when `resolve` is called
* `result`: initially `undefined`, which changes to `value` when `resolve(value)` is called, or `error` when `reject(error)` is called

Here's an example of a promise constructor with a simple executor function which takes some time (via `setTimeout`):

```js
let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve('done'), 1000);
});
```

The executor is called **automatically** and **immediately** when the promise is constructed. It receives two arguments: `resolve` and `reject`, both of which are predefined by the JS engine, so we don't need to create them (we only need to call them when ready).

In the example above, after 1 second timeout, the executor calls `resolve('done')` to produce the result, which changes the state of the `promise` object to `state: "fulfilled"` and `result: "done"`.

Here's an example of the executor rejecting the promise with an error:

```js
let promise = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('An error has occurred.')), 1000);
});
```

This call moves `promise` to the `rejected` state.

A promise that is either resolved or rejected is called "**settled**".

Note: The executor should only call `resolve` or `reject` **once**. Any further calls to either are ignored.

Note: While in practice, the executor often does something asynchronously before calling `resolve` / `reject`, technically it doesn't have to. Either can be called immediately, e.g. when we schedule a job and see that everything has been already completed or cached. This is fine, we simply immediately end up with a settled promise.

Also note: `state` and `result` are internal. We cannot access them directly. Instead, they can be accessed through consumers like `.then`, `.catch`, or using `.finally`.

Speaking of which...

## Consumers

Remember how a Promise object serves as a link between "producing code" (executor) and "consuming code" that receives the result or the error? Well, consuming functions can be set up using methods `.then` and `.catch`.

### `.then`

This is the most important consumer method.

```js
promise.then(
    function(result) {
        // handles a successful result
    },
    function(error) {
        // handles an error
    }
)
```

The first argument is a function that runs when the promise is resolved and the result is received.

The second argument is a function that runs when the promise is rejected and an error is received.

```js
let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve('done'), 1000);
});

promise.then(
    (result) => {
        console.log(result);
    },
    (error) => {
        console.log(error);
    }
);
```

or

```js
let promise = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('An error has occurred')), 1000);
});

promise.then(
    (result) => {
        console.log(result);
    },
    (error) => {
        console.log(error);
    }
)
```

If we're only interested in successful completion, we can pass only the first argument to `.then`.

Or, if we're only interested in errors...

### `.catch`

...we can pass `null` as the first argument to `.then` (`.then(null, errorHandlingFunction)`), or, more directly, use `.catch` instead:

```js
let promise = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('An error has occurred')), 1000);
});

promise.catch(console.log);  // logs the error
```

The call `.catch(f)` is completely analogous to `.then(null, f)`, it's just a shorthand.

## Cleanup

When using promises, we might want to set up a handler that will perform cleanup or finalize something (e.g. getting rid of loading indicators, closing unnecessary connections etc.) after all previous operations are complete.

For that, we can use...

### `.finally`

The call `.finally(f)` always runs when the promise is settled. In that way, it is similar to the `finally` from `try... catch`.

```js
new Promise((resolve, reject) => {
    // executor
}).finally(() => {
    // finalize things
}).then(
    (result) => {
        // do something with the result
    },
    (error) => {
        // handle errors
    }
);
```

Note that the `finally` handler:
* has no arguments
* is "unaware" if the promise was successful or not (and therefore only really suitable for general finalizing operations, needed to be performed irrespective of the promise result)
* passes the result or error to the next suitable handler (i.e. `.then` or `.catch`) for processing
* shouldn't return anything (if it does, the return value will be ignored anyway) -- EXCEPT if the handler itself throws an error (in such a case that error will be passed to the next handler, instead of the actual outcome).

Note: If the promise is already settled when a handler is added, these handlers will just run immediately. In other words, if logic handling what to do with the outcome is run after the outcome is already in place, the outcome will still be passed to the logic regardless.

## A practical example (`loadScript`)

Let's go back to the `loadScript` example from [the previous chapter](callbacks.md).

This is the callback based variant:

```js
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}
```

Now, with promises, `loadScript` will not require a callback. Instead, we can create and return a promise that resolves when the script is loaded.

```js
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        let script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Error loading script for ${src}`));

        document.head.append(script);
    });
}

let promise = loadScript('/my/script.js');

promise.then(
    (script) => {
        console.log(`${script.src} is loaded.`);
    },
    (error) => {
        console.log(`Error: ${error.message}`);
    }
);
```

Since `.then` can be called on a Promise as many times as needed (more on that in the next chapter: [Promise chaining](promise-chaining.md)), it's a much more flexible way of handling asynchronous programming.
