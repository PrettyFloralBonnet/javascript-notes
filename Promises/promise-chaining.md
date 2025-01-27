# Promise chaining

Promises provide an elegant way of handling a sequence of asynchronous tasks which need to be performed one after another.

```js
new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000)
}).then(function(result) {
    console.log(result);  // 1
    return result * 2;
}).then(function(result) {
    console.log(result);
    return result * 2;
}).then(function(result) {
    console.log(result);
    return result * 2;
});
```

As we can see, the result is passed through a chain of `.then` handlers. **Every call to `.then` creates a new promise**, which is processed by the handler, and the return value is passed to the next handler in the chain. What we get is a sequence of `console.log` calls, each with the result equal to double the previous one (1 --> 2 --> 4).

Note that this is not the same as adding several handlers to a single promise. In such a case, using the example similar to the one above, all `console.log` calls would give the same result (1).

## Returning promises

We can also explicitly return a new promise from a handler.

```js
new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000)
}).then(function(result) {
    console.log(result);  // 1
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function(result) {
    console.log(result);
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function(result) {
    console.log(result);
});
```

The output is the same as before, but now there is a 1000 ms delay before every `console.log` call. Returning promises allows us to build chains of asynchronous actions.

## Example: `loadScript`

Let's go back to our `loadScript` example once again.

```js
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        let script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Error loading script for ${src}`));

        document.head.append(script);
    });
}
```

Here's how we can load multiple scripts in a sequence:

```js
loadScript('/my/script1.js')
    .then(function(script) {
        return loadScript('/my/script2.js');
    })
    .then(function(script) {
        return loadScript('/my/script3.js');
    })
    .then(function(script) {
        // now functions defined in scripts can be used
    });
```

or with arrow functions, for short:

```js
loadScript('/my/script1.js')
    .then(script => loadScript('/my/script2.js'))
    .then(script => loadScript('/my/script3.js'))
    .then(script => {
        // now functions defined in scripts can be used
    });
```

Each `loadScript` call returns a promise, and the next `.then` runs when the promise is resolved. Scripts are loaded one after another.

### Thenables

Technically, a handler doesn't actually have to return a promise. It can return a so called "thenable" object -- an object which has a `.then()` method, which means it will be treated the same way as a promise.

The idea is that some third party libraries may have some promise compatible objects of their own. These objects may have extended sets of methods, but also remain compatible with native promises (because they implement `.then`).

```js
class Thenable {
    constructor(num) {
        this.num = num;
    }

    then(resolve, reject) {
        console.log(resolve) // function() { native code }
        setTimeout(() => resolve(this.num * 2), 1000);
    }
}

new Promise(resolve => resolve(1))
    .then(result => {
        return new Thenable(result);
    })
    .then(console.log);
```

JavaScript checks if the object returned by the `.then` handler has the callable method `then`. If it does, it calls that method, providing native functions `resolve` and `reject` as the arguments, and waits until one of them is called.

This feature allows for integration of custom thenable objects with promise chains without having to inherit from `Promise`.

## Example: `fetch`

In frontend development, promises are often used for network requests. We can use `fetch` to e.g. load information about the user from the server.

```js
let promise = fetch(url);
```

This makes a network request to the `url` and returns a promise. The promise resolves with a `response` object when the server responds with headers, but *before* the full response is downloaded.

To read the full response, we should call `response.text()`: it returns a promise that resolves when the full text is downloaded from the server.

```js
fetch('/resource/user.json')
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {
        console.log(text);
    });
```

The `response` object returned from `fetch` also has a `response.json()` method that reads the data and parses it as JSON.

That's even more convenient:

```js
fetch('/resource/user.json')
    .then(response => response.json())
    .then(user => console.log(user.name));
```

We can now do something with the loaded user data.

```js
fetch('/resource/user.json')
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    .then(githubUser => {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = 'promise-avatar-example';
        document.body.append(img);

        setTimeout(() => img.remove(), 3000);
    });
```

However, there's a problem: we can't do anything with the image after it's removed. To rectify that, we can return a promise instead:

```js
fetch('/resource/user.json')
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    .then(githubUser => new Promise(function(resolve, reject) {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = 'promise-avatar-example';
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser);
        }, 3000);
    })).then(githubUser => console.log(`Image for user ${githubUser.name} is now hidden.`));
```

Now the promise returned by the handler which gets the user data from github is settled after the explicit `resolve(githubUser)` call in `setTimeout`. The next handler in the chain will wait for it.

In general, it's a good practice for an asynchronous action to **always return a promise**. That makes it possible to plan actions after it.

We can now also split the code into reusable functions:

```js
function loadJson(url) {
    return fetch(url).then(response => response.json());
}

function loadGithubUser(name) {
    return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
    return new Promise(function(resolve, reject) {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = 'promise-avatar-example';
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser);
        }, 3000);
    });
}

loadJson('/resource/user.json')
    .then(user => loadGithubUser(user.name))
    .then(showAvatar)
    .then(githubUser => {
        console.log(`Image for user ${githubUser.name} is now hidden.`);
    });
```
