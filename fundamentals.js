'use strict';  // introduced in 2009 with ES5 (unnecessary when using ES6 modules)
console.log('Hello, World!');

// ----- VARIABLES -----

let hello = 'Hello, World!', message = hello;
alert(hello);
alert(message);

// legal characters: letters, digits, $, _
let _ = 'This is not python!';  // in JS, _ has no special meaning as variable name

const pageLoadTime = 0  // constant calculated at runtime

// constants known ahead of runtime (note the naming convention)
const COLOR_RED = '#F00';
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

let color = COLOR_BLUE;

var oldType = ''  // the old 'var'

// ----- DATA TYPES -----

// Number

let n = 123;
n = 12.345;

console.log(1 / 0);  // Infinity
console.log('' / 2);  // NaN
// NaN is 'sticky' (any further operation on NaN will return NaN)
// Mathematical operations are 'safe' in the sense that the script will not error out

// BigInt

// 'number' type cannot represent integer values larger than 2**53
const bigInt = 1234567890123456789012345678901234567890n;  // note the 'n' at the end

// String

let name = 'Mal';

// backticks ()``) allow for embedding:
let message = `They cannot stop the signal, ${name}!`;
let ultimateAnswer = `It is ${6 * 7}`;

// Boolean

let nameFieldChecked = true;
let ageFieldChecked = false;
let isGreater = 4 > 1;

// null

let age = null;  // reference to a non-existing object (nothing, empty, value unknown)

// undefined

let x;
console.log(x);  // shows 'undefined'
// 'undefined' means 'value is not assigned'.
// use undefined for checks if variable has been assigned
// for 'empty' or 'unknown' values, use null

// Objects and Symbols

// The object type is used for more complex data structures
// The symbol type is used to create unique identifiers for objects

// The typeof operator

typeof undefined  // "undefined"
typeof 0  // "number"
typeof 10n  // "bigint"
typeof true  // "boolean"
typeof "foo"  // "string"
typeof Symbol("id")  // "symbol"
typeof Math  // "object"
typeof null  // "object" (that's wrong - it's a known error)
typeof alert  // "function" (functions are objects, but typeof treats them differently)

// ----- TYPE CONVERSIONS -----