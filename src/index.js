const { h } = require('./js/VNode'); 
const from$Node = require('./js/from$Node'); 


const $app = document.getElementById('app-1'); 

let t1 = from$Node($app); 
window.$app = $app; 
window.t1 = t1;

console.log(t1); 

