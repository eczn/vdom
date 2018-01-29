let diff = require('./list-diff'); 

let list_a = [1, 2,  3, 4, 5, 6, 7, 8]; 
let list_b = [3, 10, 4, 5, 9, 8, 7]; 

let patches = diff(list_a, list_b)

console.log(patches)

