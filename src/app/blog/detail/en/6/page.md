# ES6-07-set and map data structures

## set
+ 1, set is similar to an array, but the value of the member is unique.
```javascript
    The Set itself is a constructor that is used to generate the Set data structure
    const s=new Set();
    [1,2,3].forEach(x=>s.add(x));
    for(let i of s){
        console.log(i);
    }
    
The set can receive an array or an array of classes as a parameter, and add it to the Set after deduplication
    let s2=new Set([1,2,1]);
    
let s3=new Set(document.querySelectorAll('div');
    
The only way to keep the values in the structure is "Same-value quality".
    NaN is considered equal, but the object is not
```

+ 2. The methods and attributes of the Set instance
```javascript
    Set.prototype.constructor: constructor, the default is the Set function
    Set.prototype.size: returns the total number of members of the Set instance
    
The set includes the operation method and the traversal method:
      Four ways to do it:
        add(value): Add a value. Returns the Set structure
        delete(value)； If a value is deleted, a Boolean value is returned, indicating whether the deletion is successful
        has(value): Returns a boolean value
        clear(): Clears all members with no specific return value
        
Array.from converts the Set structure into an array:
       This makes it possible to form an array deduplication in a way that:
         function dedupe(array){
             return Array.from(new Set(array));
         }
         dedupe([1,1,2]); //[1,2]
         
Methods for 4 traversals:
        keys(): Returns the key name
        For example: for(let item of s1.keys()){...}  for of can also be achieved
        values(); Returns a key-value, which behaves the same as keys() because the Set structure has no key name, only a key value.
        entries(): A traverser that returns key-value pairs
        forEach(): Iterate through each member using a callback function. The key name is equal to the key value. [1,1],
        
Simple deduplication can be achieved by using the Set structure, such as [...] s1], and it supports array map and filter methods 
    
Implement intersections, unions, and differences:
        let s1=new Set([1,2,3]);
        let s2=new Set([4,3,2]);
        
union
        let union=new Set([... s1,... b]);
        
intersection
        let intersect=new Set([... s1].filter(x=>b.has(x)));
        
difference set
        let difference=new Set([... a].filter(x=>!b.has(x)));
        
Combined with map or Array.from() you can change the original set structure in the traversal
```

+ 3. WeakSet, the weak structure is similar to Set, but there are two differences
  > 1. Members of a WeakSet can only be objects
    2. weakSet objects. If another object no longer references the object, the garbage collection mechanism automatically reclaims the memory occupied by the object.
    Based on these two points, the members of a WeakSet are not suitable for reference, and can temporarily store a set of objects or information bound to an object.
   WeakSet has no size attribute and cannot be traversed, only the first 3 operations of the Set.

## Map data structure
+ 1. map appears because the previous object is a combination of key-value pairs, and traditionally only strings can be used as keys
```javascript
    Map implements that various types of values can be used as keys, and for key-value pair data structures, Map is more suitable than Obejct
    const m =new Map();
    const 0 ={'p':'hello world'};
    m.set(o,'content');
    m.get(o); //'content'
    m.has(0); //true
    m.delete(o); //true
    m.has(o); //false
    
Arrays are accepted as parameters, and arrays are arrays representing key-value pairs
    const map=new Map([
        ['name','Zhang San'],
        ['title','Author']
    ]);
    map.size; //2
    map.has('name'); //true
    map.get('name'); 'Zhang San'
    
A data interface with a traversal interface can be accepted as a parameter
    const set=new Set([
        ['foo',1],
        ['bar',2]
    );
    const m1=new Map[set];
    
If you assign a value to the same key multiple times, it will be overwritten
    const map=new Map();
    map.set(1,'aa');
    map.set(1,'bb');
```

+ 2. The key of Map is actually bound to the memory address, as long as the memory address is different, it will be regarded as two keys
```javascript
    const map=new Map();
    map.set(['aaa'],1);
    map.get(['aaa']); undefined, because the address is not the same
```

+ 3. Map properties and operation methods
```javascript
    Attribute:
       1. size: returns the total number of members
       
Method:
        1. set: Set key-value pairs, which can be written in a chain way
        let map=new Map()
            .set(1,'a')
            .set(2,'b')
        2、get(key)
        3、has(key)
        4。 delete(key)
        5、clear()
    There are 4 traversal methods: keys(), values(), entries(), forEach(), and the order in which they are traversed is the order in which they are inserted
    The default traversal interface for Map is the entries method
    
Using the Extension Operator (...) Convert the Map structure to an array structure
    const map=new Map([
        [1,'1'],
        [2,'2'],
        [3,'3']
    ])
    
[... map.keys()]; //[1,2,3]
    [... map.values]; //['1','2','3']
    [... map]; //[[1,'1'],[2,'2'],[3,'3']
    
The forEach method can also accept a second argument to bind this
```

+ 4. Convert to and from other data structures
```javascript
    1. Convert to an array
    [... map] and so on
    
2. Convert the array to map
    new Map([
        [true,7],
        [{foo:3},['abc']]
    ])
    
3. Convert Map to object
    The key of the map must be a string in order to be converted
    function strMapToObj(map){
        let obj=Object.create(null);
        for(let [k,v] of map){
            obj[k]-v;
        }
        return obj;
    }
    
4. The object is converted to a Map
    function  objToMap(obj){
        let map=new Map();
        for(let k of Object.keys(obj)){
            map.set(k,obj[k]);
        }
        return map;
    }
    
5. Convert map to JSON
      a. The map key is named as a string, which can be converted to object JSON
      b. The key name of the map has a non-string, which can be converted to array JSON
      
6. JSON to Map, as long as it is converted to an object first, and then to a Map
```

## WeakMap

There are two differences between > and Map:
  1. Only accept the key name of the object
  2. The objects pointed to by the key name of WeakMap are not included in the garbage collection mechanism
  Use: Save some data for some objects, but you don't need to manually release them, when the object is cleared, it will be released automatically
  WeakMap only has four methods: get(), set(), has(), delete(), and forEach90 does not exist.