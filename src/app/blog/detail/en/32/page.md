---
title: vue剖析笔记03-依赖收集追踪原理
id: vue-05
---



## 什么是依赖收集
> 收集一个数据被哪些数据、模型、dom等所使用。这样当数据源改变的时候，能够针对性的对依赖数据源的数据进行操作。

- 先实现一个订阅者Dep
> 用来存放watcher观察者对象
```javascript
    class Dep {
        constructor () {
            //存放watcher对象的数组
            this.subs = [];
        }
        //添加一个watcher
        addSub(sub) {
            this.sub.push(sub);
        }
        //通知所有watcher对象更新视图
        notify() {
            this.subs.forEach( (sub) => {
                subs.update();
            })
        }
    }
```

- 再实现一个观察者watcher
```javascript
    class Watcher() {
        contructor () {
            // new 一个watcher对象时赋值给Dep.target。再get中会用到
            Dep.target = this;
        }
        update () {
            console.log('视图更新了')
        }
    }
    Dep.target = null;
```

- 开始依赖收集了
>什么时机触发收集(当对象被读的时候)，收集放到哪里去（放到Dep中），收集干嘛（数据被写的时候，会通知Dep的notify去调相应的处理函数）？

```javascript
  实现： 增加一个Dep类对象，当对象被读的时候，将watcher对象推入，当对象被写的时候Dep进行notify,然后watcher会执行update

  function defineReactive (obj, key, val) {
      const dep = new Dep();

      Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get: function reactiveGetter () {
              //将Dep.target(即watcher)推入Dep中
              dep.addSubs(Dep.target);
              return val;
          }
          set: fucntion reactiveSetter (newVal) {
              if (newVal === val) return;
              //set出发dep的notify
              dep.nofity();
          } 
      })
  }

  class Vue {
      constructor () {
          this._data = options.data;
          //observer 过程会注册get方法，用来依赖收集
          observe(this._data);
          //新建一个watcher对象，Dep.target会指向这个watcher对象
          new Watcher();
          // 模拟render过程，触发数据源的get函数
          console.log('render', this._data.test);
      }
  }
```

- 在vue中依赖收集的过程
> observer过程会注册get方法，其闭包会包含一个Dep对象，产生一个新的Watcher时，Dep.target会指向这个对象，然后会addSub();
> 数据变化后，set会调用Dep对象的notify方法通知它内部所有的watcher对象进行视图更新
> 那个什么时候会触发get来依赖收集呢： render function

- 总结：
> 第一次渲染会触发get进行依赖收集（采用的是观察者模式,观察者将自己注册到具体目标，当目标发生变化时，调用观察者的更新方法。不同与发布/订阅模式，这种模式在于
>订阅者与发布者之间存在调度中心，事件发布后，订阅者产生的动作由调动中心负责。），依赖收集集中在observe实现中，包括订阅者，观察者，definereactive等的实现。
> 当set触发后，会notify Dep调用subs中所有的Watcher进行更新。更新操作设计到patchVnode操作等。
> 这里使用观察者模式，在于订阅者与观察者是直接相关的，不需要一个总的调度中心来通知与调用。在于订阅者的变化是否强关联观察者的。
> 在这里，对象的值变化行为，是深刻关联其所影响的watcher(相关联的虚拟dom)。
