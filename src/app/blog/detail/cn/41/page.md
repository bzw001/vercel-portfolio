---
title: 常见设计模式-装饰者状态适配器
id: design-04
---

## 装饰者模式
> 当不希望一个类一开始就很庞大，包含很多职责，可以使用装饰者模式
> 装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责
<!--truncate-->
```
// AOP函数 分离业务代码与数据统计代码
// 如在登录button上弹出登录浮层（业务代码），同时要进行上报多少用户点击了这个登录button(数据统计代码)
//常规下
<html>
  <button tag="login" id="button">点击打开浮层</button>
  <script>
    
  var showLogin = function() {
    console.log('打开登录浮层');
    log(this.getAttribute('tag'));
  }

  var log = function(tag) {
    console.log("上报标签为：" + tag);
    (new Image()).src="http://xxx";
  }

  document.getElementById('button').onclick = showLogin;
  </script>
</html>

//使用AOP分离

<script>
  Function.prototype.after = function(afterFn) {
    var _self = this;
    return function () {
      var ret = _self.apply(this, arguments);
      afterFn.apply(this.arguments);
      return ret;
    }
  }

  var showLogin = function() {
    console.log('打开浮层);
  }

  var log = function() {
    console.log('数据上报')
  }

  showLogin = showLogin.after(log);
  document.getElementById('button').onclick = showLogin;
</script>

```

  + 装饰者模式与代理模式的区别
  >代理模式本身是依赖于本体使用的，而装饰者模式在于加入的行为是不依赖于被装饰者的

## 状态模式
>状态模式的关键是把事务的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部

```
 
 <script>
 //按下开发，变换灯的状态(强，弱，关)
 //定义3个状态类
 var OffLineState = function(light) {
   this.light = light;
 }
 OffLineState.prototype.buttonWasPressed = function() {
   console.log('弱光);
   this.light.setState(this.light.WeakLightState); //切换到弱光
 }

 var WeakLightState = function(light) {
   this.light = light;
 }
  WeakLightState.prototype.buttonWasPressed = function() {
    console.log('强光');
    this.light.setState(this.light.strongLightState); //切换到强光
  }

  var StrongLightState = function(light) {
    this.light = light;
  }
  StrongLightState = function() {
    console.log('关灯');
    this.light.setState(this.light.offLightState); //切换到关灯
  }

  //light类
  var Light = function() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.button = null;
  }

  Light.prototype.init = function() {
    var button = document.createElement('button');
    var self = this;
    this.button = document.appendChild(button);
    this.button.innetHTML = "开关";

    this.currState = this.offLightState;//设置当前状态

    this.button.click = functiont() {
      self.currState.buttonWasPressed();
    }
  }

  Light.prototype.setState = function(newState) {
    this.currState = newState;
  }

  //当如果要增加一个超光光的时候，则再增加一个状态类
 </script>
```
  + 状态模式的优缺点
   - 优点在于将行为封装到了状态类里，容易增加新的状态与状态转换，将多个逻辑判断语句换成了单一的状态行为切换
   - 缺点在于当状态比较多时，需要定义多个状态类，同时增加代码的复杂度


## 适配器模式
> 适配器好比插头转换器，当两个实体接口不兼容，同时不适宜改变两个实体的代码来使二者兼容时，适配器应运而生。
> 适配器其实是不得已的选择
> 比如xml与json数据的转换，百度地图与高德地图展示方法的切换等，实现起来并没有固定的模式，只是将这种业务场景下选择的处理方法称为适配者模式。