## Data types

JavaScript is dynamically typed, which means it has data types, but variables are not bound to them.

The following data types exist in JS:

* number
* string
* boolean
* null
* undefined
* object
* symbol

The built-in `typeof` operator returns a string with the type of the argument:

```js
typeof undefined  // "undefined"
typeof 0  // "number"
typeof 10n  // "bigint"
typeof true  // "boolean"
typeof "foo"  // "string"
typeof Symbol("id")  // "symbol"
typeof Math  // "object"

// "object" (that's wrong, this is an officially recognized error,
// kept in the language for the sake of compatibility)
typeof null

// "function" (functions are objects, but typeof treats them differently)
typeof alert
```

## Number

The number type represents both integers and floating point numbers, as well as special numeric values: `Infinity`, `-Infinity` and `NaN`.

Infinity can be a result of division by `0`:

```javascript
console.log(1 / 0);  // Infinity
```

`NaN` (Not a Number) represents a computational error. It's a result of an incorrect or undefined mathematical operation, e.g.:

```javascript
console.log('' / 2);  // NaN
```

`NaN` is "sticky, which means any further operation on `NaN` will also return `NaN`.

Mathematical operations in JS are "safe", in the sense that the script will not error out. At worst, the result will be `NaN` or `Infinity`.

### BigInt

Due to a technical representation  caused by the internal representation of the number type, it cannot represent integer values larger than `(2**53 - 1)` (that's `9007199254740991`), or less than `-(2**53 - 1)`. The `BigInt` type is used to represent integers of arbitrary length.

A BigInt value is created by appending `n` to the end of an integer:

```javascript
const myBigInt = 1234567890123456789012345678901234567890n
```

## String

Strings can be created by single or double quotes, as well as by backticks which allow for embedding variables and expressions with `$(...)`:

```javascript
let name = 'Mal';
let message = `They cannot stop the signal, ${name}!`;
```

## Boolean

The boolean type has only two values: `true` and `false`, and is a result of comparisons (`<`, `>`, `===`).

## null

In JavaScript, `null` is **not** a "reference to a non-existing object" or a "null pointer" (like in some other languages). It's just a special value which represents "nothing", "empty" or "value unknown".

## undefined

The meaning of `undefined` is "value is not assigned". If a variable is declared, but not assigned, then its value is `undefined`:

```js
let x;
console.log(x);  // undefined
```

## Object

The `object` type is special. All other types are called **primitive** because their values can only be a single thing (a string, or a number, etc.). Objects are used to store collections of data and more complex entities.

## Symbol

The `symbol` type is used to create unique identifiers for objects.
