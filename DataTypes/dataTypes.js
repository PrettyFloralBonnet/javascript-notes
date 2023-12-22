// ----- ARRAY METHODS -----

// Add/remove items (as described earlier)

arr.push(...items)  // adds items to the end
arr.pop()  // extracts an item from the end
arr.shift()  // extracts an item from the beginning,
arr.unshift(...items)  // adds items to the beginning

// splice

arr.splice(index, deleteCount, elements)  // starts from index, removes deleteCount elements, inserts elements

let arr = ["I", "study", "JavaScript", "right", "now"];
let removed = arr.splice(0, 3, "Let's", "dance");
console.log(arr);  // ["Let's", "dance", "right", "now"]
console.log(removed);  // ["I", "study", "JavaScript"] (splice returns an array of removed objects)

// slice

let arr = [1,2,3,4,5];
arr.slice(0,2)  // [1,2] (returns subarrays, doesn't modify the original array)

// concat

let arr = [1, 2];
console.log(arr.concat([3, 4]));  // 1,2,3,4
console.log(arr.concat([3, 4], [5, 6]));  // 1,2,3,4,5,6
console.log(arr.concat([3, 4], 5, 6));  // 1,2,3,4,5,6

// if the argument is an array, concat adds the elements
// for other data types, it adds the entire object,
// UNLESS said object has a property Symbol.isConcatSpreadable: true,
// in which case concat treats it as if it was an array

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

// ----- ITERABLES -----

// An iterable is a generalization of arrays. It's what makes an object usable with a for..of loop.

// A rule of thumb is any object representing a collection (arrays, strings, lists, sets etc.) is an iterable.

let range = {
    from: 1,
    to: 5
}

// To make this range iterable, we need to add a special method called Symbol.iterator.
//
//  1. When the for..of loop starts, it calls that method once (or errors out if the method is not found).
//     The method must return an iterator (an object with the method *next*).
//  2. Then, the for..of loop continues to work the iterator only.
//  3. When the loop goes to the next value, it calls next() on the iterator.
//  4. The result of next() must have the form: {done: Boolean, value: any}.
//     The done=true means that the iteration is finished. Otherwise, value is equal to the next value.
//

// Full implementation:

let range = {
    from: 1,
    to: 5
};
  
range[Symbol.iterator] = function() {
    return {
        current: this.from,
        last: this.to,
        next() {
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        }
    };
};
  
for (let num of range) {
    console.log(num);  // 1, 2, 3, 4, 5
}

// iterable vs. array-like

// These are two different concepts:
//
// - Iterables are objects that implement the Symbol.iterator method
// - Array-likes are objects that have indices and length
//
// Strings are an example of both.
// However, the range object implemented above is not an array-like (since it has neither length or indices)
// Here's an example of an object that's an array-like, but not an iterable:

let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};

// Array.from

// Universal method for constructing arrays out of iterables and array-likes:

let arrFromArrayLike = Array.from(arrayLike);
let arrFromRange = Array.from(range);

// Array.from also accepts two optional arguments: a mapping function and thisArg.

// ----- MAP AND SET -----

// Map

// A map is a keyed collection of items, except the keys can be of any type (including object type).
// Using objects as keys is in fact one of most notable and important Map features.
// Map also preserves insertion order.

// Map methods and properties:

new Map()  // creates the map
map.set(key, value)  // stores the value by key
map.get(key)  // returns the value by key (or undefined if the key doesn’t exist)
map.has(key)  // returns true if the key exists
map.delete(key)  // removes the value by the key
map.clear() // removes all values from the map
map.size  // returns the current element count

// Every map.set() call returns the map itself, so we can chain calls:

map.set('1', 'str1')
    .set(1, 'num1')
    .set(true, 'bool1');

// iteration over Map

// There are 3 methods dor looping over a map:

map.keys()  // returns an iterable of the keys
map.values()  // returns an iterable of the values
map.entries()  // returns an iterable of the entries [key, value] (it’s actually used in for..of by default)

let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion', 50]
]);
  
// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
    console.log(vegetable);  // cucumber, tomatoes, onion
}
  
// iterate over values (amounts)
for (let amount of recipeMap.values()) {
    console.log(amount); // 500, 350, 50
}
  
// iterate over [key, value] entries
for (let entry of recipeMap) {  // same as of recipeMap.entries()
    console.log(entry);  // cucumber, 500 (etc.)
}

// Unlike a regular object, a map preservers the insertion order.
// Map also has a built-on forEach method:

// runs the function for each (key, value) pair
recipeMap.forEach( (value, key, map) => {
    console.log(`${key}: ${value}`);
});

// Object.entries: Map from Object

// When a Map is created, we can pass an array (or another iterable) with key-value pairs for initialization:

let map = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
]);

// If we have a plain object we’d like to create a Map from, we can use built-in method Object.entries(obj)
// that returns an array of key-value pairs:

let obj = {
    name: "John",
    age: 30
};

let map = new Map(Object.entries(obj));

console.log(map.get('name'));  // John

// In the example above, Object.entries returns an array of key-value pairs:
// [["name","John"], ["age", 30]] (which is what Map needs).

// Object.fromEntries: Object from Map

// Object.fromEntries method that does the reverse.
// Given an array of [key, value] pairs, it creates an object from them:

let prices = Object.fromEntries([
    ['banana', 1],
    ['orange', 2],
    ['meat', 4]
]);  // prices == { banana: 1, orange: 2, meat: 4 }
  
console.log(prices.orange);  // 2

// We can also use Object.fromEntries to get an plain object from Map (e.g.
// when we store the data in a map, but we need to pass it to third party code that expects a plain object):

let map = new Map([
    ['banana', 1],
    ['orange', 2],
    ['meat', 4]
]);

let obj = Object.fromEntries(map.entries());  // obj == { banana: 1, orange: 2, meat: 4 }
console.log(obj.orange);  // 2

// We could actually make that line shorter (by omitting the .entries() part):

let obj = Object.fromEntries(map);

// A standard iteration for map returns same key-value pairs as map.entries(),
// so we get a plain object with same key-values as the map.

// Set

// A set is a collection of unique values (each value may occur only once).

// Main methods:

new Set(iterable)  // creates the set; if an iterable is provided (usually an array), it also copies its values into the set
set.add(value)  // adds a value (returns the set)
set.delete(value)  // removes a value, returns true if the value existed at the moment of the call (false otherwise)
set.has(value)  // returns true if the value exists in the set (false otherwise)
set.clear()  // removes all values from the set
set.size  // returns the elements count

let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

console.log(set.size);  // 3

for (let user of set) {
    console.log(user.name);  // John Pete Mary
}

// iteration over set

// We can loop over a set with for..of loop or using forEach:

let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) console.log(value);

set.forEach((value, valueAgain, set) => {  // for compatibility with Map (where the callback has three arguments)
    console.log(value);
});

// The same methods Map has for iterators are also supported:

set.keys(), set.values()  // returns an iterable of set values (both work the same with sets, for compatibility with Map)
set.entries()  // returns an iterable object with entries [value, value], also for compatibility with Map

// TASK: Create a function unique(arr) that returns an array with unique items of arr. Use Set().

let chantLyrics = [
    "Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare",
    ":-O"
];

let unique = (arr) => {
    return new Set(arr);
};

// TASK: Write a function removeAnagrams(arr) that returns an array cleared from anagrams, e.g.:

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log(removeAnagrams(arr));  // "nap,teachers,ear" or "PAN,cheaters,era"

// Only one word should remain from each anagram group (no matter which one).
// -->

let removeAnagrams = (arr) => {
    let anagramsMap = new Map();

    for (let element of arr) {
        let sorted = Array.from(element.toLowerCase()).sort().join('');
        anagramsMap.set(sorted, element);
    }

    return Array.from(anagramsMap.values());
};

// The goal is to assign an array of map.keys() to a variable
// and then apply array-specific methods to it (e.g. push())
// But the following code doesn’t work:

let map = new Map();
map.set("name", "John");

let keys = map.keys();
keys.push("more");  // Error: keys.push is not a function

// Why? How can we fix the code to make keys.push() work?
// -->

keys = Array.from(map.keys());
keys.push("more");

// ----- WEAKMAP AND WEAKSET -----

// Properties of an object (or elements of an array etc.) are considered reachable
// and remain in memory as long as the data structure itself exists in memory.
// E.g. if we put an object into an array, the object will remain unclaimed
// by the garbage collector as long as the array itself is not claimed by it
// -- even if there are no references to it outside of that array.

// Naturally, Map is not an exception:

let john = {name: "John"};

let map = new Map();
map.set(john, "...");

john = null;  // overwrite the reference

// john is stored inside the map, we can get it by using map.keys()

// But WeakMap is very different in this aspect -- it doesn’t prevent garbage collection of key objects.

// WeakMap

// WeakMap keys must be objects (not primitive values).
// Moreover, if we use an object as a key in WeakMap, and no other references to that object exist,
// the object will be automatically removed from memory (and from the map).

let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null;  // overwrite the reference

// john is removed from memory!

// WeakMap does not support iteration or Map methods such as keys(), values(), entries().
// In fact, it only supports the following methods:

weakMap.get(key)
weakMap.set(key, value)
weakMap.delete(key)
weakMap.has(key)

// Exactly when the cleanup happens is decided by the JavaScript engine.

// Use case: auxiliary data

// One of the main applications of WeakMap is auxiliary data storage.
// Say we're working with an object that 'belongs' to some other part of code
// (maybe a third-party library), and we would like to storesome data associated with it
// that should only exist while the object is 'alive'. WeakMap is exactly what’s needed.
// We put the data into a WeakMap, using the object as the key, and when the object is garbage collected,
// the data will automatically disappear along with it.

// An example of a counting function using Map:

// visitsCount.js
let visitsCountMap = new Map();  // map: user => visits count

// increase the visits count
function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
}

// ...and another part of the code using it:

// main.js
let john = { name: "John" };

countUser(john);  // count the visit

john = null;  // john leaves later

// Now, the john object should be garbage collected, but remains in memory,
// because it’s a key in visitsCountMap.
// As a result, we need to clean visitsCountMap when we remove users.
// Otherwise it will grow in memory indefinitely.
// Such cleaning can become a tedious task in complex architectures.

// And now the same code, but with WeakMap:

// visitsCount.js
let visitsCountMap = new WeakMap();  // weakmap: user => visits count

// increase the visits count
function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
}

// Now we don’t need to clean visitsCountMap. After an object becomes unreachable
// except as a key of WeakMap, it gets removed from memory, along with any information
// hitherto held under that key in WeakMap.

// Use case: caching

// When function results need to be remembered (cached), so that future calls
// to the same object reuse them, we can use Map to store them:

// cache.js
let cache = new Map();

// calculate and remember the result
function process(obj) {
    if (!cache.has(obj)) {
        let result = /* calculations of the result for */ obj;
        cache.set(obj, result);
    }

    return cache.get(obj);
}

// Now we use process() in another file:

// main.js
let obj = {/* say we have an object */};

let result1 = process(obj);  // calculated
let result2 = process(obj);  // remembered result taken from cache

// later, when the object is not needed any more:
obj = null;
console.log(cache.size);  // 1 (Oops, the object is still in cache, taking up memory)

// For multiple calls of process(obj) with the same object,
// it only calculates the result the first time, and then just takes it from cache.
// The downside is that we still need to clean cache when the object is not needed any more...

// ...or we can use WeakMap instead:

// cache.js
let cache = new WeakMap();

// calculate and remember the result
function process(obj) {
    if (!cache.has(obj)) {
        let result = /* calculate the result for */ obj;
        cache.set(obj, result);
    }

    return cache.get(obj);
}

// main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// later, when the object is not needed any more:
obj = null;

// The problem disappears: the cached result will be removed from memory automatically,
// right after the object gets garbage collected.

// WeakSet

// WeakSet is similar to Set, but can only hold objects (not primitive values).
// An object will exist in a weakset as long as it's reachable from somewhere else.
// WeakSet supports add, has and delete, but not size, keys() or iterations.

// It mostly serves as auxiliary storage for binary info, e.g
// we can add users to WeakSet to keep track of website visitors:

let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited
visitedSet.add(pete); // then Pete
visitedSet.add(john); // John again

// visitedSet has 2 users now

// check if John visited?
console.log(visitedSet.has(john));  // true

// check if Mary visited?
console.log(visitedSet.has(mary));  // false

john = null;  // visitedSet will be cleaned automatically

// The most notable limitation of WeakMap and WeakSet is the absence of iterations,
// and therefore the inability to get all current content.

// TASK: Given an array of messages managed by someone else's code...:

let messages = [
    { text: "Hello", from: "John" },
    { text: "How goes?", from: "John" },
    { text: "See you soon", from: "Alice" }
];
  
// and taking into account that new messages are added and old ones removed at unknown times,
// which data structure could be used to store information about whether the message has been read?
// -->

let readMessages = new WeakSet();

// two messages have been read
readMessages.add(messages[0]);
readMessages.add(messages[1]);

// ...first message is read again
readMessages.add(messages[0]);
// ...but readMessages still has 2 unique elements

messages.shift();
// now readMessages has 1 element (technically memory may be cleaned later)

// The WeakSet allows for storage of unique messages (values),
// and for an easy check if the message exists in it. It cleans up itself automatically.
// The tradeoff is that we can’t iterate over it to get all read messages from it directly.
// However, we can work around it by iterating over all messages
// and then filtering those that are in the weakset.

// Using WeakSet here provides an architectural advantage of not messing with third party code.

// An alternative would be to add a boolean property (e.g. isRead) to a message after it’s read.
// As message objects are managed by another code, that’s generally discouraged,
// but a symbolic property can be used to avoid conflicts:

let isRead = Symbol("isRead");  // the symbolic property is only known to our code
messages[0][isRead] = true;

// Now third party code probably won’t see our extra property.
// Symbols decrease the probability of problems, but using WeakSet is still a better solution here.

// Given the same array of messages as in the previous task...:

let messages = [
    { text: "Hello", from: "John" },
    { text: "How goes?", from: "John" },
    { text: "See you soon", from: "Alice" }
];

// ...which data structure would be suitable for storing the information on when the message was read?
// Like before, the information should only remain in memory until the message is garbage collected.
// Dates can be stored built-in Date class objects (more on that later).
// -->

let mapReadTimes = new WeakMap();
mapReadTimes.set(messages[0], new Date(2020, 3, 23));

// ----- OBJECT.KEYS, VALUES, ENTRIES -----

// keys(), values(), entries() are common methods supported by Array, Map and Set.
// Plain objects also support similar methods:

Object.keys(obj)  // returns an array of keys
Object.values(obj)  // returns an array of values
Object.entries(obj)  // returns an array of [key, value] pairs

// Note the differences from Map: syntax and return value (the latter is an iterable for Map)

// Similar to a for..in loop, these methods ignore properties that use Symbols as keys.
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

// ----- DESTRUCTURING ASSIGNMENT -----

// Destructuring assignment is special syntax that allows us to “unpack” arrays or objects
// into individual variables.
// Destructuring works well with complex functions that have a lot of parameters,
// default values etc.

// Array destructuring

let arr = [1, 2];
let [first, second] = arr;

console.log(first);  // 1
console.log(second);  // 2

// the array itself is not modified

// unnecessary elements of the array can be ignored using commas:

let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
console.log(title);  // Consul

// To gather the remaining values, an '...' operator can be used:

let [firstName, lastName, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log(name1);  // Julius
console.log(name2);  // Caesar

// the value of rest is an array of elements remaining from the original array:

console.log(rest[0]);  // Consul
console.log(rest[1]);  // of the Roman Republic
console.log(rest.length); // 2

// Destructuring can be used with any iterable (not just arrays):

let [a, b, c] = "abc";  // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

// looping with .entries()

// ...in an object:

let user = {
    name: "John",
    age: 30
};

for (let [key, value] of Object.entries(user)) {
    console.log(`${key}: ${value}`);  // 'name: John', 'age: 30'
}
  
// ...in a map:
  
let user = new Map();

user.set("name", "John");
user.set("age", "30");

for (let [key, value] of user) {
    console.log(`${key}: ${value}`);  // 'name: John', 'age: 30'
}

// Default values

// If there are fewer elements in the array than variables in the assignment,
// the variables with no counterpart value default to undefined:

let [firstName, lastName] = [];

console.log(firstName);  // undefined
console.log(lastName);  // undefined

// To replace missing values, we can provide them:

let [name = "Guest", surname = "Anonymous"] = ["Julius"];
console.log(name);  // Julius (from array)
console.log(surname);  // Anonymous (default)

// Default values can complex expressions, or even function calls.
// They are only evaluated if the value is not provided.

// Object destructuring

// The destructuring assignment also works with objects:

let options = {
    resolution: "1920x1080",
    difficulty: "insanity",
    subtitles: true
}

let {resolution, difficulty, subtitles} = options;

// Properties of the object are assigned to corresponding variables.
// The order does not matter (as befits a hash table).

// If we want to assign a property to a variable with a different name,
// we can set it using a colon:

let {resolution: res, difficulty: df, subtitles: subs} = options;

// For properties that may potentially by missing, we can set default values.
// Just like with array destructuring, they can expressions of function calls.

// If we're only interested in a single property, we can extract it on its own:

let {resolution} = options;

// Gathering remaining values is also possible, just like with arrays:

let {resolution, ...rest} = options;
console.log(rest);  // {difficulty: "insanity", subtitles: true}

// There's a catch when using predeclared variables:

let resolution, difficulty, subtitles;
({resolution, difficulty, subtitles} = options)  // note the parentheses

// This assignment won't work without the parentheses. The reason for this is that
// without the declaration statement ("let" in this case) present in the expression,
// the JavaScript engine treats the contents of the curly brackets as a code block.

// Nested destructuring

// If an object or array contain nested objects or arrays,
// we can use more complex patterns to extract the deeper layer:

let options = {
    size: {
        width: 100,
        height: 200
    },
    items: ["Cake", "Donut"],
    extra: true
};

let {
    size: {
        width,
        height
    },
    items: [item1, item2],
    title = "Menu"  // not present in the object (default value provided)
} = options;

console.log(title);  // Menu
console.log(width);  // 100
console.log(height);  // 200
console.log(item1);  // Cake
console.log(item2);  // Donut

// Smart function parameters

// We can define function parameters as an object. That way, for functions with multiple
// optional parameters, we can can pass object arguments that only hold properties which are
// of interest to us at the time, and safely ignore the rest:

let gameSettings = ({resolution='1920x1080', difficulty='normal', subtitles=false}) => {
    console.log(`Game settings are: res: ${resolution}, df: ${difficulty}, subs: ${subtitles}`)
};

let myGameSettings = {
    difficulty: "hardcore",
    subtitles: true
};

gameSettings(myGameSettings);  // difficulty and subtitles are changed, while resolution remains default

// Note that this structure requires the gameSettings() function to have an argument.
// To still be able to call it without providing any arguments, set an empty object as default:

let gameSettings = ({res='1920x1080', df='normal', subs=false} = {}) => {
    console.log(`Game settings are: res: ${res}, df: ${df}, subs: ${subs}`)
};

// TASK: Given the following object:

let user = {
    name: "John",
    years: 30
};

// Write a destructuring assignment that takes the properties name, years and saves them into 
// variables name, age, and which also takes and isAdmin property and saves it into a variable
// isAdmin (which defaults to false if such property doesn't exist).
// -->

let {name, years, isAdmin=false} = user;


// TASK: Given the following object:

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

// Create a function topSalary(salaries) that returns the name of the top paid person,
// or null of salaries is empty. If there are multiple top-paid persons, return any of them.
// Use Object.entries and destructuring to iterate over key-value pairs.
// -->

let topSalary = (salaries) => {
    let currentHighestSalary = 0;
    let topPaidPerson = null;
    for (let [name, salary] of Object.entries(salaries)) {
        if (salary > currentHighestSalary) {
            currentHighestSalary = salary;
            topPaidPerson = name;
        }
    }
    return topPaidPerson;
};

// ----- DATE AND TIME -----

// The built-in object Date stores the date, time and provides methods for managing them.

let now = new Date();
console.log(now);  // current datetime

// with integer argument: how many milliseconds passed since January 1st, 1970 UTC+0

console.log(new Date(0));  // 01.01.1970 UTC+0
console.log(new Date(24 * 3600 * 1000));  // 02.01.1970 UTC+0
console.log(new Date (-24 * 3600 * 1000));  // 31.12.1969 UTC+0

// with string argument: date is parsed from the string (and adjusted to the timezone the code is run in)
let date = new Date('2020-05-04');

// create the date from components
let composedDate = new Date(2012, 0, 1, 0, 0, 0, 0);  // 1 Jan 2012, 00:00:00
let composedDate2 = new Date(2012, 0)  // exactly the same as above, the omitted args provided by default

// Access date components

Date.getFullYear()  // get the year (4 digits)
Date.getMonth()  // get the month (from 0 (January) to 11 (December))
Date.getDate()  // get the day of the month (from 1 to 31)
Date.getDay()  // get the day of the week (from 0 (Sunday) to 6 (Saturday))
Date.getHours()  // also: getMinutes(), getSeconds(), getMilliseconds() - get the corresponding components

// All of the methods above return the components relative to the local time zone.
// They also have their UTC counterparts: getUTCFullYear(), getUTCMonth(), getUTCDay() etc.

let date = new Date();  // current date
console.log(date.getHours());  // the hour in the local time zone
console.log(date.getUTCHours());  // the hour in UTC+0

// There are also two methods without the UTC variant:

Date.getTime()  // returns timestamp for the date
Date.getTimezoneOffset()  // returns the difference between UTC and the local time zone (in minutes)

// Set date components

Date.setFullYear(year, month, date);
Date.setMonth(month, date);
Date.setDate(date);
Date.setHours(hour, min, sec, ms);
Date.setMintes(min, sec, ms);
Date.setSeconds(sec, ms);
Date.setMilliseconds(ms);
Date.setTime(ms)  // sets the entire date using milliseconds since 01.01.1970 UTC+0

// Each one of these except for setTim() has a UTC variant.
// Also, for each of them only the first paramenter is obligatory.

// Autocorrection

// If we set values that are out of range, they will be adjusted automatically:

let date = new Date(2014, 0, 32)  // February 1st, 2014

// This means we can e.g. increase the date "February 28th" by 2 days, and it will auto-adjust:

let date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);  // March 1st, 2016 (2016 was a leap year)

// Date to number

// When a Date object is converted to a number, it becomes a timestamp (same as date.getTime()):

let date = new Date();
console.log(+date);  // unix timestamp

// This means dates can be subtracted, and the result is the difference in milliseconds.

// Date.now()

// This method also returns the current timestamp. Its result is identical to new Date().getTime(),
// but it doesn't actually create the Date object (which is faster and doesn't involve garbage collection).

// Benchmarking

// When we want to measure the time a given function takes:

let dateDiffSubtract = (date1, date2) => {
    return date2 - date1;
}

let dateDiffGetTime = (date1, date2) => {
    return date2.getTime() - date1.getTime();
}

let benchmark = (func) => {
    let date1 = new Date(0);
    let date2 = new Date();

    let start = Date.now();
    for (let i =0; i < 100000; i++) func(date1, date2);
    return Date.now() - start;
}

console.log(`Function ${dateDiffSubtract.name} took ${+benchmark(dateDiffSubtract)} ms.`);
console.log(`Function ${dateDiffGetTime.name} took ${+benchmark(dateDiffGetTime)} ms.`);

// Here, it turns out using getTime() is much faster (no type conversion).

// But what if the CPU were doing something else when benchmarking these? That would influence the outcome.
// For more reliable benchmarking, the benchmark suite should be rerun multiple times, e.g.:

let subtractTotalTime = 0;
let getTimeTotalTime = 0;

for (let i = 0; i < 10; i++) {
    subtractTotalTime += benchmark(dateDiffSubtract);
    getTimeTotalTime += benchmark(dateDiffGetTime);
}

console.log(`Function ${dateDiffSubtract.name} took ${subtractTotalTime} ms to run 10 times.`);
console.log(`Function ${dateDiffGetTime.name} took ${getTimeTotalTime} ms to run 10 times.`);

// Moreover, modern JavaScript engines are capable of applying optimizations to code
// that executes multiple times. That means initial runtimes may not be as well optimized
// as later ones. Therefore we may even want to add a "warm up" run:

// warm up
benchmark(dateDiffSubtract);
benchmark(dateDiffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
    subtractTotalTime += benchmark(dateDiffSubtract);
    getTimeTotalTime += benchmark(dateDiffGetTime);
}

// Date.parse

// The Date.parse(str) method can parse a date from a string.
// The string format should be: YYYY-MM-DDTHH:mm:ss.sssZ, where:
//
// YYYY-MM-DD is year-month-day
// The T character is used as a delimiter
// HH:mm:ss.sss is hours:minutes:seconds:milliseconds
// The Z character is the time zone (in the format: +-hh:mm); a single Z means UTC+0

// The call to Date.parse(str) parses the string in the provided format and returns the timestamp.
// If the format is invalid, it returns NaN.

let timestamp = Date.parse('2014-01-26T12:01:30.374-07:00');
console.log(timestamp);

// It's also possible to instantly create a new Date object from a timestamp:

let date = new Date(Date.parse('2014-01-26T12:01:30.374-07:00'));
console.log(date);

// More precise time measurements

// Sometimes precise time measurements (e.g. microseconds) is needed. JavaScript itself does not provide
// a way to measure time in microseconds, but most environments do (e.g. browsers offer a performance.now()
// method that returns the number of milliseconds that passed since the page started loading,
// down to a microsecond precision (3 digits after the dot); Node.js has a microtime module etc.)

// TASK: Create a Date object for the date: Feb 20, 2012, 3:12 am (local time).
// -->

let date = new Date(2012, 1, 20, 3, 12);
console.log(date);

// TASK: Write a function getWeekDay(date) that returns the day of the week in the format:
// 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'.
// -->

let getWeekDay = (date) => {
    const dayNames = {
        0: 'SUN',
        1: 'MON',
        2: 'TUE',
        3: 'WED',
        4: 'THU',
        5: 'FRI',
        6: 'SAT'
    };

    if (date instanceof Date) {
        return dayNames[date.getDay()];
    } else {
        try {
            return dayNames[new Date(Date.parse(date)).getDay()]
        }
        catch (e) {
            if (e instanceof TypeError) {
                console.log('Invalid argument.')
            }
        }
    }
}

let date = new Date(2012, 0, 3);
getWeekDay(date);

// TASK: Write a function getLocalDay(date) that returns the day of the week for date in the format where
// the first day of the week is Monday (since Sunday is the default).
// -->

let getLocalDay = (date) => {
    let defaultDay = date.getDay();
    if (defaultDay == 0) {
        return 6;
    } else {
        return defaultDay - 1;
    }
}

// TASK: Create a function getDateAgo(date, days) that returns the day of the month that occurred
// *days* ago after the *date* (e.g.: on the 20th day of the month, getDateAgo(newDate(), 1) should return
// 19, for the 19th). The function should work for *days* equal to 365 and more, and should not modify
// the *date* argument.
// -->

let getDateAgo = (date, days) => {
    return new Date(date - (days * 24 * 3600 * 1000)).getDate();
}

// TASK: Write a function getLastDayOfMonth(year, month) that returns the last day of the given month
// (0-11) in the given year (in the four-digit format).
// -->

let getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
}

// TASK: Write a function getSecondsToday() that returns the number of seconds from the beginning of today.
// -->

let getSecondsToday = () => {
    let now = new Date();
    let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let diff = (now - startOfToday) / 1000;  // assumes the precalculated value of "now" is accurate enough
    return Math.round(diff);
}

// TASK: Write a function getSecondsTillTomorrow() that returns the number of seconds till tomorrow.
// -->

let getSecondsTillTomorrow = () => {
    let now = new Date();
    let startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    let diff = (startOfTomorrow - now) / 1000;
    return Math.round(diff);
}

// TASK: Create a function formatDate(date) that returns date in the following format:
//
// if less than 1 second had passed since date: "right now"
// if at least 1 second, but less than 1 minute passed: "n seconds ago"
// if at least 1 minute, but less than 1 hour: "n hours ago"
// if at least 1 hour had passed: full date in the format "DD.MM.YY HH:mm" (all in 2 digits)
// -->

let _ensureDoubleDigitFormat = (dateComponent) => {
    if (dateComponent < 10) dateComponent = '0' + dateComponent;
    return dateComponent;
}

let _parseDate = (date) => {
    let day = _ensureDoubleDigitFormat(date.getDate());
    let month = _ensureDoubleDigitFormat(date.getMonth() + 1);
    let year = String(date.getFullYear()).slice(-2);
    let hours = _ensureDoubleDigitFormat(date.getHours());
    let minutes = _ensureDoubleDigitFormat(date.getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

let formatDate = (date) => {
    let diff = new Date() - date;
    if (diff < 1000) return 'right now';
    else if (diff < 60 * 1000) return `${diff / 1000} seconds ago`;
    else if (diff < 3600 * 1000) return `${diff / 60000} minutes ago`;
    else return _parseDate(date);
}

// ----- JSON methods, toJSON -----

// JSON (JavaScript Object Notation) is a generalized format used to represent values and objects.
// It was initially made for JavaScript, but many other languages have adopted it since its conception.

JSON.stringify(object)  // converts object to JSON-encoded string
JSON.parse(json)  // converts JSON back into an object

// A JSON-encoded object has some differences from an object literal:
//
// - strings always use double quotes
// - object property names always use double quotes (e.g.: age: 30 becomes "age": 30)

// JSON.stringify can be applied to objects and arrays, as well as some primitive data types
// (strings, numbers, booleans and null).

// JSON is a data-only, language-independent specification,
// so some object properties specific to JavaScript are skipped by JSON.stringify. Those include:
//
// - function methods
// - symbolic properties
// - properties that store undefined
//
// E.g.: the result of calling JSON.stringify with the following object:

let user = {
    sayHi() { console.log('Hello!') },
    [Symbol('id')]: 123,
    something: undefined
};

// ...is going to be a representation of an empty object:

console.log(JSON.stringify(user))  // {}

// Nested objects are supported and converted automatically, as long as there are no circular references.
// Those would result in an error, e.g.:

let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    participants: ["john", "ann"]
};

meetup.place = room;  // meetup references room
room.occupiedBy = meetup;  // room references meetup

JSON.stringify(meetup);  // Error: Converting circular structure to JSON

// The full syntax of JSON.stringify is:

let json = JSON.stringify(value, [replacer, space])

// where value is the value to encode,
// replacer is an array of properties to encode or a mapping function,
// and space is the amount of space to use for formatting.

// Replacer

// The replacer argument is used for excluding and replacing values upon stringification.

let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    participants: [{ name: "John" }, { name: "Alice" }],
    place: room  // meetup references room
};

room.occupiedBy = meetup;  // room references meetup

console.log(JSON.stringify(meetup, ['title', 'participants']));  // {"title":"Conference","participants":[{},{}]}

// However, this is too strict, because now objects in participants are empty, since name is not on the list.
// We can fix that by passing this list as a replacer:

['title', 'participants', 'place', 'name', 'number']

// Now everything except for occupiedBy (which would cause a circular reference) is serialized,
// but the list is very long.
// Fortunately instead of passing an array, we can pass a function as the replacer

console.log(JSON.stringify(meetup, function replacer(key, value) {
    console.log(`${key}: ${value}`);
    return (key == 'occupiedBy') ? undefined : value;
}));

// The replacer function gets every key/value pair (including nested objects and array items)
// and is applied recursively. The value of this inside replacer is the object that contains
// the current property.

// The first call is special: it's made using a special “wrapper object”: {"": meetup}.
// In other words, the first (key, value) pair has an empty key, and the value is the target object
// as a whole. That’s why the first line is ":[object Object]".

// The idea is to provide as much power for replacer as possible: it has a chance to analyze
// and replace/skip even the entire object if necessary.

// Formatting: space

// Space is the number of spaces to use for pretty formatting.

// Previously, all stringified objects had no indents or extra spaces. While that's fine if you want to
// send an object over the network, it's not really human readable.

let user = {
    name: "John",
    age: 25,
    roles: {
        isAdmin: false,
        isEditor: true
    }
};
  
console.log(JSON.stringify(user, null, 2));
/*
  {
    "name": "John",
    "age": 25,
    "roles": {
      "isAdmin": false,
      "isEditor": true
    }
  }
*/

// Custom toJSON

// Similar to the toString method for string conversion, an object may define a custom method
// toJSON, which will be automatically called by JSON.stringify whenever available. E.g.:

let room = {
    number: 23,
    toJSON() {
        return this.number;
    }
};

let meetup = {
    title: "Conference",
    room
};

console.log(JSON.stringify(room));  // 23
console.log(JSON.stringify(meetup));
/*
  {
    "title":"Conference",
    "room": 23
  }
*/

// toJSON is used both for the direct call JSON.stringify(room),
// and also when room is nested in another encoded object.

// JSON.parse

// The JSON.parse() method decodes a JSON string and converts it back to an object.

let value = JSON.parse(str, [reviver]);

// ...where str is the JSON string to parse, and reviver is an optional function(key, value)
// that will be called for each key value pair (and can transform the value).

// Objects and arrays passed to JSON.parse can be as complex as they need to be,
// as long as they conform to the JSON format.

// reviver

// Let's say we received a stringified meetup object from the server:

let meetup = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

/// ...and now we need to deserialize it (to turn back into JavaScript object):

let meetupDeserialized = JSON.parse(meetup);
console.log(meetup.date.getDate());  // error

// It errors out, because the value of meetupDeserialized.date is a string, not a Date object.

// To let JSON.parse know that it should transform that string into a Date, we can pass the so called
// reviving function as the second argument, so that (e.g.) all values are returned as they are,
// but turns dates into Date object:

let meetupDeserialized = JSON.parse(meetup, function (key, value) {
    if (key == 'date') return new Date(value);
    return value;
});

console.log(meetupDeserialized.date.getDate());  // it works now

// This works for nested objects as well:

let schedule = `
{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}
`;

schedule = JSON.parse(schedule, function (key, value) {
    if (key == 'date') return new Date(value);
    return value;
});

console.log(schedule.meetups[1].date.getDate());

// TASK: Turn the user object into JSON and then read it back into a different variable.
// -->

let user = {
    name: "John Smith",
    age: 35
};

let userStringified = JSON.stringify(user);
let userDeserialized = JSON.parse(userStringified);

// TASK: Write a replacer function to stringify every property in the meetup object,
// except for properties that reference meetup itself:

let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    occupiedBy: [{ name: "John" }, { name: "Alice" }],
    place: room
};

// circular references
room.occupiedBy = meetup;
meetup.self = meetup;

let meetupStringified = JSON.stringify(meetup, function replacer (key, value) {
    if (key != '' && value == meetup) return undefined;
    return value;
});

console.log(meetupStringified);
