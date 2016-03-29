title: Web前端架构路径
date: 2015-09-08 13:00:33
tags: [mvc, rest, mvvm, flux, facebook, react, google, angular, backbone]
---

## MVC - BackBone

    ╔═════════╗       ╔════════╗       ╔═══════╗
    ║   Model ║──────>║ Control║──────>║ View  ║
    ╚═════════╝       ╚════════╝       ╚═══════╝
         ^                 │              ^
         │          ╔════════════╗        │
          ────────  ║    Action  ║ ───────
                    ╚════════════╝  

<!-- more -->

## REST - SammyJs


## MVVM - Angular

双向流动

      Service(Java、Php、Nodejs)
                        ^
                        |(各语言数据交换的协议如：Thrift)
                        V
                      Ajax 及 HTTP拦截器()
                        ^
                        |
                        V
                      ng-service()
                        ^
                        |
                        V
                      ng-controller()
                        ^
                        |(SCOPE)
                        V
                      VIEW(Directive, Filter)


## FLUX - React && Flux
Store包含了应用的所有数据，Dispatcher替换了原来的Controller，当Action触发时，决定了Store如何更新。当Store变化后，View同时被更新，还可以生成一个由Dispatcher处理的Action。这确保了数据在系统组件间单向流动。当系统有多个Store和View时，仍可视为只有一个Store和一个View，因为数据只朝一个方向流动，并且不同的Store和View之间不会直接影响彼此。

      ╔═════════╗       ╔════════════╗         ╔════════╗         ╔═════════════════╗
      ║ Actions ║────>──║ Dispatchet ║ ───────>║ Stores ║────────>║ View Components ║
      ╚═════════╝       ╚════════════╝         ╚════════╝         ╚═════════════════╝
                            ^                                             │
                            │                 ╔═════════╗                 │
                             ──────────────── ║ Actions ║ ───────────────
                                              ╚═════════╝

Facebook React在GitHub的页面详细说明了Flux、Dispatcher和Store：

>Dispatcher是中心枢纽，管理着Flux应用中的所有数据流。它本质上是Store的回调注册。每个Store注册它自己并提供一个回调函数>。当Dispatcher响应Action时，通过已注册的回调函数，将Action提供的数据负载发送给应用中的所有Store。
>
>随着应用程序的增长，Dispatcher变得更加关键，因为它将管理Store之间的依赖，以特定的顺序调用注册的回调函数。Store可以声明>等待其它Store完成更新后，再相应地更新自己⋯⋯
>
>Store包含应用程序的状态和逻辑。它们的角色某种程度上与传统MVC中的Model类似，但它们管理很多对象的状态，它们不是某个对象的>实例，也不是Backbone集合。Store不只是简单地管理ORM风格的对象集合，它还为应用程序中的特定领域（Domain）管理应用状态。
