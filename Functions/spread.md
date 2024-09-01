## Rest parameters and spread syntax

Many built-in JavaScript functions support an arbitrary number of arguments.
Custom functions can be written the same way (with an array passed to them as parameters).

### Rest parameters `...`

A function can be called with any number of arguments, regardless of its definition. The following code:

```js
function sum(a, b) {
    return a + b;
}

console.log(sum(1, 2, 3, 4, 5));
```

...is valid. Of course, only the first two arguments will actually be used.

However, the remaining parameters can be included in the function definition by using `...` followed by the name of an array that contains them. The dots mean something along the lines of "gather the remaining parameters into an array":

```js
function sumAll(...args) {
    let sum = 0;
    for (let arg of args) sum += arg;
    return sum;
}

console.log(sumAll(1));  // 1
console.log(sumAll(1, 2, 3, 4));  // 10
```

This syntax can be used in conjunction with positional arguments - but the `...rest` parameters must be placed at the end.

### The `arguments` variable

There is a special array-like object named `arguments`, which contains all arguments by index. Back when rest parameters did not exist, using that object was the only way to get all arguments of the function. Also, arrow functions do not have it. If we access the variable from an inside of an arrow function, it will be taken from the outer function (similar to `this`).

### Spread syntax

Let's say we have an array `[4, 5, 1]` and we want to pass its elements to the `Math.max()` function to see which one is the highest. Passing the array "as is" won't work, because the function expects individual numeric arguments, not an array. We also don't want to list the elements manually (`(arr[0]`, `arr[1]` etc.), because that's long, and we don't necessarily know how many there are.

In such a case, we can use the spread syntax:

```js
let arr = [4, 5, 1];
console.log(Math.max(...arr))  // 5; turns an array into individual arguments
```

We can pass multiple iterables at once this way:

```js
let arr = [4, 5, 1];
let arr2 = [1, 1, 3, 8];
console.log(Math.max(...arr, ...arr2))  // 8
```

We can also combine the spread syntax with "normal" (non-iterable) values, as well as use it to merge arrays:

```js
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];
```

Spread syntax works with all iterables. Internally, it uses iterators to gather elements, in the same way as the `for...of` loop does.

### Get a new copy of an array/object

Spread syntax can also be used to make a copy of an object, in a similar way to [`Object.assign()`](/Objects/object-references-copying.md#object-cloning-and-merging):

```js
// copying an array

let arr = [1, 2, 3];
let arrCopy = [...arr];

// do these arrays have the same content?
console.log(JSON.stringify(arr) === JSON.stringify(arrCopy));  // true

// are these arrays equal?
console.log(arr === arrCopy);  // false (different reference)

// modifying the initial array does not modify the copy:
arr.push(4);
console.log(arr); // [ 1, 2, 3, 4 ]
console.log(arrCopy); // [ 1, 2, 3 ]

// copying an object

let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj };

console.log(JSON.stringify(obj) === JSON.stringify(objCopy));  // true
console.log(obj === objCopy);  // false

obj.d = 4;
console.log(JSON.stringify(obj));  // {"a":1,"b":2,"c":3,"d":4}
console.log(JSON.stringify(objCopy));  // {"a":1,"b":2,"c":3}
```

This way of copying objects is much shorter (and therefore usually preferable) compared to `let objCopy = Object.assign({}, obj)` or `let arrCopy = Object.assign([], arr)`.
