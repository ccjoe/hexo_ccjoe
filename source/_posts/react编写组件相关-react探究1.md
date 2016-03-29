title: react编写组件相关-(react探究1)
date: 2015-08-31 11:25:07
tags: [react, 组件化]
---

## 组件要素
一个组件包含以下要素：
+ 设置默认属性
+ 验证组件包含的实体属性类型
+ 设置组件初始状态及状态机维护
+ 渲染生成虚拟DOM
+ 混合多个组件之间共享行为（组件间的公用部分）

<!-- more -->

如下以一个带标题的面板，可以点击标题栏收缩的面板为例：
```javascript
var Pane = React.createClass({
    mixin: [], 
    //数组允许使用混合来在多个组件之间共享行为。
    //设置默认属性
    statics: {
      customMethod: function(){}
    }, 
    getDefaultProps: function(){
        return {
            color: 'default',   //warning success error info
            collapse: true      //是否可以收缩
        }
    },
    //验证实体属性类型
    propTypes: {
        color: React.PropTypes.string.isRequired,
        collapse: React.PropTypes.bool.isRequired,
        //自定义验证
        customProp: function(props, propName, componentName) {
          if (!/\d+/.test(props['propName'])) {
            return Error('Validation failed!');
          }
        }
    },
    //设置初始状态
    getInitialState: function(){
      return {
        collapseState: 1   //展开态
      } 
    },
    //切换时改变状态
    changeState: function(collapse){
      if(!collapse) return;
      this.setState({
        collapseState: !this.state.collapseState
      })
    },
    //渲染生成虚拟DOM
    render: function(){
        var cls =  this.props.collapse ? "am-panel-collapse am-collapse " : " ";
        var clsbd = this.state.collapseState ? "am-in" : " ";

        return <div className={"am-panel am-panel-"+this.props.color}>
                <div className="am-panel-hd" onClick={this.changeState.bind(this.props.collapse)}>
                    {this.props.title}
                </div>
                <div className={cls + clsbd}>
                 <div className="am-panel-bd">{this.props.children}</div>
                </div>
            </div>
    }
});

module.exports = Pane;

```

## 组件复合

## 组件通信
  React 里，数据通过上面介绍过的 props 从拥有者流向归属者。这就是高效的单向数据绑定(one-way data binding)：拥有者通过它的 props 或 state 计算出一些值，并把这些值绑定到它们拥有的组件的 props 上。因为这个过程会递归地调用，所以数据变化会自动在所有被使用的地方自动反映出来。
### 父-子 通信：
  主要涉及props的向下传递，
  1. 通过 JSX 的 spread 语法 {...this.props}传递
  2. 可以显式传递 this.props.propName

### 子-父 通信：
  子向父的通信一般基于子组件上action触发，比如点击事件，就可以这样处理：`onClick={this.handleClick.bind(this, arg1, arg2, ...)`
  如此在父组件上handleClick则可以处理子组件传递过来的this以及相应属性。
### 其它通信：
  1. 采用发布订阅机制
```javascript
// just extend this object to have access to this.subscribe and this.dispatch
var EventEmitter = {
    _events: {},
    dispatch: function (event, data) {
        if (!this._events[event]) return; // no one is listening to this event
        for (var i = 0; i < this._events[event].length; i++)
            this._events[event][i](data);
    },
    subscribe: function (event, callback) {
      if (!this._events[event]) this._events[event] = []; // new event
      this._events[event].push(callback);
    }
}
otherObject.subscribe('namechanged', function(data) { alert(data.name); });
this.dispatch('namechanged', { name: 'John' });
```
这里当然还可以使用其它的Publish/Subscribe机制去实现，比如：PubSubJS，React team在使用js-signals, 也是基于信号模式, 相当不错。
当然，必须要结合`componentWillMount`, `componentWillUnmount`去实现订阅与取消订阅。

## 组件生命周期
组件的生命周期包含三个主要部分：

挂载： 组件被插入到DOM中。
更新： 组件被重新渲染，查明DOM是否应该刷新。
移除： 组件从DOM中移除。
React提供生命周期方法，你可以在这些方法中放入自己的代码。我们提供will方法，会在某些行为发生之前调用，和did方法，会在某些行为发生之后调用。

### 挂载:组件被插入到DOM中。
+ `getInitialState()`: object在组件被挂载之前调用。状态化的组件应该实现这个方法，返回初始的state数据。
+ `componentWillMount()`在挂载发生之前立即被调用。
+ `componentDidMount()`在挂载结束之后马上被调用。需要DOM节点的初始化操作应该放在这里。

__挂载的方法（Mounted Methods）__
挂载的复合组件也支持如下方法：

+ `getDOMNode()`: DOMElement可以在任何挂载的组件上面调用，用于获取一个指向它的渲染DOM节点的引用。
+ `forceUpdate()`当你知道一些很深的组件state已经改变了的时候，可以在该组件上面调用，而不是使用this.setState()。

### 更新:组件被重新渲染，查明DOM是否应该刷新。
+ `componentWillReceiveProps(object nextProps)`当一个挂载的组件接收到新的props的时候被调用。该方法应该用于比较this.props和nextProps，然后使用this.setState()来改变state。
+ `shouldComponentUpdate(object nextProps, object nextState)`: boolean当组件做出是否要更新DOM的决定的时候被调用。实现该函数，优化this.props和nextProps，以及this.state和nextState的比较，如果不需要React更新DOM，则返回false。
+  `componentWillUpdate(object nextProps, object nextState)`在更新发生之前被调用。你可以在这里调用this.setState()。
+ `componentDidUpdate(object prevProps, object prevState)`在更新发生之后调用。

### 移除:组件从DOM中移除
+ `componentWillUnmount()`在组件移除和销毁之前被调用。清理工作应该放在这里。

## 组件ES6

<hr>

__参考：
[How to communicate between React components](http://ctheu.com/2015/02/12/how-to-communicate-between-react-components/#comp_to_comp)__

<!-- more -->

后面将组件更深一层抽象，将实现这些抽象的组件以便扩展成各种常用的组件，暂时先分为如下几类：
- 导航类组件 `<Nav></Nav>`
   1. 水平导航
   2. 垂直导航
   3. Tab导航
   4. 面包屑导航
   5. 分页
- 切换类组件 `<Switch></Switch>`
type: 切换类型
   1. tab
   2. accordion
   3. panel
   4. slide
- 按钮类组件 `<Button></Button>`
- 布局类组件 `<Layout></Layout>`
- 数据列组件 `<DataGrid></DataGrid>`
type: 数列类型
    1. grid
    2. gridtree