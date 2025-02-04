# Generators

Regular functions return a single value. **Generators** can **yield** multiple values, one after another. When paired with [iterables](/DataTypes/iterables.md), they allow for easy creation of data streams.

## Generator functions

To create a generator function, we use the syntax `function*`:

```js
function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}
```

Generator function behaviour differs from regular functions. When a generator function is called, **its code doesn't run**. Instead, it returns a special **generator object**, which manages its execution:

```js
let generator = generateSequence();
console.log(generator);  // [object Generator]
```

The main method of a generator object is `next()`. When called, it **runs the execution until the nearest `yield <value>` statement** (if `value` is omitted, `undefined` will be yielded). Then the function execution is paused, and the yielded value is returned to the outer code.

The result of the `next()` call is always an object with two properties:

* `value`: the yielded value
* `done`: `true` if the function code has finished, or `false` otherwise

For example:

```js
function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

let generator = generateSequence();
let one = generator.next();

console.log(one);  // { value: 1, done: false }
```

Now if we call `generator.next()` again, code execution will be resumed, and, once again, paused after the next `yield`:

```js
let two = generator.next();

console.log(two);  // { value: 2, done: false }
```

And if we call it for the third time, the execution reaches the `return` statement, and finishes:

```js
let three = generator.next();

console.log(three);  // { value: 3, done: true }
```

Now the generator is "depleted". Further calls to `generator.next()` are possible, but they'll continue to return the same object: `{ value: undefined, done: true }`.

### Alternative syntax

Instead of `function* foo()`, it's also possible to declare a generator function with `function *foo()`. However, the first syntax is usually preferred.

### Generators are iterable

Generators are iterable. We can loop over their values with `for... of`:

```js
function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

let generator = generateSequence();

for (let value of generator) {
    console.log(value);
}
```

That's a lot more convenient than calling `generator.next().value` all the time. **However**, note that in this example, only `1` and `2` will be logged. `3` will not. That's because `for... of` ignores the last value, which is returned, and not yielded. If we yield it instead, it will be logged.

All iterable related functionality works with generators, e.g. the spread syntax `...`:

```js
function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
}

let sequence = [0, ...generateSequence()];

console.log(sequence);  // [ 0, 1, 2, 3 ]
```

### Using generators for iterables

In the chapter on [iterables](/DataTypes/iterables.md), we created an iterable `range` that returned values from and to a provided value:

```js
let range = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        return {
            current: this.from,
            last: this.to

            next() {
                if (this.current <= this.last) {
                    return {
                        done: false,
                        value: this.current++,
                    };
                } else {
                    return {
                        done: true
                    };
                }
            }
        };
    }
};

console.log(...range);  // 1 2 3 4 5
```

We can substitute the `Symbol.iterator` function with a generator function:

```js
let range = {
    from: 1,
    to: 5,

    *[Symbol.iterator]() {
        for (let value = this.from; value <= this.to; value++) {
            yield value;
        }
    }
};

console.log(...range);  // 1 2 3 4 5
```

That works because `range[Symbol.iterator]()` now returns a generator, which provides a `next()` method and returns values in the correct format.

Generators were added to JS with iterators in mind.

## Generator composition

Generator composition is a feature of generators that allows them to be embedded within each other.

Let's say we have a function which generates a sequence of numbers:

```js
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}
```

Let's say we want to reuse it with digits `0...9` first, then with uppercase letters `A...Z`, and finally with lowercase letters `a...z`, in order to generate a more complex sequence (e.g. for a password).

To combine results from multiple regular functions, we need to call them, store the results, and join them at the end.

Generators, however, allow for a special syntax `yield*` which "embeds" (composes) one generator into another:

```js
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

function* generatePasswordCodes() {
    yield* generateSequence(48, 57);  // 0...9 character codes

    yield* generateSequence(65, 90);  // A...Z

    yield* generateSequence(97, 122);  // a...z
}

let pw = '';

for (let code of generatePasswordCodes()) {
    pw += String.fromCharCode(code);
}

console.log(pw);  // 0...9A...Za...z
```

What the `yield*` keyword does is **delegate the execution to another generator**. In other words, it iterates over the generator it receives and transparently forwards its yields outside (as if they were yielded by the outer generator).
