# Promisification

**Promisification** is the conversion of a function that accepts a callback into a function that returns a promise.

Many pre-existing functions and libraries are based on callbacks, but promises are more convenient, so it's practical to promisify them.

Let's go back one more time to the `loadScript` example from the [callbacks](./callbacks.md) chapter:

```js
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}
```

The function loads a script from a provided `src`, and then calls `callback(err)` in case of an error, or `callback(null, script)` if the load is successful.

Now let's promisify it.

```js
let loadScriptPromise = function(src) {
    return new Promise((resolve, reject) => {
        loadScript(src, (err, script) => {
            if (err) reject(err);
            else resolve(script);
        });
    });
}
```

The new function is a wrapper around the original one. It calls it while providing its own callback which takes care of `resolve` and `reject`.

In practice, we may need to promisify more than one function, so it makes sense to create a helper that does it:

```js
function promisify(f) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            function callback(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }

            args.push(callback);

            f.call(this, ...args);
        });
    }
}

// usage
let loadScriptPromise = promisify(loadScript);

// loadScriptPromise(...).then(...);
```

A call to `promisify` returns a wrapper around `f`. The wrapper returns a promise and forwards the call to the original `f`, tracking the result in the custom callback.

However, this version of `promisify` assumes that `f` expects a callback with exactly two arguments (`err, result`). This is the most common format, but what if the original function expects more arguments?

```js
function promisify(f, manyArgs = false) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            function callback(err, ...results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(manyArgs ? results : results[0]);   // resolve with all callback results if manyArgs is true
                }
            }

            args.push(callback);
            
            f.call(this, ...args);
        });
    };
}

// usage
f = promisify(f, true);
// f(...).then(arrayOfResults => ..., err => ...);
```

It's similar to the previous one, but `resolve` is called with one or *all* arguments depending on whether `manyArgs` is true.

There are also modules with more flexible promisification functions, e.g. `util.promisify` in Node.js or [es6-promisify](https://github.com/mikehall314/es6-promisify).
