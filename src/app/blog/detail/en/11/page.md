# ES6-12-Genarator function

+ 1, what is the general
> Asynchronous programming solution.First of all, it is a function, combined with yield, encapsulated a variety of states, and has reached asynchronous programming.

+ 2、Generator的基本使用
```javascript
  1、Writing: after function+ *, and then the internal yield setting status
  example:
      function* heGenerator(){
          yield ''hello;
          yield "world";
          return "ending";
      }
      
       let hW=heGenerator();//Here is equivalent to generating a traversal object
       conso;e.log(hw.next()); //{value:'hello',done:false};
        conso;e.log(hw.next()); //{value:'world',done:false};
        conso;e.log(hw.next()); //{value:'ending',done:true};
   
   
  2. The operating logic of the traverser object NEXT:
A. When the function is running, when encountering a Yeild expression, the post -code will be stopped. The values ​​that follow the follow -up of Yield as a value, combined with the Done attribute value as an object.
B. Always next, know the RETURN statement, if not, you know that the code segment is over, and the returned value is undefient.

3. The code in the function needs to call the next to the generator object to execute.Even if there is no yield
example:
          function* f(){
              console.log('f执行')
          }
          
          var generatot=f();
          setTimeout(function(){
              generator.next();
          },1000)
          
    4、Use details
      A, Yiled can only be placed in the Generator function, and it will report an error in other places.
B. If yield is mixed with other expressions, you need to add a bracket. If it is a function parameter or the right side of the assignment expression, you don’t need to add
example:
            function* demo(){
                foo(yield 'a',yiled 'b');
                console.log('hello'+yield);
            }
       c、Note that a yield represents a pause, whether it is a function parameter or something.
          foo(yiled 'a',yield 'b');After the suspension of NEXT three times, the FOO function will be executed
          
```

+ 3、The clever relationship with the Internet
```javascript
   The Generator function is the generator generate function, so the Symbol.itrator property of the generator to the object can give the object the ITERATOR interface
example: 
       var myIterable={};
       myIterable[Symbol.iterator]=function* (){
           yield 1;
           yield 2;
           yield 3;
       };
       
       [...myInterable];//[1,2,3]
       
       Genertor The function returns a traverser object, which also has Symbol.itrator attribute
       function * gen(){};
       var g=gen();
       g[Symbol.iterator]()===g;//Symbol.itrator returns to himself after execution

```

+ 4、The parameter of the Next method
```javascript
Yield's expression itself does not have a clear return value (always returning Undefined).The Next method can bring a parameter, which can be used as the return value of the previous Yield expression.
Note that the parameter value of the next time is the return value of the last Yield.When Yield returns the value to participate in the specific operation, the NEXT parameter plays a role.

The significance of this: It can adjust the function behavior through the parameters of the function to pass the parameters at different stages of the function.
example：
       function* foo(x){
           let y=2*(yield (x+1));
           let z=yield(y/3);
           return  (x+y+z);
       }
       
       var a=foo(5);
       a.next();//{value:6,done:false}
       a.next();//{value:NaN,done:false}
       a.next();//{value:NaN,done:true}
       
       var b=foo(5);
       b.next();//{value:5,done:false};
       b.next(12);//{value:8,done:false};
```

+ 5、The relationship with for ... of
```javascript
    1、For ... of can automatically traverse the generator object, without the needle method
      function* foo(){
          yield 1;
          yield 2;
          yield 3;
          return 4;
      }
      
      for(let v of foo()){
          console.log(v);// 1 2 3 
      }
      Note that when the Done attribute of the returned object is true, the for ... of the loop will be terminated without returning the object, so the value returned by the Return above will not return.
      
    2、Write a method that can be used to traverse all objects with for ... of.
       例:
          function* ObjectEntries(obj){
              let proprKeys=Reflect.ownKeys(obj;
              for(let propKey of propKeys){
                  yield [propkey,obj[propKey]];
              }
          }
          
          let obj={a:'a',b:'b'};
          for(let [key,value] of ObjectEntrise(obj)){
              console.log(`$[key]:${value}`);
          }
          
          也可以将这个方法加到对象的Symnol.iterator上
            function* objectEntries(){
                let propKeys=Reflect.ownKeys(this);
                for(let propKey of propKeys ){
                yield [propKey,this[propKey]];
                }
            }
            Object.prototype[Symbol.iterator]=objectEntries;

            for(let [key,value] of {a:"a",b:'b'}){
                console.log(`${key}:${value}`)
            }
            
    3、Extended operators (...), deconstructing and assignment, Array.from method internal Dioron, all traverser interfaces, can be
The ITERATOR object returned by the Generator function as a parameter.
       function* numbers(){
           yield 1;
           yeild 2;
           return 3;
           yield  4;
       }
       
       [...numbers()];//[1,2]
       Array.from(numbers());//[1,2]
       let [x,y]=numbers();//[1,2]
       
```

+ 6、Method of the traverser object
```javascript
    1、Generator.prototype.throw (), throw an error outside the function, the generator function can be captured in the body
      example:
      let g=function* (){
          try{
              yeild;
          }catch(e){
              console.log('内部捕获',e);
          }
      }
      var i=g();
      i.next();
      
      try{
          i.throw('a');
          i.throw('b');
      }catch(e){
          console.log('外部获取',e);
      }
      The first capture was the internal capture of the Generator function. After it was captured, the second Throw was captured by the outside.

Note: After the Throw method is captured, it will be attached to the next YIELD expression
When the Generator is executed, it will not be executed without being captured inside.If you continue to execute the Next method,
Then it will return {value: undefined, do: true} ;, JS engine will think that this generator traversal is over.
      
    2、Generator。prototype.return()  Return to the specified value and end the traversal.Equivalent to end the traversal in advance
example:
        function * gen(){
            yield 1;
            yield 2;
            yield 3;
        }
        
        let g=gen();
        g.next();//{value:1,done:false}
        g.return('a');//{value:'a',done:true};
        g.next();//{value:undefined,done:true};
        
      If there is a TRY-FINNALY code block inside the generator function, the Return party lao is postponed to the Finally code block execution.
        function* numbers(){
            yield 1;
            try{
                yield 2;
                yield 3;
            }finally{
                yield 4;
            }
        }
        let g=numbers();
        g.next();
        g.mext();
        g.return(7);//{value:4,done:false};
        g.next() //{value:5,done:false}
        g.next()//{value:7.done:true}
      
    
```

+ 7、yield* expression
```javascript
    1. Calling another Generator in the Generator function is useless by default.You need to use yield*to include the traverser.
     example:
        function* foo(){
            yield 'a';
            yield 'b';
        }
        
        function* bar(){
            yield 'x';
            yield* foo();
        }
      //Equivalent to
        
        function* bar(){
            yield 'x';
            yield 'a';
            yield  'b';
        }
       //Equivalent to
        function* bar(){
            yield 'x';
            for(let v of bar()){
                \yield v;
            }
        
        }
        
       Note that if you do not use yield*, then the back is a genetor traveler object.

If there is a Return statement, you need to use it
The value of var value = yield* Iterator Get the value of the Return statement.

In fact, as long as yield*follows a data structure with the Iterator interface, you can be traveled by yield.
example:
            function* gen(){
                yield* ['a','b','c'];
            }
            gen.next();//{value:'a',done:false}
            
        yield* All members of the nested arrays traversed out
        example: 
           function* itemTree(tree){
               if(Array.isArray(tree)){
                   for(let i=0;i<tree.length;i++){
                       yield* iterTree(tree[i]);
                   }
               }else{
                   yield tree;
               }
           }
           
           consot tree=[1,2,[1,2],[2]];
           
           for(let x of iterTree(tree)){
               console.log(x);
           }
           
         
        yield* Sentence traversal completely binary tree
        example:
          // The constructor of the binary tree
// The three parameters are the left tree, the current node, the right tree
          function Tree(left,label,right){
              this.left=left;
              this.label=label;
              this.right=right;
          }
          
          // In the preface to traverse the function
// Return a traveler and use the generator function
// The function of recursive algorithms is adopted in the body, so the left tree and the right tree need to use yield*traversal
          function* inorder(t){
              if(t){
                  yield* inorder(t.left);
                  yield t.label;
                  yield* inorder(t.right);
              }
          }
          
          //Generate a binary tree
          function make(array){
              //判断是否是叶节点
              if(Array.length==1) return new Tree(null.array[0],null);
              return new Tree(make(array[0],array[1],make(array[2])));
          }
          let tree=make([[['a'],'b',['c'],'d',[['e'],'f',['g']]]]);
          //Traversing a binary tree
          var result=[];
          for(let node of inorder(tree)){
              result.push(node);
          }
          console.log(result);
          
```

+ 8、GEMERATOR function as an object attribute
```javascript
    Brief:
       let obj={
           * myGen(){
               ...
           }
       }
```

+ 9、The this of the generator function
```javascript
  The Generator function always returns a traveler, which will integrate the method of the generator function prototype object.
When the Prototype defines the attribute, the generator can also use the attribute
The generator function cannot be used directly with New.

Combined with the prototype of the Generator function, the new object with the attribute of the traversal.
example:
    function* gen(){
        this.a=1;
        yield this.b=2;
        yield this.c=3;
    }
    
    function F(){
        return gen.call(gem.prototype);
    }
    
    var f=new F();
    f.next();//{value:2,done:false};
    f.next();//{value:3,done:false};
    f.next();// {value:undefined,done:true};
    
    f.a;//1
    f.b;//2
    f.c;//3
```

+ 10、The role of generator
```javascript
   1. Implement the state machine
     var clock=function* (){
         while(true){
             console.log('true');
             yield;
             console.log('false');
             yield;
         }
     }
     
   2. Generator and corporate
JS is a single -threaded language. It can only maintain a call stack. After the introduction of the coroutine, each task can maintain its own call stack.
In this way, when you throw the error, you can find the original call stack.
If the generator function is used as an coroutine, multiple task correlations that need to work with each other.
They exchange control through Yield expressions.

3. Synchronous expression of asynchronous operation
The subsequent operation of the asynchronous operation can be placed under the yield expression, and it can be executed by calling the Next method.
In this way, the generator function can be used to handle asynchronous operations.

example：
          function* loadUi(){
              showLoadingScreen();
              yield loadUiDataAsynchronously();
              hideLoadingScreen();
          }
          
          let loader=loadUi();
          loader.next();//Load the UI and load data asynchronously
          loader.next();//Hidden UI
          
        例: ajax操作
           function* main(){
               let result=yield request("http://aaa.");
               let resp=Json.parse(result);
               console.log(resp.value);
           } 
           
           function request(url){
               makeAjaxCall(url,function(response){
                   it.next(response);
               })
           }
           
           let ir=main();
           it.next();
          //Make Ajax operation more natural.
          
        Example: Read text files one by one
           function* numbers(){
               let file=new fileReader('number.text');
               try{
                   while(!file.eof){
                       yield parseInt(file.readLine().10);
                   }
               }finally{
                   file.close();
               }
           }
           
    4. Control flow management, make more step operations more intuitive
      //Return function version
      step1(function(value1){
          step2(value1,function(value2){
              step2(value2,function(value3){
                  step4(value3,function(value4){
                      ...
                  })
              })
          })
      })
      
      //Promise version
      Promise.resolve(step1)
             .then(step2)
             .then(step3)
             .then(step4)
             .then(function(value4){
                 ...
             },function(error){
                 ...
             })
             .done();
             
      //Generator function version
      function* longRunningTask(value1){
          try{
              let value2=yield step1(value1);
              let value3=yield step2(value2);
              let value4=yield.step3(value3);
              let value5=yield step4(value4);
          }catch(e){
              ...
          }
      }
      
      scheduler(longRunningTask(initialValue));
      function scheduler(task){
          let taskObj=task.next(task.value);
          if(!taskObj.done){
              task.value=taskObj.value;
              scheduler(task);
          }
      }//This is only suitable for synchronous operations.
      
      For ... of is essentially a while loop
      
      5. Deploy the IRTATOR interface to the object
      
    
```
