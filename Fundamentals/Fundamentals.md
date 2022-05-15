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

# Interaction (alert, prompt, confirm)

## `alert()`

```js
let message = "Hello!";
alert(message);
```

`alert()` shows a message in a modal window and pauses script execution until "OK" is pressed.

## `prompt()`

```js
result = prompt("What is your name?", "JC Denton");
alert(`Welcome to the coalition, ${result}!`);
```

`prompt()` returns the text from the input field, or `null` if the input was cancelled. The optional second parameter can be used to specify the default value of the input field.

## `confirm()`

```js
question = "Is this podracing?";
result = confirm(`${question}`);
```

`confirm()` shows a modal window with a question and two buttons: "OK" and "Cancel".
It returns `true` if "OK" was clicked, and `false` otherwise.

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

# Operators

An operator that takes a single operand is called a unary operator. One that takes two operands is a binary operator.

Operators `++` and `--` can be placed both before and after the variable (in the prefix and postfix form). The latter performs the incrementation, but returns the value from before the incrementation:

```js
let counter = 1;
let a = counter++;
console.log(a);  // 1
console.log(counter)  // 2
```

## Operator precedence

If an expression has more than one operator, the execution order is defined by their precedence. Aside from standard rules (maths, parentheses), unary operators have higher precedence than their binary counterparts. If the precedence is the same, the execution order is from left to right. The assignment operator's precedence is very low.

## Bitwise operators

Bitwise operators treat arguments as 32-bit integers and they work on the level of their binary representation. They are not specific to JS - they are supported in most programming languages.

List of bitwise operators:

* AND ( `&` )
* OR ( `|` )
* XOR ( `^` )
* NOT ( `~` )
* LEFT SHIFT ( `<<` )
* RIGHT SHIFT ( `>>` )
* ZERO-FILL RIGHT SHIFT ( `>>>` )

More on bitwise operators: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators

## Comma

The comma operator allows to evaluate several expressions. Each comma separated expression will be evaluated, but only the last result will be returned:

```js
let a = (1 + 2, 3 + 4);
console.log(a);  // 7; 1 + 2 is evaluated and immediately discarded
```

Comma has a very low precedence (lower than the assignment operator), so parentheses are needed in the example above.

# Comparisons

Comparisons (`>`, `<`, `>=`, `<=`, `==`, `!=`) return boolean values (`true` or `false`).

With strings, JS performs comparisons letter by letter, using a dictionary (lexographical) order:

```js
console.log('Z' > 'A');  // true
console.log('Glow' > 'Glee');  // true
console.log('Bee' > 'Be');  // true
```

Lowercase characters have greater Unicode indices than uppercase ones.

When different data types are comparaed, they are converted to numbers under the hood. For this reason, it's possible that two values are equal, but one of them is true as boolean, whereas the other is false:

```js
let a = 0;
console.log(Boolean(a));  // false

let b = "0";
console.log(Boolean(b));  // true

console.log(a == b);  // true!
```

This also means that a regular equality check `==` cannot differentiate between `0` and `false`, or between `false` and an empty string. For situations like these, the  **strict equality operator** `===` exists. It checks for equality without type conversion:

```js
console.log(null === undefined);  // false
```

With the standard (non-strict) equality check `==`, `undefined` returns `false` for all comparisons, except with `null` and itself. Generally speaking it shouldn't be used in comparisons at all (unless you really know what you're doing).

Values `null` and `undefined` are equal to each other, and are not equal to anything else:

```js
console.log(null == undefined);  // true
console.log(null == 0);  // false
console.log(undefined == 0);  // false
```

`NaN` returns `false` for all comparisons, including with itself:

```js
console.log(NaN == NaN);  // false
```

To check if a value is `NaN`, use `isNaN()` function.

# Conditional branching

## The `if` statement

The `if` statement evaluates the expression in parentheses, converts it into boolean, and executes a block of code if the result is `true`. It may contain an optional `else` block which executes only when the result is `false`. To test seceral variants of a condition, `else if` is used.

```js
let year = prompt('What year was ECMAScript 2015 published?', '');

if (year < 2015) {
  alert('Later than that.');
} else if (year > 2015) {
  alert('Sooner than that.');
} else {
  alert('Correct!');
}
```

## Ternary operator

The question mark operator `?`, also called the ternary operator because it takes three operands, is a shorthand way to evaluate a condition and assign a variable based on the result:

```js
let age = prompt('How old are you?', 18);

let accessAllowed = age > 18 ? true : false;
```

The condition is evaluated. If it's truthy, the virst value after the question mark is returned. If it's falsy, the second value is returned.

Ternary operator expressions can be nested.

# Logical operators

There are four logical operators in JavaScript: `||` (OR), `&&` (AND), `!` (NOT) and `??` (Nullish Coalescing).

## `||` (OR)

The `||` (OR) operator evaluates operands from left to right, converting them to boolean. If the result of the evaluation is `true`, it stops and returns the original value of that operand. If all operands are falsy, the last operand is returned.

This means a chain of OR operators returns the first truthy value, or the last one, if no truthy values were found:

```js
console.log(1 || 0);  // 1
console.log(true || "hello");  // true
console.log(null || 1);  // 1
console.log(null || 0 || 1);  // 1
console.log(undefined || null || 0);  // 0 (returns the last value)
```

## `&&` (AND)

The `&&` (AND) operator evaluates operands from left to right and converts them to boolean. If the result is `false`, it stops and returns the original value of that operand. If all results are `true`, it returns the last operand.

Therefore, a chain of AND operators returns the first falsy value, or the last value, if no falsy values were found:

```js
console.log(1 && 0);  // 0
console.log(1 && 5);  // 5
console.log(null && 5);  // null
console.log(0 && "hello");  // 0
console.log(1 && 2 && null && 3);  // null
console.log(1 && 2 && 3);  // 3 (returns the last value)
```

Operator precedence of AND `&&` is higher than OR `||`.

## `!` (NOT)

The `!` (NOT) operator converts the operand to boolean and returns the inverse value.

```js
console.log(!true);  // false
```

A double NOT `!!` is sometimes used as a shorthand to perform a boolean conversion:

```js
console.log(!!"non-empty string");  // true (note the two '!' operators)
```

Operator precedence of NOT `!` is the highest of all logical operators.

## Nullish coalescing operator `??`

The result of `a ?? b` is `a` if `a` is not `null` or `undefined`, or `b` otherwise. In other words, `??` returns the first argument if it is defined (it's value is not `null` or `undefined`), or the second argument otherwise.

The most common use case for `??` is to provide a default value.

`??` is quite similar to `||`, but the key difference between them is that `??` returns the first *defined* value, while `||` returns the first *truthy* value. `||` doesn't distinguish between `false`, `0`, an empty string and `null` or `undefined`:

```js
let height = 0;

console.log(height || 100);  // 100
console.log(height ?? 100);  // 0
```

The operator precedence of `??` is the same as `||`. For safety reasons, JavaScript forbids using `??` together with the `&&` and `||` operators, unless the precedence is explicitly specified using parentheses:

```js
let x = 1 && 2 ?? 3;  // Syntax error
```

The limitation was explicitly added to the language specification in order to avoid programming mistakes.
