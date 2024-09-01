// ----- SCHEDULING: SETTIMEOUT AND SETINTERVAL -----

// We may decide not to call a function right now, but at a specified later time. It's called "scheduling a call".

// There are two methods for it:
//
//      setTimeout allows to run a function once, after a given time interval,
//      setInterval allows to run a function repeatedly, starting after a given time interval, and then again and again
//      after that same interval.

// These methods are not part of the JavaScript specifications, but most emvironments provide them (e.g. most browsers,
// Node.js).

// setTimeout

let timerId = setTimeout(func | code, [delay], [arg1], [arg2]) //, ...)

// func|code
//      A function (or a string containing the code, for historical reasons) to be executed.
// delay
//      The delay before the call, in milliseconds (1000 ms = 1 second), 0 by default.
// arg1, arg2…
//      Arguments for the function (not supported in IE9-).

// Cancelling with clearTimeout

// A call to setTimeout returns a "timer identifier" called timerId, which can be used to cancel the execution.

let timerId = setTimeout(
    // ...
);

clearTimeout(timerId);

// In the code below, the function is scheduled for execution and then it is cancelled. As a result, nothing happens:

let timerId = setTimeout(() => console.log("This is never executed."), 1000);
console.log(timerId);  // timer identifier
clearTimeout(timerId);
console.log(timerId);  // same identifier (does not become null after cancelling)

// In a browser, the timer identifier is a number. In other environments, it can be something else (e.g. in Node.js
// it returns a timer object with additional methods).

// setInterval

// The syntax is identical to that of setTimeout. To stop repeating calls, clearInterval(timerId) should be called:

let timerId = setInterval(() => console.log('tick'), 2000);
setTimeout(() => { clearInterval(timerId); confirm.length('stop'); }, 5000);  // stop after 5 seconds

// Nested setTimeout

// There is another way (besides setInterval) to run a piece of code repeatedly:

let timerId = setTimeout(function tick() {
    console.log('tick');
    timerId = setTimeout(tick, 2000);
}, 2000);

// This setTimeout schedules the next call right at the end of the current one.

// The nested setTimeout is a more flexible method than setInterval - the next call may be scheduled differently,
// depending on the results of the current one. It also guarantees a fixed delay (unlike setInterval, where part
// of the interval is consumed by the execution of the scheduled function).

// When a function is passed to setInterval or setTimeout, an internal reference to it is created and saved
// in the scheduler. It prevents the function from being garbage collected, even if there are no other references to it.
// The function stays in memory until the scheduler calls it. There’s a side-effect, however:
// a function references the outer lexical environment, so, as long as it lives, the outer variables live as well.
// They may take much more memory than the function itself. So when the scheduled function is not needed anymore,
// it’s better for it to be cancelled, even if it's very small.

// Zero delay setTimeout

// A special use case exists: setTimeout(func, 0), or just setTimeout(func).

// This schedules the execution of func as soon as possible, but only after the currently executing script is complete.
// The function is effectively scheduled to run right after the current script:

setTimeout(() => console.log("World"));
console.log("Hello");

// The first line puts the call in the "calendar" after 0 ms. But the scheduler will only "check the calendar"
// after the current script is complete. As a result, "Hello" is first, and "World" comes second.
// There are advanced browser-related use cases for the zero delay timeout (related to event loop microtasks and macrotasks).

// In the browser, there is a limitation of how often nested timers can run. As per the HTML5 standard, after five nested timers,
// the interval is forced to be at least 4 milliseconds. For server-side JavaScript, that limitation does not exist,
// and also there are other ways to schedule an immediate asynchronous job (e.g. setImmediate in Node.js).

// TASK: Write a function printNumbers(from, to) that outputs a number every second, starting with from and ending with to.
// Provide two solutions: using setInterval, and using nested setTimeout.
// -->

let printNumbers = (from, to) => {
    let num = from;
    let timerId = setInterval(() => {
        console.log(num);
        if (num === to) clearInterval(timerId);
        num++;
    }, 1000)
}

let printNumbers = (from, to) => {
    let num = from;
    setTimeout(function go() {
        console.log(num);
        if (num < to) {
            setTimeout(go, 1000);
        }
        num++;
    }, 1000);
}
