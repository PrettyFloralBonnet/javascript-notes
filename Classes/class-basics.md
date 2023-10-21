## Basic syntax

In object-oriented programming, a class is an extensible program-code-template for creating objects, providing initial values for state and implementations of behaviour.

```js
class MyClass {
    constructor() { ... }

    method1() { ... }
    method2() { ... }
    method3() { ... }
    ...
}

myClass = new MyClass();
```

The `constructor` method is called automatically by the `new` operator, which is how the new object is initialized.

In JS, a class is a kind of **function**. The construct `class MyClass { ... }` really creates a function `MyClass`, the code for which is taken from the `constructor` method (if such method is not provided, it is assumed to be empty), and then stores class methods in `MyClass.prototype`. After a `new MyClass` object is created, its methods are taken from the prototype, which is how the object has access to class methods.

Instead of using the class syntax, one could use a function syntax, and the result would be almost the same. However, classes are not purely syntactic sugar for functions:

1. A function created by `class` has an internal property `[[IsClassConstructor]]`, which (among other things) ensures that the function has to be called with the `new` keyword (and cannot be called like a regular function)
2. A string representation of a class constructor starts with "class"
3. Class methods are non-enumerable
4. All code inside of a class construct is always automatically in `strict` mode
