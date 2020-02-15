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
console.log(str.indexOf("id"));  // 1, "id" is found at the position 1 (..*id*get with id)
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

console.log(fruits)  // ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
