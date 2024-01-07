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

Since arrays are objects, the `typeof` operator doesn't actually help to identify them. However, a built-in array method `Array.isArray()` does:

```js
console.log(Array.isArray({}));  // false
console.log(Array.isArray([]));  // true
```

## Performance

The methods `pop` and `push` are fast, whereas `shift` and `unshift` are slow. This is due to the fact that when the array is shifted (or unshifted), the following operations need to be performed:
1. An element must be added/removed from the beginning
2. All the remaining elements' indices must be updated
3. The `length` property must be updated

This compounds with the length of the array (the more elements it has, the more time and in-memory operations it takes to move them).

## Iteration

### With a "classic" `for` loop

Here's what iterating over an array using a `for` loop looks like:

```js
const ARR = ["Apple", "Orange", "Pear"];

for (let i = 0; i < ARR.length; i++) {
    console.log(ARR[i]);
}
```

### Using a `for...of` statement

The `for...of` statement executes a loop that operates on a sequence of values sourced from any iterable object, such as `Array`, `String`, `Map`, `Set`, `NodeList` (and any other DOM collection) etc.:

```js
const ARR = ["Apple", "Orange", "Pear"];

for (const element of ARR) {
    console.log(element);
}
```

### Using `forEach`

The method `arr.forEach(callbackFn [, thisArg])` runs the `callbackFn` function for every item of the array.

The `callbackFn` takes three arguments: the element, the index, and the array itself:

```js
let names = ["John", "Jane", "Bob"];
names.forEach((item, index, array) => {
    console.log(`${item} at index ${index} in ${array}`);
});

// "John at index 0 in names"
// "Jane at index 1 in names"
// "Bob at index 2 in names"
```

The optional `thisArg` argument is the value to be used as `this` when the `callbackFn` is executed. For more information, see a section [below](/DataTypes/arrays.md#array-methods-and-this).

### Using `for...in` (well, you could, but don't)

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

## Adding and removing items to an array

### Pushing, popping, shifting and unshifting

These were already mentioned in the [Queue and stack](/DataTypes/arrays.md#queue-and-stack) section above. Once again, the methods are:

```js
arr.push(...items)     // adds items to the end
arr.pop()              // extracts an item from the end
arr.shift()            // extracts an item from the beginning
arr.unshift(...items)  // adds items to the beginning
```

### Splicing

The `arr.splice()` method is kind of a swiss army knife for arrays, as it can remove, insert, and replace elements.

```js
arr.splice(index [, deleteCount, element1, ..., elementN])
```
The deletion and/or insertion operations will start at `index`, `deleteCount` is the number of elements to be removed, and `element1, ..., elementN` are the elements to be inserted.

For example:

```js
let arr = ["I", "am", "reading", "right", "now"];
let removed = arr.splice(0, 3, "Let's", "dance");
console.log(arr);  // ["Let's", "dance", "right", "now"]
```

Using the same example, note that `arr.slice()` returns an array of removed objects:

```js
console.log(removed);  // ["I", "am", "reading"]
```

If `deleteCount` is set to `0` and elements to be inserted are provided, only the insertion will take place:

```js
removed.splice(3, 0, "a", "reference", "guide")
console.log(removed)  // ["I", "am", "reading", "a", "reference", "guide"]
```

Similarly, if no elements are provided, only deletion will take place:

```js
removed.splice(1, 5);
console.log(removed)  // ["I"]
```

### Slicing

The method `arr.slice([start], [end])` copies all items from `start` to `end` (excluding `end`), and creates a new array from them. Both arguments can be negative (which will result in elements being selected from the end).

It doesn't modify the original array.

```js
let arr = [1,2,3,4,5];
arr.slice(0,2)  // [1,2]
```

When called without arguments, it simply copies the original array.

### Glueing elements (and entire arrays) together

The method `arr.concat(arg1, arg2, ...)` creates a new array that includes values passed as arguments. If those arguments are themselves arrays (or other spreadable objects, see more below), those values are inserted into the new array instead:

```js
let arr = [1, 2];
console.log(arr.concat([3, 4]));  // 1,2,3,4
console.log(arr.concat([3, 4], [5, 6]));  // 1,2,3,4,5,6
console.log(arr.concat([3, 4], 5, 6));  // 1,2,3,4,5,6
```

If an array-like object has a special property `Symbol.isConcatSpreadable`, it's treated as an array by `concat()`.

## Searching an array

All methods described below involve searching through an array in some way.

### `indexOf` and `lastIndexOf`

The methods `arr.indexOf(item, i)` and `arr.lastIndexOf(item, i)` both look for `item` starting from `i` (which is optional) and return the index of the item, if it's found (or `-1` otherwise).

The only difference between them is that `arr.lastIndexOf()` goes from right to left.

```js
let arr = [1, 0, 1, 5];
console.log(arr.indexOf("hello"));  // -1
console.log(arr.indexOf(0));  // 1
console.log(arr.indexOf(1));  // 0
console.log(arr.lastIndexOf(1));  // 2
```

### `includes`

The `arr.includes(item, i)` method looks for `item` starting from `i` and returns `true` if it's found.

```js
let arr = [1, 0, 1, 5];
console.log(arr.includes(5));  // true
console.log(arr.includes(6));  // false
```

Fun fact: `arr.includes()` will correctly recognize `NaN`, whereas `arr.indexOf()` will not:

```js
const arr = [NaN];
console.log(arr.indexOf(NaN));  // -1 (incorrect)
console.log(arr.includes(NaN));  // true
```

### `find`

The method `arr.find(callbackFn)` returns the first element of the provided array that satisfies the provided testing function `callbackFn`. If no element does, `undefined` is returned.

This is very useful for searching through arrays of objects (which are very common, e.g. in JSON structures).

```js
let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
];
  
let user = users.find(item => item.id == 1);
console.log(user.name);  // John
```

On top of the `item` argument, the `callbackFn` also accepts two more: `index` and `array` (similar to the callback function in `forEach`).

### `findIndex` and `findLastIndex`

These are very similar to `find`, but they return the index of the element that satisfies the testing function instead of the element itself. If the element is not found, `-1` is returned.

Similar to `arr.lastIndexOf()`, `arr.findLastIndex()` searches from right to left.

```js
let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"},
    {id: 4, name: "John"},

];

let johnsIndex = users.findIndex(item => item.name == "John");
console.log(johnsIndex);  // 0

let johnsLastIndex = users.findLastIndex(item => item.name == "John");
console.log(johnsLastIndex);  // 3
```

### `filter`

The method `arr.filter(callbackFn)` creates a shallow copy of a portion of the provided array, filtered down to just the elements which satisfy the provided testing function `callbackFn`. If no element does, an empty array is returned.

```js
let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
];
  
let filteredUsers = users.filter(item => item.id < 3);
console.log(filteredUsers)  // [{id: 1, name: "John"}, {id: 2, name: "Pete"}]
```

## Transforming an array

These methods transform and reorder arrays.

### `map`

The method `arr.map()` calls a function for each element of the array and returns a new array with the results.
```js
let names = ["John", "Jane", "Bob"];
let nameLengths = names.map(name => name.length);
console.log(nameLengths);  // [ 5, 7, 6 ]
```

### `sort`

The method `arr.sort()` sorts the array in place (modifies the original array). Technically it also returns the sorted array, but in practice that is usually ignored.

By default, the items are sorted lexicographically (they are converted to strings for comparison):

```js
let numbers = [1, 2, 15];
numbers.sort();

console.log(numbers);  // [ 1, 15, 2 ]
```

For non-default sorting to be used, we need to pass a comparator function to `sort()` that will define the sorting order:

```js
arr.sort(function(a, b) {
    return a - b;
});
```

The comparator function takes two parameters, typically referred to as `a` and `b`. The function should return a negative, zero, or positive value, indicating (respectively) whether `a` should be placed before, at the same position as, or after `b` in the sorted array.

The comparator function will walk the array, compare its elements, and reorder them. It will try to make as few comparisons as possible.

```js
let numbers = [4, 2, 5, 1, 3];

numbers.sort(function(a, b) {
    console.log(`now comparing: ${a} and ${b}`)
  return a - b;
});

// now comparing: 4 and 2
// now comparing: 4 and 5
// now comparing: 5 and 1
// now comparing: 4 and 1
// now comparing: 2 and 1
// now comparing: 5 and 3
// now comparing: 4 and 3
// now comparing: 2 and 3

console.log(numbers);  // [ 1, 2, 3, 4, 5 ]
```

In order to ensure proper sort behaviour, the comparator function is expected to have certain properties listed [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description). The default lexicographical comparator satisfies all of these constraints, which ensures that the sorting is stable. For more information on sort stability, go to [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sort_stability) and [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sorting_with_non-well-formed_comparator).

Quick hint: for sorting strings with non-ASCII characters (e.g. strings with accented characters like e, é, è, a, ä, etc.), strings the string method `localeCompare()`:

```js
const items = ["réservé", "premier", "communiqué", "café", "adieu", "éclair"];
items.sort((a, b) => a.localeCompare(b));

console.log(items);  // ['adieu', 'café', 'communiqué', 'éclair', 'premier', 'réservé']
```

### `reverse`

The method `arr.reverse()` reverses the order of elements in the array.

```js
let arr = [1, 2, 3, 4, 5];
arr.reverse();

console.log(arr);  // 5,4,3,2,1
```

### `join` (and `split`)

The method `arr.join([separator])` takes all elements of the array, and creates a new string from them by concatenating them separated by the provided (optional) `separator`:

```js
let names = ["John", "Jane", "Aerith"];
console.log(names.join(", "));  // "John, Jane, Aerith"
console.log(names.join("-"));  // "John-Jane-Aerith"
```

If the `separator` is not provided, the value `","` is used by default. If the array only has one item, a string of that item is returned without the separator.

Strings have a method `str.split([separator, limit])` that does the opposite: divides the string into an ordered list of substrings based on the provided (and once again, optional) `separator`, and creates a new array of those substrings:

```js
let sequence = "alpha-theta-gamma-delta";
console.log(sequence.split("-"));  // [ "alpha", "theta", "gamma", "delta" ]
```

If `separator` is omitted, an array with the calling string as the single element will be returned.

The second optional argument is `limit`, which is a non-negative integer that specifies the limit on the number of substrings to be included in the array.

### `reduce`/`reduceRight`

The method `arr.reduce(fn [, initial])` is used to calculate a single value based on the contents of the array.

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((acc, item) => acc + item, 0);

console.log(result);  // 15
```

As the function is applied, the result of the previous function call is passed to the next one as the first argument.

If there's no `initial` value, `reduce()` takes the first element of the array as the initial value, and starts the iteration from the second element. This can actually result in an error if the array is empty, so it's advisable to always provide the initial value.

The method `arr.reduceRight()` does the same thing, but goes from right to left.

## Array methods and `this`

Almost all array methods that take callback functions as arguments (such as `find`, `filter`, `map` etc.) accept an additional optional parameter: `thisArg`, the value of which becomes `this` for the function:

```js
let army = {
    minAge: 18,
    maxAge: 27,
    canJoin(user) {
      return user.age >= this.minAge && user.age < this.maxAge;
    }
};
  
let users = [
    {age: 16},
    {age: 20},
    {age: 23},
    {age: 30}
];
  
// find users, for who army.canJoin returns true
let soldiers = users.filter(army.canJoin, army);
  
console.log(soldiers.length);  // 2
console.log(soldiers[0].age);  // 20
console.log(soldiers[1].age);  // 23
```

In the example above, if we used `users.filter(army.canJoin)`, then `army.canJoin` would have been called as a standalone function, with `this` equal to `undefined`, leading to an error.

However, the call to `users.filter(army.canJoin, army)` can also be replaced with `users.filter(user => army.canJoin(user))`, which might be more readable.

## Other methods

There are plenty of other built-in methods for arrays. For more information, see the [array reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

## Exercises (part 2)

### Camelize

Write a function `camelize(str)` that changes dash-separated words like "my-short-string" into camel-cased "myShortString".

```js
let camelize = (str) => {
    let chunks = str.split('-');

    let camelCasedChunks = chunks.map((chunk, i) => {
        if (i == 0) return chunk;
        else return chunk[0].toUpperCase() + chunk.slice(1);
    });

    return camelCasedChunks.join('');
};
```

### Filter range

Write a function `filterRange(arr, a, b)` that looks for elements with values higher or equal to `a` and lower or equal `b` in `arr`, and returns them in a new array. The function should not modify the original array.

```js
let filterRange = (arr, a, b) => {
    let filtered = arr.filter((item) => {
        if (item >= a && item <= b) return item;
    });

    return filtered;
};
```

### Filter range in place

Write a function `filterRangeInPlace(arr, a, b)` that takes `arr` and removes all values from it, except for ones between `a` and `b`.

```js
let filterRangeInPlace = (arr, a, b) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < a || arr[i] > b) {
            arr.splice(i, 1);
            i--;
        }
    }
}
```

### Sort in decreasing order

Sort the array in decreasing order.

```js
let arr = [5, 2, 1, -10, 8];

arr.sort((a, b) => b - a);
console.log(arr);
```

### Calculator

Create an constructor function `Calculator` that creates extensible calculator objects. First, implement the method `calculate(str)` that takes a string in the format "NUMBER operator NUMBER" (e.g.: "1 + 2", delimited by spaces) and returns the result. It should understand addition and subtraction. Then, create the method `addMethod(name, func)` that "teaches" the calculator a new operation. It should accept the operator (`name`) and a two-parameter function that implements the operator. For instance, if we add multiplication `*`, division `/` and power `**`, it should look like this:

```js
let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
console.log( result ); // 8
```

```js
function Calculator() {
    this.supportedOperators = ['+', '-']
    this.supportedMethods = [
        (a, b) => a + b,
        (a, b) => a - b
    ]
    this.calculate = (str) => {
        for (operator of this.supportedOperators) {
            if (str.includes(operator)) {
                let firstOperand = str.slice(0, str.indexOf(operator));
                let secondOperand = str.slice(str.indexOf(operator) + operator.length);
                return this.supportedMethods[this.supportedOperators.findIndex(item => item === operator)](+firstOperand, +secondOperand); 
            }
        }
        console.log('Unsupported operation.');
    }
    this.addMethod = (operator, method) => {
        this.supportedOperators.push(operator);
        this.supportedMethods.push(method);
    }
}
```

### Map to names

Given an array of user objects, each with a property `name`, write code that creates an array of names.

```js
let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
];

let names = users.map((user) => user.name);
```

### Map to objects

Given an array of user objects, each with `name`, `surname` and `id` properties, write code that creates an array of objects with `id` and `fullName`, where `fullName` is generated from `name` and `surname`.

```js
let users = [
    {id: 1, name: "John", surname: "Smith"},
    {id: 2, name: "Pete", surname: "Hines"},
    {id: 3, name: "Mary", surname: "Jane"}
];

let fullNameUsers = users.map((user) => {
    let mappedUsers = {};
    mappedUsers.id = user.id;
    mappedUsers.fullName = `${user.name} ${user.surname}`;
    return mappedUsers;
});
```

### Sort users by age

Write the function `sortByAge(users)` that gets an array of objects with the `age` property and sorts them by age.

```js
let users = [
    { name: "John", age: 25 },
    { name: "Pete", age: 30 },
    { name: "Mary", age: 28 }
];

let sortByAge = (users) => {
    users.sort((a, b) => a.age - b.age)
}
```

### Fisher-Yates shuffle

Write the function `shuffle(array)` that randomly reorders elements of the array. All possible element orders should have an equal probability to occur.

```js
let shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1))
        let currentElement = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = currentElement;
    }
}
```

### Average age

Write the function `getAverageAge(users)` that gets an array of objects with property `age` and returns the average age.

```js
let getAverageAge = (users) => {
    let totalAge = 0;
    users.forEach((user) => {
        totalAge += user.age;
    })
    return totalAge / users.length;
}

// or

let getAverageAge = (users) => {
    return users.reduce((acc, user) => acc + user.age, 0) / users.length;
}
```

### Unique array members

Create a function `unique(arr)` that returns an array with unique items of `arr`.

```js
let unique = (arr) => {
    let uniqueArr = [];
    arr.forEach((element) => {
        if (!uniqueArr.includes(element)) {
            uniqueArr.push(element);
        }
    });
    return uniqueArr;
}
```

### Group users by ID

Given an array of user objects with properties `id`, `name` and `age`, create a function `groupById(arr)` that creates an object with `user.id` properties as keys and entire array items as values. Assume `id` is unique. Use `reduce()` in the solution.

```js
let users = [
    {id: 'john', name: "John Smith", age: 20},
    {id: 'ann', name: "Ann Smith", age: 24},
    {id: 'pete', name: "Pete Peterson", age: 31},
];

let groupById = (arr) => {
    return arr.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {});
};
```
