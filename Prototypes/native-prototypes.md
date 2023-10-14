## `Object.prototype`

The notation `let obj = {}` is the same as `let obj = new Object()`, where `Object` is a built-in object constructor function, with its own `prototype` that references an object where all the built-in properties and methods (e.g. `toString`) are housed.

When `new Object()` is called, its `[[Prototype]]` is set to `Object.prototype`.

## Other built-in prototypes

Other build-in objects such as `Array`, `Date`, `Function` etc. also keep their methods in prototypes.

By specification, all of the built-in prototypes have `Object.prototype` at the top. That's why you'll sometimes see the phrase "everything inherits from objects".

## Primitives

Primitive data types are not objects. However, when we access their properties, temporary wrapper objects are created using built-in constructors (`String`, `Number` and `Boolean`). Their job is to provide the methods, then disappear. Their methods also reside in prototypes, available as `String.prototype`, `Number.prototype` and `Boolean.prototype`.

Data types `null` and `undefined` don't have object wrappers.

## Changing native prototypes

Native prototypes can be modified (e.g. adding a method to `String.prototype` makes it available for all strings). However, it is generally considered a bad idea to do so (prototypes are global, so it's very easy to create a conflict where two libraries add an identically named method to a prototype, and one of them will end up overwriting the other).

In fact, in modern programming there is only one case where modifying prototypes is approved of, and that's **polyfilling**.

Polyfilling refers to making a substitute for a method that exists in the JS specification, but is not yet supported by a particular JS engine. It may be implemented manually, and the built-in prototype may be populated with it.

```js
if (!String.prototype.repeat) {
    String.prototype.repeat = function(n) {
        // repeat the string n times

        // the code should actually be a little bit more
        // complex than that (the full algorithm is in the
        // specification), but even an imperfect polyfill
        // is often considered good enough
        
        return new Array(n + 1).join(this);
    };
}
```

## Borrowing from prototypes

Method borrowing is taking a method from one object and copying it into another. For instance, when making an array-like structure, we may want to copy some of the `Array` methods to it.

Usually that's best handled simply by inheriting from `Array`. However, that's impossibe if the object already inherits from another object (as JS does not allow for multiple inheritance). Method borrowing becomes the alternative, allowing to mix functionalities from different objects.
