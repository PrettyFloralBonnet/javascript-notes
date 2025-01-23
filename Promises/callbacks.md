# Callbacks

JavaScript environments provide many functions that allow to schedule **asynchronous actions** (as in, actions which are initiated at one moment in time, but finished at another moment later).

For example:

```js
function loadScript(src) {
    let script = document.createElement('script');
    script.src = src
    document.head.append(script);
}
```

This creates a `<script>` tag and appends to to a page, which causes the script with the given `src` to start loading, and then run when loading is complete.

When this function is called, the script is executed "asynchronously": it starts loading immediately, but runs later, when the function has finished. If there is any code below the call to `loadScript`, that code won't wait for the script to load:

```js
loadScript('/my/script.js');
// some code
// that code won't wait for the script to load
```

If we need to use the new script as soon as it loads (e.g. because it declares new functions that we need), the `loadScript` function in its current shape doesn't have any way to track load completion.

To change that, we can add a `callback` function as a second argument to `loadScript`:

```js
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src

    script.onload = () => callback(script);

    document.head.append(script);
}
```

The `onload` event basically executes a function after the script is loaded and executed.

Now, to use functions introduced in the script, we can call them in the callback:

```js
loadScript('/my/script.js', () => {
    newFunction();  // a new function, introduced in the script
});
```

A real example might look something like this:

```js
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    console.log(`The script ${script.src} is loaded.`);
    console.log(_);  // _ is a function declared in the loaded script
});
```

That's so called **callback based** style of asynchronous programming. A function that does something asynchronously provides a callback, an argument containing another function that is executed after the original function call is complete.

### Callback in a callback

Can two scripts be loaded sequentially, one after the other?

```js
loadScript('/my/script.js', function(script) {
    console.log(`The ${script.src} is loaded.`);
    console.log('Let\'s load one more.');
    
    loadScript('/my/script2.js', function(script) {
        console.log('The second script is loaded.');
    });
});
```

In this example, after the outer `loadScript` is complete, the callback initiates the inner one. And we can stack more.

While that's maybe possibly fine for a few actions, it can quickly get out of hand. There are alternatives.

### Handling errors

What if loading the script fails? Here's an improved version of `loadScript` which tracks that:

```js
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}
```

On a successful load, it now calls `callback(null, script)`. On an error, it calls `callback(error)`:

```js
loadScript('/my/script.js', function(error, script) {
    if (error) {
        // handle error
    } else {
        // script loaded successfully
    }
});
```

That is **error first callback** style. In this convention, the first argument of the callback is reserved for an error, if it occurs. The second (and any subsequent) argument are for a successful result.

### Pyramid of Doom

Callback based asynchronous programming might be a viable approach for two, maybe three nested calls. But with any more, you end up with stuff like this:

```js
loadScript('1.js', function(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript('2.js', function(error, script) {
            if (error) {
                handleError(error);
            } else {
                // ...
                loadScript('3.js', function(error, script) {
                    if (error) {
                        handleError(error);
                    } else {
                        // ...continue after all scripts are loaded (*)
                    }
                });
            }
        });
    }
});
```

Now imagine it's not just pseudocode. As calls get more and more nested, it becomes increasingly difficult to manage. It's sometimes referred to as "**callback hell** or "**pyramid of doom**".

One way to alleviate the problem is to make every action a standalone function:

```js
loadScript('1.js', step1);

function step1(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript('2.js', step2);
    }
}

function step2(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript('3.js', step3);
    }
}

function step3(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...continue after all scripts are loaded (*)
    }
}
```

This avoids the nesting, but it's still incovenient to read and haphazard. Also, the piecemeal functions are single use, and all they do is avoid the "pyramid of doom", which leads to namespace clutter.

Luckily, there is another way. We're going to discuss it in [the next chapter](./promises.md).
