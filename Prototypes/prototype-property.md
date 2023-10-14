## `prototype` property

Functions have a default property named `prototype`, which is an object with a single property: `constructor`. The constructor points to the function object itself (by default, it can be overwritten).

The `prototype` property is used whenever a new object is created using the `new` operator. Specifically, it sets `[[Prototype]]` of the newly created object.
