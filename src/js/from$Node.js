const VNode = require('./VNode'); 

let { h } = VNode; 

/**
 * @description 根据 DOM 节点构造 VNode 对象
 * @param   { Node  } 节点 DOM 
 * @returns { VNode } 虚拟 DOM 
 */
function from$Node($node){
    let { nodeType } = $node; 
    if (nodeType === 3){
        return new VNode.Text($node.nodeValue); 
    } else if (nodeType === 1) {
        let tag = $node.tagName.toLowerCase(); 
        
        let props = Array.from($node.attributes).reduce((props, attr) => {
            let { name, value } = attr; 
    
            props[name] = value; 
    
            return props; 
        }, {}); 
    
        let $children = Array.from($node.childNodes); 
    
        let children = $children.map($child => {
            if ($child.nodeType === 3 || $child.nodeType === 1){
                return from$Node($child); 
            }
        }).filter(e => e); 
    
        return h(tag, props, children);         
    }
}

module.exports = from$Node; 
