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
console.log(num.toString())  // "255", default base is 10 (decimal)

123456..toString(36)  // use with a number directly (note the two dots)

// Rounding

Math.floor(3.1)  // 3
Math.ceil(-1.1)  // -1
Math.round(3.6)  // 4
Math.trunc(-1.9)  // -1, removes everything after the decimal point without rounding

12.34.toFixed(1)  // "12.3" (note that it's a string representation)

// Imprecise calculations
