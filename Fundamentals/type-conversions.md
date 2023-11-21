## Type conversions

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
