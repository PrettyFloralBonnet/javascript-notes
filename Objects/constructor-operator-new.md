## Constructor functions and the `new` operator

A **constructor function** is a regular function, named (by convention) with a capital letter, and only correctly executed with a `new` operator:

```js
function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Jack");
```

The main purpose of constructor functions is to implement easily reusable object creation code. 

When such a function is executed with `new`, a new empty object is created and assigned to `this`, the function body is executed (usually adding properties to `this` or modifying it), and the value of `this` is returned.

It allows for creation of multiple new instances of a given object without resorting to object literals over and over again.

## Return from constructors

Constructor functions do not usually have a `return` statement. However, if one is present, it behaves in the following way:

* if `return` contains an object, that object is returned (instead of `this`)
* if `return` contains a primitive, it is ignored.
