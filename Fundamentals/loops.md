## Loops

Actions often need to be repeated. A way to repeat the same code multiple time is with the use of loops.

* `for` loop
* `while` loop
* `do while` loop (the loop body will be executed at least once)

A single execution of the loop body is called an **iteration**. Variables declared inside the body of the loop are only visible in the loop. Any part of the `for` loop can be skipped, to a minimum form of `for (;;) {...}` which repeats endlessly.

Loops can be broken out of with `break`, as well as made to skip the current iteration with `continue`.

Loops can also be labeled to break out of multiple nested loops at once:

```js
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let input = prompt(`Value at (${i},${j})`, '');
        if (!input) break outer;  // conditionally break out of both loops
        // otherwise do something with the value
    }
}
```
