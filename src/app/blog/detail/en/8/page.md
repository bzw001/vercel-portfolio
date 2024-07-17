# ES6-09-Reflect

+ 1, the role of Reflect
> Even if you use Proxy, you can use Reflect to make the object use a normal method. At the same time, you can get the internal method of the language using the Reflect object.

+ 2. Design the main purpose of this API
```javascript
1. Put some internal methods of the Object object on the REFLECT object.From the Reflect object, you can get the internal method of the language.

2. Modify the return result of some Object methods
example;
try {
Object.defineProperty (target, property, Attributes);
} Catch (e) {

} // This is an error throwing an error


// You can write this way
If (Reflect.defineProperty (target, Property, Attributes) {{
// Success
} Else {
// Failure
}
2. Make Object operation into function behavior
example:
'Key' in object

// I can write like this now
Reflect.has (Object, 'Key') // True

3. Reflect has the same name method of PROXY. No matter how proxy is modified, the default behavior of unstopular interception can always be found.

4. For some older writing, he can provide new ones
example:
Fucention.prototype.apply.call (math.floor, undefined, [1.75]);

// New writing
Reflect.apply (math.floor, undefined, [1.75]);

```

+ 3. Reflect supports 13 methods, basically the same name as the proxy method.