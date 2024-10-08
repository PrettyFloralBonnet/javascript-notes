## Recursion and stack

Recursion occurs when a function calls itself:

```js
function pow(x, n) {
    if (n == 1) {
        return x;
    } else {
        return x * pow(x, n - 1);
    }
}

console.log(pow(2, 3));  // 8
```

If `n == 1`, the conclusion is trivial. It's called the *base of recursion*. Otherwise, `pow(x, n)` is represented as `x * pow(x, n - 1)`. This is a *recursive step*. The task is transformed into a simpler task (in this case, multiplication by x) followed by a simpler call of the same task (the function `pow` with a lower `n`). Each concurrent step simplifies it futher, until eventually `n` reaches 1.

In short, `pow` recursively calls itself until `n == 1`.

Note how the recursive way of solving this problem is entirely different from the iterative way:

```js
function pow(x, n) {
    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

console.log(pow(2, 3));  // 8
```

A recursive solution is usually shorter than an iterative one. If we simplify the one from the example above, it can be represented like this:

```js
function pow(x, n) {
    return (n == 1) ? x : (x * pow(x, n - 1));
}
```

The maximum number of nested calls (including the first one) is called *recursion depth*. In the example above, it is exactly `n`.

The maximum recursion depth in JavaScript depends on the engine implementation, but 10 000 can be safely assumed as safe.

### Execution context and stack

Execution context is where the information about the execution process of a running function is stored. It is an internal data structure that contains details about the execution of a function: where the control flow is at a given moment, what the current variables are, what the value of `this` is, etc. One function call has exactly one execution context associated with it.

When a function makes a nested call, the current function is paused, the execution context associated with it is stored in a special data structure called *execution context stack*, the nested call executes, and funally, the previous execution context is retrieved from the stack, and the outer function is resumed.

Let's take a look at our example again:

```js
function pow(x, n) {
    if (n == 1) {
        return x;
    } else {
        return x * pow(x, n - 1);
    }
}

pow(2, 3);
```

At the beginning of the call, the execution context stores variables: `x = 2` and `n = 3`. The execution flow is at line 1 of the function.

The function starts to execute. The condition `n == 1` is false, so the flow continues into the second conditional branch. The variables are same, but the line changes, so the context is now:

```
Context: { x: 2, n: 3, at line 5 } call: pow(2, 3)
```

To calculate `x * pow(x, n - 1)`, we need to make a subcall of `pow` with new arguments: `pow(2, 2)`. To do a nested call, JavaScript remembers the current execution context on top of the execution context stack. The new context is created for the subcall. When the subcall is finished, the previous context is popped from the stack, and its execution continues.

Here's the context stack when we entered the subcall `pow(2, 2)`:

```
Context: { x: 2, n: 2, at line 1 } call: pow(2, 2)
Context: { x: 2, n: 3, at line 5 } call: pow(2, 3)
```

When we finish the subcall, it's easy to resume the previous context, because it keeps both variables, and the exact place in the code where the previous context stopped.

Then the process repeats: a new subcall is made at line 5, now with arguments `x = 2`, `n = 1`. A new execution context is created, and the previous one is pushed on top of the stack:

```
Context: { x: 2, n: 1, at line 1 } call: pow(2, 1)
Context: { x: 2, n: 2, at line 5 } call: pow(2, 2)
Context: { x: 2, n: 3, at line 5 } call: pow(2, 3)
```

There are two old contexts now, and one currently running for `pow(2, 1)`. During the execution of `pow(2, 1)`, the condition `n == 1` is true, so the first conditional branch is executed. There are no more nested calls, so the function finishes, returning 2.

As the function finishes, its execution context is not needed anymore, so it's removed from memory. The previous one is restored off the top of the stack:

```
Context: { x: 2, n: 2, at line 5 } call: pow(2, 2)
Context: { x: 2, n: 3, at line 5 } call: pow(2, 3)
```

The execution of `pow(2, 2)` is resumed. It has the result of the subcall of `pow(2, 1)`, so it also can finish the evaluation of `x * pow(x, n - 1)` (returning 4).

Then the previous context is restored:
```
Context: { x: 2, n: 3, at line 5 } call: pow(2, 3)
```

When it's finished, the result is `pow(2, 3) = 8`. The recursion depth in this case was: 3. The recursion depth is equal to the max number of contexts in the stack.

**Contexts take memory**. Here, raising a value to the power of `n` actually requires the memory for `n` contexts, for all lower values of `n`.

A loop-based algorithm allows to save memory:

```js
function pow(x, n) {
    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}
```

The iterative solution uses a single context, changing the values of i and result in the process. Its memory requirements are small, fixed, and not dependent on `n`.

Any recursion can be rewritten as a loop, and the loop variant usually can be made more effective. However, sometimes the rewrite is non-trivial, especially when the function uses various recursive subcalls depending on conditions, and merges their results or when the branching is more intricate. The optimization might be unnecessary and/or not worth the trouble, as recursion usually results in shorter code, easier to understand and support.

### Recursive traversals

Recursive traversals are another example of applied recursion.

```js
let company = {
    sales: [
        {
            name: 'John',
            salary: 1000
        },
        {
            name: 'Alice',
            salary: 1600
        }
    ],
    development: {
        sites: [
            {
                name: 'Peter',
                salary: 2000
            },
            {
                name: 'Alex',
                salary: 1800
            }
        ],
        internals: [
            {
                name: 'Jack',
                salary: 1300
            }
        ]
    }
};
```

This company has departments. A department may have an array of staff - e.g. the sales department has 2 employees: John and Alice. A department may be split into subdepartments. Development has two branches: sites and internals Each branch has its own staff. It is also possible that when a subdepartment grows, it divides further into teams, e.g. the sites department may be split into teams for Site A and Site B in the future. They can potentially split even further (not represented in the structure above, just something to keep in mind).

Let's say we want a function to get the sum of all salaries. How can we do that?

An iterative approach is not straightforward at all, because the structure is complex. When more and more nested subloops become necessary to traverse a single object, it becomes quite ugly.

So, let's try recursion. Whenever the function receives a department to get salaries from, there are two possibilities:
1. it's an array of "people" objects, and salaries can be summed up using a loop
2. it's an object of `n` subdepartments, and `n` recursive calls needs to be made to get the sum for each of one, and combine the results.

The first case is the base of recursion. The second is the recursive step.

A complex task is split into subtasks for smaller departments. They may be split further, but sooner or later the split will end up at the base case.

```js
let sumSalaries = (department) => {
    if (Array.isArray(department)) {
        return department.reduce((prev, current) => prev + current.salary, 0);
    } else {
        let sum = 0;
        for (let subdep of Object.values(department)) {
            sum += sumSalaries(subdep);
        }
        return sum;
    }
}
```

This works for any level od subdepartment nesting.

### Recursive structures

A recursive data structure is a structure that replicates itself in parts. One example would be the company structure mentioned above - a company department is either an array of people, or an object of departments.

Another is HTML and XML. In an HTML document, an HTML tag may contain a list of text pieces, HTML comments or *other* HTML tags (that may in turn contain further text pieces, comments or tags).

Yet another example is a **linked list**. A linked list is a data structure useful for when we want to store an ordered collection of objects, like in an array, but we also need fast insertion and deletion (which arrays may not offer if these operations take place near the beginning of the array, i.e. shift/unshift).

Linked list elements are recursively defined as objects with:
* `value` property
* `next` property (which references the next element, or `null` if the element is the last)

```js
let linkedList = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};
```

or:

```js
let linkedList = { value: 1 };
linkedList.next = { value: 2 };
linkedList.next.next = { value: 3 };
linkedList.next.next.next = { value: 4 };
linkedList.next.next.next.next = null;
```

Linked lists can be easily split into multiple parts...

```js
let secondLinkedList = linkedList.next.next;
linkedList.next.next = null;
```

...and joined back later:

```js
linkedList.next.next = secondLinkedList;
```

Elements can be easily inserted and removed at any point in the structure. E.g. to prepend a new value, the head of the list needs to be updated:

```js
let linkedList = { value: 1 };
linkedList.next = { value: 2 };
linkedList.next.next = { value: 3 };
linkedList.next.next.next = { value: 4 };

linkedList = { value: "new item", next: linkedList };  // prepend the new value to the list
```

To remove a value from the middle, the `next` property of the previous element needs to be changed:

```js
linkedList.next = linkedList.next.next;
```

Here, `linkedList.next` "jumped over" a value (from `1` to `2`). The value `1` is now excluded from the chain, and as long as it's not stored anywhere else, it will be removed from memory by the garbage collector. Unlike with arrays, no en-masse renumbering ocurrs, and the elements can be rearranged easily.

Linked lists have their drawbacks, of course. The main one is that elements cannot be easily accessed by their indices. In an array, that's easy: arr[n] is a direct reference. To do that in a linked list, we would have to start from the first item and go to next `n` times to get the n-th element.

Linked lists can be enhanced further by adding a `prev` property in addition to `next`, to reference the previous element, and gain the ability to easily move backwards along the list (thus resulting in a so-called **doubly-linked list**). Another property that can be added is `tail`, referencing the last element of the list (it needs to be updated when adding/removing elements from the end).

## Exercises

### Sum to `n`

Write a function `sumTo(n)` that calculates the sum of numbers `1 + 2 + ... + n`. Use a for loop first, then recursion, then the arithmetic progression formula (3 separate solutions).

Solution:

```js
// for loop

function sumTo(n) {
    let result = n
    for (n; n > 0; n--) {
        result += n - 1;
    }
    return result;
}

// recursion

function sumTo(n) {
    if (n == 1) return 1;
    return n + sumTo(n - 1);
}

// arithmetic progression

function sumTo(n) {
    return n * (n + 1) / 2
}
```

### Factorial

Write a function `factorial(n)` that calculates `n!` using recursive calls Hint: `n!` can be written down as `n * (n - 1)!`.

Solution:

```js
let factorial = (n) => {
    return (n != 1) ? n * factorial(n - 1) : 1;
}
```

### Fibonacci numbers

Write a function `fib(n)` that returns the n-th Fibonacci number. The function should be fast (e.g. the call `fib(77)` should take a fraction of a second).

Solution:

```js
// recursive solution (slow!)

let fib = (n) => {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// the correct solution (faster, no duplicate computation):

let fib = (n) => {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

### Linked list

Given a linked list:

```js
let linkedList = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};
```

...write a function `printList(list)` that outputs the list items, one by one. Provide two solutions: using a loop, and using recursion.

Solution:

```js
// loop:

let printList = (list) => {
    let tempList = list;

    while (tempList) {
        console.log(tempList.value);
        tempList = tempList.next;
    }
}

// recursion:

let printList = (list) => {
    console.log(list.value);

    if (list.next) {
        printList(list.next);
    }
}
```

The loop is more cost-effective (no nested function calls). Recursion is shorter and a bit more readable.

### Reversed linked list

Write a function `printListReversed(list)` that outputs the list items in the reverse order. Once again, provide a loop solution and a recursive solution.

Solution:

```js
// loop:

let printListReversed = (list) => {
    let tempList = list;
    let arr = [];

    while (tempList) {
        arr.push(tempList.value);
        tempList = tempList.next;
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        console.log(arr[i]);
    }
}

// recursion:

let printListReversed = (list) => {
    if (list.next) {
        printListReversed(list.next);
    }

    console.log(list.value);
}
```
