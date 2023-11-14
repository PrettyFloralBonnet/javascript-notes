## Error handling

Catching erros in scripts is handled by the `try... catch` syntax:

```js
try {

    // code that can error out

} catch (err) {

    // handle the error

}
```

Note that this only works for runtime errors. It won't work for invalid JavaScript.

Also, if the exception occurs in scheduled code (e.g. in `setTimeout`), it won't be caught, because the engine will have already left the `try... catch` block before the scheduled statement is executed. To catch an exception inside of a scheduled function, the `try... catch` block must be placed inside that function.

## Error object

For all built-in errors, the error object has two main properties: `name` (the error name), and `message` (the message containing the details of the error). Also, in most enviroments, other (non-standard) properties are available. One of the most widely supported is `stack` (the current call stack with the information about the sequence of nested calls that led to the error).

If the error details are not needed, the error object may be omitted in `catch`:

```js
try {
    //
} catch {
    //
}
```

## Throwing errors

To raise errors manually, the syntax `throw <error object>` is used. Technically, anything can be used as an error object (e.g. just a string), but it is preferable to use objects with `name` and `message` properties, to stay at least somewhat close to built-in errors.

JavaScript has many built-in standard errors (`Error`, `ReferenceError`, `SyntaxError`, `TypeError` etc.). They all can be used with the `new` operator to create error objects:

```js
let myError = new SyntaxError(message);
```

Since `catch` gets all errors from `try`, usually error handling should be specific to the errors that are expected to happen, and other errors should be rethrown:

```js
try {
    // an operation which may raise a SyntaxError
} catch (err) {
    if (err instanceof SyntaxError) {
        // handling of SyntaxError
    } else {
        throw err;
    }
}
```

## The `finally` block

A `finally` code block may be added to `try... catch`. The code from this block will always be executed, regardless of whether an error occurs or not.

```js
try {
    // tries to execute the code
} catch {
    // handles errors
} finally {
    // always executes
}
```

Note that `finally` will be executed after *any* exit from `try... catch`, including `return`. Also, `finally` can be used without `catch` (`try... finally`), in case we don't want to catch errors for any reason, but we want to make sure the process we started is finalized.

## Global error handlers

Some environments provide a way to catch errors that have gone uncaught by any `try... catch` in the code. For example, Node has `process.on("uncaughtException")`. In the browser, a function can be assigned to the `window.onerror` property:

```js
window.onerror = function(
    message,  // the error message
    url,  // the url of the script where the error occurred
    line,  // the line where the error occurred
    col,  // the column where the error occurred
    error  // the error object
) {
    console.log(`${message}\n At ${line}:${col} of ${url}`);
}
```

The role of the global handler is usually not to recover the script execution, but to notify the developers of what's happened.

## Custom errors

It's possible to create custom errors by extending existing ones:

```js
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
```
