# Objects

Most data types in JS are called "primitive", because their values can only contain a single "thing" (a string, a number etc.).

**Objects** are used to store keyed collections of all sorts of data and more complex entities.

An object can be created with curly brackets `{}` with an optional list of *properties*. A property is a `key: value` pair, where the `key` is a string, and the `value` can be anything.

An empty object can be created in two ways:

```js
let user = new Object();  // "object constructor" syntax
let user = {};  //  "object literal" syntax
```

Properties are accessible using the dot notation (e.g. `user.name`) abd can be added, removed and read at any time.
