---
title: 关于docker
id: server-01
---

## 什么是docker？
> docker是轻量级操作系统虚拟化解决方案，基于Linux容器，namespace，Cgroup,UnionFs(联合文件系统)等技术。docker是一个进程容器，可以当做进程加操作系统除内核外的一套软件

+ 1、namespace:可以保证容器间不互相影响。命名空间是Linux内核的一个强大属性，每一个容器有自己的单独的名字空间,里面的应用好比就在独立的操作系统中运行。
+ 2、Cgroup控制组：可以对容器内存，cpu等资源进行限制与审计管理
+ 3、unionFs:union文件系统是docker镜像的基础。支持对文件系统的修改作为一层层提交，同事不同目录可以挂载在一个虚拟文件系统下。


## docker的生命周期
> 分成三部分：镜像，容器，仓库。容器由镜像实例化而来。仓库：存储于共享镜像文件的地方

