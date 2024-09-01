// ----- DECORATORS AND FORWARDING, CALL/APPLY -----

// Transparent caching

function slow(x) {
    // e.g. CPU heavy job
    console.log(`Called with ${x}`);
    return x;
}

function cachingDecorator(func) {
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

slow = cachingDecorator(slow);

console.log(slow(1));  // slow(1) is cached
console.log(slow(2));  // slow(2) is cached

// We can call cachingDecorator for any function, and it will return the caching wrapper.
// By separating caching from the main function code, we keep the latter more simple.

// Using func.call for the context

// The caching decorator is not suited to work with object methods. E.g. in the code below,
// worker.slow() stops working:

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

function cachingDecorator(func) {
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
worker.slow = cachingDecorator(worker.slow);
console.log(worker.slow(2));  // Error: Cannot read property 'someMethod' of undefined

// The error occurs when the code tries to access this.someMethod and fails.
// The reason is that the wrapper calls the original function as func(x) in the line,
// and the function receives *this* equal to undefined.

// So, the wrapper passes the call to the original method, but without the context. Let’s fix it.

// There's a special built-in function method func.call(context, ...args) that allows to call a function
// and explicitly set *this*:

// func.call(context, arg1, arg2, ...)

// It runs func and provides the first argument as *this*.
// These two calls do almost the same:

func(1, 2, 3);
func.call(obj, 1, 2, 3)

// They both call func with arguments 1, 2 and 3. The only difference is that func.call also sets *this* to obj.

// We can call sayHi in the context of different objects: sayHi.call(user):

function sayHi() {
    console.log(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// use call to pass different objects as *this*
sayHi.call(user);  // John
sayHi.call(admin);  // Admin

// So, we can use call in the wrapper to pass the context to the original function:

let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        console.log("Called with " + x);
        return x * this.someMethod();
    }
};

function cachingDecorator(func) {
    let cache = new Map();
    return function (x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func.call(this, x);  // *this* is passed correctly now
        cache.set(x, result);
        return result;
    };
}

worker.slow = cachingDecorator(worker.slow);
console.log(worker.slow(2));  // works
console.log(worker.slow(2));  // works, doesn't call the original (cached)

// Accomodating multiple arguments

// For now, the cachingDecorator only works with single-argument functions.
// How to cache the multi-argument worker.slow method?

let worker = {
    slow(min, max) {
        return min + max; // CPU heavy task
    }
};

// should remember same-argument calls
worker.slow = cachingDecorator(worker.slow);

// Previously, with a single argument (x), we could have just saved the result with cache.set(x, result),
// and retrieve it with cache.get(x). But now we need the result for a combination of arguments (min,max),
// and the native Map only takes a single value as the key.

// Possible solutions:
//
// * Implement or import a new, more versatile data structure similar to Map that would allow for multi-keys
// * Use nested maps: cache.set(min) would store the pair (max, result), and the result would be retrieved with
//   cache.get(min).get(max)
// * Join two values into one (e.g. string "min,max" as the Map key)

// The third variant is good enough for most practical applications, so we'll stick to it:

let worker = {
    slow(min, max) {
        console.log(`Called with ${min},${max}`);
        return min + max;
    }
};

function cachingDecorator(func, hash) {
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

worker.slow = cachingDecorator(worker.slow, hash);

console.log(worker.slow(3, 5));
console.log("Again: " + worker.slow(3, 5));

// Now the function works with any number of arguments (though the hash function would also need to be adjusted
// to allow any number of arguments. Also, more complex cases may require different hasing functions.

// func.apply

// Instead of func.call(this, ...arguments), func.apply(this, arguments) can be used:

func.apply(context, args)

// It runs the function func while setting *this* to context and using an array-like object args as the list of arguments.
// The only syntax difference between it and func.call is that while call expects a list of arguments,
// apply takes an array-like object. So these two calls are almost the same:

func.call(context, ...args);  // pass an array as list with spread syntax
func.apply(context, args);  // pass an array-like object

// For objects that are both iterable and array-like, like an actual array, either can be used -- 
// though apply will probably be faster, because most JavaScript engines have better internal optimization for it.

// Passing all arguments along with the context to another function is referred to as call forwarding.

// Borrowing a method

// Let's make one more minor improvement to the hashing function:

function hash(args) {
    return args[0] + ',' + args[1];
}

// Thus far, it works only with two arguments. To make it accept more, a solution could be to use arr.join method:

function hash(args) {
    return args.join();
}

// ...but unfortunately, that won't work, because when hash(arguments) is called, the args object is not a real array
// (despite being both an array-like and an iterable)

// However, arr.join() can still be used in the following way:

function hash() {
    alert([].join.call(arguments));
}

hash(1, 2);

// This trick is called method borrowing. We take a join method from a regular array([].join) and use[].join.call
// to run it in the context of arguments.

// Decorators and function properties

// It is generally safe to replace a function or a method with a decorated one -- except when the original function
// had properties on it (e.g. func.calledCount or something along those lines). In such a case the decorated function
// will not provide them (as it's just a wrapper).

// Some decorators may provide their own properties. A decorator may, for example, count how many times
// a function was invoked, and how much time it took, and provide this information via wrapper properties.

// There is a way to create decorators that keep access to function properties, but this requires
// using a special Proxy object to wrap functions.

// TASK: Create a decorator spy(func) that returns a wrapper that saves all calls to the function in its calls property.
// Have every call saved as an array of arguments:

function work(a, b) {
    console.log(a + b); // work is an arbitrary function or method
}

work = spy(work);

work(1, 2);
work(4, 5);

for (let args of work.calls) {
    console.log('call:' + args.join());  // "call:1,2", "call:4,5"
}

// -->

function spy(func) {
    function wrapper(...args) {
        wrapper.calls.push(args);
        return func.apply(this, args);
    }
    wrapper.calls = [];
    return wrapper;
}

// TASK: Create a decorator delay(f, ms) that delays each call to f by ms milliseconds:

function f(x) {
    console.log(x);
}

let delay1000 = delay(f, 1000);
let delay1500 = delay(f, 1500);

f1000("test");  // shows "test" after 1000 ms
f1500("test");  // shows "test" after 1500 ms

// Have the solution accept multiple arguments.
// -->

function delay(func, ms) {
    function wrapper(...args) {
        setTimeout(() => func.apply(this, args), ms);
    };
    return wrapper;
}

let f1000 = delay(f, 1000)
f1000('test')

// TASK: The result of debounce(f, ms) decorator is a wrapper which:
//
// 1) suspends calls to f until there’s ms milliseconds of inactivity ("cooldown period" of no calls),
// 2) invokes f with the latest arguments (arguments from previous calls are ignored).
//
// For instance, we had a function f and replaced it with f = debounce(f, 1000).
// The cooldown period is calculated from the last attempted call.

let f = _.debounce(console.log, 1000);

f("a");
setTimeout(() => f("b"), 200);
setTimeout(() => f("c"), 500);

// This is a useful way of processing sequences of events, e.g. handling user inputs
// (no need to call a function on every letter).

// Implement a debounce decorator.
// -->

function debounce(func, ms) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), ms);
    };
}

// TASK: Create a "throttling" decorator throttle(f, ms) that returns a wrapper which,
// when called multiple times, passes the call to f at a maximum rate of 1 per ms (milliseconds).

// This type of decorator is useful for processing regular updates which should have intervals between them
// (e.g. tracking mouse movements).

// Example code:

function f(a) {
  console.log(a);
}

let f1000 = throttle(f, 1000);

f1000(1);  // shows 1
f1000(2);  // (throttling, 1000ms not out yet)
f1000(3);  // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored
// -->

function throttle(func, ms) {

    let isThrottled = false,
        savedArgs,
        savedThis;

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
