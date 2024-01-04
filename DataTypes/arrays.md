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

## Adding and removing items

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
// index is where the deletion and/or insertion operations will start
// deleteCount is the number of elements to be removed
// element1, ..., elementN are the elements to be inserted in their place
```

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

// forEach

// runs a function for every item of the array
// returns undefined

let lotrCharacters = ["Bilbo", "Gandalf", "Nazgul"];
lotrCharacters.forEach((item, index, array) => {
    console.log(`${item} at index ${index} in ${array}`);
});

// "Bilbo at index 0 in lotrCharacters
// "Gandalf at index 1 in lotrCharacters
// "Nazgul at index 2 in lotrCharacters

// Searching an array

// indexOf, lastIndexof, includes

arr.indexOf(item, i)  // looks for item starting from i (optional), returns index of the item if found, otherwise -1.
arr.lastIndexOf(item, i)  // same as above, except from right to left
arr.includes(item, i)   // looks for item starting from i, returns true if found

let arr = [1, 0, 1, 5];
console.log(arr.indexOf("hello"));  // -1
console.log(arr.indexOf(0));  // 1
console.log(arr.indexOf(1));  // 0
console.log(arr.lastIndexOf(1));  // 2
console.log(arr.includes(5));  // true

// find, findIndex

let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
];
  
let user = users.find(item => item.id == 1);
console.log(user.name);  // John

let johnsIndex = users.findIndex(item => item.name == "John");
console.log(johnsIndex);  // 0

// if item is not found, find returns undefined, and findIndex returns -1

// filter

let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
];
  
let someUsers = users.filter(item => item.id < 3);  // filter returns array of matching results
  
console.log(someUsers);  // [{id: 1, name: "John"},{id: 2, name: "Pete"}]

// Transforming an array

// map

// map calls a function for each element of the array and returns the array of results

let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
console.log(lengths);  // 5,7,6

// sort(fn)

// sort() sorts the array in place
// it also returns the sorted array, but that is usually ignored (as it's unnecessary)

// by default, the items are sorted as strings:

let arr = [1, 2, 15];
arr.sort();
console.log(arr);  // 1, 15, 2

// to use a non-default sorting order, a function needs to be passed as an argument to sort()
// a comparison function is only required to return a positive number to say “greater”,
// and a negative number to say “lesser”

// reverse

let arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr);  // 5,4,3,2,1

// reverse() reverses the order of elements in the array, and returns the reversed array

// split, join

// split() splits a string into an array by the given delimiter

let names = 'Bilbo, Gandalf, Nazgul';
let arr = names.split(', ');

for (let name of arr) {
    console.log(`A message to ${name}.` ); // "A message to Bilbo" (etc.)
}

// split also accepts an optional second argument, a limit to the length of the array (rarely used)

// join() does the reverse - it creates a string from the elements of the array, joined by the delimiter:

let arr = ['Bilbo', 'Gandalf', 'Nazgul'];
let str = arr.join(', ');

console.log(str); // Bilbo, Gandalf, Nazgul

// reduce

// reduce is used to calculate a single value based on the array

let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((acc, item) => acc + item, 0);  // can accept two more arguments to represent index and array
console.log(result);  // 15

// as function is applied, the result of the previous function call is passed to the next one as the first argument

// if there’s no initial value, reduce() takes the first element of the array as the initial value
// and starts the iteration from the 2nd element
// this can result in an error if array is empty, so it's advisable to always provide the initial value

// the method reduceRight() does the same, but goes from right to left

// Array.isArray()

// Arrays are object, so typeof doesn't help to identify them. This is what isArray() is for:

console.log(Array.isArray({}));  // false
console.log(Array.isArray([]));  // true

// *this* in array methods

// Almost all array methods that call functions – find, filter, map (with a notable exception of sort),
// accept an optional additional parameter: thisArg.
// The value of thisArg parameter becomes *this* for the function:

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

// If we used users.filter(army.canJoin), then army.canJoin would be called as a standalone function
// with this=undefined, leading to an instant error.
// The call to users.filter(army.canJoin, army) can be replaced with users.filter(user => army.canJoin(user)).

// other methods

// some(fn), every(fn)

// These check the array by calling a function on each element of the array (similar to map).
// If any/all results are true, they return true.

// fill(value, start, end)

// fills the array with repeating value from index start to end

// copyWithin(target, start, end)

// copies elements of the array from  start to end into itself at position target, overwriting existing elements.

// TASK: Write a function camelize(str) that changes dash-separated words like "my-short-string" into camel-cased "myShortString".
// -->

let camelize = (str) => {
    let chunks = str.split('-');

    let camelCasedChunks = chunks.map((chunk, i) => {
        if (i == 0) return chunk;
        else return chunk[0].toUpperCase() + chunk.slice(1);
    });

    return camelCasedChunks.join('');
};

// TASK: Write a function filterRange(arr, a, b) that looks for elements between a and b in arr and returns them in a new array.
// The function should not modify arr.
// -->

let filterRange = (arr, a, b) => {
    if (b > arr.length) return arr.slice(a);
    else return arr.slice(a, b);
};

// Uhh, it turns out it was about values, not indices:
// -->

let filterRange = (arr, a, b) => {
    let filtered = arr.filter((n) => {
        if (n >= a && n <= b) return n;
    });
    return filtered;
};

// TASK: Write a function filterRangeInPlace(arr, a, b) that gets an array arr and removes all values from it except ones between a and b.
// The test is: a ≤ arr[i] ≤ b.
// The function should only modify the array. It should not return anything.
// -->

let filterRangeInPlace = (arr, a, b) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < a || arr[i] > b) {
            arr.splice(i, 1);
            i--;
        }
    }
}

// TASK: Sort the array in decreasing order:
// -->

let arr = [5, 2, 1, -10, 8];

arr.sort((a, b) => b - a);
console.log(arr);

// TASK: Create a function copySorted(arr) that returns a sorted copy of arr, but keeps arr unmodified.
// -->

let copySorted = (arr) => {
    let arrCopy = arr.slice();
    return arrCopy.sort((a, b) => a - b);
}

// TASK: Create an constructor function Calculator that creates extensible calculator objects.
// First, implement the method calculate(str) that takes a string in the format “NUMBER operator NUMBER”
// (e.g.: "1 + 2", delimited by spaces) and returns the result. It should understand addition and subtraction.
// Then add the method addMethod(name, func) that "teaches" the calculator a new operation.
// It should accept the operator (name) and a two-parameter function that implements the operator.
// For instance, if we add multiplication *, division / and power **, it should look like this:

let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
console.log( result ); // 8

// -->

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

// TASK: Given an array of user objects, each with a property name, write code that creates an array of names.
// -->

let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
];

let names = users.map((user) => user.name);

// TASK: Given an array of user objects, each with name, surname and id properties,
// write code that creates an array of objects with id and fullName, where fullName is generated from name and surname.
// -->

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

// or (tutorial solution - note the additional '()' wrapping the object returned by the callback function):

let fullNameUsers = users.map((user) => ({
    fullName: `${user.name} ${user.surname}`,
    id: user.id
}));

// TASK: Write the function sortByAge(users) that gets an array of objects with the age property and sorts them by age.
// -->

let users = [
    { name: "John", age: 25 },
    { name: "Pete", age: 30 },
    { name: "Mary", age: 28 }
];

let sortByAge = (users) => {
    users.sort((a, b) => a.age - b.age)
}

// Write the function shuffle(array) that randomly reorders elements of the array.
// All possible element orders should have an equal probability.
// -->

// Fisher-Yates shuffle
let shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1))
        let currentElement = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = currentElement;
    }
}

// TASK: Write the function getAverageAge(users) that gets an array of objects
// with property age and returns the average age.
// -->

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

// TASK: Create a function unique(arr) that returns an array with unique items of arr.
// -->

let unique = (arr) => {
    let uniqueArr = [];
    arr.forEach((element) => {
        if (!uniqueArr.includes(element)) {
            uniqueArr.push(element);
        }
    });
    return uniqueArr;
}

// TASK: Given an array of user objects with properties id, name, age,
// create a function groupById(arr) that creates an object with user.id properties as keys and entire array items as values.
// Assume id is unique. Use reduce() in the solution.
// -->

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
