## 数组的结构赋值
+ 一、使用模式匹配的方式进行变量进行赋值(可以用于多变量值的初始化)
 + 数组、使用对称的方式:
```javascript
    let [a,b,c]=[1,2,3];//相当于声明三个变量，依次等于右边的值
    不完全:
    let [a,,c]=[1,2,3];//c会等于3
    let [a,...c]=[1,2,3];//a为1.c为数组[2,3]
    
    如果右边不具有iterator接口（可以遍历），那么这种形式将会报错
    只要数据结构具有Iterator接口，那么可以使用数组的形式解构赋值
    
```
 + 2、解构赋值如果找不到对应的值或对应的值为undefined可以赋予默认值
```javascript
    let [a=1]=[];//a为1
    let [a,b=1]=[2] //a为2,b为1
    let [a,b==1]=[2,null]//a为2,b为null
    
    在一个同一解构赋值中使用另一个变量:
    let [x=1,y=x]=[];//x=y=1;
    let [x=1,y=x]=[2];//x=y=2
      //注意引用的变量必须是前面声明过的:
    ler [x=y,y=1]=[];//报错
    
    可以使用函数参与赋值：
    function fun(){retrun 1};
    let [a=func()]=[1];//只有当右边的值（[1][0]）为undefined时，函数才会被执行，然后赋值
    
```

  + 3、对象的解构赋值
    + 1。变量必须与属性同名

``` javascript
  let {a,b}={a:1,b:2};//a为1，b为2
  //如果需要有没有对象属性的变量，可以去其他能配对的值
  let [a:c,b:c]={a:1,b:2};//这样c会等于a,d等于b
  
  也可以不在声明时使用:
  let a;
  ({a:c}={a:1})；//必须加上圆括号
  
  也可以使用嵌套的结构:
  let arr=[];
  let obj={};
  
  ({a:obj.a,b:arr[0]}={a:1,b:2});
  
  也可以指定默认值，使用与上面一样
  let {x=3}={x:undefiend};
  
  对象这种方式可以很方便的获得对象的方法赋值给一个变量
  let {log.sin,cos}=Math;
``` 

  + 4、字符串的解构赋值

```javascript
    字符串会被视为数组进行赋值
    let [a,b]='he';//a为'h',b为'e'
    
    同时字符串一样有length属性
    let [length:len]='12345';
    
```

  + 5 、对于不能转变为对象的右边值，会变换成包装对象
  
```javascript
    let {toString:s}=123;//s为toString方法
    因为将123包装成对象的时候就会包含toString方法
```

  + 6、针对函数的参数进行解构赋值
  
```javascript
  function add([x,y]){ return x+y;}
  add([1,2]);//虽然传进来的是一个数组，但是由于函数已经使用解构赋值，
  1,2会被分别赋值给x,y
  
  //函数参数解构时使用默认值
  function move({x=0;y=0}={}){  //这里参数需要传进来一个对象
      return [x,y];
  }
  move({x:3,y:3});//[3,3]
  move({x=3});//[3.0]
```
  + 7、使用圆括号的注意事项
   + 1、只要可能出现解构歧义的地方，就不要使用圆括号
   + 2、解构赋值的时候不使用圆括号的三种方法：
     + 1、变量声明中，不使用  如 let [(a)]=[1];
     + 2、对于函数参数的解构，不使用。如 function func([(x)]){};
     + 3、赋值时，不能将模式的一层放置在圆括号中，如([a])=[1]
   + 3、可以使用圆括号的情况
     + 只有一种，赋值时，非模式的部分，可以使用
     如： [(b)]=[3];

## 变量解构的用途
  + 1、交换变量值
  
```javascript
let x=1;
let b=3;
[x,y]=[y,x];
```
  + 2、从函数中返回多个值同时被多个变量接受
  
```javascript
以往函数返回多个值一般需要使用对象或数组进行包裹被一个变量接受

function func(){
    return [1,2,3]
}
let [a,b,c]=func();
```

  + 3、将一组参数与变量名对应起来
  
```javascript
function f([x,y,z]{});
f([1,2,3])

function f2({x,y,z}{...})
f({x:1,y:2,z:3})

```

  + 4.用于提取JSON数据
  
```javascript
let jsonData={
    id:1,
    states:'ok',
    data:[1,2]
};

let {id,states,data:number}=jsonData;
```

  + 5、直接在声明函数的时候指定函数参数的默认值
  
```javascript
jQuery.ajax=fucntion(url,{async=true,cache=true,..});
```
  + 6、用于遍历map数据结构
  + 7.便捷的获得引入模块的方法
  
```javascript
  const {func1,func2}=require('module1');
```







