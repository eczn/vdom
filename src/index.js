const { h } = require('./js/VNode'); 
const from$Node = require('./js/from$Node'); 


const $app = document.getElementById('app-1'); 
const target = document.getElementById('target'); 

let t1 = from$Node($app); 


let t2 = h('div', { id: 'hello', class: 'red' }, [
    h('h1', {}, ['你好']), 
    h('p', {}, ['你好朋友，很高兴见到你']), 
    h('div', {}, [
        h('h2', {}, ['h2 .... ']),
        h('div', {}, ['inner'], [
            h('h3', {}, ['当然只是 test'])
        ])
    ])
]); 


window.$app = $app; 
window.t1 = t1;
window.t2 = t2; 

console.log(t1); 

