# Scheduling: `setTimeout` and `setInterval`

We may decide not to call a function right now, but at a specified later time. This is called "**scheduling a call**".

There are two methods for it:
* `setTimeout` allows to run a function once, after a given time,
* `setInterval` allows to run a function repeatedly, starting after a given time, and then again and again after that same.

These methods are not part of the JavaScript specifications, but most emvironments do provide them (e.g. most browsers, Node.js).

## `setTimeout`

```js
let timerId = setTimeout(func | code, [delay], [arg1], [arg2]) //, ...)
```

Parameters:
* `func|code`: a function to be executed (or a string containing the code, for historical reasons)
* `delay`: the delay before the call, in milliseconds (1000 ms = 1 second), 0 by default.
* `arg1, arg2...`: arguments for the function.

### Cancelling with `clearTimeout`

A call to `setTimeout` returns a "timer identifier" called `timerId`, which can be used to cancel the execution.

```js
let timerId = setTimeout(
    // ...
);

clearTimeout(timerId);
```

In the code below, the function is scheduled for execution and then it is cancelled. As a result, nothing happens:

```js
let timerId = setTimeout(() => console.log("This is never executed."), 1000);

console.log(timerId);  // timer identifier
clearTimeout(timerId);
console.log(timerId);  // same identifier (does not become null after cancelling)
```

In a browser, the timer identifier is a number. In other environments, it can be something else (e.g. in Node.js it returns a timer object with additional methods).

## `setInterval`

The syntax is identical to `setTimeout`. But, unlike `setTimeout`, the function will not be called once, but regularly instead, after the set time interval.

```js
let timerId = setInterval(func | code, [delay], [arg1], [arg2], ...)
```

To stop repeating calls, `clearInterval(timerId)` should be called:

```js
let timerId = setInterval(() => console.log('tick'), 2000);

setTimeout(() => {
    clearInterval(timerId);
    console.log('stop');
}, 5000);  // stop after 5 seconds
```

## Nested `setTimeout`

There is another way (besides `setInterval`) to run a piece of code repeatedly:

```js
let timerId = setTimeout(function tick() {
    console.log('tick');
    timerId = setTimeout(tick, 2000);
}, 2000);
```

This `setTimeout` schedules the next call right at the end of the current one.

The nested `setTimeout` is more flexible than `setInterval`. The next call may be scheduled differently, depending on the results of the current one. For example, we may need a service that sends a request to the server every 5 seconds, asking for data, but in case the server is over capacity, the interval should be increased:

```js
let delay = 5000;

let timerId = setTimeout(function request() {
    // send request

    if (/* request.statusCode !== 200 */) delay *= 2;

    timerId = setTimeout(request, delay);
}, delay);
```

Moreover, nested `setTimeout` allows to set the delay between executions more precisely than `setInterval`.

```js
let i = 1;
setInterval(function() {
    func(i++);
}, 100);
```

vs.:

```js
let i = 1;
setTimeout(function run() {
    func(i++);
    setTimeout(run, 100);
}, 100);
```

For `setInterval`, the internal scheduler will run `func(i++)` every 100 ms, but the **actual delay** between `func()` calls will be less than that, because a part of the interval will be consumed by the execution of the scheduled function.

If `func()` is slow, it might even **take more than the scheduled interval** to execute, in which case the engine will wait for the `func()` call to finish, then check the scheduler, and if the time is already up, it will run `func()` again *immediately*.

The nested `setTimeout` guarantees a fixed delay, because the next call is planned at the end of the previous one.

### Garbage collection

When a function is passed to `setInterval` or `setTimeout`, an internal reference to it is created and saved in the scheduler. That prevents the function from being garbage collected, even if there are no other references to it. The function stays in memory until the scheduler calls it.

There is a side-effect, though. The function references the outer lexical environment, so, as long as it lives, the outer variables live too, and they may take much more memory than the function itself. So, when the scheduled function is not needed anymore, it's better to cancel it, even if it's very small.

## Zero delay `setTimeout`

A special use case for `setTimeout` exists: `setTimeout(func, 0)` (or just `setTimeout(func)` for short).

This schedules the execution of `func` as soon as possible, but only after the currently ongoing execution (whatever it may be) is complete.

The function is effectively scheduled to run right after the current script:

```js
setTimeout(() => console.log("World"));
console.log("Hello");

// Hello
// World
```

The first line puts the call in the "calendar" after 0 ms. But the scheduler will only "check the calendar" after the current script is complete. As a result, "Hello" is first, and "World" comes second.

There are also advanced browser-related use cases for the zero delay timeout (related to **event loop** microtasks and macrotasks).

### Zero delay is not, in fact, zero (in the browser)

In the browser, there is a limitation on how often nested timers can run. As per the [HTML Living Standard](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers), after five nested timers, the interval is forced to be at least 4 milliseconds.

Let's take a look:

```js
let start = Date.now();
let times = [];

setTimeout(function run() {
    times.push(Date.now() - start); // remembers the delay from the previous call

    if (start + 100 < Date.now()) {
        console.log(times); // stop rescheduling after 100 ms and show all delays instead
    } else {
        setTimeout(run);
    }
});

// an example of the output:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

Here, the function `run()` reschedules itself with zero delay. Why, then, the delays grow, starting from the 5th value?

Well, that's the extra 4 ms limitation coming into play.

It exists mainly for historical reasons, as many old scripts rely on it (it comes from ancient times). Also, For server-side JavaScript, that limitation does not exist, and also there are other ways to schedule an immediate asynchronous job (e.g. `setImmediate` in Node.js).

## Exercises

### A number per second

Write a function `printNumbers(from, to)` that outputs a number every second, starting with `from` and ending with `to`.

Provide two solutions: one using `setInterval`, and one using nested `setTimeout`.

```js
// setInterval

let printNumbers = (from, to) => {
    let num = from;
    let timerId = setInterval(() => {
        console.log(num);
        if (num === to) clearInterval(timerId);
        num++;
    }, 1000)
}

// nested setTimeout

let printNumbers = (from, to) => {
    let num = from;
    setTimeout(function _printNumbers() {
        console.log(num);
        if (num < to) {
            setTimeout(_printNumbers, 1000);
        }
        num++;
    }, 1000);
}
```
