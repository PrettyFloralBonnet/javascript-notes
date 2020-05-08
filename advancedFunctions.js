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

function pow(x, n) {
    if (n == 1) {
        return x;
    } else {
        return x * pow(x, n - 1);
    }
}

// In the beginning of the call, the execution context stores variables: x = 2, n = 3.
// The execution flow is at line 1 of the function.

// The function starts to execute. The condition n == 1 is false, so the flow continues
// into the second conditional branch. The variables are same, but the line changes, so the context is now:
//
// Context: { x: 2, n: 3, at line 5 } pow(2, 3)

// To calculate x * pow(x, n - 1), we need to make a subcall of pow with new arguments pow(2, 2).
// To do a nested call, JavaScript remembers the current execution context in the execution context stack.

// The current context is remembered on top of the stack. The new context is created for the subcall.
// When the subcall is finished, the previous context is popped from the stack, and its execution continues.

// Here’s the context stack when we entered the subcall pow(2, 2):
//
//  Context: { x: 2, n: 2, at line 1 } pow(2, 2)
//  Context: { x: 2, n: 3, at line 5 } pow(2, 3)

// When we finish the subcall, it's easy to resume the previous context, because it keeps both variables,
// and the exact place in the code where the previous context stopped.

// The process repeats: a new subcall is made at line 5, now with arguments x = 2, n = 1.
// A new execution context is created, the previous one is pushed on top of the stack:
//
//  Context: { x: 2, n: 1, at line 1 } pow(2, 1)
//  Context: { x: 2, n: 2, at line 5 } pow(2, 2)
//  Context: { x: 2, n: 3, at line 5 } pow(2, 3)

// There are 2 old contexts now, and 1 currently running for pow(2, 1).
// During the execution of pow(2, 1), the condition n == 1 is truthy, so the first conditional branch
// is executed. There are no more nested calls, so the function returns 2.

// As the function finishes, its execution context is not needed anymore, so it’s removed from memory.
// The previous one is restored off the top of the stack:
//
//  Context: { x: 2, n: 2, at line 5 } pow(2, 2)
//  Context: { x: 2, n: 3, at line 5 } pow(2, 3)

// The execution of pow(2, 2) is resumed. The result is a subcall of pow(2, 1),
// so it also can finish the evaluation of x * pow(x, n - 1) (returning 4).

// Then the previous context is restored:
//
//  Context: { x: 2, n: 3, at line 5 } pow(2, 3)

// When it's finished, the result is pow(2, 3) = 8. The recursion depth in this case was: 3.
// As we can see, the recursion depth is equal to the max number of context in the stack.
// Contexts take memory. Here, raising to the power of n actually requires the memory for n contexts,
// for all lower values of n.

// A loop-based algorithm allows to save memory:

function pow(x, n) {
    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

// The iterative solution uses a single context, changing the values of i and result in the process.
// Its memory requirements are small, fixed, and not dependent on n.

// Any recursion can be rewritten as a loop, and the loop variant usually can be made more effective.
// However, sometimes the rewrite is non-trivial, especially when the function uses various recursive
// subcalls depending on conditions, and merges their results or when the branching is more intricate.
// The optimization may be unnecessary and/or not worth the hassle.
