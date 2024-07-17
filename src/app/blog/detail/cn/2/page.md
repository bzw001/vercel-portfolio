---
id: es6-03
title: es6-03-基本的数据类型扩展
---

## 字符串的主要增加的东西
+ 1、对于字符编码有了更多的支持
+ 2、字符串有了遍历接口，能够像对象那样被遍历
+ 3、normalize用于实现英文的语调符等（可以忽略）
+ 4、新增的字符串方法：includes,startWith,endsWIth,repeat用于重复字符串
+ 5、padStart,padEnd实现字符串的补全
+ 6、可以使用字符串模板。里面可以嵌套以及使用变量，甚至可以使用其他语言的代码

## 正则的扩展
+ 1、RegExp构造函数第一个参数如果是一个正则对象，那么第二个参数可以指定修饰符
+ 2、字符串中的match,replace,search,split,这些都关联到RgExp对象上
+ 3、对于元字符. 如果字符的码点大于0xfff的unicode字符，那么需要加上u修饰符
如:/^.$/u.test();

+ 4、增加y字符，效果与g相似，只是y必须每一次匹配的时候都需要从头开始

```
var s='aaa_aa_a';
var r1=/a+/g;
var r2=/a+/y;

r1.exec(s);//['aaa'];
r2.exec(s);//['aaa'];

r1.exec(s);//['aa'];
r2.exec(s);//null;
```
+ 5、其他一些比较细节的增加，如果不需要对正则左比较细节的了解，可以暂时忽略


## 数值的扩展
+ 1、使用前缀ob或0o分别表示2进制与8进制，需要将其转换为1-进制，需要使用number方法
+ 2、新方法：Number.isFinite,Number.isNaN
+ 3、将parseInt与parseFloat方法移植到了Number方法上，减少全局性的方法
+ 4、新方法：Nmber.isInteger,判断是否是整数，注意JS对于整数与浮点数是同样的储存方法，那么对于3与3.0会被视为一个值
+ 5.Number.EPSILON用于设置浮点数运算可以接搜的误差范围
+ 6.用于确保整数在JS的表示范围内：-2^53->2^53 ，Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量分别表示上限与下限，Number.isSafeInteger()测试数值是否在该范围内
+ 7、Math对象上的扩展，新增了必须需要使用Math对象进行调用的17个对象

```
Math.trunc  返回一个数的整数部分；
Math.sign   判断一个数是正数，0，还是负数
Math.cbrt    一个数的立方根
Math.clz32   JavaScript的整数使用32位二进制形式表示
Math.imul方法返回两个数以32位带符号整数形式相乘的结果
Math.fround方法返回一个数的单精度浮点数形式。
Math.hypot方法返回所有参数的平方和的平方根。
新增4个对数相关的方法，6个三角函数方法，这里暂时忽略


```
+ 8、增加指数运算符， **  如 2**3  //8


