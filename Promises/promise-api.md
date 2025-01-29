# Promise API

There are 6 static methods in the `Promise` class.

## `Promise.all`

Let's say we want multiple promises to execute in parallel, and wait for all of them to be ready. That's what `Promise.all` is for.

```js
let promise = Promise.all(iterable);
```

It takes an iterable (usually an array of promises) and returns a new promise. That new promise resolves when all listed promises are resolved, and the array of their results becomes the result.

```js
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000))
]).then(console.log);  // [ 1, 2, 3 ]
```

Above, `Promise.all` is settled after 3 seconds, and the result is an array of results of each member promise of the initial array (1, 2, 3).

Note that the order of results in the final array is the same as the order of the member promises. The fact that the first promise resolves last doesn't impact the order.

A common trick is to map an array of data into an array of promises, and then wrap it with `Promise.all`, e.g.:

```js
let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig'
];

let requests = urls.map(url => fetch(url));

Promise.all(requests)
    .then(responses => responses.forEach(
        response => console.log(`${response.url}: ${response.status}`)
    ));
```

If any of the promises is rejected, the promise returned by `Promise.all` is also ultimately rejected, with the same error. As soon as one promise is rejected, the others are ignored (even if they get resolved).

### Non-promise values in iterable

`Promise.all` accepts an iterable of promises, but we can also pass "ready" values to it, if that's convenient. If any of the iterable members is not a promise, it's passed to the resulting array "as is", e.g.:

```js
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 1000)),
    2,
    3
]).then(console.log)  // [ 1, 2, 3 ]
```

## `Promise.allSettled`

If any promise is rejected, `Promise.all` is also rejected as a whole. That's good for "all or nothing" cases, but sometimes that's not what we need (e.g. if one request fails, we are still interested in the other ones).

`Promise.allSettled` waits for all promises to settle, regardless of the results. The resulting array has `{status: "fulfilled", value: result}` for resolved promises, and `{status: "rejected", reason: error}` for errors.

```js
let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
    .then(results => {
        results.forEach((result, i) => {
            if (result.status == "fulfilled") {
                console.log(`${urls[i]}: ${result.value.status}`);
            }
            
            if (result.status == "rejected") {
                console.log(`${urls[i]}: ${result.reason}`);
            }
        });
  });
```

## `Promise.race`

Similar to `Promise.all`, but only waits for the first settled promise and gets its result (or error).

```js
let promise = Promise.race(iterable);
```

E.g. here, the result will be `1`:

```js
Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('An error has occurred')), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(console.log);  // 1
```

After the first settled promise "wins the race", the remaining results/errors are ignored.

## `Promise.any`

Similar to `Promise.race`, but waits for the first resolved promise and gets its result. If all promises are rejected, the returned promise is rejected with `AggregateError`, an error object that stores all member promise errors in its `errors` property.

```js
let promise = Promise.any(iterable);
```

Again, here, the result would be `1` (the first two promises are rejected):

```js
Promise.any([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('An error has occurred')), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('An error has occurred')), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000))
]).then(console.log);
```

Once again, as soon as the first resolved promise "wins the race", the other ones are ignored.

## `Promise.resolve` (obsolete)

`Promise.resolve(value)` creates a resolved promise with the result `value`. It's functionally the same as:

```js
let promise = new Promise(resolve => resolve(value));
```

The method was used for compatibility, e.g. when a function was expected to return a promise:

```js
let cache = new Map();

function loadCached(url) {
    if (cache.has(url)) {
        return Promise.resolve(cache.get(url));
    }

    return fetch(url)
        .then(response => response.text())
        .then(text => {
            cache.set(url,text);
            return text;
        });
}
```

This function fetches an URL and caches the response. For future calls to the same URL, it immediately gets the response from cache, but uses `Promise.resolve` to ensure the returned value is always a promise (and so that we can use `.then` with the function).

## `Promise.reject` (obsolete)

`Promise.reject(error)` creates a rejected promise with `error`. Functionally, it is the same as:

```js
let promise = new Promise(reject => reject(new Error('An error has occurred')));
```

In practice, it was rarely used.

### Obsolescence notice

`Promise.resolve` and `Promise.reject` are rarely needed in modern code, thanks to the [`async`/`await` syntax](./async-await.md). That makes them somewhat obsolete.
