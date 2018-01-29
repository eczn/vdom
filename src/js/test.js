let diff = require('./list-diff'); 

let list_a = [1, 2,  3, 4, 5, 6, 7, 8, 9, 100, 123123]
let list_b = [3, 10, 4, 55, 9, 99, 7]

let patches = diff(list_a, list_b)

let { INSERT, REORDER, DELETE } = diff; 



// patches.forEach(patch => {
//     let { type, idx, item } = patch; 

//     if (type === DELETE){
//         list_a.splice(idx, 1); 
//     } else if (type === INSERT){
//         list_a.splice(idx, 0, item); 
//     } else if (type === REORDER){
//         let exIdx = item; 
//         let a = list_a[idx]; 
        
//         list_a[idx]   = list_a[exIdx]; 
//         list_a[exIdx] = a; 
//     }
// })

console.log(patches)
// patches.to(list_a); 

// console.log(list_a)
