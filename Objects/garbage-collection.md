## Garbage collection

The main concept behind memory management in JavaScript is **reachability**. A value is reachable as long as it's accessible or usable in any way. This means it is guaranteed to be stored in memory.

Some values are inherently reachable and cannot be deleted. These are called **roots**, and they are:

* local variables
* parameters of the current function
* variables and parameters of other functions on the current chain of nested calls
* global variables
* some internal values

Any other value is considered reachable, as long as it is reachable from a root by a reference or chain of references.

A background process of the JavaScript engine called the **garbage collector** monitors all objects and removes the ones that have become unreachable.

The basic garbage collection algorithm is called "mark-and-sweep". JS engines apply many optimizations to make it fast without affecting execution.
