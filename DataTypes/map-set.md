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