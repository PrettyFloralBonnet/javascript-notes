## `Object.create`

Setting or reading the prototype with `__proto__` is considered outdated and is somewhat deprecated. The modern methods are `Object.getPrototypeOf(obj)` and `Object.setPrototypeOf(obj)`. The only commonly accepted usage of `__proto__` is setting it as a property when creating a new object literal: `{ __proto__: ... }`. 

However, there is a better alternative for this: `Object.create(proto, [descriptors])`, which creates an empty object with the provided prototype and (optionally) property descriptors. When called with `Object.getOwnPropertyDescriptors(obj)`, it can be used to create an exact clone of an object:

```js
let clone = Object.create(
    Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);
```

## Pure dictionary objects

Since objects can be used to just store key-value pairs, unexpected things may happen if we end up assigning stuff to `__proto__` (since assignments of anything other than an object will be ignored, and objects will overwrite the prototype). To avoid problems, we can use `Map` instead of plain objects for data storage. But the object syntax is more concise, and there actually is a way to keep using them and remain safe:

```js
let obj = Object.create(null);
```

This creates an empty object where `[[Prototype]]` is `null`. These are referred to as "very plain objects" or "pure dictionary objects", and they are suitable for data storage. Their downside is they don't have access to built-in object methods (e.g. `toString()`), but for their use case, that's usually fine.