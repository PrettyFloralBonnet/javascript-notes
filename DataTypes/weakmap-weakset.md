# `WeakMap` and `WeakSet`

Properties of an object (or elements of an array etc.) are considered reachable and remain in memory only as long as the data structure itself exists in memory. E.g. if we put an object into an array, the object will remain unclaimed by the garbage collector as long as the array itself is not claimed by it (even if that object is not referenced anywhere outside of that array).

`Map` is not an exception by any means:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null;  // overwrite the reference
```
In this example, `john` is stored inside the map, and it remains accessible by using `map.keys()`:

```js
console.log(Array.from(map.keys())[0])  // { name: 'John' }
```

However, `WeakMap` is different in this aspect: **it doesn’t prevent garbage collection of key objects**.

## `WeakMap`

`WeakMap` keys **must** be objects (not primitive values). Moreover, if no references exist for an object used as a key in a `WeakMap` (other than that object itself), the object will be automatically removed from memory (and from the map).

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null;  // overwrite the reference
```
Now, `john` is removed from memory!

```js
weakMap.get(john)  // undefined
```

Note that `WeakMap` does not support iteration or Map methods such as `keys()`, `values()`, `entries()`. In fact, it only supports the following methods:

```js
weakMap.get(key)
weakMap.set(key, value)
weakMap.delete(key)
weakMap.has(key)
```

Exactly when the cleanup happens (after the object-key has lost all other references) is decided by the JavaScript engine. This means that technically, the current element count of a `WeakMap` is **unknown**. This is why the key/value access methods are not supported.

### `WeakMap` use case: auxiliary data

One of the main applications of `WeakMap` is **auxiliary data storage**. Say we're working with an object that 'belongs' to some other part of code (maybe a third-party library), and we would like to store some data associated with it that should only exist while the object is 'alive'. `WeakMap` is exactly what's needed. We put such data into a `WeakMap`, using the object as the key, and when the object is garbage collected, the data will automatically disappear along with it.

Here's an example of a counting function using `Map`:

```js
// visitsCount.js
let visitsCountMap = new Map();

// increase the visits count
function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
}
```

...and another part of the code using it:

```js
// main.js
let john = { name: "John" };

countUser(john);  // count the visit

john = null;  // john leaves later
```

Now, the `john` object should be garbage collected, but remains in memory, because it's a key in `visitsCountMap`. As a result, we need to clean `visitsCountMap` when we remove users. Otherwise it will grow in memory indefinitely. This cleaning can become a tedious task in complex architectures.

Now here's the same code, but with `WeakMap`:

```js
// visitsCount.js
let visitsCountMap = new WeakMap();

// increase the visits count
function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
}
```

Now we don't need to clean `visitsCountMap`. After the `john` object becomes unreachable (except as a key of `WeakMap`), it will be removed from memory, along with any information it may have held.

### `WeakMap` use case: caching

When function results need to be remembered (cached), so that future calls to the same object reuse them, we can use `Map` to store them:

```js
// cache.js
let cache = new Map();

// calculate and remember the result
function process(obj) {
    if (!cache.has(obj)) {
        let result = /* calculations of the result for */ obj;
        cache.set(obj, result);
    }

    return cache.get(obj);
}
```

Now we use `process()` in another file:

```js
// main.js
let obj = {/* say we have an object */};

let result1 = process(obj);  // calculated
let result2 = process(obj);  // remembered result taken from cache

// later, when the object is not needed any more:
obj = null;
console.log(cache.size);  // 1 (the object is still in cache, taking up memory)
```

For multiple calls of `process(obj)` with the same object, it only calculates the result the first time, and then just takes it from cache.

The downside is that **we still need to clean the cache** when the object is not needed any more.

Or, we can use `WeakMap` instead:

```js
// cache.js
let cache = new WeakMap();

// calculate and remember the result
function process(obj) {
    if (!cache.has(obj)) {
        let result = /* calculate the result for */ obj;
        cache.set(obj, result);
    }

    return cache.get(obj);
}

// main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// later, when the object is not needed any more:
obj = null;
```

This time, the cache cleaning problem disappears: the cached result will be removed from memory automatically, right after the object gets garbage collected.

## WeakSet

`WeakSet` is similar to `Set`, but can only hold objects (not primitive values). An object will exist in a `WeakSet` as long as it's reachable from somewhere else.

`WeakSet` supports `add()`, `has()` and `delete()`, but not `size`, `keys()` or iterations.

It mostly serves as auxiliary storage for binary info, e.g we can add users to `WeakSet` to keep track of website visitors:

```js
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited
visitedSet.add(pete); // Pete visited
visitedSet.add(john); // John visited again

// visitedSet has 2 users now

// check if John visited?
console.log(visitedSet.has(john));  // true

// check if Mary visited?
console.log(visitedSet.has(mary));  // false

john = null;  // visitedSet will be cleaned automatically
```

### Limitations

The most notable limitation of both `WeakMap` and `WeakSet` is the absence of iterations, and therefore the inability to get all current content.

## Exercises

### Store "unread" flags

Given an array of messages managed by someone else's code...:

```js
let messages = [
    { text: "Hello", from: "John" },
    { text: "How goes?", from: "John" },
    { text: "See you soon", from: "Alice" }
];
```

...and taking into account that new messages are added and old ones removed at unknown times, which data structure could be used to store information about whether the message has been read?

```js
let readMessages = new WeakSet();

// two messages have been read
readMessages.add(messages[0]);
readMessages.add(messages[1]);

// ...first message is read again
readMessages.add(messages[0]);
// ...but readMessages still has 2 unique elements

messages.shift();
// now readMessages has 1 element (technically memory may be cleaned later)
```

The `WeakSet` allows for storage of unique messages (values), and for an easy check if the message exists in it. It cleans up itself automatically. The tradeoff is that we can't iterate over it to get all read messages from it directly. However, we can work around it by iterating over all messages and then filtering those that are in the `WeakSet`.

Using `WeakSet` here provides an architectural advantage of not messing with third party code. An alternative would be to add a boolean property (e.g. `isRead`) to a message after it’s read. As message objects are managed by another code, that’s generally discouraged, but a symbolic property can be used to avoid conflicts:

```js
let isRead = Symbol("isRead");  // the symbolic property is only known to our code
messages[0][isRead] = true;
```

Now third party code probably won't see our extra property. Symbols decrease the probability of problems, but using `WeakSet` is still a better solution here.

### Store read dates

Given the same array of messages as in the previous task...:

```js
let messages = [
    { text: "Hello", from: "John" },
    { text: "How goes?", from: "John" },
    { text: "See you soon", from: "Alice" }
];
```

...which data structure would be suitable for storing the information on *when* the message was read? Like before, the information should only remain in memory until the message is garbage collected. Dates can be stored built-in `Date` class objects (more on that later).

```js
let mapReadTimes = new WeakMap();
mapReadTimes.set(messages[0], new Date(2020, 3, 23));
```
