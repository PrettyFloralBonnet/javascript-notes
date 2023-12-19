## Numbers

There are two types of numbers in modern JavaScipt:
1. Regular numbers, stored in 64-bit format IEEE-754 (also known as "double precision floating point numbers")
2. BigInt numbers, representing integers of arbitrary length (they're needed to represent numbers exceeding `2 ** 53` or `-2 ** 53`).

## Different ways to write a number

The letter `e` is used as a shorthand for the number of zeroes in a number:

```js
let billion = 1e9;  // 1 billion (literally 1 and 9 zeroes)
let millisecond = 1e-6;  // one millionth (literally 6 zeroes to the left of 1)
```

Hexadecimal, binary and octal numbers are supported:

```js
let a = 0xff, b = 0b11111111, c = 0o377;
a === b && b === c  // true, all equal 255
```

## Number methods

### Representing a number as a string

The method `toString(base)` returns a string representation of the number in the numerical system with the provided `base`:

```js
let num = 255;
console.log(num.toString(16));  // ff
console.log(num.toString(2));  // 11111111
console.log(num.toString());  // "255", default base is 10 (decimal)
```

The maximum `base` is 36, where the entire latin alphabet is used to represent a number.

To use this method directly with a number (instead of a variable storing it), one needs to use a double dot or parentheses - JS syntax implies a decimal part after a single dot.

```js
123456..toString(36);
(123456).toString(36)
```

### Rounding

There are several built-in functions for rounding:

```js
// rounds down
Math.floor(3.1)  // 3
Math.floor(-3.1)  // -4

// rounds up
Math.ceil(3.1)  // 4
Math.ceil(-3.1)  // -3

// rounds to the nearest integer
Math.round(3.6)  // 4
Math.round(3.5)  // 4
Math.round(3.4)  // 3

// removes everything after the decimal point without rounding
Math.trunc(1.9)  // 1
Math.trunc(-1.9)  // -1
```

### Imprecise calculations (and working around them with `toFixed`)

If a number is really big, it might end up overflowing the 64-bit storage (52 bits are used to store the digits, 11 bits store the position of the decimal point, and 1 bit stores the sign) and become `Infinity`:

```js
console.log(1e5000);  // Infinity
```

However, a more common issue to deal with is **loss of precision**. Consider this example:

```js
console.log(0.1 + 0.2 == 0.3);  // false
```

What's happened here? Note that if you add `0.1` and `0.2`, the result is actually not `0.3`, but rather `0.30000000000000004`. Why?

Well, the short answer is, because the number is stored in memory in its binary form. In the decimal numeric system, fractions like `0.1` or `0.2` are easily represented, but in binary they're endless fractions (similar to how `0.3` is an endless fraction - `0.3333(3)` - in decimal). For the same reason that division by powers of 10 is guaranteed to work well in the decimal system, but division by 3 is not, in the binary system division by powers of 2 is guaranteed to work, but division by 10 is not (and so there is no way to store exactly `0.1` or `0.2`). IEEE-754 solves this by rounding to the nearest possible number, at the cost of a tiny precision loss.

The most reliable way to work around this issue is usually use the built-in Number method `toFixed(n)`, which rounds the number to `n` digits after the dot and returns a string representation of the result:

```js
12.34.toFixed(1)  // "12.3"
12.36.toFixed(1)  // "12.4, the rounding goes to the nearest value (somewhat similar to `Math.round`)
```


### Dealing with `NaN` and `Infinity`

Both `Infinity` and `NaN` belong to the `number` type, but they're not exactly "normal" numbers. Special built-in functions exist to deal with them:

* `isNaN(value)` converts the argument to a number and then returns `true` if the result is `NaN`
* `isFinite(value)` converts the argument to a number and returns `true` if the result is a regular number (not `NaN`, `Infinity` or `-Infinity`)

```js
console.log(isNaN(NaN));  // true
console.log(isNaN(str));  // true
console.log(isNaN(5));  // false

console.log(isFinite('15'));  // true
console.log(isFinite(str));  // false (because it's NaN)
console.log(isFinite(Infinity));  // false
```

Note that `isNaN` is necessary because `NaN` is unique in that it does not equal anything, not even itself:

```js
NaN === NaN  // false
```

### Extracting numeric values out of strings

Numeric conversion (using `+` or `Number`) is strict and will fail with a value that's not exactly a number, e.g.:

```js
console.log(+"100px")  // NaN
```

In many real life cases, such as the above mentioned 100px and other CSS values, as well as currencies (e.g. "19$"), a way to "extract" the numeric value out of string is very useful.

That's what the build-in functions `parseInt` and `parseFloat` are for. They both read a number from a string until they encounter an error, upon which the extracted number is returned:

```js
console.log(parseInt("100px"));  // 100
console.log(parseFloat("12.5em"));  // 12.5
```

Note that the first non-digit symbol will stop the process:
```js
console.log(parseInt("a123"));  // NaN
```

### Other math functions

```js
Math.random()  // returns a random number from 0 to 1 (excluding 1)
Math.max(a, b, c)  // returns the greatest from an arbitrary number of arguments
Math.min(a, b, c)  // returns the smallest from an arbitrary number of arguments
Math.pow(n, power)  // returns n raised to the provided power
```

## Exercises

### Sum of numbers from prompts

Prompt the visitor for two numbers and then show their sum.

```js
let sumNumbersFromPrompts = () => {
    let num1 = +prompt('Enter first number: ', '');
    let num2 = +prompt('Enter second number: ', '');
    return num1 + num2;
}
```

### Prompt for a valid number

Create a function `readNumber`, which prompts for a number until the visitor enters a valid numeric value, and then returns that value (as a number). The visitor can also stop the process by entering an empty line or pressing "CANCEL" (in which case the function should return null).

```js
let readNumber = () => {
    let input;
    do {
        input = prompt('Enter a number: ', '');
    } while(isNaN(+input)) {
        if (input === '' || input === null) return null;
    }
    return +input;
}
```

### Random number from a given range

The built-in function `Math.random()` creates a random value from 0 to 1 (not including 1). Write a function `random(min, max)` to generate a random floating-point number from min to max (not including max). Here's how it should work:

```js
console.log(random(1, 5)); // 1.2345623452
console.log(random(1, 5)); // 3.7894332423
console.log(random(1, 5)); // 4.3435234525
```

```js
let random = (min, max) => {
    return min + Math.random() * (max - min);
}
```

### Random integer from a given range

Create a function `randomInteger(min, max)` that generates a random integer from min to max (inclusive). Any number from the interval must have the same probability to appear.

```js
let randomInteger = (min, max) => {
    let random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
}
```
