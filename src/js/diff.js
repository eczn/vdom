// diff.js
const VNode = require('./VNode')
    , list_diff = require('list-diff2')

const REMOVE = 0
    , INSERT = 1
    , TYPES = { REMOVE, INSERT }

// Set To Diff
diff.TYPES = TYPES; 

/**
 * @description diff t1 and t2 
 * @param { VNode } t1 源树 
 * @param { VNode } t2 目标树 
 * @returns { Object } diff 结果 
 */
function diff(t1, t2){
    let strTable = {}

    if (!t1 || !t2) return null; 
    
    let diffRes =  list_diff(t1.children, t2.children, 'vid');


    let propDiff = {}; 
    Object.keys(t1.props).forEach(t1_prop => {
        let t1_val = t1.props[t1_prop]; 
        let t2_val = t2.props[t1_prop]; 
        if (t1_val != t2_val) {
            propDiff[t1_prop] = t2_val; 
        }
    }); 

    diffRes.props = propDiff

    return diffRes; 
}

/**
 * @description 把 diff 结果应用到 t1 上
 * @param { VNode } t1 
 * @param { * } diffRes 
 */
diff.patch = (t1, diffRes) => {
    if (!diffRes) return t1; 

    let { moves, props } = diffRes; 
    let oldList = t1.children; 

    moves.forEach(move => {
        if (move.type === REMOVE) {
            oldList.splice(move.index, 1);
        } else {
            oldList.splice(move.index, 0, move.item);
        }
    }); 

    Object.keys(props).forEach(key => {
        let newVal = props[key]; 

        t1.props[key] = newVal; 
    }); 

    return t1; 
}

module.exports = diff; 
