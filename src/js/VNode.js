const uuid = require('./getVid')

/**
 * @description VNode 
 * @param {*} tag 
 * @param {*} props 
 * @param {*} children 
 */
function VNode(tag = 'div', props = {}, children = []){
    this.tag = tag; 
    this.props = props; 
    this.vid = uuid(); 
    this.children = children; 
}

// 别名
/**
 * @description VNode Alias
 * @param {$1} tag
 * @param {$2} props
 * @param {$3} children 
 */
VNode.h = ($1, $2, $3) => new VNode($1, $2, $3); 

/**
 * @description 渲染为 DOM 树 
 */
VNode.prototype.render = function(){
    let { tag, props, vid, children, text } = this; 
    
    let $node = document.createElement(tag); 

    Object.keys(props).forEach(key => {
        let val = props[key]; 
        
        $node.setAttribute(key, val); 
    }); 

    $node.setAttribute('vid', vid); 
    
    children.forEach(child => {
        if (typeof child === 'string'){
            let $text_node = document.createTextNode(child); 
            $node.appendChild($text_node);
        } else {
            $node.appendChild(child.render());
        }
    }); 

    if (children.length === 0 && text) {
        let $text_node = document.createTextNode(text); 
        $node.appendChild($text_node); 
    }

    return $node; 
}

/**
 * @description 挂在某个节点上 
 */
VNode.prototype.$mount = function($el){
    let tree = this.render(); 
    $el.appendChild(tree); 
}


module.exports = VNode; 
