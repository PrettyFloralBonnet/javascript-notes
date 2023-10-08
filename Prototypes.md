## Prototype

In JS, objects have a special hidden `[[Prototype]]` property that is either `null`, or it references another object.

When a property is read from an object, and that property is missing, JS automatically attempts to read it from the object prototype.

In JS, an object can only have one prototype. Inheritance from two or more other objects is not possible.

One of the ways to set the object's `[[Prototype]]` is to use the historical getter/setter method `__proto__`. However, this is a bit outdated, and must only be supported in browsers for compatibility reasons (though most servers support it as well). Modern JS offers methods `Object.getPrototypeOf` and `Object.setPrototypeOf` instead.

Note that the value of `this` is not affected by prototypes at all. In a method call `this` is always the object before the dot, regardless of where the method is found (the object or its prototype).

Inherited properties are listed in a `for..in` loop, but skipped by `Object.keys()`, `Object.values()` and so on. There's also a built-in method `Object.hasOwnProperty(key)` which returns `true` if the object has its own (not inherited) `key` property.

All objects inherit from `Object.prototype` (which is where the object built in methods come from). All properties of `Object.prototype` have the `enumerable` flag set to `false` (so they won't show up in `for..in` loops).

## `prototype` property

Functions have a default property named `prototype`, which is an object with a single property: `constructor`. The constructor points to the function object itself (by default, it can be overwritten).

The `prototype` property is used whenever a new object is created using the `new` operator. Specifically, it sets `[[Prototype]]` of the newly created object.
