// Recursion and stack

// Recursion occurs when a function calls itself:

function pow(x, n) {
    if (n == 1) {
        return x;
    } else {
        return x * pow(x, n - 1);
    }
}

console.log(pow(2, 3));  // 8

// If n == 1, the conclusion is trivial. In the example above, this case is the *base of recursion*:
// it immediately produces an obvious result.
// Otherwise, pow(x, n) is represented as x * pow(x, n - 1). This is a *recursive step*:
// the task is transformed into a simpler one (multiplication by x) and a simpler call of the same task
// (the function pow with a lower n).
// The concurrent steps simplify it futher, until eventually n reaches 1.

// In short, pow recursively calls itself until n == 1.

// Note how the recursive way of solving this problem is entirely different from the iterative way:

function pow(x, n) {
    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

console.log(pow(2, 3));  // 8

// A recursive solution is usually shorter than an iterative one. See the first solution again, simplified:

function pow(x, n) {
    return (n == 1) ? x : (x * pow(x, n - 1));
}

// The maximum number of nested calls (including the first one) is called *recursion depth*.
// In the example above, it is exactly n. The maximum recursion depth in JavaScript depends on
// the engine implementation, but 10 000 can be safely assumed as acceptable.

// Execution context and stack

// Execution context is where the information about the execution process of a running function is stored.
// It is an internal data structure that contains details about the execution of a function:
// where the control flow is at a given moment, what the current variables are, what the value of *this* is,
// etc. One function call has exactly one execution context associated with it.

// When a function makes a nested call, the current function is paused, the execution context
// associated with it is stored in a special data structure called execution context stack,
// the nested call executes and funally, the previous execution context is retrieved from the stack,
// and the outer function is resumed.
