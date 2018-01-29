// CONST VAR 
const INSERT  = 'INSERT' || 0
    , REORDER = 'REORDER' || 1
    , DELETE  = 'DELETE' || 2

_diff.INSERT  = INSERT ; 
_diff.REORDER = REORDER; 
_diff.DELETE  = DELETE ; 

// EXPORT
module.exports = _diff; 

/**
 * @description 数组 diff 跳板
 * @param { Array<String | Number> } list_a 
 * @param { Array<String | Number> } list_b 
 */
function _diff(list_a_obj, list_b_obj, key){
    // 复制数组 
    let list_a, list_b; 
    if (key){
        list_a = list_a_obj.map(e => e[key]); 
        list_b = list_b_obj.map(e => e[key]); 
    } else {
        list_a = list_a_obj; 
        list_b = list_b_obj; 
    }

    let list_copy_from_a = list_a.slice(); 

    // 确保 diff 的第一个参数 list_a 是副本
    return diff(list_copy_from_a, list_b); 
}


/**
 * @description 反转数组键值对 
 * @param { Array<String | Number> } list 
 */
function val_2_idx(list){
    return list.reduce((acc, cur, idx) => {
        acc[cur] = idx; 
        return acc; 
    }, {}); 
}

/**
 * @description 数组 diff 
 * @param { Array<String | Number> } list_a 
 * @param { Array<String | Number> } list_b 
 */
function diff(list_a, list_b, patches = []){
    const a_idx = val_2_idx(list_a)
        , b_idx = val_2_idx(list_b)
    
    const DEBUG = !!_diff.debug;

    let len   = Math.max(list_a.length, list_b.length)
    
    // console.log(list_a); 
    DEBUG && (
        console.log('目标：'),
        console.log(list_b), 
        console.log('\n')
    ); 

    let [a_x, ...a_xs] = list_a; 
    let [b_x, ...b_xs] = list_b; 

    for (let idx = 0; idx < len; idx ++){
        let a = list_a[idx]; 
        let b = list_b[idx]; 

        DEBUG && (
            console.log('当前 idx', idx, '当前 len', len),
            console.log(list_a)
        ); 
        

        if (!a){
            DEBUG && (
                console.log('a 不存在, 应该插入')
            ); 
            // a 不存在 
            // 说明 list_b 比 list_a 长，应插入 b  
            patches.push({
                type: INSERT, 
                idx: idx, 
                item: b
            }); 
            
            // 在 list_a 上插入
            DEBUG && (
                console.log('b:', b)
            ); 
            list_a.push(b); 
        } else if (!b){
            DEBUG && (
                console.log('b 不存在, 应该剔除')
            ); 
            // b 不存在 
            // 说明 list_b 比 list_a 短，a 多余, 应剔除 
            patches.push({
                type: DELETE,
                idx: idx
            }); 
            // 在 list_a 上剔除 
            list_a.splice(idx, 1); 
        } else {
            if (b === a){
                DEBUG && (
                    console.log('a 刚好根 b 一样')
                ); 
                // 命中，跳过 
                // do nothing 

            } else { // b !== a
                DEBUG && (
                    console.log('a 跟 b 不一样')
                ); 
                // 这个位置上应该是 b, 但是目前是 a 
                // 所以首先应该找找看看 list_a 里有没有 b, 有的话就根这里交换位置
                // 否则插入到这里 
                let exIdx_relative = list_a.slice(idx).findIndex(e => e === b); 
                let exIdx = exIdx_relative + idx; 

                if (~exIdx_relative){ // list_a 之后存在 b, 则交换位置 
                    DEBUG && (
                        console.log('在', exIdx, '处找到了跟 b 一样的，交换跟当前的一下', b)
                    ); 
                    patches.push({
                        type: REORDER, 
                        idx: idx, 
                        item: exIdx
                    }); 
                    list_a[idx]   = list_a[exIdx]; 
                    list_a[exIdx] = a; 
                } else {     // 找不到插入  
                    DEBUG && (
                        console.log('找不到，应该插入')
                    ); 
                    patches.push({
                        type: INSERT, 
                        idx: idx, 
                        item: b
                    }); 

                    list_a.splice(idx, 0, b); 
                }
            }
        }

        // 更新一下 
        len = Math.max(list_a.length, list_b.length); 
        DEBUG && (
            console.log('\n')
        ); 
    }

    let remain = list_a.slice(list_b.length); 
    let delta = list_a.length - list_b.length; 

    DEBUG && (
        console.log(remain),
        console.log(list_a),
        console.log(list_b)
    ); 

    if (delta >= 1){
        for (let i = delta; i > 0; i--){
            patches.push({
                type: DELETE, 
                idx: list_b.length
            }); 
            list_a.pop();
        }
    }

    DEBUG && (
        console.log(patches)
    ); 

    return patches; 
}

