// diff.js
const VNode = require('./VNode')
    , list_diff = require('./list-diff')
    , { INSERT, REORDER, DELETE, Patches } = list_diff 

// window.list_diff = list_diff
// list_diff.debug = true; 

/**
 * @description diff t1 and t2 
 * @param   { VNode  }    t1 源树 
 * @param   { VNode  }    t2 目标树 
 * @returns { TreePatch } diff 结果 
 */
function diff(t1, t2){
    let strTable = {}

    if (!t1 || !t2) return null; 
    
    let childrenDiff = list_diff(t1.children, t2.children, 'vid');

    let propDiff = {}; 
    Object.keys(t1.props).forEach(t1_prop => {
        let t1_val = t1.props[t1_prop]; 
        let t2_val = t2.props[t1_prop]; 
        if (t1_val != t2_val) {
            propDiff[t1_prop] = t2_val; 
        }
    }); 

    return {
        childrenDiff, propDiff
    }; 
}

/**
 * @description 把 diff 结果应用到 t1 上
 * @param { VNode }   t1 
 * @param { TreePatch } Patches 
 */
diff.patch = (t1, tree_patch) => {
    let { childrenDiff, propDiff } = tree_patch; 

    let { children } = t1; 

    return childrenDiff.to(children); 
}

module.exports = diff; 
