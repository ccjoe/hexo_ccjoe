# viewbind.js
for view data bi-bind and support gt ie8

#### 要解决的问题:
  在基于ie9以上的现代浏览器，有vue.js angular.js等双向绑定的框架去解决逻辑复杂的页面数据交互，
  但公司在基于类jQuery框架和zepto开发的传统开发模式中，数据和交互复杂的场景使得代码的组织结构 和 数据业务逻辑不清晰且难以维护，代码量大且性能差
  
  总结起来，即视图交互的组织与数据的双向绑定是目前代码维护的痛点，为了解决以上问题, 尝试开发viewbind.js解决, 主要为了解决以jQuery或zepto为主，
  没有前端构架的面条代码的问题。 兼容性保证ie8及以上。

'view' resolve views structure and 'bind' resolve the data view bi-bind. it's viewbind.js.
the scenes is that the spaghetti code is main base on native js jQuery or Zepto and no front-end architecture.

#### 支持的特性
1. 绑定指令
2. 指令的值的多种表达，如三目表达式, 对象取值等

#### 绑定的指令
```
vb-modalname="key" 		组件块的modalname绑定
vb-model="key"     		表单元素的双向绑定
vb-item="subKey"   		数组遍历时的值绑定

vb-if vb-show vb-hide 	显隐与存在
vb-value				为元素绑定添加value属性
vb-class				条件class
vb-entity				将值转化为实体
vb-cloak				解析前不显示
```

#### online demo  visit: https://jsbin.com/qijemu/edit?html,js,console,output
#### simple docs  visit: https://jsbin.com/qijemu/edit?html,js,console,output