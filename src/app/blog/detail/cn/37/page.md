---
title: JS常见设计模式-JS面向对象
id: design-01
---

>JS常见设计模式系列文章来源于本人的《javascript设计模式与开发实践》的学习笔记

## 面向对象的javaScript
> javaScript本身是一门基于原型的面向对象语言，其对象系统就是使用原型模式搭建的,其也是原型模式的一种体现。
> 传统的面向对象语言会与类为基准。
 
  + js遵循的原型编程的基本原则

    - 除了undefined外，所有数据都是对象
      >number，boolean，string这集中基本数据类型可以通过包装类的方式编程对象类型数据处理
    - 得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
      >用new运算符创建对象的过程，实际上只是克隆Object.prototype对象，再进行一些其他额外操作的过程
    - 对象会记住它的原型
      >js给对象提供了__proto__隐藏属性，某个对象的__proto__属性会默认指向它的构造器的原型对象，即{Constructor}.prototype
    - 如果对象无法响应某个请求，会将请求委托给自己的原型
      >原型继承的精髓所在。当请求到对象A属性，会执行A->A.prototype->Object.prototype->null。
      >如果都没有找到则会返回undefined.

## 二、this、call、apply

+ this

  - this的指向一般分为4种，除去不常用的with与eavl情况

    - 作为对象的方法应用
    > 函数作为对象的方法调用时，this指向该对象
    - 作为普通函数调用
    > 函数不作为对象的属性调用，为常见的普通函数方式，此时的this指向全局
    - 构造器调用
    > 构造器函数里的this会指向返回的这个对象
    - Function.prototype.call或Function.prototype.apply调用
    > 动态的改变传入函数的this
    - 箭头函数调用
    > 会绑定其父级的this


## 三、闭包与高阶函数
> js是完整的面向对象的编程语言，其同时拥有这许多函数式语言的特性

+ 闭包

  - 变量的作用域
  > 函数可以创建函数作用域，let可以创建块级作用域。变量的搜索是从内到外开始的,直至全局对象为止

  - 变量的生存周期
  > 全局变量的声明周期除非主动销毁，不然一直存在。对于函数的内使用var关键字声明的局部变量，其会随着函数的调用结束而被销毁

  - 闭包的更多作用

    - 封装变量
    >可以将一些不需要暴露在全局的变量封装成'私有变量'

    - 延续局部变量的寿命
    > 如img对象用于数据上报，

    ```
    //直接使用局部变量可能会导致数据的丢失，因为img在还没来得及发起http请求便销毁了
      var report = function (src) {
        var img = new Image();
        img.src = src;
      }
      report('http://xxx.com/getUserInfo');
    //使用闭包
    var report = (function(){
      var imgs = [];
      return function(src){
        var img = new Image();
        imgs.push(img);
        img.src = src;
      }
    })()
    ```
  
  - 闭包与面向对象设计
    > 可以使用闭包设计成对象的私有变量

  - 闭包与内存管理
    >闭包虽然会延长局部变量的生命期，但是其本身的作用便是要求有着全局变量类似的生命期，但是不放置全局的场景。如果不需要使用的时候直接将变量设置为null即可。真正闭包与内存泄露的关系在于，引用闭包容易形成循环运用。，比如闭包保存一些dom节点。

+ 高阶函数
> 至少满足其中一个条件的函数：a、函数可以作为参数被传递，b、函数可以作为返回值输出

  - 函数作为参数传递
    > 函数当作参数传递，这样可以抽离一部分容易变化的业务逻辑，放在函数参数中。比如回调函数，Array.prototype.sort接受函数当做参数

  - 函数作为返回值输出

+ 高阶函数实现AOP(面向切面编程)
> AOP作用在于把一些核心业务逻辑模块无关的功能抽离出来，比如日志统计，安全控制等。这些功能抽离后，再通过'动态植入'的方式渗入到业务逻辑模块中，从而保持业务逻辑模块的高内聚性。
> 在js中实现AOP，指将一个函数“动态植入”到另一个函数中
```
   Function.prototype.before = function(beforefn){
     var _self = this;
     return function() {
       beforefn.apply(this, arguments);
       return _self.apply(this, arguments);
     }
   }

   Function.prototype.after = function(afterfn) {
     var _self = this;
     return function() {
       var ret = _self.apply(this, arguments);
       afterfn.apply(this, arguments);
       return ret;
     }
   }

   var func = function() {
     console.log(2);
   }
   console.dir(func)

   func = func.before(function() {
     console.log(1);
   }).after(function() {
     console.log(3);
   })
   func(); // 1 2 3
```

  + 高阶函数其它应用

    - 函数柯里化(又叫部分求值)
    > 一个currying函数先接受一部分参数，接受参数后函数不会立即求值，而是返回另一个函数，会将传入的参数在函数形成的闭包中被保存起来。当函数被真正需求求值的时候，之前传入的参数才会被一次性用于求值

  ```
    //闭包缓存参数，当需要求值时，一起计算
    //例，计算月底花的钱数
    var currying = function(fn) {
      var args = [];
      return function() {
        if (arguments.length === 0) {
          fn.apply(this, args);
        } else {
          [].push.apply(args, arguments);
          return arguments.callee;
        }
      }
    }

    var cost = (function() {
      var money = 0;
      return function() {
        for (var i = 0, l = arguments.length; i < l; i++) {
          money += arguments[i];
        }
        return money;
      }
    })()

    var const = currying(cost); //转换为柯里函数
    const(100);
    const(200);
    const(); //这里才会为money求值
  ```

  + uncurrying
  >扩大函数的适用性，使本来属于特定对象的功能可以给其它对象使用
  ```
  Function.prototype.uncurrying = function() {
    var self = this;
    return function(){
      var obj = Array.prototype.shift.call(arguments);
      return self.apply(obj, arguments);
    }
  }

  var push = Array.prototype.push.uncurrrying();
  (function() {
    push(arguments, 4);
    console.log(arguments); //[1,2,3,4]
  })(1,2,3)
  ```
