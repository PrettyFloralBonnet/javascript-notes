# Hello, world!
JS can be inserted into any part of an HTML document with the help of the `<script>` tag.

```html
<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

  <script>
    console.log("Hello, world!");
  </script>

  <p>...After the script.</p>

</body>

</html>
```

However, if there is a lot of code, it's better to put it in a separate file and reference it with the `src` (source) attribute:

```html
<!-- abspath, relative path or url-->
<script src="/path/to/script.js"></script>
```

If the `src` attribute is set, the content of the `<script>` tag is ignored.

The `<script>` tag has a few attributes that are rarely used anymore, but can be found on old code:
* type `<script type=...>`
* language `<script language=...>`

As a rule, only the simplest scripts are put directly into HTML. More complex ones are kept in separate files. These files will be cached by the browser for the performance benefit attained when other pages reference the same script.

# Use strict

When ECMAScript 5 (ES5) appeared in 2009, it added features to JS which modified some of the existing ones. To keep the old code working, most of these modifications were switched off by default, and needed to be explicitly enabled with the `use strict` directive.

When used at the beginning of a script (or sometimes a function), it enables "strict mode" for the entire corresponding scope (so, the script or function).

Nowadays it's rarely necessary to put `use strict` in the code as modern JS features such as modules and classes enable it automatically.

# Variables

The keywords for defining variables in modern JS are `let` and `const`:

```javascript
let message = "Hello!";
let user = "John";

// constants known ahead of runtime
const COLOR_RED = '#F00';
const COLOR_GREEN = "#0F0";
```

Older scripts may contain variables declared with the `var` keyword, which is almost the same as `let`, with some distinctions which will be described later.

Multiple variables can be declared in one line:

```javascript
let user = 'John', age = 25, message = 'Hello'
```

There are two variable name limitations in JS:
1. The name may only contain letters, digits, and the following symbols: `$`, `_`.
2. The first character cannot be a digit.

The `_` character has no special meaning as a variable name (like it does in e.g. python)

# Data types

JS is dynamically typed, which means it has data types, but variables are not bound to them.

Data types in JS:
* number
* string
* boolean
* null
* undefined
* object
* symbol

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

## Objects and Symbols

The `object` type is special. All other types are called **primitive** because their values can only be a single thing (a string, or a number, etc.). Objects are used to store collections of data and more complex entities.

The `symbol` type is used to create unique identifiers for objects.

# The typeof operator

The `typeof` operator returns a string with the type of the argument:

```js
typeof undefined  // "undefined"
typeof 0  // "number"
typeof 10n  // "bigint"
typeof true  // "boolean"
typeof "foo"  // "string"
typeof Symbol("id")  // "symbol"
typeof Math  // "object"

// "object" (that's wrong, this is an officially recognized error,
// kept in the language for compatibility)
typeof null

// "function" (functions are objects, but typeof treats them differently)
typeof alert
```

# Type conversions

Most of the time, operators and functions automatically convert the provided values to a specific type (e.g. mathematical operations convert values to numbers).

## String conversion

We can also call the `String(value)` function to convert a value to a string:

```js
String(null)  // 'null'
String(3)  // '3'
String(false)  // 'false'
```

## Numeric conversion

Numeric conversion happens automatically with mathematical operations.

We can also use the `Number(value)` function to explicitly convert a value to a number. If the string is not a valid number, the result of such a conversion is NaN.

Numeric conversion rules:
* `undefined` becomes `NaN`
* `null` becomes `0`
* `true` and `false` become `1` and `0` respectively
* `string` - leading and trailing whitespace is removed; if the remaining string is empty, the result is `0`; otherwise, the number is "read" from the string; if the string is not a valid number, the result is `NaN`

```js
Number(null)  // 0
Number('')  // 0
Number('0')  // 0
Number('3')  // 3
Number(true)  // 1
Number('hello')  // NaN
Number(undefined)  // NaN
```

## Boolean conversion

Boolean conversion takes place in logical operations and can be performed explicitly with a call to `Boolean(value)`. Values which are intuitively "empty" (such as `0`, an empty string, `null`, `undefined` or `NaN`) become `false`. Other values become `true`.

```js
Boolean(0)  // false
Boolean('0')  // true (string is not empty)
```

Unlike some other programming languages (such as PHP), the string `"0"` becomes true. In JS, a non-empty string is always `true`.
