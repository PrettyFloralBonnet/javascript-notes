# Microtasks

Promise handlers `.then`, `.catch` and `.finally` are always asynchronous. Even when a promise is immediately resolved, the code *below* these handlers **will still execute before them**.

## Microtasks queue

The ECMA standard [specifies](https://tc39.es/ecma262/#sec-jobs-and-job-queues) an internal queue for managing asynchronous tasks, called `PromiseJobs`, more commonly referred to as the **microtask queue** (V8 term).

As stated in the specification, the queue is **first-in, first-out**, and the execution of the tasks is only initiated **when nothing else is running**.

In other words, when a promise is ready, the handlers are enqueued, but not immediately executed. Only when the JS engine is free from any and all current code, it takes a task from the queue and executes it.

To enforce execution order, we can simply use a `.then` handler:

```js
Promise.resolve()
    .then(() => console.log("Promise done."))
    .then(() => console.log("Code finished."));
```

## Unhandled rejection

An unhandled rejection (which was discussed in [this chapter](./promise-error-handling.md)) occurs when a promise error is not handled at the end of the microtask queue.

Since the `unhandledrejection` event is generated when the microtask queue containing an unhandled rejected promise is complete, this won't work:

```js
let promise = Promise.reject(new Error("Promise rejected."));

setTimeout(() => promise.catch(err => console.log("Promise rejection caught.")), 1000);

// Error: Promise rejected.
window.addEventListener("unhandledrejection", event => console.log(event.reason));
```

The `.catch` added in `setTimeout` will be triggered, but since the `unhandledrejection` has already occurred, it will not have changed anything.
