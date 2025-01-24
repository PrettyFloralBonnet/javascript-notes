# Promises

In programming we often encounter a situation where the "producing code" does something which takes time (e.g. loads some data over the network), and the "consuming code" that needs the results once they are ready.

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
