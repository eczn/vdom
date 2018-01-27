const { h } = require('./js/VNode')
    , from$Node = require('./js/from$Node')
    , diff = require('./js/diff')
    , patch = require('./js/patch')


const $app = document.getElementById('app-1'); 
const $app2 = document.getElementById('app-2'); 
const $target = document.getElementById('target'); 
const btn = document.getElementById('to-patch'); 

let t1 = from$Node($app); 
let t2 = from$Node($app2); 
let diffRes = diff(t1, t2);

window.$app = $app; 
window.t1 = t1;
window.t2 = t2; 
window.diffRes = diffRes; 

$app.remove();
$app2.remove(); 



t1.$mount($target); 

console.time('VDOM'); 
t1.$patch(diffRes); 
t1.patch(diffRes); 
console.timeEnd('VDOM'); 


// diff.patch(t1, diffRes); 
