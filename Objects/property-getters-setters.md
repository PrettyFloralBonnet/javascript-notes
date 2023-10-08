## Property getters and setters

Object properties come in the form of *data properties* (the kind we've been working with so far) and *accessor properties*. The latter are essentially functions executed on getting and setting a value of a data property.

Accessor properties are represented by "getter" and "setter" methods. In an object literal, they are denoted by `get` and `set`:

```js
let obj = {
  get propertyName() {
    // getter, the code executed on access to propertyName
  },

  set propertyName(value) {
    // setter, the code executed on setting the value of propertyName
  }
};
```

For instance, let's say we have a `user` object with `name` and `surname`:

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

Now we want to add a `fullName` property, the value of which should be `"John Smith"`. Because we don't want to copy-paste existing information, we can implement it as an accessor:

```js
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};
```

From the outside, an accessor property looks just like a regular one. That's the idea behind accessor properties: we don't call `user.fullName` as a function. Instead, we read and call it just like a regular property. The getter function runs behind the scenes.

Back to our example. The `fullName` accessor property currently only has a getter. If we attempt to assign a value to it (`user.fullName` = "John Shepard"), that will result in an error. Let's fix that by adding a corresponding setter:

```js
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};
```

As a result, the property `fullName` is both readable and writeable:

```js
user.fullName = "John Shepard";

user.name  // John
user.surname  // Shepard
```

## Accessor descriptors

Descriptors for accessor properties are different from those of data properties in that they don't have `value` or `writable`. Instead, they have `get` and `set` functions. They retain `enumerable` and `configurable`.

Attempting to supply a `value` and `get` in the same descriptor will result in an error.

## Smarter getters and setters

Setters can make use of "private" properties (e.g. `_name`) to enforce limitations on values passed to the setter (e.g. making sure a username fulfills certain criteria). Technically, external code is still able to access properties that start with an underscore, but by a widely used convention they should be treated as internal and should not be touched from the outside of the object.
