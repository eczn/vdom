const uuid = require('./getVid')
    , diff = require('./diff')

/**
 * @description VNode 
 * @param { String }        tag 
 * @param { Object }        props 
 * @param { Array<VNode> }  children 
 */
function VNode(tag = 'div', props = {}, children = []){
    this.tag = tag; 
    this.props = props; 

    if (props.vid){
        this.vid = props.vid;
    } else {
        this.vid = uuid(); 
    }
    
    this.children = children; 
} 

/**
 * @description VNode Alias 别名
 * @param { String }        $1 tag 
 * @param { Object }        $2 props 
 * @param { Array<VNode> }  $3 children 
 */
VNode.h = ($1, $2, $3) => new VNode($1, $2, $3); 

/**
 * @description 渲染为 DOM 树 
 * @return { Node } dom 树 
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
 * @description diff this and t2 
 * @param {VNode} t2 
 */
VNode.prototype.diff = function(t2){
    let t1 = this; 

    return diff(t1, t2); 
}

/**
 * @description 挂在某个节点上 
 */
VNode.prototype.$mount = function($el){
    let tree = this.render(); 
    $el.appendChild(tree); 
}


module.exports = VNode; 
