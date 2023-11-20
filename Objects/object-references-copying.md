## Object references and copying

Primitive data types are always copied "as a whole value". This means that when we copy a primitive value, e.g.:

```js
let message = "Hello!";
let phrase = message;
```

...then as a result we get two independent variables, each holding a string `"Hello!"`.

Objects are not like that. A variable assigned to an object does not store the object itself, but rather its address in memory, or a **reference** to it. When an object variable is copied, the reference is copied, but the actual object is not duplicated.

So, with something like:

```js
let user = { name: "John" };
let admin = user;
```

...we now have two variables, each referencing the same object. This means that making any changes to the object referencing it through one of the variables will also affect the output from the other variable:

```js
admin.name = 'Pete';
console.log(user.name);  // 'Pete'
```

## Comparison by reference

Two objects are equal only if they are the same object. For comparisons like `obj1 > obj2` (or comparions against a primitive), objects are converted into primitives.

## Object cloning and merging

Copying by reference is sufficient for most purposes. However, it is possible to actually clone an object.

In order to do that, it is necessary to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level:

```js
let clone = {};

for (let key in user) {
    clone[key] = user[key];
}
```

Another way to achieve this is to use the method `Object.assign(target, [source1, source2, source3...])`, where `target` is the target object and all the optional `sourceN` are the source objects. This copies all properties of all source objects onto the target, and returns it. If the copied property name already exists in the target objects, it gets overwritten.

### Nested cloning

Since object properties can themselves be references to other objects, they will be copied by reference if a clone is made. As a result, any changes to the nested properties of the clone will result in changes of the nested properties of the original.

To circumvent this, a cloning loop can be used that examines each property of the original object, and if that property is also an object, it replicates its structure as well. This is called "deep cloning", which can be implemented using recursion or the built-in function from the `lodash` library (`_.cloneDeep(obj)`).

## Const objects

Because objects are stored as references, object values assigned to a `const` can actually be modified. The `const` fixes the value of the variable, but not the contents of an object. However, making object properties constant is actually possible, if needed (see [Property flags and descriptors](/Objects/property-flags-descriptors.md)).
