# VDOM 

1. 实现虚拟 DOM
2. 利用这个虚拟 DOM 实现一个简单的前端框架 Mois (这次仿 React)

# Build 

``` bash 
$ npm i 
$ gulp serve 
```

# Usage 

``` html
<div id="app"></div>
```

``` js
const VDOM = require('./js/VirualDOM')
    , { h, from$Node, from$Html } = VDOM

// 生成 VDOM 
let $app = from$Html(`
    <div class="app">
        <p>hello</p>
    </div>
`); 

// 虚拟 DOM 挂到 app 上
$app.$mount(
    document.getElementById('app')
); 
```

# License

MIT
