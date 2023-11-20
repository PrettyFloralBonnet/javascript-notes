## Optional chaining

There is a safe way to access nested object properties, even if the intermediary property does not exist.

Let's consider an example: we store information about our users in a `user` object. We expect to get information about user address by accessing the properties `user.address.street`, but we run into this:

```js
let user = {};  // a user without the "address" property
```

`user.address` is undefined, and trying to access a property of `undefined` results in a `TypeError`.

To solve this and similar problems, **optional chaining** was added to the language. The syntax `?.` allows us to stop the property access evaluation if the value before `?.` is `undefined` or `null`, and to return `undefined`:

```js
let user = {};

console.log(user.address?.street)  // undefined
```

This syntax may also be used to call a function that may not exist (`?.()`), and to access properties of an object that may not exist using the square bracket notation (`?.["key"]`)

Optional chaining should be used sparingly, only in cases when we actively expect something not to exist and its inexistence is not an error.
