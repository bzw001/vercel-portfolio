# ES6-08-PROXY

+ 1, Proxy is used for?Proxy is a default behavior used to modify certain operations. Do some modifications at the language level
```javascript
If a layer of 'interception' is assumed in front of the object, the external access objects must be intercepted through this layer
example:
var obj = new proxy ({}, {
get: function (target, key, receptive) {
console.log (`getting $ (key)!`);
Return Reflect.get (target, key, receiver);
},
Set: Function (target, key, value, receiveer) {
console.log (`setting $ (key)!`);
Return Reflect.set (target, key, value.remeceiver);
}
})

obj.count = 1;
// Setting Count!
++ obj.count;
// getting count!
// Setting Count!
//2

Proxy is equivalent to re -loading some operators.
```

+ 2, proxy accepts two parameters. The first parameter is an object that needs to be agent (or need to intercept). The second parameter is to intercept the processing function.The target object is used normally, but the data that has been intercepted and processed

+ 3, proxy support interception operation

```javascript
Get (target, prophe, receiver) intercepting the reading of object attributes

set (target, prophe, value, receiver); settings of intercepting object attributes

Has (target, proKey) intercept Key in Proxy's operation and return to Boolean

OWNKEYS (target) intercept Object.get.getownPropertyName (proxy), Object.getownPropertymbols (Proxy), Object.keys (Proxy)

deleteProperty (target, problem)

GetownpropertyDescriptor (target, prophe) intercept the same name method, return the description object of the attribute

DefineProperty (target, problem, propdesc)

PreveNTEXTENSIONS (target)

Isextensible (target)

setprototypeof (target, proto)

apply (target, object, args)

constic (target, args)

```