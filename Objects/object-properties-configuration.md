# Property flags and descriptors

An object property is actually much more than just a key-value pair. They are much more flexible and powerful than it may seem at first glance.

## Property flags

Object properties have 3 special attributes (besides `value`), or "flags":

* `writable` - whether the value can be changed (or is it read-only)
* `enumerable` - whether the property appears when the object properties are listed (e.g. via a `for..in` loop)
* `configurable` - whether the property can be deleted, and if these attributes can be modified
