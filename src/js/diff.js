// diff.js
const VNode = require('./VNode')

/**
 * @description 在 children 里查找字符串节点
 * @param { String } str 
 * @param { Array<VNode> } children 
 * @returns { Number } position 下标 
 */
function findString(str, children){
    let pos = null; 
    children.forEach((child, idx) => {
        if (typeof child === 'string' && child === str){
            pos = idx; 
        }
    }); 

    return pos; 
}

/**
 * @description 在 children 里查找 vid 节点 
 * @param { String | Number } vid 
 * @param { Array<VNode> } children 
 * @returns { Number } position 下标 
 */
function findVid(target_vid, children){
    return children.reduce((acc, child, idx) => {
        if (typeof child === 'string'){
            return acc; 
        } else {
            let { vid } = child; 

            return target_vid === vid ?
                idx : acc; 
        }
    }, null); 
}


/**
 * @description diff t1 and t2 
 * @param { VNode } t1 源树 
 * @param { VNode } t2 目标树 
 */
function diff(t1, t2){
    let strTable = {}
    let allDiff = {}

    // 不存在任意一个就 return 
    if (!t1 || !t2) return {}; 
    
    // t2ChildrenMap
    allDiff.children = t2.children.reduce((acc, t2_child, idx) => {
        let l_idx = null; 

        if (typeof t2_child === 'string'){
            // t2_child, t1.children

            // 遍历 t1.children 
            for (let idx = 0; idx < t1.children.length; idx++) {
                let child = t1.children[idx]; 

                if (typeof child === 'string' && child === t2_child){
                    if (!strTable[idx]){
                        l_idx = idx; 
                        strTable[idx] = true; 
                        break; 
                    }
                }            
            }

        } else {
            l_idx = findVid(t2_child.vid, t1.children); 
        }

        acc[idx] = l_idx; 
        return acc; 
    }, []); 

    // 标签名 diff 
    allDiff.tag = [t1.tag, t2.tag]; 

    // 属性集 diff 
    let propDiff = {}; 
    Object.keys(t1.props).forEach(t1_prop => {
        let t1_val = t1.props[t1_prop]; 
        let t2_val = t2.props[t1_prop]; 
        if (t1_val != t2_val) {
            propDiff[t1_prop] = [t1_val, t2_val]; 
        }
    }); 

    allDiff.props = propDiff; 

    return allDiff; 
}

module.exports = diff; 
