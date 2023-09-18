# Property flags and descriptors

An object property is actually much more than just a key-value pair. They are much more 
flexible and powerful than it may seem at first glance.

## Property flags

Object properties have 3 special attributes (besides `value`), or "flags":

* `writable` - whether the value can be changed (or is it read-only)
* `enumerable` - whether the property appears when the object properties are listed (e.g.
via a `for..in` loop)
* `configurable` - whether the property can be deleted, and if these attributes can be modified

To access these flags, we can use the `Object.getOwnPropertyDescriptor` method, which allows
access to full information about an object's property:

`let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);`

To change the flags, we can use `Object.defineProperty`:

`Object.defineProperty(obj, propertyName, descriptor)`

If the property exists, `defineProperty` updates its flags. Otherwise, it creates the property
with the provided value and flags (if a flag is not specified, it defaults to `false`).

## Effects of flags

### Non-writable

```js
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false
});

user.name = "Pete"; // Error: Cannot assign to read only property 'name'
```

### Non-enumerable

Non-enumerable properties are excluded from `for..in` loops, as well as from `Object.keys`.

### Non-configurable

A non-configurable property can't be deleted, and its attributes can't be modified. Making
a property non-configurable is a one-way street - it cannot be changed back with `defineProperty`.
