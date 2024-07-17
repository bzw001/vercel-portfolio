---
title: Angular2学习笔记-依赖注入
id: ang-07
---

## 一、依赖注入概述

```
//依赖注入能够在应用时替换依赖对象，而不是编译时
/**
 * 1、如何在组件，服务，模块注入服务
 * 2、层级注入
 * 3、注入到派生组件
 * 4、限定方式的依赖注入
 * 5、四种Provider注册形式
 */
//依赖注入的使用，利于各个组件的解耦，代码易于维护，提升开发效率。

/**
 * 依赖注入的三个概念：
 * 1、注入器（Injector）：用户创建依赖对象实例
 * 2、Provider:配置注入器
 * 3、依赖（Dependence）：指定被依赖对象的类型
 */

 //1、如何在组件中注入服务
 /**
  * 1、import导入被依赖对象的服务
    2、组件中配置注入器
    3、组件的构造函数声明需要注入的依赖
    其子组件都可以使用这个服务
  */
  

  //1、导入
  import {sharData} from 'sharData.ser';
import { shardData } from '../project/ng2test/src/app/services/shardData.ser';
  @Component({
      moduleOd:module.id,
      selector:'test-comp',
      //2、配置注入器
      providers:[sharData],
      templateUrl:'',
      styleUrls:[]
  })
  export class testComponent{
      //3、组件构造函数声明使用
      constructor(
          _shardData:shardData
      ){}
  }
  //每一个组件都有自己的注入器，但是一旦从provider中注明引入，那么就会产生一个新的服务的实例



  //如何在服务中注入服务
  //示例：
  import {Injetable} from '@angular/core';

  @Injectable()
  export class LoggerService{
      log(message:string){
          console.log(message)
      }
  }
//在服务中引入上一个日志服务
import {Injectable} from '@anuglar/core';
import {LoggerService} from 'logger.ser';

@injectable()
export class ContactService{
    //在构造函数中引入被注入的服务
    constructor(_logger:LoggerService){};
    getConllections(){
        this._logger.log("hello");
    }
}
//引入的步骤一样：导入，在构造函数引入


//如何在模块中注入服务
//模块下的组件都会共用这一个服务实例
//在app启动的NgModule里注册的服务默认在整个程序内可使用
//使用：直接在元数据providers注入即可
/**
 * 多模块引入相同服务注意点：
 * 1、在根模块中引入的模块，模块内部如果使用相同的服务，那么以后面模块为准
 * 2、如果是一个模块引入另一个模块，两个模块都引入相同的服务，那么以上级模块为准。
 * 因为angular是没有模块作用域这一概念的。
 */

 /**
  * 服务可以放在根模块，子模块，组件，服务里，这个根据不同的应用场景下进行区分。对于延迟加载的模块，如果需要调用组件内服务，其服务最好放在根模块里。
  */

  //服务实例的查找路径：先从本地组件找，然后父组件，最后到模块。如果都找不到就报错。可以现在依赖注入控制的查找范围

  //派生组件以及派生组件中的服务引入
  
  //组件的实质是一个类。一个组件类继承另一个组件类形成派生组件。
  //派生组件需要调用在构造函数中调用super来标明其跟父类使用同一个服务

  export class Test2 extends Test {
      constructor(protected _service:service){
          super(_service);
      }
  }

  //如何使用限定方式依赖注入
  //加入注入了依赖服务的模块代码别移除，就会影响服务的调用。 @Optional和@Host装饰器能解决上面的问题
  /**
   * @Optional :兼容依赖不存在的情况
   * @Host:限定查找规则,明确实例初始化的位置
   */

   import {Optional} from '@angular/core';
   import {LoggerService} from 'service';

   //..
  constructor(@Optional() provate _logger:LoggerService){
        if(this._logger) this.logger.info();
  }
   //..

   //宿主组件：一个组件注入依赖想，那么这个组件就是这些依赖的宿主组件，但是如果这个组件被ng-content被嵌入到另外一个组件，那么这个父组件才是宿主组件
   //加入@Host将限定只能在当前组件查找依赖
   export class tesr3{ //如果组件被ng-content嵌入到另一个组件，那么那个组件是宿主组件，会从宿主组件查找
       constructor(@Host _logger:LoggerService){}
   }
   
```

## 二、provider及扩展

```
//provider能够实现逻辑或者数据操作的封装，以接口方式提供给调用方使用。在前后台都有使用
//对于angular来讲，provider说明了运行时的所需依赖，注入器根据它来创建服务对象的实例

//provider能够注册返回合适的服务对象,angular提供了4中provider的注册方式，可以应付大型复杂项目下不同场景

//1、类provider(useClass)
//场景：同一依赖，可以指定不同的实现
//例：render服务可以canvas渲染，dom渲染

var injector=Injector.resolveAndCreate([
    {provider:Render,useClass:DomRender}
    // {provider:Render,useClass:CanvasRender}
]);
//调用方
class AppComponent{
    constructor(_render:Render){
        _render.render();
    }
}


//2、值provider(useValue)
//场景：依赖的对象可以是常量，字符串等

let globalSetting={
    env:'production',
    getHost:()=>{return 'http://test.com.cn'}
}

@Component({
    selector:'test',
    template:`<div>test</div>`,
    providers:[
        {provide:'urlSetting',useValue:globalSetting},
        {provide:'Name',useValue:'HELLO'}
    ]
})
export class testComponent{
    constructor(){}
}


//3、别名provider（useExisting）
//场景：一个新服务需要替换一个旧服务，但是不想动旧服务存在的代码
providers:[
    {provide:NerService,useClass:NewLogger},
    {provide:OldService,useExisting:NewLogger} //这样原来的代码就不需要变更
]


//4、工厂provider（useFactory）
//场景：依赖对象是可以动态变化的。如根据用户的权限返回对应的服务
let contactServiceFactory=(
    _logger:LoggerService,
    _userService:UserService
)=>{
    return new contactServiceFactory(_logger,_userService.user.isAuthorized);
}
export let contactServiceProvider={
    provide:ContactService,
    useFactory:contactServiceFactory,//声明Provider是一个工厂函数
    deps:[
        LoggerService,
        UserService
    ]
};

//扩展


//如何在子组件获取父组件的实例？

//已知父组件的类型：在子组件构造函数使用ParentComponent来获取已知类型的父组件使用
//已知父组件：定义子组件的时候清楚其组件
export ChildComponent{
    name="子组件";
    constructor(public parent:ParentComponent){
    }
}

//未知父组件的类型。 一个组件可能是多个组件的子组件，定义子组件的时候，使用父组件实例，但是不清楚其父组件实例具体是哪个
//通过类一接口解决。父组件实现一个抽象类，子组件通过注入这个'抽象'可以获取到父组件实例

//定义Parent抽象类，只有name属性
export abstract class Parent{
    name:string ;
}
@Component({
    selector:'parent',
    template:`
    <div>
        <h3>{{name}}</h3>
        <child></child>
    </div>`,
    providers:[
        {
            provide:Parent,
            useExisting:ParentComponet
        }
    ]
})
export class ParentComponnet implements Parent{
    name="父组件";
}

//子组件中获取
export class ChildComponent{
    name="子组件";
    constructor(public:Parent){}//找到父组件实例
}
```