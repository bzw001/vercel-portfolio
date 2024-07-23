---
title: 编程建议
id: design-05
---

> 设计模式可以当做设计原则在某些方面的强化，指明编程的方向
> 常见设计原则： 单一职责原则，里氏替换原则，依赖导致原则，接口隔离原则，合成复用原则，最少知识原则

## 单一职责原则(SRP)
> 如果一个方法有两个动机去修改它，那么这个就便有两个职责。SRP原则体现为：一个对象只做一件事情

## 最少知识原则
> 一个软件实体(包括系统，类，模块，函数等)应当尽可能少地与其他实体发生相互作用
> 设计程序时，尽可能减少对象之间的交互。

  + 设计模式中的最少知识原则
  > 最少知识原则在设计模式中体现最多的地方是中介者模式与外观模式

## 开发封闭原则
> 很多时候，一个程序具有良好的设计，往往说明其是符合开放-封闭原则的
> 软件实体等应该是可以扩展的，但是不可修改
  + 挑选出最容易变化的地方，构造抽象来封闭这些变化
  + 早不可避免发生修改的时候，尽量修改那些相对容易修改的地方。比如配置文件


## 接口与面向接口编程
> 接口是对象能响应的请求的集合。面向接口编程也可以看成面向抽象编程，接口相当于抽象方法的契约行为，其暴露一个类或者对象能够做什么，但是不关心具体实现

```javascript

//interFace改写基于抽象类的代码
//定义Animal接口，所有实现了Animal接口的动物类都拥有Animal接口中约定的行为

public interface Animal {
  abstract void makeSound();
}

public class Duck implemenets Animal  {
  public void makeSound() {
    System.out.printIn("嘎嘎嘎");
  }
}

public class Chicken implements Animal {
  public void makeSound() {
    System.out.printIn("咯咯咯");
  }
}

public class AnimalSound {
  publick void makeSound(Animal animal) {
    animal.makeSound();
  }
}

public class Test {
  public static void main (String args[]) {
    Anima duck = new Duck();
    Animal chicken = new Chicken();

    AnimalSound animalSound = new AnimalSound();
    animalSound.makeSound(duck);
    animalSound.makeSound(chicken);
  }
}

```

## 代码重构

+ 提炼函数
  - 避免超大函数
  - 独立出来的函数有助于代码复用
  - 独立出来的函数更容易被覆写
  - 独立出来的函数拥有良好的命名，其本身就起到注释的作用

+ 合并重复的条件片段

+ 条件分支语句提炼成函数
+ 合理使用循环
+ 提前让函数退出代替嵌套条件分支
+ 传递对象参数 代替过长的参数列表
+ 尽量减少参数数量
+ 少用三目运算符
+ 合理使用链式调用
> 容易造成调试困难或者维护困难
+ 分解大型类
> 鼓励将行为分布在合理数量的更小对象之中
+ 使用return退出多重循环