---
title: JS常见设计模式-发布订阅命令组合模板享元职责中介者
id: design-03
---

## 发布-订阅模式
> 发布-订阅模式又叫观察者模式，其定义对象间的一种一对多的依赖关系，当一个兑现的状态发生改变时，所有依赖于它的对象都将得到通知。
> js中一般用事件模型来替代传统的发布-订阅模式,例如dom事件

+ 自定义事件
  - 实现发布-订阅模式
   - 指定发布者
   - 给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者
   - 最后发布消息时，发布者会遍历缓存列表，依次触发里面的订阅者回调函数
   
   ```
  var salesOffices = {};
  salesOffices.clientList = [];
  salesOffices.listen = function(fn) {
    this.clientList.push(fn);
  }

  salesOffices.trigger = function() {
    for (var i = 0, fn; fn = this.clientList[i++];) {
      fn.apply(this, arguments);
    }
  }
   ```

   - 发布-订阅模式的通用实现

   ```
    var event = {
      clientList: {},
      listen: function(key, fn) {
        if (!this.clientList[key]) {
          this.clientList[key] = [];
        }

        this.clientList[key].push(fn);
      },
      trigger: function() {
        var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key];

        if (!fns || fns.length === 0) {
          return false;
        }

        for(var i = 0, fn = fns[ i++ ]) {
          fn.apply(this, arguments);
        }
      },
      remove = function(key, fn) {
        var fns = this.clientList[key];

        if (!fns) {
          return false;
        }
        if (!fn) {
          fns && (fns.length = 0);//取消该key所有订阅
        } else {
          for (var l = fns.length -1; l >= 0; l--) {
            var _fn = fns[l];
            if (_fn === fn) {
              fns.splice(l , 1);
            }
          } 
        }
      }
    }
   ```

   - 对于先订阅再发布的场景
   >可以建立一个存放离线事件的堆栈，当事件发布的时候，如果还没有订阅者订阅这个事件，，可以将发布事件的动作包裹在一个函数，包装函数存入到堆栈中，等有对象订阅次事件时，遍历堆栈一次执行包装函数



## 命令模式
> 命令模式最常见的应用场景: 当需要向某些对象发送请求，但并不知道请求的接收者是谁，也不知道被请求后的操作是什么。命令模式弄消除请求发起者与接收者之间的耦合关系

## 组合模式
> 用小的子对象来构建更大的对象，而子对象由更小的子对象构成。组合模式将对象组合成树形结果，以表示部分-整体的层次结构
> 只有用一致的方式对待列表中的每个叶对象的时候，才适合使用组合模式


## 模板方法模式
> 模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。父类会封装子类的算法框架（包括一些公关方法以及封装子类中所有方法的执行顺序），子类通过集成这个抽象类，也会集成整个算法结构，并且可以选择重写父类的方法
> 相同部分留给父类，不同部分留给子类实现。通过封装变化来提高系统扩展性

```
  //例子：泡咖啡与茶
  两个动作都有着共同点：煮沸水，到人杯子，倒入饮料（咖啡/茶）
  这些共同基本动作可以抽象成父类的方法，同时init顺序调用其固定的动作
  然后coffer类与子类通过prototype继承父类，重写其独特的方法，最后都会调用init方法完成动作
  
  //这里的init便可以称为模板方法，因为其封装了子类的算法框架，指导子类以何种顺序去执行哪些方法。

```
+ 使用场景
> 大的方面讲，模板方法模式常用语搭建项目的框架，定好框架的骨架后，然后几成框架的结果进行填空。


## 享元模式
> 享元模式核心在于运用共享技术来有效支持大量细粒度的对象，当系统创建了大量类似的对象而导致内存占用过高，可以使用享元模式。
> 适合一个程序中使用了大量的相似对象，同时对象的大多数状态都可以变为外部状态 。例如文件上传

+ 内部状态与外部状态
  > 享元模式将对象的属性划分为内部状态与外部状态。内部状态存储于对象内部，同时被一些对象共享，通常不会改变，外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享

 + 对象池
 > 对于创建过的对象进行循环利用
 
 ```
 //通用对象池实现
 var objectPoolFactory = function(createObjFn) {
   var objectPool = [];
   return {
     create : function () {
       var obj = objectPool.length === 0 ?
                createObjFn.apply(this, arguments) : objectPool.shift();
        return obj;
     },

     recover: function(obj) {
       objectPool.push(obj);
     }
   }
 }
 ```
  
## 职责链模式
> 对于一个请求，多个对象都有机会处理请求，这些对象形成一条链，请求会沿着链传递，直到被处理为止
> 优势： 请求者只需要知道一个处理链中的一个节点，并不需要知道真正的处理者，从而弱化发送者与接收者的强联系。
> 无论是作用域链，原型链，还是DOM节点中的事件冒泡，都可找到职责链模式的影子

```
  //一个支付定金购买的例子
  //正式购买后：
  a、已经支付过500元定金的用户，收到100元的优惠券
  b、已经支付过200元的用户，收到50元的优惠券
  c、未支付定金的进入普通购买模式，没有优惠券，同时库存不足下，不能购买
  // 可传入3个字段
  orderType: 订单类型， 1-- 500元定金用户, 2 -- 200元定金用户， 3 -- 未支付定金的普通用户
  pay: true/false 表示是否已经支付定金，未支付定金相当于普通用户
  stock: 普通用户可购买的手机数量库存，支付定金（500/200）的用户不受此限制

  //根据流程直接怼， 简单快
  var order = function (orderType, pay, stock) {
    if (orderType === 1) {//500元定金用户
      if (pay) {
        console.log('得到100优惠券') 
      } else {
        if (stock > 0) {
          console.log('无优惠券);
        } else {
          console.log('手机库存不足，无法购买')
        }
      }
    } 
    else if (orderType === 2) {
      if (pay) {
        console.log('获取50优惠券');
      } else {
        if (stock > 0) {
          console.log('无优惠券);
        } else {
          console.log('手机库存不足，无法购买')
        }
      }

    } 
    else if (orderType === 3) {
      if (stock > 0) {
        console.log('无优惠券);
      } else {
         console.log('手机库存不足，无法购买')
      }
    }
  } 

  //职责链模式重构代码 
  //将分支逻辑拆成节点函数，同时通过返回表示请求是否被当前节点处理

  var order500 = function(orderType, pay ,stock) {
    if (orderType === 1 && pay === true) {
      console.log('获得100优惠券');
    } else {
      return true;// 表示给下一个节点处理
    }
  }

  var order200 = function(orderType, pay , stock) {
    if (orderType === 2 && pay === true) {
      console.log('获得50优惠券');
    } else {
      return true;
    }
  }

  var orderNomal = function(orderType, pay, stock) {
    if (stock > 0) {
      console.log('普通购买');
    } else {
      console.log('库存不足，不能购买');
    } 
  }

  //职责链节点
  var chain = function(fn) {
    this.fn = fn;
    this.successor = null;
  }

  chain.prototype.setNextSuccessor = function(successor) {
    return this.successor = successor;
  }

  chain.prototype.passRequest = function(){
    var ret = this.fn.apply(this, arguments);
    if (ret) {
      return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }
    return ret;
  }
  //将业务函数包装成职责链的节点
  var chainOrder500 = new Chain(order500);
  var chainOrder200 = new Chain(order200);
  var chainOrderNormal = new Chain(orderNormal);

  //指定节点顺序
  chainOrder500.setNextSuccessor(chainOrder200);
  chainOrder200.setNextSuccessor(chainOrderNormal);

  //请求处理给第一个节点
  chainOder500.passRequest(1, true, 500); // 100优惠券
  chainOder500.passRequest(2, true, 500); // 50优惠券
```

+ 异步的职责链
> 在节点函数中能进行异步请求,在职责链的节点行进依赖于异步请求的结果

```
 // 增加next方法，需要手动的传递请求给职责链的下一个节点

 Chain.prototype.next = function() {
   return this.successor && this.successor.passReuqest.apply(this.succesor, arguments);

 }
```

## 中介者模式
> 面向对象鼓励将行为分布到各个对象中，把对象划分为更小的粒度，有助于增强对象可复用性，但是对象增多，同时联系激增下可能会降低它们的复用性
> 中介者模式作用就是解决对象与对象之间的耦合关系。对象通过中介者来通信，而不是相互引用
> 中介者模式是迎合迪米特法则（最少知识原则，一个对象应该尽少了解另外的对象）的一种实现。
>本身中介者的维护也是存在一定代价的，当程序的维护或者调用困难主要是对象间的高耦合度造成，可以试试中介者模式

```


//中介者模式, 实现常见游戏玩家/团队对决的决胜关系

function Player(name, teamColor) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = 'alive';
} 

Player.prototype.win = function() {
  console.log(this.name + 'won');
}

Player.prototype.lose = function () {
  console.log(this.name + 'lost');
}

//玩家死忙
Player.prototype.die = function() {
  this.state = 'dead';
  playerDirector.reciveMassage('palyerDead', this); //给中介者发送消息,万鸡死亡
}

//移除玩家

Player.prototype.remove = function() {
  playerDirector.reciveMassage('removePlayer', this);// 给中介者发送消息，移除一个玩家
}

//玩家换队

Player.prototype.changeTeam = function(color){
  playerDirector.reciveMassage('changeTeam', this, color);//玩家换队
}

//玩家工厂

var playerFactory = function (name, teamColor) {
  var newPlayer = new Player (name, teamColor);
  playerDirector.reciveMassage('addPlayer', this);
  return newPlayer;
}

//中介者 playerDirector

var playerDirector = (function() {
  var players = {};
  var operations = {}; //中介者可以执行的操作
  
  //新增玩家
  operations.addPlayer = function(player) {
    var teamColor = player.teamColor; //玩家的队伍颜色
    players[teamColor] = players[teamColor] || [];
    players[teamColor].push(player);
  }

  //移除一个玩家
  operations.removePlayer = function(player) {
    var teamColor = player.teamColor;
    var teamPlayers = players[teamColor] || [];
    for (var i = teamPlayers.length - 1; i >=0; i--) {
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  }

  //玩家换队
  operations.changeTeam = function(player, newTeamColor) {
    oprations.removePlayer(player);
    player.teamColor = newTeamColor;
    oprations.addPlayer(player);
  }

  oprations.palyerDead = function(player) {
    var teamColor = player.teamColor;
    var teamPlayers = players[teamColor];

    var all_dead = true;
    for (var i = 0 , player; player = teamPlayers[i ++];) {
      if (player.state !== 'dead') {
        all_dead = false;
        break;
      }
    }

    if (all_dead === true) {
      for (var i = 0, player; player = teamPlayers[i++]){
        player.lose();
      }

      for (var color in players) {
        if (color !== teamColor) {
          var teamPlayers = players[color];
          for (var i = 0, player; player = teamPlayers[i++]) {
            player.win();
          }
        }
      }
    }
  }

  var reciveMassage = function () {
    var message = Array.prototype.shift.call(arguments); //获取消息名称
    if (oprations[message]) {
      oprations[message].apply(this, arguments);
    }
  }
})();
```