# Decorators and forwarding, `call` / `apply`

## Transparent caching

Let's say we have a function that's CPU-heavy, but provides stable results. If it's called often, it may be a good candidate for caching.

But instead of adding caching to the function directly, we can create a wrapper for it:

```js
function slow(x) {
    // e.g. CPU heavy job
    console.log(`Called with ${x}`);
    return x;
}

function cacheWrapper(func) {
    let cache = new Map();

    return function (x) {
        if (cache.has(x)) {
            return cache.get(x);
        }

        let result = func(x);

        cache.set(x, result);
        return result;
    };
}

slow = cacheWrapper(slow);
```

Here, `cacheWrapper` is a **decorator**: a function that takes another function and alters its behaviour.

By separating caching from the main function code, we keep the latter more simple and make the decorator reusable with other functions. We can also combine multiple decorators, if needed.

## Using `func.call` for the context

The caching decorator from the example above is not suited to work with object methods. E.g. in the code below, `worker.slow()` stops working after decoration:

```js
let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        // CPU-heavy task here
        console.log("Called with " + x);
        return x * this.someMethod();
    }
};

function cacheWrapper(func) {
    let cache = new Map();
    return function (x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func(x);
        cache.set(x, result);
        return result;
    };
}

console.log(worker.slow(1));  // the original method works

worker.slow = cacheWrapper(worker.slow);

console.log(worker.slow(2));  // Error: Cannot read property 'someMethod' of undefined
```

The error occurs when the code tries to access `this.someMethod` and fails. The reason is that the wrapper calls the original function as `func(x)`, and the function receives `this` equal to `undefined`.

The reason for the error is that the wrapper passes the call to the original method, but without the context.

Let's fix it.

There's a special built-in function method `func.call(context, ...args)` that allows to call a function and explicitly set `this`:

```js
func.call(context, arg1, arg2, ...)
```

It runs `func` and provides the first argument as `this`.

These two calls do almost the same:

```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

They both call `func` with arguments `1`, `2` and `3`. The only difference is that `func.call` also sets `this` to `obj`.

For example, below we can call `sayHi` in the context of different objects: `sayHi.call(user)`:

```js
function sayHi() {
    console.log(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// use call to pass different objects as *this*
sayHi.call(user);  // John
sayHi.call(admin);  // Admin
```

This means we can use `call` in the wrapper to pass the context to the original function:

```js
let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        console.log("Called with " + x);
        return x * this.someMethod();
    }
};

function cacheWrapper(func) {
    let cache = new Map();
    return function (x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func.call(this, x);  // `this` is now passed correctly
        cache.set(x, result);
        return result;
    };
}

worker.slow = cacheWrapper(worker.slow);

console.log(worker.slow(2));  // works
console.log(worker.slow(2));  // works and is cached
```

### Accomodating multiple arguments

For now, the `cacheWrapper` only works with single-argument functions. How to cache the `worker.slow` method if it's multi-argument?

```js
let worker = {
    slow(min, max) {
        return min + max; // CPU heavy task
    }
};

// should remember same-argument calls
worker.slow = cacheWrapper(worker.slow);
```

Previously, with a single argument (`x`), we could have just saved the result with `cache.set(x, result)`, and retrieve it with `cache.get(x)`. But now we need the result for a combination of arguments `(min,max)`, and the native `Map` only takes a single value as the key.

Possible solutions:

* Implement or import a new, more versatile data structure similar to `Map` that would allow for multiple keys
* Use nested maps: `cache.set(min)` would be a `Map` that would store the pair `(max, result)`, and the result would be retrieved with `cache.get(min).get(max)`
* Join the two values into one (e.g. string `"min,max"` as the `Map` key)

The third variant is good enough for most practical applications, so we'll stick to it:

```js
let worker = {
    slow(min, max) {
        console.log(`Called with ${min},${max}`);
        return min + max;
    }
};

function cacheWrapper(func, hash) {
    let cache = new Map();
    return function () {
        let key = hash(arguments);
        if (cache.has(key)) {
            return cache.get(key);
        }

        let result = func.call(this, ...arguments);

        cache.set(key, result);
        return result;
    };
}

function hash(args) {
    return args[0] + ',' + args[1];
}

worker.slow = cacheWrapper(worker.slow, hash);
```

Now, the function could work with any number of arguments (though the hash function would also need to be adjusted to allow any number of arguments, and more complex cases may require different hasing functions).

## `func.apply`

Instead of `func.call(this, ...arguments)`, we can use `func.apply(this, arguments)`.

```js
func.apply(context, args)
```

It runs the function `func` while setting `this` to `context` and using an array-like object `args` as the list of arguments. The only difference in syntax between it and `func.call` is that `call` expects a list of arguments, whereas `apply` takes an array-like object. So the two are almost the same:

```js
func.call(context, ...args);
func.apply(context, args);
```

They both perform the same call of `func`, with the provided context and arguments. The only difference is that with `call`, the spread syntax `...` allows for an iterable to be passed, whereas `apply` only accepts an array-like object.

For objects that are both iterable *and* array-like (like an actual array), either can be used (though `apply` will probably be faster, because most JavaScript engines have better internal optimization for it).

Passing all arguments along with the context to another function is referred to as **call forwarding**.

### Borrowing a method

Let's make a minor improvement to the hashing function from the previous example:

```js
function hash(args) {
    return args[0] + ',' + args[1];
}
```

Thus far, it works only with two arguments. We can make it accept more.

One solution could be to use `Array.prototype.join()` method:

```js
function hash(args) {
    return args.join();
}
```

Unfortunately, that won't work, because when `hash(arguments)` is called, the `args` object is not a real array (despite being both an array-like and an iterable), which would make calling `join()` on it fail with `Error: arguments.join is not a function`.

However, there is still a way to use `join()`:

```js
function hash() {
    console.log( [].join.call(arguments) );
}

hash(1, 2);
```

This trick is called **method borrowing**. We take a `join()` method from a regular array, and use `[].join.call` to run it with `arguments`.

## Decorators and function properties

It is generally safe to replace a function or a method with a decorated one -- except when the original function had properties on it. In such a case, the decorated function will not provide them (as it's just a wrapper).

Some decorators may provide their own properties. For example, a decorator might count how many times a function was invoked, and how much time it took, and provide this information via wrapper properties.

There is a way to create decorators that keep access to function properties, but this requires using a special `Proxy` object to wrap functions. This will be discussed later, in the chapter Proxy and Reflect.

## Exercises

### Spy

Create a decorator `spy(func)` that returns a wrapper that saves all calls to the function in its `calls` property.

Have every call saved as an array of arguments, like so:

```js
function work(a, b) {
    console.log(a + b); // work is an arbitrary function or method
}

work = spy(work);

work(1, 2);
work(4, 5);

for (let args of work.calls) {
    console.log('call:' + args.join());  // "call:1,2", "call:4,5"
}
```

```js
function spy(func) {
    function wrapper(...args) {
        wrapper.calls.push(args);
        return func.apply(this, args);
    }
    wrapper.calls = [];
    return wrapper;
}
```

### Delay

Create a decorator `delay(func, ms)` that delays each call to `func` by `ms` milliseconds, like so:

```js
function f(x) {
    console.log(x);
}

let delay1000 = delay(f, 1000);
let delay1500 = delay(f, 1500);

delay1000("test");  // shows "test" after 1000 ms
delay1500("test");  // shows "test" after 1500 ms
```

Have the solution accept multiple arguments.

```js
function delay(func, ms) {
    function wrapper(...args) {
        setTimeout(() => func.apply(this, args), ms);
    };
    return wrapper;
}
```

### Debounce

Write a `debounce(func, ms)` decorator. A *debounce* is a common limit applied to certain actions (e.g. displaying search results following a query being put in a search bar). The way it works is that calls to `func` are suspended until `ms` milliseconds of inactivity occurs (a "cooldown period" of no calls), and then `func` is invoked with the most recent set of arguments.

For instance, we have a function `f` and we replace it with `f = debounce(f, 1000)`. If `f` is called (`f(a)`), then called again (`f(b)`) after 200 ms, then again after 500 ms, then calls `f(a)` and `f(b)` are ignored completely, and `f(c)` goes through, but after 1500 ms (1000 ms from the last performed call).

There's actually an implemented version of this in the [Lodash](https://lodash.com/docs/4.17.15#debounce) library:

```js
let f = _.debounce(console.log, 1000);

f("a");
setTimeout(() => f("b"), 200);
setTimeout(() => f("c"), 500);
```

Debouncing is a useful way of processing sequences of events, for example, again, handling user inputs (no need to call a function on every letter).

```js
function debounce(func, ms) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), ms);
    };
}
```

### Throttle

Create a "throttling" decorator `throttle(f, ms)` that returns a wrapper which, when called multiple times, passes the call to `f` at a maximum rate of one per `ms` (milliseconds).

A throttle is useful for processing regular updates which should have intervals between them (e.g. tracking mouse movements).

Example code:

```js
function f(a) {
  console.log(a);
}

let throttle1000 = throttle(f, 1000);

throttle1000(1);  // shows 1
throttle1000(2);  // (throttling, 1000ms not out yet)
throttle1000(3);  // (throttling, 1000ms not out yet)

// after the 1000 ms passes, 3 is logged
// the intermediate value 2 is ignored
```

```js
function throttle(func, ms) {

    let isThrottled = false;
    let savedArgs, savedThis;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);
        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }
    return wrapper;
}
