# Objects

Most data types in JS are called "primitive", because their values can only contain a single "thing" (a string, a number etc.).

**Objects** are used to store keyed collections of all sorts of data and more complex entities.

An object can be created with curly brackets `{}` with an optional list of *properties*. A property is a `key: value` pair, where the `key` is a string, and the `value` can be anything.

An empty object can be created in two ways:

```js
let user = new Object();  // "object constructor" syntax
let user = {};  //  "object literal" syntax
```

Properties are accessible using the dot notation (e.g. `user.name`) abd can be added, removed and read at any time. To remove a property, use a `delete` operator (e.g. `delete user.age;`).

The last property may end with a trailing comma.

Multiword property names can be used, but they must be quoted (e.g. `"likes birds": true`). Dot access won't work for multiword properties, but an alternative exists: square bracket notation.

```js
let user = {};
user["likes birds"] = true;
```

Square brackets are more powerful than dot notation. They allow for property names to be computed in an expression (*computed properties*), e.g.:

```js
let bag = {
    [prompt("What fruit?", "orange")] : 5
};

let fruit = "apple";
bag[fruit + "Computers"] = 0;

bag  // Object { grape: 5, appleComputers: 0 }
```

Javascript objects are partially ordered: integer properties (strings that can be converted to integers without any changes) are sorted, while properties of other types will appear in creation order.

## Property value shorthand

Existing variables or function arguments are often used as values for property names. This is, in fact, so common that a shorthand exists to use them in such capacity:

```js
function createUser(name, age) {
    return {
        name, // same as name: name
        age,  // same as age: age
    };
}
```

## Existence check

Any property in an object is accessible. If the property doesn't exist, accessing it will return `undefined`. For this reason, a strict comparison with `undefined` can be used to check if the given property exists or not.

A simpler way to do that is to use the `in` keyword (`"name" in object`), in an expression which returns `true` if the name exists in the object (is the name of one of the object's properties) and `false` otherwise.

If a property actually stores the value of `undefined` (which it generally should not), the strict comparison will return `true`, but the `in` will work. However, for empty or unknown values, `null` should be used.

## The `for...in` loop

There is a loop that allows to walk through all keys in an object

```js
let user = {
    name: "John",
    age: 30,
    isAdmin: true
};

for (let key in user) {
    alert(key);  // name, age, isAdmin
    alert(user[key]); // John, 30, true
}
```
