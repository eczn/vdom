const uuid = require('./getVid')
    , diff = require('./diff')
    , { REMOVE, INSERT } = diff.TYPES

/**
 * @description VNode 
 * @param { String }        tag 
 * @param { Object }        props 
 * @param { Array<VNode> }  children 
 */
function VNode(tag = 'div', props = {}, children = []){
    this.tag = tag; 
    this.props = props; 
    // this.nodeType = 1; 
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
 * @returns { VNode }
 */
VNode.h = ($1, $2, $3) => new VNode($1, $2, $3); 


/**
 * @description 文本节点 
 * @param { String } str 
 */
function Text(str){
    // this.nodeType = 3; 
    this.vid = uuid();  
    this.text = str; 
}

/**
 * @description Text 节点渲染
 * @returns { Element } 返回文本节点 
 */
Text.prototype.render = function(){
    let { text } = this; 

    let $node = document.createTextNode(text); 

    this.$ = $node; 

    return $node; 
}

/**
 * @description 返回对应的 DOM 节点 
 * @returns { Element } 返回节点 
 */
Text.prototype.$$ = function(){
    if (this.$) return this.$; 
    else return this.render(); 
}

// 挂到 VNode 上 
VNode.Text = Text; 

/**
 * @description 渲染为 DOM 树 
 * @return { Node } dom 树 
 */
VNode.prototype.render = function(){
    let { tag, props, vid, children, text } = this; 
  
    let $node = document.createElement(tag); 

    // Selector Bind  
    this.$ = $node; 

    Object.keys(props).forEach(key => {
        let val = props[key]; 
        
        $node.setAttribute(key, val); 
    }); 

    $node.setAttribute('vid', vid); 
    
    children.forEach(child => {
        let $child = child.render(); 
        $node.appendChild($child);
    }); 

    return $node; 
}

/**
 * @description patch 2 dom 
 * @param { * } diffRes diff 结果
 */
VNode.prototype.$patch = function(diffRes){
    let { moves, props } = diffRes; 
    let $ = this.$$(); 

    // 属性 Diff 
    Object.keys(props).forEach(key => {
        let newVal = props[key]; 

        $.setAttribute(key, newVal); 
    }); 

    // 子代 Diff
    let children  = this.children; 
    let $children = $.childNodes; 
    moves.forEach(move => {
        let $ref = $children[move.index]; 
        if (move.type === REMOVE) {
            $.removeChild($ref);
        } else {
            $.insertBefore(move.item.$$(), $ref); 
        }
    }); 
}

/**
 * @description patch 2 tree 
 * @param { * } diffRes diff 结果
 */
VNode.prototype.patch = function(diffRes){
    return diff.patch(this, diffRes); 
}

/**
 * @description 渲染为 DOM 节点 
 * @returns { Node } dom 节点
 */
VNode.prototype.$$ = function(){
    if (this.$) return this.$; 
    else return this.render(); 
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
    $el.replaceWith(tree); 
}


module.exports = VNode; 
