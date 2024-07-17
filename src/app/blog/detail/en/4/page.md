# es6-05 - Extension of Objects (Supplemental)

+ 1. A concise representation of attributes

```javascript
    Attribute shorthand: var x=3;
              var b={x}; Equivalent to b={x:x}
              
    Method abbreviation: var obj={
        x,
        class()=>{this.x}; equivalent to 'class':function(){return this.x}; class is a string here and will not be considered a keyword
    } 
```

+ 2. Attribute names can be used as expressions, but not in conjunction with concise methods
```javascript
    var objProperty='aaa';
    
    var obj2[objProperty]=3; equivalent to var obj2['aaa']=3;
    
    This error is reported
    var obj3={[objproperty]}; Error
```

+ 3. The name attribute of the function can return the name of the function, and the method can also be used

+ 4. Object.is () to determine whether the two values are strictly equal
```javascript
    The only two differences from ===:
    +0===-0; //true
    Object.is(+0,-0); //false
    
    NaN===NaN; //false
    Object.is(NaN,NaN); //true
```

+ 5.Object.assign(target,source1,source2) is used for object merging, copying overriding enumerable attributes of the source object (source) to the target object (target), .
Note that this method is a shallow copy, and if the property is an object, then only a reference to that object is copied.

```javascript
   What Object.assign() does:
   Copies the object with specifying a default value for the property.
```

+ 6. Enumerability of Properties
Use the Object,getOwnPropertyDescriptor method to get a description of the property.
```javascript
    let obj={foo:123};
    Object.getOwnPropertyDescriptor(obj,'foo');
    Print://{
        value:123,
        writebale:true;
        enumberable:true;
        configurable:true
    }

    For properties where enumberanle is false, for in ,Object.keys(),JSON.stringify(),Object.assign() ignores the property

    Only care about the properties of the object itself, try to use Object,keys() instead of for in
```

+ 7. 5 methods for traversing properties.
```javascript
   for in :traverse itself and inheritable enumerable attributes, without the symbol attribute
   Object.keys(obj) : all enumerable properties, excluding inherited and symbolic properties.
   Object.getOwnPropertyNames(obj): returns an array of all properties of the object, excluding symbolic and non-enumerable properties

   Object.getOwnPropertySymbols(obj): returns an array containing all of the object's own symbol properties.

   Reflect.ownKeys(obj): returns an array containing all the properties of the object itself, regardless of the symbol or otherwise.

   These five traversals first traverse properties named values, sorted by number, then strings, then symbols.
```

+ 8. About prototype methods, don't use __proto___.
```javascript
    Object.setPrototypeOf(object,prototype);set an object prototype object
    Object.getPrototypeOf(obj);//read an object's prototype object
    Objcet.create()
```