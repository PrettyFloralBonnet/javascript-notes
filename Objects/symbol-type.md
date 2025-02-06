## Symbols

Only two types may serve as object property keys: string and symbol. If other types are used in this capacity, they are automatically converted to strings.

We've looked at strings, so let's take a look at symbols next. A symbol represents a **unique identifier**. It can be created by calling `Symbol()` and it can be given a description (also referred to as a symbol name) upon creation:

```js
let id = Symbol("id");
```

Symbols are guaranteed to be unique (even if we create many symbols with the same description, they will be different values). They also do not automatically convert to a string where other primitive types do. If you really want to show a symbol, we need to use the `toString()` method:

```js
let id = Symbol("id");
console.log(id.toString());  // Symbol(id)
```

### "Hidden" properties

Symbols allow for creation of hidden properties, which cannot be overwritten:

```js
let user = { name: "John" };
let id = Symbol("id");

user[id] = "someValue";
```

Such properties will also be skipped in a `for...in` loop. However, direct access using square brackets notation, as well as using `Object.assign()` will still work.

Technically, symbols are not 100% hidden. A method `Object.getOwnPropertySymbols(obj)` retrieves all symbols of the object, and `Reflect.ownKeys(obj)` returns all object keys, including the ones which are symbols. However, most libraries and syntax constructs treat symbols as fully hidden.

### Global symbols

In rare cases where we want for identically named symbols to actually be the same entities, a global symbol reqistry exists to facilitate just that. Symbols created within the global symbol registry (by using the `Symbol.for(key)` method) are guaranteed to be the same when accessed later.

The call checks the global registry for a symbol described as `key` and returns that symnol. Otherwise, it creates a new symbol and stores it in the registry under the given `key`. Symbols in the registry are called global symbols. They are useful as application-wide symbols, accessible from anywhere in the code.

### System symbols

Many symbols exist internally. They can be used to fine-tune various aspects of objects. Some of the better known ones are:

* `Symbol.hasInstance`
* `Symbol.isConcatSpreadable`
* `Symbol.iterator`
* `Symbol.toPrimitive`

For example, `Symbol.toPrimitive` allows us to describe object to primitive conversion, which we'll take a look at [here](./object-to-primitive-conversion.md).
