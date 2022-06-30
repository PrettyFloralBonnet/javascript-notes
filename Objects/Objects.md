# Objects

Most data types in JS are called "primitive", because their values can only contain a single "thing" (a string, a number etc.).

**Objects** are used to store keyed collections of all sorts of data and more complex entities.

An object can be created with curly brackets `{}` with an optional list of *properties*. A property is a `key: value` pair, where the `key` is a string, and the `value` can be anything.

An empty object can be created in two ways:

```js
let user = new Object();  // "object constructor" syntax
let user = {};  //  "object literal" syntax
```

Properties are accessible using the dot notation (e.g. `user.name`) abd can be added, removed and read at any time. To remove a property, use a `delete` operator (e.g. `delete user.age;`).

The last property may end with a trailing comma.

Multiword property names can be used, but they must be quoted (e.g. `"likes birds": true`). Dot access won't work for multiword properties, but an alternative exists: square bracket notation.

```js
let user = {};
user["likes birds"] = true;
```

Square brackets are more powerful than dot notation. They allow for property names to be computed in an expression (*computed properties*), e.g.:

```js
let bag = {
    [prompt("What fruit?", "orange")] : 5
};

let fruit = "apple";
bag[fruit + "Computers"] = 0;

bag  // Object { grape: 5, appleComputers: 0 }
```

Javascript objects are partially ordered: integer properties (strings that can be converted to integers without any changes) are sorted, while properties of other types will appear in creation order.

## Property value shorthand

Existing variables or function arguments are often used as values for property names. This is, in fact, so common that a shorthand exists to use them in such capacity:

```js
function createUser(name, age) {
    return {
        name, // same as name: name
        age,  // same as age: age
    };
}
```

## Existence check

Any property in an object is accessible. If the property doesn't exist, accessing it will return `undefined`. For this reason, a strict comparison with `undefined` can be used to check if the given property exists or not.

A simpler way to do that is to use the `in` keyword (`"name" in object`), in an expression which returns `true` if the name exists in the object (is the name of one of the object's properties) and `false` otherwise.

If a property actually stores the value of `undefined` (which it generally should not), the strict comparison will return `true`, but the `in` will work. However, for empty or unknown values, `null` should be used.

## The `for...in` loop

There is a loop, known as the `for...in` loop, that allows to walk through all keys in an object:

```js
let user = {
    name: "John",
    age: 30,
    isAdmin: true
};

for (let key in user) {
    alert(key);  // name, age, isAdmin
    alert(user[key]); // John, 30, true
}
```

## References and copying

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

### Comparison by reference

Two objects are equal only if they are the same object. For comparisons like `obj1 > obj2` (or comparions against a primitive), objects are converted into primitives.

## Cloning and merging

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

### Const objects

Because objects are stored as references, object values assigned to a `const` can actually be modified. The `const` fixes the value of the variable, but not the contents of an object. However, making object properties constant is actually possible, if needed (see Property flags and descriptors).

# Garbage collection

The main concept behind memory management in JavaScript is reachability. If a value is accessible or usable in any way, it is reachable. This means it is guaranteed to be stored in memory.

Some values are inherently reachable and cannot be deleted. These are called roots, and they are:

* local variables
* parameters of the current function
* variables and parameters of other functions on the current chain of nested calls
* global variables
* some internal values

Any other value is considered reachable, as long as it is reachable from a root by a reference or chain of references.

A background process of the JavaScript engine called the **garbage collector** monitors all objects and removes the ones that have become unreachable.

The basic garbage collection algorithm is called "mark-and-sweep". JS engines apply many optimizations to make it fast without affecting execution.

# Symbols

Only two types may serve as object property keys: string and symbol. If other types are used in this capacity, they are automatically converted to strings.

We've looked at strings, so let's take a look at symbols next. A symbol represents a **unique identifier**. It can be created by calling `Symbol()` and it can be given a description (also referred to as a symbol name) upon creation:

```js
let id = Symbol("id");
```

Symbols are guaranteed to be unique (even if we create many symbols with the same description, they will be different values). They also do not automatically convert to a string where other primitive types do. If you really want to show a symbol, we need to use the `toString()` method:

```js
let id = Symbol("id");
console.log(id.toString());
```

## "Hidden" properties

Symbols allow for creation of hidden properties, which cannot be accessed or overwritten:

```js
let user = { name: "John" };
let id = Symbol("id");

user[id] = "someValue";
```

Such properties will also be skipped in a `for...in` loop. However, direct access using square brackets notation, as well as using `Object.assign()` will still work.

Technically, symbols are not 100% hidden. A method `Object.getOwnPropertySymbols(obj)` retrieves all symbols of the object, and `Reflect.ownKeys(obj)` returns all object keys, including the ones which are symbols. However, most libraries and syntax constructs treat symbols as fully hidden.

## Global symbols

In rare cases where we want for identically named symbols to actually be the same entities, a global symbol reqistry exists to facilitate just that. Symbols created within the global symbol registry (by using the `Symbol.for(key)` method) are guaranteed to be the same when accessed later.

The call checks the global registry for a symbol described as `key` and returns that symnol. Otherwise, it creates a new symbol and stores it in the registry under the given `key`. Symbols in the registry are called global symbols. They are useful as application-wide symbols, accessible from anywhere in the code.

## System symbols

Many symbols exist internally. They can be used to fine-tune various aspects of objects. Some of the better known ones are:

* `Symbol.hasInstance`
* `Symbol.isConcatSpreadable`
* `Symbol.iterator`
* `Symbol.toPrimitive`

For example, `Symbol.toPrimitive` allows us to describe object to primitive conversion.

# Object methods; `this`

Objects are usually created to represent entities of the real world (users, or**ders etc.). In the re world, a user can act: add something to cart, log in, log out etc.

In **object oriented programming** (or OOP, a code writing paradigm emphasizing the use of objects as representations of entities), actions are represented by functions stored as properties. A function that is a property of an object is called a **method**.

## `this` in methods
It's common for an object method to need access to the information stored in the object itself. The `this` keyword allows for such access. The value of `this` is the object "before the dot" - the one used to call the method.

It is possible to access the object without using `this`, by referencing it via an outer variable, but such code is unreliable (e.g. if the object reference is copied to another variable and then the object is overwritten).

## `this` is not bound

`this` can be used by any function. Its value is evaluated during runtime, and it can be anything.

The same function can have a different `this` when called by different objects. It can even be referenced without an object at all:

```js
function thisWithNoObject() {
    console.log(this);
}

thisWithNoObject()  // undefined
```

Without strict mode, the value of `this` in the example above would be the global object (`window` in the browser).

In most cases, using `this` without an object is a mistake. However, it also means `this` is not bound to anything, and a function utilizing it can be used by different objects, which offers a lot of flexibility.
