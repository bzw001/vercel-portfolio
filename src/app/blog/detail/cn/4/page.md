---
title: es6-05-对象的扩展(补充)
id: es6-05
---

+ 1、属性的简洁表示

```
    属性简写: var x=3;
              var b={x};//等同于b={x:x}
              
    方法简写:  var obj={
        x,
        class()=>{this.x};//等同于'class':function(){return this.x};class这里是字符串，不会被认为是关键字
    } 
```

+ 2、属性名可以使用表达式，但是不可以与简洁方式同用
```
    var objProperty='aaa';
    
    var obj2[objProperty]=3;//相当于var obj2['aaa']=3;
    
    这种方式报错
    var obj3={[objproperty]};//报错
```

+ 3、函数的name属性能返回函数名，方法也可以

+ 4、Object.is()判断两个值是否严格相等
```
    与===的唯一两处差别:
    +0===-0;//true
    Object.is(+0,-0);//false
    
    NaN===NaN;//false
    Object.is(NaN,NaN);//true
```

+ 5.Object.assign(target,source1,source2)  用于对象的合并，将源对象(source)的可枚举的属性覆盖性的复制给目标对象（target）,
注意这个方法是浅拷贝，如果属性是一个对象，那么只是复制对该对象的引用。

```
   Object.assign()的作用：
   复制对象与为属性指定默认值。
```

+ 6、属性的可枚举性
使用Object,getOwnPropertyDescriptor方法可以获取该属性的描述对象
```
    let obj={foo:123};
    Object.getOwnPropertyscriptor(obj,'foo');
    打印://{
        value:123,
        writebale:true;
        enumberable:true;
        configurable:true
    }
    
    对于enumberanle为false的属性，for in ,Object.keys(),JSON.stringify(),Object.assign()会忽略这个属性
    
    只关心对象自身的属性，尽量使用Object,keys()，而不是for in 
```

+ 7、5种属性的遍历方法:
```
   for in :遍历自身与可继承的可枚举属性，不含symbol属性
   Object.keys(obj) ：所有可枚举属性，不包含继承的与symbol属性
   Object.getOwnPropertyNames(obj): 返回一个数组包含对象所有属性，不含symbol与不可枚举属性
   
   Object.getOwnPropertySymbols(obj):返回一个数组，包含对象自身所有symbol属性
   
   Reflect.ownKeys(obj):返回一个数组，包含对象自身的所有属性，不管的是symbol还是其他
   
   这5种遍历，首先遍历属性名为数值的属性，按照数字排序，然后字符串，然后symbol
```

+ 8、关于原型方法,不要使用__proto__
```
    Object.setPrototypeOf(object,prototype);设置一个对象的 prototype对象
    Object.getPrototypeOf(obj);//读取一个对象的原型对象
    Objcet.create()
```