const VNode = require('./VNode')
    , from$Node = require('./from$Node')

/**
 * @description 根据 DOM 节点构造 VNode 对象
 * @param   { String  } html 
 * @returns { VNode } 虚拟 DOM 
 */
function from$Html(html){
    html = html.trim(); 
    
    let div = document.createElement('div'); 
    div.innerHTML = html; 
    div = div.children[0]; 

    return from$Node(div); 
}

module.exports = from$Html; 
