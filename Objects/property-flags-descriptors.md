## Property flags and descriptors

An object property is actually much more than just a key-value pair. They are much more flexible and powerful than it may seem at first glance.

### Property flags

Object properties have 3 special attributes (besides `value`), or "flags":

* `writable` - whether the value can be changed (or is it read-only)
* `enumerable` - whether the property appears when the object properties are listed (e.g.
via a `for..in` loop)
* `configurable` - whether the property can be deleted, and if these attributes can be modified

### Accessing the flags

To access these flags, we can use the `Object.getOwnPropertyDescriptor` method, which allows access to full information about an object's property:

```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

There's also `Object.getOwnPropertyDescriptors` which returns the full information on all of the object's properties:

```js
let descriptors = Object.getOwnPropertyDescriptors(obj);
```

### Modifying the flags

To change the flags, we can use `Object.defineProperty`:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

If the property exists, `defineProperty` updates its flags. Otherwise, it creates the property with the provided value and flags (if a flag is not specified, it defaults to `false`).

Similarly to `Object.getOwnPropertyDescriptors`, there's also `Object.defineProperties`, which allows to define multiple properties at once:

```js
Object.defineProperties(obj, {
  property1: descriptor1,
  property2: descriptor2
  // ...
});
```

### Cloning an object along with properties

Normally, when cloning an object, we use an assignment to copy properties:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

However, the code above does not copy flags. To get a "better" clone that maintains property flags of the original, `Object.getOwnPropertyDescriptors` and `Object.defineProperties` can be used together:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

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

A non-configurable property can't be deleted, and its attributes can't be modified. Making a property non-configurable is a one-way street - it cannot be changed back with `defineProperty`.

## Manipulating the entire object

Property descriptors work at the level of individual properties. However, methods that impact or check the entire object also exist:

* `Object.preventExtensions(obj)` - forbids the addition of new properties to the object
* `Object.seal(obj)` - forbids adding and removing properties (sets `configurable: false` for all existing properties)
* `Object.freeze(obj)` - forbids adding, removing and changing properties (sets `configurable: false` and `writable: false` for all existing properties)

The corresponding checks are, respectively: `Object.isExtensible`, `Object.isSealed` and `Object.isFrozen`.
