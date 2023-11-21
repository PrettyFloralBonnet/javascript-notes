## Comparisons

Comparisons (`>`, `<`, `>=`, `<=`, `==`, `!=`) return boolean values (`true` or `false`).

With strings, JS performs comparisons letter by letter, using a dictionary (lexographical) order:

```js
console.log('Z' > 'A');  // true
console.log('Glow' > 'Glee');  // true
console.log('Bee' > 'Be');  // true
```

Lowercase characters have greater unicode indices than uppercase ones.

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
