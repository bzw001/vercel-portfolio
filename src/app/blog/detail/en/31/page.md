---
title: vue剖析笔记02-响应式系统
id: vue-04
---



## 响应式系统
> vue的数据模型知识简单的js对象，但是数据模型的变更，却能引发相应视图的变动，这是依赖于响应式系统

 - 实现可观察的observer
 > 根据Object.defineProperty定义相应的setter与getter操作即可,可参照之前的文章

