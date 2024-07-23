---
title: JS常见设计模式-单例策略代理迭代器
id: design-02
---

## 单例模式
> 保证一个类仅有一个实例，并体用一个访问它的全局访问点
> 如window对象

+ 透明的单例模式
> 用户从这个类创建对象的时候，可以想用其它任何普通类一样

```javascript
var CreateDiv = (function(){
  var instance ;
  var CreateDiv = function(html){
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return instance = this;
  }

  CreateDiv.prototype.init = function() {
    va div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  }
  return CreateDiv;
})();
```

+ 用代理实现单例模式
> 通过引入代理类的方式

```javascript
  //将负责管理单例的代码移除，弄一个普通的创建div的类
  var CreateDiv = function(html) {
    this.html = html;
    this.init():
  }
  CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  }

  //引入代理类

  var ProxySingletonCreateDiv= (function() {
    var instance ;
    return function(html) {
      if (!instance) {
        instance = new CreateDiv(html);
      }
      return instance;
    }
  })();

```

+ js中的单例模式
> 本身来讲，js中的全局变量就可以当作单例，但是当项目比较大时，容易造成变量污染
 - 可以使用命名空间
 - 使用闭包封装私有变量

+ 惰性单例
> 在需要的时候才创建对象实例，惰性实例是单例模式的重点

```javascript
 //如在调用Singleton.getInstance的时候才创建
 Singleton.getInstance = (function() {
   var instance = null;
   return function(name) {
     if (!instance) {
       instance = new Singleton(name);
     }
     return instance;
   }
 })()
```

 - 通用的惰性单例
 > 将管理单例的逻辑抽象出来：用一个变量来标志是否创建过对象

 ```javascript
 var getSingle = function(fn) {
   var result;
   return function() {
     return result || (result = fn.apply(this, arguments));
   }
 }

 //这样fn的逻辑可以是创建div，创建fragment,乃至一次性绑定事件
 ```


## 策略模式
 
 > 定义一系列的算法，将它们封装，并且使它们可以相互替换
 > 一个基于策略模式的程序至少由两部分组成：第一部分是策略类，封装了具体算法，负责具体的计算过程，第二部分是环境类Context，Context接受客户的请求，然后将请求委托给某一个策略类。

 ```javascript
  //传统面向对象语言实现会先使用定义类再实现计算类与策略类

  //js中策略模式, 策略往往被函数代替
  //以计算奖金为例（不同级别的奖金计算不同）
  var strategies = {
    S : function(salary) {
      return salary * 4;
    },
    A : function(salary) {
      return salary * 3;
    },
    B: function(salary) {
      return salary * 2;
    }
  }

  //context
  var calculateBonus = function(level, salary) {
    return strategeis[level](salary);
  }
  
 ```

  + 多态在策略模式中的体现
  > 策略模式下，相对而言消除了大量测条件分支语句
  > 如在表单验证的时候，一对象声明验证计算，另一部分进行验证场景的设置，如多验证方式设置等


## 代理模式
  > 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问

  + 保护代理与虚拟代理
  > 保护代理： 控制不同权限的对象对目标对象的访问。
  > 虚拟代理： 将一些开销大的对象，延迟到真正需要的时候才去创建

  + 虚拟代理实现图片的预加载
  > 当大的图片加载时，会先用一个loading图片占位，然后用异步方式加载图片好之后再填充到img节点里。
  > 对于上述场景可以使用虚拟代理

  ```javascript
  //通过代理对象，在图片真正加载好之前，页面会出现一张占位的loading.gif提示图片正在加载
  var myImage = (function() {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
      setSrc : function(src) {
        imgNode.src = src;
      }
    }
  })();

  var proxyImage = (function() {
    var img = new Image();
    img.onload = function() {
      myImage.setSrc(this.src);
    }
    return {
      setSrc: function(src) {
        myImage.setSrc('http://xxx.com/loading.gif');
        img.src = src;
      }
    }
  })()

  proxyImage.setSrc('http://xxx.com/asdsada.jpg);

  ```
  + 缓存代理
  > 可以为一些开销大的运算结果提供暂时的存储，可以供下次运算时使用


## 迭代器模式
  > 提供一种方法顺序访问聚合对象中的各个元素，并且不需要暴露该对象的内部表示

  + 内部迭代器与外部迭代器
  >内部迭代器例如forEach函数

  ```javascript
  //外部迭代器举例

  var Iterator = function(obj) {
    var currnet = 0;
    var next = function() {
      current += 1;
    }

    var isDone = function() {
      return current >= object.length;
    }

    var getCurrentItem = function() {
      return obj[current];
    };
    return {
      next: next,
      isDone: isDone,
      getCurrent: getCurrent
    }
  }

  ```