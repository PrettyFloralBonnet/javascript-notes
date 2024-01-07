// ----- OBJECT.KEYS, VALUES, ENTRIES -----

// keys(), values(), entries() are common methods supported by Array, Map and Set.
// Plain objects also support similar methods:

Object.keys(obj)  // returns an array of keys
Object.values(obj)  // returns an array of values
Object.entries(obj)  // returns an array of [key, value] pairs

// Note the differences from Map: syntax and return value (the latter is an iterable for Map)

// Similar to a for...in loop, these methods ignore properties that use Symbols as keys.
// If getting symbolic keys is what were after, there’s a separate method:

Object.getOwnPropertySymbols(obj)

// ...that returns an array of symbolic keys only.

// There's also

Reflect.ownKeys(obj)

// ...that returns all keys.

// Transforming objects

// Objects lack methods that exist for arrays (e.g. map, filter, reduce etc.).
// If we’d like to apply them, we can perform a chain of operations:
//
//  use Object.entries(obj) to get an array of key/value pairs from obj,
//  use whatever array methods we want on that array,
//  use Object.fromEntries(array) on the resulting array and turn it back into an object
//
// e.g.:

let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

let doublePrices = Object.fromEntries(
    Object.entries(prices).map(([key, value]) => [key, value * 2])
);

console.log(doublePrices.meat);  // 8

// TASK: Given an object with arbitrary number of salaries:

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

// ...write the function sumSalaries(salaries) that returns the sum of all salaries.
// Use Object.values and the for..of loop. If salaries is empty, then the result must be 0.
// -->

let sumSalaries = (salaries) => {
    let sum = 0
    for (let salary of Object.values(salaries)) {
        sum += salary;
    }
    return sum;
};

// TASK: Write a function count(obj) that returns the number of properties in the object:
// Ignore symbolic properties. Try to make the code as short as possible.
// -->

let count = (obj) => {
    return Object.keys(obj).length;
};
