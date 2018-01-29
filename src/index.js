const { h } = require('./js/VNode')
    , from$Node = require('./js/from$Node')
    , diff = require('./js/diff')


const $app = document.getElementById('app-1'); 
const $app2 = document.getElementById('app-2'); 
const $target = document.getElementById('target'); 
const $native_target = document.getElementById('native-target'); 
const btn = document.getElementById('to-patch'); 

let t1 = from$Node($app); 
let t2 = from$Node($app2); 




// diff.patch(t1, diffRes); 

window.$app = $app;
window.$app2 = $app2;  
window.t1 = t1;
window.t2 = t2; 
 


// $app2.remove(); 

console.time('diff');
let diffRes = diff(t1, t2);
console.timeEnd('diff');
window.diffRes = diffRes;

console.time('$mount');
    t1.$mount($target); 
console.timeEnd('$mount');


console.time('$patch');
t1.$patch(diffRes); 
console.timeEnd('$patch');

console.time('patch');
t1.patch(diffRes); 
console.timeEnd('patch');


console.time('native'); 
let html1 = $app.outerHTML; 
let html2 = $app2.outerHTML; 
$app2.outerHTML = html2; 
console.timeEnd('native'); 

// diff.patch(t1, diffRes); 

$app.remove();
