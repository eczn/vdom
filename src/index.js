const VDOM = require('./js/VirualDOM')
    , { h, from$Node, from$Html } = VDOM

let $app = from$Html(`
    <div class="app">
        <p>hello</p>
    </div>
`); 

// 虚拟 DOM 挂到 app 上
$app.$mount(
    document.getElementById('app')
); 
