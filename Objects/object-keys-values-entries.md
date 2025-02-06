## Object keys, values and entries

Common methods supported by plain objects, as well as by `Array`, `Map` and `Set` include `keys()`, `values()`, `entries()`

```js
Object.keys(obj)  // returns an array of keys
Object.values(obj)  // returns an array of values
Object.entries(obj)  // returns an array of [key, value] pairs
```
Note that for a plain object, the call syntax is `Object. keys(obj)` (and not `obj.keys()`). Since plain objects are a base for all complex structures in JavaScript, we could have custom objects that overload some of these methods, but we should still be able to call the base method on them.

Additionally, `Object.*` methods return an `Array`. Their implementations return iterables.

Similar to a `for...in` loop, these methods ignore properties that use Symbols as keys. If getting symbolic keys is what were after, a separate method `Object.getOwnPropertySymbols(obj)` is needed. Alternatively `Reflect.ownKeys(obj)` returns all keys (symbolic and non-symbolic).

## Transforming objects

Since plain objects don't implement array methods (e.g. map, filter, reduce etc.), we can apply them performing a chain of operations:

```js
let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

let doublePrices = Object.fromEntries(
    Object.entries(prices).map(([key, value]) => {
        [key, value * 2]
    })
);

console.log(doublePrices.meat);  // 8
```

## Exercises

### Salaries
Given an object with arbitrary number of salaries:
```js
let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};
```

...write the function `sumSalaries(salaries)` that returns the sum of all salaries. Use `Object.values()` and the [`for...of` loop](/DataTypes/arrays.md#iteration). If `salaries` is empty, then the result must be 0.

```js
let sumSalaries = (salaries) => {
    let sum = 0
    for (let salary of Object.values(salaries)) {
        sum += salary;
    }
    return sum;
};
```

### Count properties

Write a function `count(obj)` that returns the number of properties in the object. Ignore symbolic properties. Try to make the code as short as possible.

```js
let count = (obj) => {
    return Object.keys(obj).length;
};
```
