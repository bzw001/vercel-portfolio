# ES6-10-PROMISE object

+ 1, role: solve asynchronous programming

+ 2, some concepts about promise
```javascript
1. Three states of Promise: pending, Fulfilled, RejectD

2. The status is irreversible. Colleagues do not set a CATCH function, then the error of the internal function of the Promise will not be detected

```

+ 3: Promise usage

```javascript
1. Promise object is a constructor to generate the PROMISE instance
The constructor accepts a function as a parameter, and the function parameters are resolve and reject.The two of them are functions
After the instance is generated, you can use then specify the callback function of the resolution and rejected state
example:
varpromise = new promise
if (..) {{
Resolve (value);
} Else {
Reject (error)
}
})

Function timeout (ms) {
Return New Promise (RESOLVE, Reject) => {{
settimeout (resolve, ms, 'done')
});
}

timeout (100) .then ((Value) => {
console.log (value);
})


2. If you use a resolution or reject function in Promise with parameters, then this parameter will be passed to the callback function in then

3. The RESOLVED event is always a synchronous task of this round of cycle.

4. Promise.prototype.then (), the first parameter is the callback function of the resolution state, and the second parameter is the callback function of the Rejected state
The return is Promise, which can continue then

5. Promise.prototype.catch () is generally placed behind then to capture errors. As long as it is an error running asynchronous operation, it will be rejected, and will be captured by the Catch .catch method to return Promise,
You can add the later
example :
P.Then ((VAL) => Console.log ('Fulfilled:', Val))
.cATCH ((Er) => console.log ('rejected'.err));

Similar to TRY, CATCH

When multiple Promise, the error of the Promise object has a bubbling properties and will always pass it backwards. Knowing that the capture position, errors will always be captured by the next Catch.
6. Suggestion: Use CATCH instead of Tema's second parameter processing error
Reason: It can capture errors executed in the THEN method.It's closer to synchronous writing.

For the error thrown by CATCH, you can add a CATCH to accept it later.
example :

promise.then (() => {{
Return Promise;
}). Catch ((error) => {
y+2;
}). Catch ((error) => {
console.log (error);
})
```

+ 4, other methods of promise
```javascript
1. Promise.all () to pack multiple promise instances

Let p = promise.all ([p1, p2, p3]); // p1.p2.p3 is all promise
Only three promise status is Fulfilled, and the status of P is Fulfilled, otherwise it is rejected

Promise.all () can define the CATCH method, but if the promise inside defines the catch method and it will be triggered, it will only trigger the Catch method of the Promise.


2. Promise.race () Packing multiple Promise instances
Let p = promise.race ([p1, p2, p3]);
When the promise packaged in it is changed, then the state of P changes with the state of P. The return value of the first promise will be transmitted to the callback function of P.
example:
const p = promise.race ([[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[
fetch ('/Resource -That'),
New Promise (RESOLVE, Reject) => {
settimeout (() => Reject (New Error ('Request Error')), 500)
})
]);

p.then (response => console.log (response);
p.catch (error => console.log (error)) // 5s, the fetch method does not return the result, and the state of p will be turned into rejection


3. Promise.Resolve () converts the existing object to Promise object

Promise.Resolve ('FOO');
Equivalent to:
New Promise (RESOLVE => Resolve ('FOO'));

Accept one parameter: parameters can be divided into 4 cases
A, without parameters, directly return the Promise object with Resolved
var p = promise.Resolve ();
p.then () ..// The resolution in this round event is executed.

B. The parameter is not an object or an object without the THEN method. The Resolve method will be executed immediately because there is no asynchronous operation
var p = promise.Resolve ('hello');
p.then (fundction (s) {
console.log (s);
})

C. Parameters are objects with the THEN method
Perform the THEN method in the object first, the state becomes Resolve, and then executes the then of Promise
example:
let thenable = {
then: Function (Resolve, Reject) {
Resolve (42);
}
}
let p1 = promise.Resolve (thenable);
p1.then (function (value) {
console.log (value);
})

D. The parameter is a promise object
Without any modification, return this instance directly.

4. Promise.reject () Returns a new Promise instance with the status of the instance is Reject
Note that the parameters of the Promise.reject () method will be used as a reason for the rejection to become a parameter of the follow -up method, even if Catch


5. Non -official API, but useful method:
Done (): At the end of the callback chain, it is guaranteed to throw any possible errors that may occur
Implement code:
Promise.prototype.done = Function (onFulfilled, onrejectd) {{
this.Thenn (onFulfilled, onreject)
.catch (function (reason) {
// Throwing global errors
settimeout (() => {Throw Reason}, 0)
})
}


Finally (): Anyway, the operation that will be performed in the end, accept a callback as a parameter.
Implement code:
Promise.prototype.finally = Function (Callback) {
Let p = this.constructor;
Return this.then (
value => p.Resolve (callback ()). Then (() => value),
reason => p.ResoLve (callback ()). Then (() => {Throwue release});
Cure
}

Promise.try () Simultaneously handle synchronization and asynchronous operation
Under normal circumstances:
Promise.Resolve (). Then (f); // If f is a synchronous function, then execute

Let the synchronous function be executed synchronously, the asynchronous execution method:

const f = () => console.log ('now');
((
() => New Promise (
Resolve => Resolve (f (f ());
Cure
) ();

Execute New Promise (), and synchronous functions will also execute

There are proposals to provide the promise.try method.

```