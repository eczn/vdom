const { h } = require('./VNode'); 

/**
 * @description 根据 DOM 节点构造 VNode 对象
 * @param {Node} 节点 DOM 
 */
function from$Node($node){
    let tag = $node.tagName.toLowerCase(); 
    
    let props = Array.from($node.attributes).reduce((props, attr) => {
        let { name, value } = attr; 

        props[name] = value; 

        return props; 
    }, {}); 

    let $children = Array.from($node.childNodes); 

    let children = $children.map($child => {
        if ($child.nodeType === 3){
            return $child.nodeValue; 
        } else {
            return from$Node($child); 
        }
    }); 

    return h(tag, props, children); 
}

module.exports = from$Node; 
