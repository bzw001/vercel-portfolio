#  Extension of object type

## Array expansion
+ 1. Array.from() and traversable objects are converted into arrays. Such as traversing the set of nodelists returned by the DOM, and the arguments object of functions
```javascript
   var arrayLike={
       '0':1,
       '1':2,
       length:2
   }
   ES5 conversion method
   var arr=[].slice.call(arrayLike);
   //es6
   let arr=Array.from(arrayLike);
   data with traversal interface Arrary.from('aa'); //['a','a']
   
Note that essentially, as long as the object has a length property, it can be converted into an array by this method
   
This method also has a second parameter, similar to the map method, which processes the elements and puts them into the returned array
   Array.from(arrayLike,x=>x*x);
   Same as Array.from(arrayLike.map(x=>x*x))
```

+ 2 Array.of() converts a set of values into an array, which can be understood as es5's Array() or new Array()
```javascript
   Array.of(1,2,3)//[1,2,3]
```

+ 3 copyWithin() copies the members of the specified position to other locations, and the other positions will be overwritten, and the current array will be returned. The current array can be modified
```javascript
Array.prototype.copyWithin (that location starts replacing data, reading data starts from that location, that location stops reading)
[1,2,3,4,5].copyWithin(0,3) //[4,5,3,4,5]
```

+ 4, find() and findIndex, can be found, more powerful than indexOf(), they can execute functions, and at the same time, combined with Object.is NaN
+ 5, fill(), which is used to cover and fill the array, can be used for the initialization of the array.
```javascript
   [1,2,3].fill('a'); //  ['a','a','a']
```

+ 6, entries(), keys().values(), used for array traversal, the first is a traversal of key-value pairs, the second is a traversal of key-value pairs, and the third is a traversal of key-value pairs
```javascript
    for(let index of ['a','b'].keys()){ // The other two usages are the same.}
        console.log(index);
    }
    for(let [index,elem] of ['a','b'].entries()){ 
        console.log(index);
    }
    
An interesting approach, the next() method of the traverser object, only iterates over one value of the object at a time, and it is obtained all at once
    
let array=[1,2,3];
    let entries=array.entries();
    console.log(entries.next().value); //[0.1]
    console.log(entries.next().value); //[1.2]
    console.log(entries.next().value); //[2.3]
```

+ 7, includes() determines whether an array contains a given value
+ 8. Handling of vacant positions, such as [,,,]
  > forEach(), filter(), every() and some() all skip empty slots.
map() skips empty slots, but retains this value
join() and toString() will treat empty bits as undefined, while undefined and null will be treated as empty strings.

+ ES6 will explicitly turn empty spaces to undefined, so that some methods don't skip empty spaces

## Extensions of functions
+ 1. You can directly set the default value for the function parameters
```javascript
    function func(x,y=1){} //If the passed parameter y is not assigned, then y=1;
    This has the advantage of knowing which parameters do not have to be lost, and it is also possible to not pass some parameters later.
    let x=99
    function func(y=x+1){console.log(y)};
    func(); //100
    func(); The value of 101 // is the latest calculated value, also known as the lazy value
```

+ 2. Used in conjunction with the default value of destructuring assignment
```javascript
    function func({x,y=5}){console.log(x,y)};
    func({{x:1}}); //1,5
    func({x:1,y:2}); //1,2
    
There are also some usages, which are omitted here.
```

+ 3. Generally, the parameters that need to be set to default values will be ranked last
+ 4. The function has a length attribute, which means that the number of parameters without setting the default value is not set, but note that only the number of parameters without setting the default value is calculated from the first parameter with the default value set, and the number of parameters without the default value set in the front is the value of length
```javascript
    (function(x,y=1){}).length; //1
    （function(x=1,y){}).length; //0
```
+ 5. The parameters of the function setting the default value will have a separate scope
```javascript
    let x=3;
    function func(y=x){let x=2; console.log(y)};
    func(); //3
    Here the parameter y=x will form a separate scope, where x will find the outer x=3 because it has no declared value; Then assign a value to y,
    Getting x in the function doesn't work, if x can't find the value outside, then it will report undefined
```

+ 6. The default value of the parameter value can be used to determine which parameters cannot be omitted and which parameters can be omitted when the function is declared
```javascript
    function throwIfMissing(){
        throw new Error('missing parameter');
        
}
    
function func(x=throwIfMissing(),y=undefined); If the x parameter is omitted, then an error will be reported, and y can be omitted
```

+ 7. Use REST parameters (...) variable name) can accept redundant parameters
```javascript
    function add(... values){
        let sum=0;
        for(var val of values){
            sum++=value;
        }
        return sum;
    }
    
add(1,2,3)//6
    Here's... values means to put the input parameters into the values array, note that there can be no other parameters after the values
    
Apply:
    1. Pass an array into the function as a parameter in turn
    function func(x,y,z);
    var args=[1,2,3];
    func(... args);
    
2. A new way to merge arrays
    var arr1=[1,2,3];
    var arr2=[4,5,6];
    var arr3=[7,8,9];
    [... arr1,... arr2,... arr3];
    
3. Combine with deconstruction
    const [first,... rest]=[1,2,3,4];
    first; //1
    rest; //[2,3,4]
```

+ 8. The name attribute of the function, es5 is a little different from es6
```javascript
    function func(){};
    func.name; //'func'
    
var func2=function(){};
    func2.name; es5 is '', es6 is 'func2'
```

## Arrow function
+ 1. Rules for using arrow functions:
```javascript
    1. (x)=>x, write the parameters directly in the parentheses, and when you need to execute multiple codes, use curly braces to wrap the code, such as
    ()=>{console.log('a'); return 1}.
    2. If you need to return the object directly, you need to add parentheses: ()=>({x:1});
    3. It can be combined with deconstruction, ({first,second}}=?) first+''+second
    4. The most meaningful point is that its this does not change according to the change of the operating environment, and is bound when it is declared. There are great benefits for callbacks.
    5. It cannot be used in combination with new, and arguments are not used in the function, and REST can be used instead.
    
Note that the arrow function itself does not generate this by itself, and needs to rely on the outer this.
    Neither bind can change the pointing of the arrow function this.
    
```
+ 2. Multiple nested functions and pipeline mechanisms
```javascript
        let insert=(value)=>({into:(array)=>({after:(aftervalue)=>{array.splice(array.indexOf(afterValue)+1,0,value)}})})
        
Pipeline Mechanism:
        
const pipeline=(... funcs)=>val=>funcs.reduce((a,b)=>b(a),val)
```

## ES7 proposal, using an operator to bind this (the babel converter has been implemented)
```javascript
    foo::func; This binds the foo on the left as func, which is func, bind(foo);
    foo:func(... argumnets); It's func, bind(foo, arguments);
    
There is also a usage.
```

## Tail call
```javascript
  tail call: function func(){return func2(); } };//The last step calls a function, which is just the simplest call.
  Tail call optimization: A function call will generate a call record, that is, the call frame, if function A is executed in function B, and the execution of function B uses the outer layer of internal variable information. Then the call frame of the previous layer will be saved, and if this call frame is generated, it will be very resource-consuming.
  As:
  function func(){
      let m=1;
      let n=2;
      return g(m+n);
  }
  Equivalent to g(3)
  
In this case, you can't tail call optimization:
  function addone(a){
      var one=1;
      function inner(b){
          return b+one;
      }
      
return inner(a);
  }
 
ES6's tail call optimization is only enabled in strict mode. Because in normal mode, the function has arguments and callers to track the call stack of the function
```

## Tail recursion
```javascript
    function afactorial(n,total=1){//Calculate the factorial.}
        if(n==1) return total;
        return factorail(n-1,n*total);
    }
```