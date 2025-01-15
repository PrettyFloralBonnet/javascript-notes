# Function object, NFE

In JavaScript, functions are **objects**. We can call them, but also add or remove properties to them, pass them by reference etc.

*Your objects are hashes, but when your code crashes, you'll find they were functions as well.*

Dylan Beattie, [Bug in the JavaScript](https://www.youtube.com/watch?v=jxi0ETwDvws)

Function objects have built-in properties such as `name` (which doesn't have to be assigned explicitly to exist, it will be derived from context or default to an empty string) or `length` (which returns the number of parameters the function has, not counting rest parameters).

Custom properties can be added as well. Note that a property assigned to a function, e.g. `myFunction.counter = 0`, does not define a local variable `counter` within the scope of that function. In other words, a `counter` property and a `counter` variable are two different things.

Sometimes custom properties may replace closures. Let's return to the `makeCounter` example from the [Scope and closures chapter](./scope-and-closures.md), and modify it to store `count` as the property of the inner function:

```js
function makeCounter() {
  // instead of: let count = 0...

  function counter() {
    return counter.count++;
  };

  counter.count = 0;  // ...we do this

  return counter;
}

let counter = makeCounter();
console.log(counter());  // 0
console.log(counter());  // 1
```

Previously, when the value of `count` lived in an outer variable, external code was unable to access it. Only nested functions could modify it.

Now that it's bound to the `counter()` inner function, it can be modified:

```js
let counter = makeCounter();

counter.count = 10;
```

The choice of implementation depends on the goals we aim to achieve.

## Named Function Expression

Named Function Expression (NFE) is a function expression that was given a name:

```js
let sayHi = function func(who) {
    console.log(`Hello, ${who}`);
};
```

We added the name `func` after the `function` keyword, but this is still a function expression (not a declaration), and nothing broke. Also, the function is still available as `sayHi()`. So what's going on?

Well, now the function can be referenced from within itself, using the name (which incidentally is not visible outside of the function), e.g.:

```js
let sayHi = function func(who) {
    if (who) {
        console.log(`Hello, ${who}`);
    } else {
        func("Guest");  // internal function call to itself
    };
};
sayHi(); // Hello, Guest

func(); // Error, func is not defined (not visible outside of the function)
```

The above can be done without NFE as well, but then we can run into problems, e.g. if the function gets reassigned in the outer scope later, it could stop working.

The NFE syntax does not exist for function declarations.

Many widely used JavaScript libraries make use of the NFE feature by creating a "main" function and attaching "helper" functions to it (so that the function is useful by itself, but also carries other functionalities as properties). For example, the jQuery library creates a function named `$`, and the lodash library creates a function `_` (and then adds `_.clone`, `_.keyBy` and other properties to it). Doing so also mitigates the pollution of the global space, so that one library only provides a single global variable, reducing the possibility of name conflicts.

## Exercises

### Extended counter

Modify the code below so that the `counter` can also be decreased and set to the provided number:
* `counter()` should return the next number (as before)
* `counter.set(value)` should set the counter to `value`
* `counter.decrease()` should decrease the counter by 1

The code:

```js
function makeCounter() {
    function counter() {
        return counter.count++;
    };

    counter.count = 0;
    return counter;
}

let counter = makeCounter();
```

Use a closure or a function property to keep track of the current count (or write both variants).

```js
function makeCounter() {
    function counter() {
        return counter.count++;
    };

    counter.set = function (value) {
        counter.count = value;
        return counter.count;
    };

    counter.decrease = function () {
        return counter.count--;
    };

    counter.count = 0;
    return counter;
}
```

or

```js
function makeCounter() {
    let count = 0;

    function counter() {
        return count++;
    }

    counter.set = value => count = value;

    counter.decrease = () => count--;

    return counter;
}
```

### Sum with brackets

Write a function `sum()` that would work like this:

```js
sum(1)(2) == 3;  // 1 + 2
sum(1)(2)(3) == 6;  // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
```

You may need to set up a custom object to primitive conversion for your function.

```js
function sum(a) {

    let currentSum = a;

    function f(b) {
        currentSum += b;
        return f;
    }

    f.toString = function () {
        return currentSum;
    };

    return f;
}
```
