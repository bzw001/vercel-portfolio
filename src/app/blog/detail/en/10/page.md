# ES6-11-Interator and For-OF

+ 1, Interator traverser
> ES6 has four types of data sets, and the Internet can provide a unified access mechanism.And the Internet is mainly for ... of service

+ 2. Traversing process
> The essence of the traverser object is a finger. First, point to the starting position of the data structure, and then call the next method of the pointer's object to know the ending position of the data structure.Each of the traverser object (next method), check the return of the return value.

+ 3, default Iterator interface
```javascript
1. As long as the data structure is deployed, the data structure is "traversible"
2. As long as the data structure has the symbol.iterator attribute, then it means traversed, and the attribute returns the Symbol object Iterator property
3. The data structure of the native ITATOR interface:
Array, Map, Set, String, Typedarray, Arguments of the function, Nodelist object
4. Why does the object have no deployment of the Iterator interface?
Because the sequence of object attribute traversal is uncertain, developers need to be specified.
If the ITERATOR interface that is required for ... of cycling is required, you need to set the traverser production method on the attribute of its symbol.iterator, and it is also available on the prototype chain.

example :
class rangeiterator {
    constructor (start, stop) {
    this.valu = start;
    this.stop = stop;
}
[Symbol.itrator] () {return This;};

next () {{
    var value = this.value;
    if (value <THIS.STOP) {
    this.value ++;
    return {Done: False, Value: Value}
    }
    return {Done: True, Value: Undefined}
    }
}

Function Range (Start, Stop) {
    return New Rangeiterator (Start, Stop);
}

for (var value of range (0,3)) {{
console.log (value);
}

Example: Example to add interface to the object
    let obj = {
    data: ['hello', 'world'],
    [Symbol.itrator] () {{
    const self = this;
    let index = 0;
return {
next () {{
ifx <self.data.Length) {
return {
Value: Self.data [Index ++],
Done: false
}
} Else {
return {value: undefined, do: true}
}
}
}
}
}

5. Method for deploying interfaces for array objects:
example: 
Nodelist.prototype [symbol.iterator] = array.prototype [symbol.itrator];
Nodelist.prototype [symbol.itrator] = [] [] [symbol.itrator]; //

```

+ 4, the default occasion will call the ITEROR interface
```javascript
1. When deconstructing and assigning the deconstruction of the array and set, the deconstruction assignment
2. Extended operators (...)
As long as the data structure is deployed with the ITERATOR interface, the extension operator can be used to convert it into an array.
3. Yeild* followed the traversal structure
4. The operation of the array

`` `

+ 5. The ITATOR interface of the string
`` `
The string is a group array, and also has the Iterator interface
Let test = 'hello';
console.log (typeof test [symbol.itrator]);
let testrator = test [symbol.iterator] ();
console.log (testrator.next ());
By covering the native Symbol.iterator method, the purpose of the calendar behavior can be modified
`` `

+ 6. Elite of the traverser object return (). Throw ()
`` `
When for ..of is withdrawn early (reporting an error, Break, Continue), return () will be called.
If an object needs to be cleaned or released before the traversal is completed, resources
Function ReadLinesSYNC (File) {
return {
next () {{
    return {Done: FALSE}
},
return () {
    file.close ():
    return {Done: TRUE};
    }
}
}

use:
For (let line of readlinessync (filename)) {{
console.log (line);
continue;
}
```

+ 7, for ... of loop
> It can traverse all the data structures that flicker the Iterator interface
```javascript
1. Array
For of the key value, for in can get the key name, of course, Entries and the keys method can be obtained
2. The objects of the class can use array.from to convert the object into an array, and then traverse

```

+ 8 Summary
> The essence of the Iterator interface is the point of the pointer, which can be rewritten and customized.A unified access mechanism for traversal data structures.