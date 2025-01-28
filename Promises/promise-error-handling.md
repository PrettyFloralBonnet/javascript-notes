# Promise error handling

When a promise is rejected, the control jumps to the closest rejection handler. This makes promise chains really good at error handling.

For example, here's a `fetch` call to a non-existent URL:

```js
fetch('https://no-such-server.com')
    .then(response => response.json())
    .catch(err => console.log(err));
```

The call to the error handler doesn't have to be immediate. In fact, the easiest way to catch errors is to append `.catch` at the end of the chain:

```js
fetch('/resource/user.json')
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    .then(githubUser => new Promise((resolve, reject) => {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser);
        }, 3000);
    }))
    .catch(err => console.log(err.message));
```

## Implicit `try... catch`

The code of a promise executor and promise handlers has an invisible `try... catch` around it. If an exception occurs, it gets caught, and is treated as a rejection.

```js
new Promise((resolve, reject) => {
    throw new Error('This is an error.')
}).catch(console.log); // 'Error: This is an error.'
```

This works exactly the same as `reject`:

```js
new Promise((resolve, reject) => {
    reject(new Error('This is an error.'))
}).catch(console.log); // 'Error: This is an error.'
```

The final `.catch` handler not only catches explicit rejections, but also any accidental errors in the handlers above it.

## Rethrowing

In a regular `try...catch` we can analyze the error and rethrow if it cannot be handled. This is also true for promises.

If we `throw` inside `.catch`, the control goes to the next error handler. If we handle the error, then it continues to the next successful `.then` handler.

```js
new Promise((resolve, reject) => {
    throw new Error('An error has occurred.');
}).catch((err) => {
    // handle the error
}).then(() => {
    // this handler now runs
});
```

In the example above, the `.catch` block finishes, and the next successful `.then` handler is called.

Below, the handler is unable of handling the error, so it throws again, and the execution jums from the first `.catch` to the next one down the chain:

```js
new Promise((resolve, reject) => {
    throw new Error('An error has occurred.')
}).catch((err) => {
    if (err instanceof URIError) {
        // handle the URIError
    } else {
        console.log('Unknown error has occurred');
        throw err;
    }
}).then(() => {
    // this doesn't run here
}).catch(err => {
    console.log(`Unknown error: ${err.message}`)
});
```

## Unhandled rejections

What happens when an error is not handled (e.g. we did not append `.catch` at the end of the chain)?

```js
new Promise((resolve, reject) => {
    noSuchFunction();  // errors out
}).then(() => {
    // only resolved promise is handled, there is no .catch()
});
```

In case of an error, the promise becomes rejected, and the execution should jump to the next rejection handler. But there is none. With regular errors, the script dies with a message in the console.

A similar thing happens with unhandled promise rejections. The JS engine tracks such rejections and generates a global error. In the browser, these errors can be examined with the [`unhandledrejection` event](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

```js
window.addEventListener('unhandledrejection', function(event) {
    console.log(event.promise);  // the promise that generated the error
    console.log(event.reason);  // the unhandled error object
});

new Promise(() => {
    throw new Error('Unhandled rejection error.');
});
```

If an error occurs and there is no `.catch`, the `unhandledrejection` handler triggers, and gets the `event` object with the information about the error, so something can be done. Usually such errors are impossible to recover from, so the best bet is to inform the user about the problem and report the incident to the server.
