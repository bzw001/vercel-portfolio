### Basic Datatype Extensions

## Major additions to strings
+ 1. More support for character encoding.
+ 2. strings have an iterative interface, so they can be traversed like objects.
+ 3, normalize for the implementation of the English tone marks , etc. (can be ignored)
+ 4, new string methods: includes, startWith, endsWIth, repeat for repeating strings.
+ 5, padStart, padEnd to achieve the string of complementary
+ 6. String templates can be used. It can be nested and the use of variables , you can even use the code of other languages .

## Regular extension
+ 1, RegExp constructor if the first parameter is a regular object, then the second parameter can specify the modifier
+ 2, string match, replace, search, split, these are associated with the RgExp object
+ 3, for metacharacters. If the code point of the character is greater than 0xfff unicode characters, then you need to add the u modifier
such as:/^. $/u.test();

+ 4, add the y character, the effect is similar to g, except that y must be matched every time the need to start from scratch

```javascript
var s='aaa_aa_a';
var r1=/a+/g; var r2=/a+/g; var r2=/a+/g
var r2=/a+/y;

r1.exec(s);//['aaa'].
r2.exec(s);//['aaa'];

r1.exec(s);//['aaa']; r1.
r2.exec(s);//null;
```
+ 5, some other more detailed additions, if you do not need to understand the regular left more detailed, you can temporarily ignore the


## Numeric extensions
+ 1, the use of the prefix ob or 0o respectively represents the binary and octal, need to be converted to 1 -binary, you need to use the number method
+ 2, new methods: Number.isFinite, Number.isNaN
+ 3, will be parseInt and parseFloat method ported to the Number method to reduce the global methods
+ 4, the new method: Nmber.isInteger, to determine whether the integer, note that JS for integers and floating point numbers is the same storage method, then for 3 and 3.0 will be treated as one value
+ Number.EPSILON is used to set the floating-point operation can be searched for the margin of error
+ 6. Used to ensure that the integer in the JS range: -2 ^ 53 -> 2 ^ 53 , Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER these two constants respectively represent the upper limit and the lower limit, Number.isSafeInteger () to test the value of the value is in the range of
+ 7, Math object on the expansion, the new must need to use the Math object to call the 17 objects

```javascript
Math.trunc return to the integer part of a number;
Math.sign to determine a number is positive, 0, or negative
Math.cbrt the cube root of a number
Math.clz32 JavaScript integer using 32-bit binary form of representation
Math.imul method returns the result of multiplying two numbers by a 32-bit signed integer.
Math.round method returns a number as a single-precision floating-point number.
Math.hypot method returns the square root of the sum of the squares of all arguments.
4 new logarithm-related methods, 6 trigonometric methods, ignored here for the moment

```
+ 8, add exponentiation operators, ** such as 2**3 //8


