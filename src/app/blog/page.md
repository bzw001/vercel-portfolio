## Assignment of the structure of the array
+ 1. Use pattern matching to assign variables (can be used for the initialization of multivariate values)
 + arrays, using symmetry:
```javascript
    let [a,b,c]=[1,2,3]; This is equivalent to declaring three variables, which in turn are equal to the values on the right
    Imperfection:
    let [a,,c]=[1,2,3]; c would be equal to 3
    let [a,... c]=[1,2,3]; a is 1.c is an array [2,3]
    
If there is no iterator interface on the right (which can be traversed), then this form will report an error
    As long as the data structure has an Iterator interface, it can be deconstructed in the form of an array
    
```
 + 2. If you can't find the corresponding value or the corresponding value is undefined, you can give the default value
```javascript
    let [a=1]=[]; a is 1
    let [a,b=1]=[2] //a is 2 and b is 1
    let [a,b==1]=[2,null]//a is 2, b is null
    
Use another variable in the same destructuring assignment:
    let [x=1,y=x]=[]; //x=y=1;
    let [x=1,y=x]=[2]; //x=y=2
      Note that the referenced variable must be the one declared earlier:
    ler [x=y,y=1]=[]; Error
    
You can use functions to participate in assignments:
    function fun(){retrun 1};
    let [a=func()]=[1]; Only when the value on the right ([1][0]) is undefined, the function is executed and then assigned
    
```

+ 3. Deconstruction and assignment of objects
    + 1。 The variable must have the same name as the property

``` javascript
  let {a,b}={a:1,b:2}; A is 1 and B is 2
  If you need a variable with no object properties, you can go to other values that can be paired
  let [a:c,b:c]={a:1,b:2}; So c would be equal to a and d would be equal to b
  
It is also possible not to use at the time of declaration:
  let a;
  ({a:c}={a:1})； Parentheses must be added
  
You can also use nested structures:
  let arr=[];
  let obj={};
  
({a:obj.a,b:arr[0]}={a:1,b:2});
  
You can also specify a default value to use the same as above
  let {x=3}={x:undefiend};
  
This way you can easily get the method of the object and assign a variable to it
  let {log.sin,cos}=Math;
```
+ 4. Deconstruction and assignment of strings

```javascript
    Strings are assigned as arrays
    let [a,b]='he'; A is 'h' and b is 'e'
    
At the same time, strings also have a length property
    let [length:len]='12345';
    
```

+ 5 For the right value that cannot be converted to an object, it will be transformed into a wrapping object
  
```javascript
    let {toString:s}=123; s is the toString method
    This is because when you wrap 123 as an object, you will include the toString method
```

+ 6. Deconstruct and assign values to the parameters of the function
  
```javascript
  function add([x,y]){ return x+y; }
  add([1,2]); Although an array is passed in, since the function has been assigned using destructuring,
  1 and 2 are assigned to x and y, respectively
  
The default value is used when destructuring function parameters
  function move({x=0; y=0}={}){ //Here the argument needs to pass in an object
      return [x,y];
  }
  move({x:3,y:3}); //[3,3]
  move({x=3}); //[3.0]
```
  + 7. Precautions for using parentheses
   + 1. Do not use parentheses whenever there may be ambiguity in deconstruction
   + 2. Three ways to deconstruct and assign values without using parentheses:
     + 1. In variable declarations, do not use such as let [(a)]=[1];
     + 2. For the deconstruction of function parameters, do not use. e.g. function func([(x)]){};
     + 3. When assigning, you can't place a layer of the pattern in parentheses, such as ([a])=[1]
   + 3. Cases where parentheses can be used
     + There is only one type that can be used when assigning a non-schema part
     For example: [(b)]=[3];

## The purpose of variable destructuring
  + 1. Swap variable values
  
```javascript
let x=1;
let b=3;
[x,y]=[y,x];
```
  + 2. Returning multiple values from a function is accepted by multiple variables at the same time
  
```javascript
In the past, functions returning multiple values generally needed to be wrapped with an object or array, which was accepted by a single variable

function func(){
    return [1,2,3]
}
let [a,b,c]=func();
```

+ 3. Match a set of parameters to the variable name
  
```javascript
function f([x,y,z]{});
f([1,2,3])

function f2({x,y,z}{...})
f({x:1,y:2,z:3})

```

+ 4. Used to extract JSON data
  
```javascript
let jsonData={
    id:1,
    states:'ok',
    data:[1,2]
};

let {id,states,data:number}=jsonData;
```

+ 5. Specify the default value of the function parameter directly when declaring the function
  
```javascript
jQuery.ajax=fucntion(url,{async=true,cache=true,..});
```
  + 6. Used to traverse map data structures
  + 7. Convenient way to get the introduction module
  
```javascript
  const {func1,func2}=require('module1');
```