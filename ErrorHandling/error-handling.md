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
