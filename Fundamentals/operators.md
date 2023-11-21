## Operators

An operator that takes a single operand is called a **unary operator**. One that takes two operands is a **binary operator**.

Operators `++` and `--` can be placed both before and after the variable (in the prefix and postfix form). The latter performs the incrementation, but returns the value from before the incrementation:

```js
let counter = 1;
let a = counter++;
console.log(a);  // 1
console.log(counter)  // 2
```

## Operator precedence

If an expression has more than one operator, the execution order is defined by their **precedence**. Aside from standard rules (maths, parentheses), unary operators have higher precedence than their binary counterparts. If the precedence is the same, the execution order is from left to right. The assignment operator's precedence is very low.

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

## Logical operators

There are four logical operators in JavaScript: `||` (OR), `&&` (AND), `!` (NOT) and `??` (Nullish coalescing).

### `||` (OR)

The `||` (OR) operator evaluates operands from left to right, converting them to boolean. If the result of the evaluation is `true`, it stops and returns the original value of that operand. If all operands are falsy, the last operand is returned.

This means a chain of OR operators returns the first truthy value, or the last one, if no truthy values were found:

```js
console.log(1 || 0);  // 1
console.log(true || "hello");  // true
console.log(null || 1);  // 1
console.log(null || 0 || 1);  // 1
console.log(undefined || null || 0);  // 0 (returns the last value)
```

### `&&` (AND)

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

### `!` (NOT)

The `!` (NOT) operator converts the operand to boolean and returns the inverse value.

```js
console.log(!true);  // false
```

A double NOT `!!` is sometimes used as a shorthand to perform a boolean conversion:

```js
console.log(!!"non-empty string");  // true (note the two '!' operators)
```

Operator precedence of NOT `!` is the highest of all logical operators.

### `??` (Nullish coalescing operator)

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
