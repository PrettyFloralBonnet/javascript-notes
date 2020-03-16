// ----- METHODS OF PRIMITIVE DATA TYPES -----

// JavaScript allows us to work with primitive data types (strings, numbers etc.) as if they were objects.
// To that end, a special object wrapper is created for the primitive data type,
// providing access to methods and properties. Then it is destroyed.

// null and undefined

// These two types do not have corresponding wrapper objects and provide no methods.

// ----- NUMBERS -----

// Types of numbers in JavaScipt:

// Regular numbers, stored in 64-bit format IEEE-754,
// also known as "double precision floating point numbers".

// BigInt numbers, used to represent integers of arbitrary length.
// Needed to represent numbers exceeding 2 ** 53 (or -2 ** 53).

// shorthand for multiple zeroes

let billion = 1e9;  // 1 billion (literally 1 and 9 zeroes)
let millisecond = 1e-6;  // one millionth (literally 6 zeroes to the left of 1)

// hexadecimal, binary, octal

let a = 0xff, b = 0b11111111, c = 0o377;
a === b && b === c  // true, all equal 255

// toString(base)

let num = 255;
console.log(num.toString(16));  // ff
console.log(num.toString(2));  // 11111111
console.log(num.toString());  // "255", default base is 10 (decimal)

123456..toString(36);  // use with a number directly (note the two dots)

// Rounding

Math.floor(3.1)  // 3
Math.ceil(-1.1)  // -1
Math.round(3.6)  // 4
Math.trunc(-1.9)  // -1, removes everything after the decimal point without rounding

12.34.toFixed(1)  // "12.3" (note that it's a string representation)

// Imprecise calculations

// if a number is too big, it will overflow the 64-bit storage
console.log(1e5000);  // Infinity

// loss of precision
console.log(0.1 + 0.2 == 0.3);  // false

// in the decimal numeric system, fractions like 0.1 or 0.2 are easily represented,
// but 0.3 becomes an endless fraction (0.33333(3))

// in the binary system, there is no way to store exactly 0.1 or 0.2

// IEEE-754 solves this by rounding to the nearest possible number,
// at the cost of a tiny precision loss.

// isFinite and isNaN

console.log(isNaN(NaN));  // true
console.log(isNaN(str));  // true
console.log(isNaN(5));  // false

NaN === NaN  // false

console.log(isFinite('15'));  // true
console.log(isFinite(str));  // false (because it's NaN)
console.log(isFinite(Infinity));  // false

// parseInt and parseFloat

console.log(parseInt('100px'));  // 100
console.log(parseFloat('12.5em'));  // 12.5

console.log(parseInt('a123'));  // NaN

// Other math functions

Math.random()  // returns a random number from 0 to 1 (excluding 1)
Math.max(a, b, c)  // returns the greatest from an arbitrary number of arguments
Math.min(a, b, c)  // returns the smallest from an arbitrary number of arguments
Math.pow(n, power)  // returns n raised to the given power

// TASK: Prompt the visitor for two numbers and then show their sum.
// -->

let sumNumbersFromPrompts = () => {
    let num1 = +prompt('Enter first number: ', '');
    let num2 = +prompt('Enter second number: ', '');
    return num1 + num2;
}

// TASK: Create a function "readNumber", which prompts for a number until the visitor enters a valid numeric value,
// and then returns that value (as a number). The visitor can also stop the process by entering an empty line or pressing “CANCEL”
// (in which case the function should return null).
// -->

let readNumber = () => {
    let input;
    do {
        input = prompt('Enter a number: ', '');
    } while(isNaN(+input)) {
        if (input === '' || input === null) return null;
    }
    return +input;
}

// TASK: The built-in function Math.random() creates a random value from 0 to 1 (not including 1).
// Write a function "random(min, max)" to generate a random floating-point number from min to max (not including max).
// Here's how it should work:

console.log(random(1, 5)); // 1.2345623452
console.log(random(1, 5)); // 3.7894332423
console.log(random(1, 5)); // 4.3435234525

// -->

let random = (min, max) => {
    return min + Math.random() * (max - min);
}

// TASK: Create a function "randomInteger(min, max)" that generates a random integer from min to max (inclusive).
// Any number from the interval must have the same probability to appear.
// -->

let randomInteger = (min, max) => {
    let random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
}

// ----- STRINGS -----

// Textual data is stored as strings. There is no separate data type for a single character.
// Strings in JavaScript are UTF-16 encoded (regardless of the page encoding).

// Backticks (``) allow to embed any expression into a string (including function calls).
// They also allow quotes to span multiple lines.

// Special characters

`
\n          New line
\r          Carriage return
\', \" 	    Quotes
\\ 	        Backslash
\t 	        Tab
\b, \f, \v 	Backspace, Form Feed, Vertical Tab (leftovers, not used nowadays)
\x7A        Unicode character with the given hexadecimal unicode XX (the given example is'z')
\u00A9 	    A unicode symbol with the hex code XXXX (4 hex digits exactly) in UTF-16 encoding (given example is ©)
\u{1F60D}   (1 to 6 hex characters) unicode symbol with the given UTF-32 encoding
            (some rare characters are encoded with two unicode symbols, taking 4 bytes)
`

// Length

// length is a property in JavaScript (not a function)

// Accessing characters

let str = 'Hello';
console.log(str[0] );  // H

for (let char of "Hello") {
    console.log(char);  // H,e,l,l,o
}

// Changing the case

console.log('Interface'.toUpperCase()); // INTERFACE
console.log('Interface'.toLowerCase()); // interface

// Searching for a substring

let str = 'Widget with id';

console.log(str.indexOf('Widget'));  // 0, because 'Widget' is found at the beginning
console.log(str.indexOf('widget'));  // -1, not found (the search is case-sensitive)
console.log(str.indexOf("id"));  // 1, "id" is found at the position 1 (..W*id*get with id)
console.log(str.indexOf('id', 2))  // 12 (starting the search at index 2)

// to find all occurrences, we can run indexOf in a loop:

let str = 'As sly as a fox, as strong as an ox';
let target = 'as';
let pos = 0;

while (true) {
    let foundPos = str.indexOf(target, pos);
    if (foundPos == -1) break;
    console.log(`Found target "${target}" at position: ${foundPos}`);
    pos = foundPos + 1
}

// shorter version (but less readable):

let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
    console.log(pos);
}

str.lastIndexOf(substr, pos)  // searches from the end, lists occurrences in reverse order

// includes, startsWith, endsWith

str.includes(substr, pos)  // returns true or false depending on whether str contains substr
str.startsWith(substr)  // returns true or false depending on whether str starts with substr
str.endsWith(substr)  // returns true or false depending on whether str ends with substr

// Getting a substring

str.slice(start, end)  // returns a section of str between start (inclusive) and end (exclusive)
// if end is not given, the slice goes until the end of str

str.substring(start, end)  // returns a section of str between start and end, but allows start to be greater than end
// negative arguments are not supported (and treated as 0), unlike str.slice

str.substr(start, length)  // returns a section of str starting from start, with the given length

// other methods

str.trim()  // removes whitespace from the beginning and end of str
str.repeat(n)  // repeats str n times

// TASK: Write a function ucFirst(str) that returns str with the first character in uppercase.
// -->

let ucFirst = (str) => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}

// TASK: Write a function checkSpam(str) that returns true if str contains ‘viagra’ or ‘XXX’.
// Otherwise the function must return false. The function must be case-insensitive.
// -->

let checkSpam = (str) => {
    if (str.toLowerCase().includes('viagra') || str.toLowerCase().includes('xxx')) {
        return true;
    }
    return false;
}

// TASK: Create a function truncate(str, maxlength) that checks the length of str.
// If str exceeds maxlength, it replaces the end of str with the ellipsis character "…", to make its length equal to maxlength.
// Then it returns the string (truncated, if necessary).

let truncate = (str, maxLength=str.length) => {
    if (str.length > +maxLength) {
        let truncatedStr = str.slice(0, +maxLength) + '...';
        return truncatedStr;
    }
    return str;
}

// TASK: Say we have a cost of "$120" (the dollar sign goes first, and then the number).
// Create a function extractCurrencyValue(str) that would extract the numeric value from such string and return it.

let extractCurrencyValue = (str) => {
    return parseInt(str.slice(1));
}

// ----- ARRAYS -----

// ordered collections of data

let arr = new Array();
let arr = [];

// Methods pop/push, shift/unshift

// One of the most common uses of an array is a queue,
// which is an ordered collection of elements supporting two operations:
//
// - push (which appends an element to the end),
// - shift (which takes an element from the beginning, advancing the queue(the 2nd element becomes the 1st)).
//
// Queues operate on the so-called FIFO (First In, First Out) principle.

// Another use case for arrays is a stack,
// a similar data structure that supports the following operations:
//
// - push,
// - pop (which takes an element from the end)
//
// This is a LIFO (Last In, First Out) principle in action.

// Arrays in JavaScript can work both as a queue and as a stack. In computer science, a data structure
// that allows for this is called a deque (or a double-ended queue).

// There's also a method "unshift" which adds an element to the beginning of the array.
// Methods "push" and "unshift" can take multiple arguments, and add them all at once:

let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

console.log(fruits);  // ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]

// At their base, arrays are objects. It is possible to add an arbitrary property to an arary,
// or assign a value to an index larger than the array's length.
// This should be avoided, because if the JS engine detects we are working with an array
// as if it was a regular objects, array-specific optimizations will cease to apply.

// Pop and push are fast, whereas shift and unshift are slow

// Length is writable (the array may be truncated, and the process is irreversible):

let arr = [1, 2, 3, 4, 5];

arr.length = 2;  // truncate
alert(arr);  // [1, 2]

arr.length = 5;  // try to go back
alert(arr[3]); // undefined: the values do not return

// new Array()

let arr = new Array("Apple", "Pear", "Banana");

// will result in the same array as:

let arr = ["Apple", "Pear", "Banana"];

// However, if "new Array" is called with a single argument which is a number,
// it will create an array without items, but with the given length:

let arr = new Array(2);
alert(arr[0]);  // undefined -- no elements
alert(arr.length);  // 2

// All elements in this array are undefined. To avoid surprises, stick to square brackets.

// Multidimensional arrays

// Elements of arrays can themselves be arrays:

let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
  
alert(matrix[1][1]);  // the central element

// toString

// Arrays have their own implementation of the toString method, which returns
// a string of array elements separated by commas:

let arr = [1, 2, 3];
console.log(String(arr));  // '1,2,3'

// An empty array becomes an empty string.

// TASK: Write the function sumInput() that:
//
//   - prompts the user for values and stores them in an array,
//   - stops asking when the user enters a non-numeric value, an empty string, or presses “Cancel”,
//   - calculates and returns the sum of array items.
//
// A zero is a valid number.
// -->

let sumInput = () => {
    let inputs = [];
    let sum = 0;
    while (true) {
        input = prompt('Enter a number: ', 0)
        if (input === '' || input === null || isNaN(input)) break;
        inputs.push(+input);
    }
    
    for (n of inputs) {
        sum += n;
    }

    return sum;
}

// TASK: Given an array of numbers (e.g. arr = [1, -2, 3, 4, -9, 6]),
// find the contiguous subarray of the array with the maximal sum of items.
// Write the function getMaxSubSum(arr) that will return that sum.
// E.g.:

getMaxSubSum([-1, 2, 3, -9])  // 5 (from [2, 3])
getMaxSubSum([2, -1, 2, 3, -9])  // 6 (from [2, -1, 2, 3])
getMaxSubSum([-1, 2, 3, -9, 11])  // 11 (from [11])
getMaxSubSum([-2, -1, 1, 2])  // 3 (from [1, 2])
getMaxSubSum([100, -9, 2, -3, 5])  // 100 (from [100])
getMaxSubSum([1, 2, 3])  // 6 (take all)

// If all items are negative, take none (leave the subarray empty), so that the sum is zero:

getMaxSubSum([-1, -2, -3])  // 0

// Please try to think of a fast solution: O(n2) or even O(n), if you can.

let getMaxSubSum = (arr) => {
    let maxSum = 0;
    let partialSum = 0;
    for (let item of arr) {
        partialSum += item;
        maxSum = Math.max(maxSum, partialSum);
        if (partialSum < 0) partialSum = 0;
        return maxSum;
    }
}


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

// ----- WeakMap and WeakSet -----

// Properties of an object (or elements of an array etc.) are considered reachable and kept in memory
// as long as that data structure is in memory. For instance, if we put an object into an array,
// then the object will remain unclaimed by the garbage collector as long as the array itself remains that way
// -- even if there are no other references to it.

// Naturally, Map is not an exception:

let john = {name: "John"};

let map = new Map();
map.set(john, "...");

john = null;  // overwrite the reference

// john is stored inside the map, we can get it by using map.keys()

// But WeakMap is very different in this aspect -- it doesn’t prevent garbage collection of key objects.

// ----- WeakMap -----

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
