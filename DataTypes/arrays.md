## Arrays

Arrays are used to store **ordered collections of data**.

There are two ways to declare an array:

```js
let arr = new Array();
let arr = [];
```

Since accessing the last element with `arr[-1]` doesn't work in JavaScript, some syntactic sugar for `arr[arr.length - 1]` was added recently in the form of `arr.at[i]`, where negative indexing is supported and behaves similarly to e.g. python.

Unlike strings, existing arrays can have their elements replaced, and have new elements added (by declaring a value at an arbitrary index - including at indices larger than the current size of the array, in which case the indices in between will be initialized with `undefined` as the value). More on that [below](/DataTypes/arrays.md#internals).

## Queue and stack

One of the most common uses of an array-like structure is a **queue**, which is an ordered collection of elements that supports two operations:
* push - which appends an element to the end
* shift - which takes an element from the beginning and advances the queue(the 2nd element becomes the 1st).

Queues operate on a principle called **FIFO** (First In, First Out).

Another common use case is a stack, a data structure similar to the queue, which supports the following operations:
* push - explained above
* pop - which takes an element from the end

Since the element added last is accessible first, this principle is called **LIFO** (Last In, First Out).

The JS implementation of arrays allows them to work **both as a queue and as a stack** In computer science, a data structure like this is referred to as **double-ended queue**, or a **deque**.

The methods implementing the operations described above are named after those respective operations exactly. Aside from `push`, `pop` and `shift`, there's also `unshift`, a method which adds an element to the beginning of the array.

Methods `push` and `unshift` can take multiple arguments (adding multiple elements at once):

```js
let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

console.log(fruits);  // ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
```

## Internals

At their base, arrays are objects. It is possible to add an arbitrary property to an array, or (as mentioned earlier) assign a value to an index larger than the array's length. However, these should be avoided, because once the JS engine detects we are working with an array as if it was a regular object, internal array-specific optimizations will cease to apply, losing the advantages of using an array in the first place.

## Performance

The methods `pop` and `push` are fast, whereas `shift` and `unshift` are slow. This is due to the fact that when the array is shifted (or unshifted), the following operations need to be performed:
1. An element must be added/removed from the beginning
2. All the remaining elements' indices must be updated
3. The `length` property must be updated

This compounds with the length of the array (the more elements it has, the more time and in-memory operations it takes to move them).

## Iteration

Using a `for` loop:

```js
const ARR = ["Apple", "Orange", "Pear"];

for (let i = 0; i < ARR.length; i++) {
    console.log(ARR[i]);
}
```

Using a `for...of` statement, which executes a loop that operates on a sequence of values sourced from any iterable object, such as `Array`, `String`, `Map`, `Set`, `NodeList` (and any other DOM collection) etc.:

```js
const ARR = ["Apple", "Orange", "Pear"];

for (const element of ARR) {
    console.log(element);
}
```

Technically, since arrays are objects, they can be iterated over using `for...in` (a statement that iterates over all enumerable string properties of an object, including inherited ones, but excluding ones keyed by symbols) as well, but that's a bad idea:
* the `for...in` statement iterates over all properties specified above, not just indices, which means we can end up with more than we need
* the `for...in` statement is optimized for objects, not arrays, and is therefore much (10-100 times) slower

## Length

The value of `length` is not precisely the count of values in the array, but rather its greatest numeric index plus one.

The `length` property is updated automatically when the array is modified. It is also directly **writable**. If it is manually decreased, the array is truncated, and the process is irreversible:

```js
let arr = [1, 2, 3, 4, 5];

arr.length = 2;
console.log(arr);  // [1, 2]

arr.length = 5;
console.log(arr[3]); // undefined
```

For this reason, one of the simplest ways to **clear the array** is to set its length to zero.

## Alternate creation method

Another way to create a new array is to use the following syntax:

```js
let arr = new Array("Apple", "Pear", "Banana");
```

This will generally result in the same array as `let arr = ["Apple", "Pear", "Banana"];`. Except when it won't, because there's a catch: if the `new Array()` syntax is used with a single `Number` argument, what will be created is an empty array which length is set to that number:

```js
let arr = new Array(2);
console.log(arr[0]);  // undefined (no elements)
console.log(arr.length);  // 2
```

To avoid surprises, stick to square brackets syntax. It's shorter anyway.

## Matrices (multidimensional arrays)

Elements of arrays can themselves be arrays, which allows for the creation of matrices:

```js
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
  
console.log(matrix[1][1]);  // 5 (the central element)
```

## Array comparisons

Arrays in JS should not be compared with the `==` operator. The reason is, again, because arrays are objects. Two objects are **equal** only if they **reference the same object**. So unless we compare two variables that reference the same array exactly, the arrays we compare using `==` will never be the same, even if they have the same content:

```js
console.log([0, 1, 2] == [0, 1, 2])  // false
```

When you need to compare arrays, do it item by item, or using methods tailored to do so.

## Exercises (part 1)

### Sum of inputs

Write a function `sumInput()` which:
* prompts the user for values and stores them in an array,
* stops asking when the user:
    * enters a non-numeric value or an empty string
    * presses "Cancel"
* calculates and returns the sum of array items

Treat `0` as a valid number.

```js
let sumInput = () => {
    let inputs = [];
    let sum = 0;
    while (true) {
        input = prompt("Enter a number: ", 0)
        if (input === "" || input === null || isNaN(input)) break;
        inputs.push(+input);
    }
    
    for (n of inputs) {
        sum += n;
    }

    return sum;
}
```

### Maximum subarray

Given an array of numbers (e.g. arr = [1, -2, 3, 4, -9, 6]), find its contiguous subarray with the maximum sum of items. Write a function `getMaxSubSum(arr)` that will return that sum, e.g.:

```js
getMaxSubSum([-1, 2, 3, -9])       // 5 (from [2, 3])
getMaxSubSum([2, -1, 2, 3, -9])    // 6 (from [2, -1, 2, 3])
getMaxSubSum([-1, 2, 3, -9, 11])   // 11 (from [11])
getMaxSubSum([-2, -1, 1, 2])       // 3 (from [1, 2])
getMaxSubSum([100, -9, 2, -3, 5])  // 100 (from [100])
getMaxSubSum([1, 2, 3])            // 6 (take all)
```

If all items are negative, take none (leave the subarray empty), so that the sum is `0`:

```js
getMaxSubSum([-1, -2, -3])  // 0
```

If you can, try to think of a fast solution: `O(n2)` or even `O(n)`.

See the article on the [maximum subarray problem](https://en.wikipedia.org/wiki/Maximum_subarray_problem) for more information.

```js
let getMaxSubSum = (arr) => {
    let maxSum = 0;
    let partialSum = 0;

    for (let item of arr) {
        partialSum += item;
        maxSum = Math.max(maxSum, partialSum);
        if (partialSum < 0) partialSum = 0;
    }

    return maxSum;
}
```

## Converting an array to a string

Arrays have their own implementation of the `toString` method, which returns a string of array elements separated by commas:

```js
let arr = [1, 2, 3];
console.log(String(arr));  // "1,2,3"
```

An empty array becomes an empty string.
