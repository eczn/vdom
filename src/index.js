const { h } = require('./js/VNode')
    , from$Node = require('./js/from$Node')
    , diff = require('./js/diff')


const $app = document.getElementById('app-1'); 
const $app2 = document.getElementById('app-2'); 
const target = document.getElementById('target'); 

let t1 = from$Node($app); 


let t2 = from$Node($app2); 
window.$app = $app; 
window.t1 = t1;
window.t2 = t2; 
window.diff = diff



