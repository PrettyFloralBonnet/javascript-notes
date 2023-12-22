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

At their base, arrays are objects. It is possible to add an arbitrary property to an array, or (as mentioned earlier) assign a value to an index larger than the array's length. However, all of this this should be avoided, because once the JS engine detects we are working with an array as if it was a regular objects, internal array-specific optimizations will cease to apply, losing the advantages of using an array in the first place.

## Performance

The methods `pop` and `push` are fast, whereas `shift` and `unshift` are slow. This is due to the fact that when the array is shifted (or unshifted), the following operations need to be performed:
1. An element must be added/removed from the beginning
2. All the remaining elements' indices must be updated
3. The `length` property must be updated

This compounds with the length of the array (the more elements it has, the more time and in-memory operations it takes to move them).
