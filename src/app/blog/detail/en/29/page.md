---
title: vue中的nextTick的实现
id: vue-06
---

## 前提概要
- 1、浏览器的执行
  > 浏览器中，一个页面的js的执行依赖于一个主线程，但是用户点击的触发，ajax数据请求，io读取等依赖于其他相应的模块。当主线程的执行堆栈执行完之后，会去读取任务队列，将任务(回调)放入执行堆栈执行，依次循环。任务队列里的任务由各种执行场景触发产生。
- 2、任务队列的任务分为宏任务(macroTask)，微任务(microTask)。
  > 宏任务：整段的script, setTimeout, setInterval, setImmediate(IE10), MessageChannel,postMessage,用户交互操作, io口

  > 微任务：promise, process.nextTick(nodejs),MutaionObsever

  > 执行顺序：一整段script相当于宏任务，如果里面有其它setTimeout等宏任务触发，便会在其异步场景完成后(如定时完成)推入到宏任务队列。有promise等微任务，则会将其推入到微任务队列，当前的宏任务执行完之后，会去读取微任务队列执行完，接下来进行读取宏任务队列。从这种顺序看来，微任务往往执行于一次事件循环结束，而宏任务执行于下一次事件循环开始。所以promise的执行往往先于setTimeout。

  ```javascript
   例：
      let p =  Promise.resolve();
      p.then(()=> {
        console.log(1);
      })
      setTimeout(() => {
        console.log(2);
      },0);
      console.log(3);
    // 打印顺序：3 1 2
  ```

## vue中的nextTick
> 功能：在下次 DOM 更新循环结束之后执行延迟回调

> vue中的nextTick是借助于js的宏任务与微任务,实现执行回调的普通函数

> vue表明默认使用microTask，特殊下可以使用macroTask

```javascript
From vue version : "2.5.17-beta.0"

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).

```
## nextTick的实现

```javascript
  //1、声明macroTask, macroToask, callbasks, useMacroTask等,
  //2、各种环境侦测下建立宏任务与微任务
     第一轮侦测:
     a、先检查是否存在setImmediate,有则建立宏任务
     b、否则检查是否存在MessageChannel,有则建立宏任务
     c、否则使用setTimeout建立宏任务
    
     第二轮侦测:
     a、检查是否存在promise，有则建立微任务
     b、否则微任务等于宏任务.
  //3、暴露withMacroTask ,可以往宏任务推入回调
  //4、暴露nextTick：可以将回调推入微/宏任务等待执行。
```

```javascript
附：vue中nextTick源码

const callbacks = []
let pending = false
let microTimerFunc
let macroTimerFunc
let useMacroTask = false

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
} else {
  microTimerFunc = macroTimerFunc
}

export function withMacroTask (fn: Function): Function {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true
    const res = fn.apply(null, arguments)
    useMacroTask = false
    return res
  })
}

export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```