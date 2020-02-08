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
