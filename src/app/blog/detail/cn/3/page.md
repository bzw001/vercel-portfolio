---
id: es6-04
title: es6-04-对象类型的扩展
---

## 数组的扩展
+ 1、Array.from()  类数组对象与可遍历的对象转换成数组。如遍历DOM返回的nodelist集合，以及函数的arguments对象
```
   var arrayLike={
       '0':1,
       '1':2,
       length:2
   }
   //es5转换的方法
   var arr=[].slice.call(arrayLike);
   //es6
   let arr=Array.from(arrayLike);
   //具有遍历接口的数据  Arrary.from('aa'); //['a','a']
   
   注意，本质上来说只要对象具有length属性，就可以通过这个方法转数组
   
   //这个方法还有第2个参数，类似于map方法，对于元素进行处理放入到返回的数组中
   Array.from(arrayLike,x=>x*x);
   //等同   Array.from(arrayLike.map(x=>x*x))
```

+ 2、Array.of()  将一组值转换成数组，可以理解为es5的Array()或者new Array()
```
   Array.of(1,2,3)//[1,2,3]
```

+ 3、copyWithin() 将指定位置的成员复制到其他位置，其他位置会被覆盖，并且返回当前数组。可以修改当前数组
```
Array.prototype.copyWithin(该位置开始替换数据，从该位置开始读取数据，该位置停止读取)
[1,2,3,4,5].copyWithin(0,3) //[4,5,3,4,5]
```

+ 4、find()与findIndex,可以查找，比indexOf()强大，它们可以执行函数，同时结合Object.is可以发现NaN
+ 5、fill()，用于将数组进行覆盖填充，可以用于数组的初始化.
```
   [1,2,3].fill('a');//  ['a','a','a']
```

+ 6、entries（），keys().values()  ，用于数组遍历，第一个是对键值对的遍历，第2个是对键名的遍历，第3个是对键值对的遍历
```
    for(let index of ['a','b'].keys()){ //其他两个用法一样
        console.log(index);
    }
    for(let [index,elem] of ['a','b'].entries()){ 
        console.log(index);
    }
    
    //比较有趣的方法，遍历器对象的next()方法，每次只去遍历对象的一个值，而且是一次取得
    
    let array=[1,2,3];
    let entries=array.entries();
    console.log(entries.next().value);//[0.1]
    console.log(entries.next().value);//[1.2]
    console.log(entries.next().value);//[2.3]
```

+ 7、includes()   判断某个数组是否包含给定的值
+ 8、对空位的处理，如[,,,]
  >  forEach(), filter(), every() 和some()都会跳过空位。
map()会跳过空位，但会保留这个值
join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

  + Es6会明确将空位转为undefined,这样一些方法就不会略过空位


## 函数的扩展
+ 1、可以直接给函数参数设置默认值
```
    function func(x,y=1){} //如果传来的参数y没有被赋值，那么y=1;
    //这样的好处可以知道哪些参数是不必输的，一些参数以后不传也是可以的.
    let x=99
    function func(y=x+1){console.log(y)};
    func();//100
    func();//101  //取的值是最新的计算的值，也叫惰性取值
```

+ 2、与解构赋值默认值结合使用
```
    function func({x,y=5}){console.log(x,y)};
    func({{x:1}});//1,5
    func({x:1,y:2});//1,2
    
    还有一些用法，这里暂略。
```

+ 3、一般需要设置默认值的参数都会排在后面
+ 4、函数具有length属性，表示没有设置默认值参数的个数，但是注意一点，只计算从第一个设置了默认值参数算起，前面的未设置默认值参数个个数就是length的值
```
    (function(x,y=1){}).length;//1
    （function(x=1,y){}).length;//0
```
+ 5、函数设置默认值的参数会有单独的作用域
```
    let x=3;
    function func(y=x){let x=2;console.log(y)};
    func();//3
    这里参数y=x会形成一个单独的作用域，这里的x由于没有被声明值，就会找到外层的x=3;然后赋值给y,
    函数里得x是不起作用的，如果x在外面找不到值，那么就会报undefined
```

+ 6、利用参数值默认值可以在函数声明时就确定哪些参数不可以省略以及哪些参数可以省略
```
    function throwIfMissing(){
        throw new Error('missing parameter');
        
    }
    
    function func(x=throwIfMissing(),y=undefined);x参数如果被省略，那么就会报错，y可以被省略
```

+ 7、使用rest参数(...变量名)能够接受多余的参数
```
    function add(...values){
        let sum=0;
        for(var val of values){
            sum++=value;
        }
        return sum;
    }
    
    add(1,2,3)//6
    //这里的...values表示将输进来的参数放到values数组中,注意values后面不能再有其它参数
    
    应用：
    1、将一个数组依次作为参数传入到函数中
    function func(x,y,z);
    var args=[1,2,3];
    func(...args);
    
    2、合并数组的新方式
    var arr1=[1,2,3];
    var arr2=[4,5,6];
    var arr3=[7,8,9];
    [...arr1,...arr2,...arr3];
    
    3、与解构进行结合
    const [first,...rest]=[1,2,3,4];
    first;//1
    rest;//[2,3,4]
```

+ 8 、函数的name属性，es5与es6有点不同
```
    function func(){};
    func.name;//'func'
    
    var func2=function(){};
    func2.name;//es5为'',es6为 'func2'
```

## 箭头函数
+ 1、箭头函数使用规则：
```
    1、(x)=>x,直接小括号内写入参数，当需要执行多个代码时，使用大括号将代码包住，如
    ()=>{console.log('a');return 1}.
    2、如果需要直接返回对象，需要加上小括号:()=>({x:1});
    3、可以与解构结合起来，（{first，second}}=？first+''+second
    4、最有意义的一点，它的this不根据运行环境改变而改变，在声明时就绑定。者对于回调来说有很大好处。
    5、不能与new结合使用，以及函数内不使用arguments，可以使用rest代替。
    
    注意一点，本身箭头函数没有自己产生的this,需要依靠外边的this.所以使用call,applay,
    或者bind都不能改变箭头函数的this的指向。
    
```
+ 2.多重嵌套函数与管道机制
```
        let insert=(value)=>({into:(array)=>({after:(aftervalue)=>{array.splice(array.indexOf(afterValue)+1,0,value)}})})
        
        管道机制：
        
        const pipeline=(...funcs)=>val=>funcs.reduce((a,b)=>b(a),val)
```


## es7的提案，使用运算符来绑定this（babel转换器已经实现）
```
    foo::func;//将左边的foo作为func的绑定的this,就是func,bind(foo);
    foo:func(...argumnets);//就是func,bind(foo,arguments);
    
    还有一种用法。
```

## 尾调用
```
  尾调用: function func(){return func2();};//最后一步调用一个函数，只是最单纯的调用.
  尾调用优化：一个函数调用就会产生一个调用记录，即调用帧，如果a函数里面执行b函数，而且b函数的执行使用了外层的内部变量信息。那么上一层的调用帧会保存，如果这种调用帧产生的多了，将非常的损耗资源。
  如:
  function func(){
      let m=1;
      let n=2;
      return g(m+n);
  }
  //等同于g(3)
  
  这种情况就不能尾调用优化:
  function addone(a){
      var one=1;
      function inner(b){
          return b+one;
      }
      
      return inner(a);
  }
 
 es6的尾调用优化只在严格模式下开启。因为正常模式下，函数有arguments与caller跟踪函数的调用栈
```

## 尾递归
```
    function afactorial(n,total=1){//计算阶乘
        if(n==1) return total;
        return factorail(n-1,n*total);
    }
```