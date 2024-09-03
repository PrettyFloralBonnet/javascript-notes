## Iterables

Iterables are objects which represent collections (so e.g. arrays, strings, lists, sets etc.) that can be iterated over using a `for...of` loop.

### `Symbol.iterator`

Let's say we have an object which represents a range of numbers:

```js
let range = {
    from: 1,
    to: 5
}
```

To make this range iterable, we need to add a special method called `Symbol.iterator`:

```js
let range = {
    from: 1,
    to: 5
};
  
range[Symbol.iterator] = function() {
    return {
        current: this.from,
        last: this.to,
        next() {
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        }
    };
};
  
for (let num of range) {
    console.log(num);  // 1, 2, 3, 4, 5
}
```

Here's what's happening in detail:

1. When the `for...of` loop starts, it calls that method once (or errors out if the method is not found). The method must return an iterator (an object with the method `next()`).
2. Then, the `for...of` loop continues to work with that returned object only.
3. When the loop goes to the next value, it calls `next()` on the iterator.
4. The result of `next()` must have the form: `{ done: Boolean, value: any }`, where `done === true` means that the iteration is finished, otherwise `value` is the next value.

### Iterable vs. array-like

These two terms may seem similar, but they are two different concepts:

* Iterables are objects that implement the `Symbol.iterator` method
* Array-likes are objects that have indices and `length`

Strings are both iterables and array-likes. However, the range object implemented above is not an array-like (since it has neither length or indices).

Here's an example of an object that's an array-like, but not an iterable:

```js
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};
```

### `Array.from()`

There is an universal method `Array.from(obj[, mapFn, thisArg])` for constructing arrays out of iterables and array-likes:

```js
let arrFromArrayLike = Array.from(arrayLike);
let arrFromRange = Array.from(range);
```
