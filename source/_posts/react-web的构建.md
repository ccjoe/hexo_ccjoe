title: react web的构建
date: 2015-09-07 17:15:31
tags: [react, build]
---

## 构建解决浏览器端的`require`与`UMD`
- `AMD:` AMD以浏览器为第一`（browser-first）`的原则发展，选择异步加载模块。它的模块支持对象（objects）、函数（functions）、构造器（constructors）、字符串（strings）、JSON等各种类型的模块。因此在浏览器中它非常灵活。
 
- `CMD:` CommonJS module以服务器端为第一`（server-first）`的原则发展，选择同步加载模块。它的模块是无需包装的（unwrapped modules）且贴近于ES.next/Harmony的模块格式。但它仅支持对象类型（objects）模块。

- __`UMD:`__ 这迫使一些人又想出另一个更通用格式 `UMD(Universal Module Definition)`。希望提供一个前后端跨平台的解决方案。
  UMD的实现很简单，先判断是否支持NodeJS模块格式（exports是否存在），存在则使用NodeJS模块格式。
  再判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块。前两个都不存在，则将模块公开的全局（window或global）。

<!-- more -->

在reactjs的项目里一般会用CMD的Nodejs require去管理依赖与模块， [browserify](http://browserify.org/)则可以解决require在浏览器端的实现。详细API则见[browserify-handbook](https://github.com/substack/browserify-handbook);

当一个 browserify 项目开始变大的时候，编译打包的时间也变得越来越长。这时候需要用到`watchify `来配合持续监视文件的改动，并且只重新打包必要的文件。用这种方法，第一次打包的时候可能会稍长些，但是后续的编译打包工作将一直保持在非常快的水平，这也是一个很大的进步。

watchify 并没有一个相应的 gulp 插件，并且也不需要有：你可以使用 vinyl-source-stream 来把你的用于打包的 stream 连接到 gulp 管道中。

下面是结合个人的示例项目[jcreact](https://github.com/ccjoe/jcreact)抽象出来的一个方法以构建react项目的browserify化。

```javascript
//构建对UMD的支持一般会用到
//处理browserify和react相关
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');

function browserifyIt(opts){
    var bundler = browserify({
        transform:[
          ["reactify"]  //, {"es6": true}
        ],
        entries: [opts.entries],
        debug: true,
        // insertGlobals: true,
        cache: {},
        packageCache: {},
        fullPaths: true,
        standalone: opts.globalVar?opts.globalVar:null
        //是否产生一个独立的全局变量，是的话这样的文件就不需要被require了
    });
    //external，查找依赖时排队指定的依赖项
    bundler.external(opts.development ? dependencies : [])
           .plugin('browserify-derequire');

    var rebundle = function(){
        return bundler.bundle()
        // log errors if they happen
        // .on('error', $.util.log.bind($.util, 'Browserify Error'))
        .pipe(source(opts.entriesDestName))
        .pipe(buffer())
        .pipe(gulp.dest(opts.dest))
        // .pipe(!opts.development ? uglify() : null)
        // .pipe(!opts.development ? rename({suffix: '.min'}) : null)
        // .pipe(gulp.dest(opts.dest))
        .on('end', function() {
            Browsersync.reload();
        });
    };

    if (opts.development) {
        bundler = watchify(bundler);
        bundler.on('update', rebundle);
    }

    rebundle();
}
//调用以上方法
gulp.task('dev:script.example', function(){
    browserifyIt({
        entries: ['./example/js/App.js'], //源
        development: true,                //开发版
        entriesDestName: 'app.js',        //源输出的名字
        dest: './example/build/'          //源输出的目录
    });
});
```

## 构建解决对JSX语法的支持

在开发环境可以引入JSXTransformer.js在浏览器端解析对JSX语法支持，而在生产环境一般使用react tools编译打包后使用。

## 构建解决对ES6的编译及reactify化
browserify 的配置transform可以解决reactify及es6相关问题，当然github上还有许多这样的transform

>transform:[
  ["reactify"]  //, {"es6": true}
]

## 构建后对于构建文件的引用。
  比如项目依赖`react`和一个react组件库`jcreact`, 构建分二种情况：
  
  + 对于require的依赖会递归查询，将所有依赖打包。
  对这种构建，引入依赖毫无疑问是

> var React =  require("react");
  var JcReact =  require("jcreact");

  + 对于使用`browserify`的`external`配置来构建打包的文件会排除指定的依赖，如react组件库jcreact依赖react，打包时单独打包jcreact则需要排除react,此时需要指定打包后组件库jcreact全局变量的值即通过 standalone选项的配置来指定。引入使用全局变量，如`React`、`JcReact`

对于第2种无疑更适合于项目，因为所有依赖打包将会形成一个很大的文件，对于web加载来讲时间可能过长。

<hr>

__示例见：[jcreact](https://github.com/ccjoe/jcreact)__
__参考：
[React JS and a browserify workflow
](http://christianalfoni.github.io/javascript/2014/08/15/react-js-workflow.html)
[使用 watchify 加速 browserify 编译](http://www.gulpjs.com.cn/docs/recipes/fast-browserify-builds-with-watchify/)__