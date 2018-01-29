const uuid = require('./getVid')
    , diff = require('./diff')
    , list_diff = require('./list-diff')
    , { INSERT, REORDER, DELETE, Patches } = list_diff 

/**
 * @description VNode 
 * @param { String }        tag 
 * @param { Object }        props 
 * @param { Array<VNode> }  children 
 */
function VNode(tag = 'div', props = {}, children = []){
    this.tag = tag; 
    this.props = props; 
    this.nodeType = 1; 
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
    this.nodeType = 3; 
    this.vid = str;  
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
        
        try {   
            $node.setAttribute(key, val); 
        } catch (err) {}
    }); 

    $node.setAttribute('vid', vid); 
    
    children.forEach(child => {
        if (child.nodeType === 3){
            if (!child.text.trim()) return null;
        }

        let $child = child.render(); 
        $node.appendChild($child);
    }); 

    return $node; 
}

/**
 * @description patch 2 dom 
 * @param { tree_patch } diffRes diff 结果
 */
VNode.prototype.$patch = function(tree_patch){
    let { childrenDiff, propDiff } = tree_patch; 
    let $ = this.$$(); 

    // 属性 Diff 
    Object.keys(propDiff).forEach(key => {
        let newVal = propDiff[key]; 
        $.setAttribute(key, newVal); 
    }); 

    // 子代 Diff
    let children  = this.children; 
    let $children = $.childNodes; 

    childrenDiff.forEach(patch => {
        let { idx, item, type } = patch;        
        let $ref = $children[idx]; 

        // for debug 
        // console.log('DQ:');
        // console.log($children); 
        // console.log(patch)

        // INSERT, REORDER, DELETE
        if (type === DELETE) {
            $.removeChild($ref);
        } else if (type === INSERT) {
            // console.log(item.$$(), $ref); 
            $.insertBefore(
                item.$$(),
                $ref
            ); 
        } else { // REORDER
            let $temp = $children[item];
            let $next = $temp.nextSibling; 
            $.insertBefore($temp, $ref); 

            $.insertBefore($ref, $next); 
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
 * @param { Element } $el 
 */
VNode.prototype.$mount = function($el){
    let tree = this.render(); 
    $el.parentElement.replaceChild(tree, $el);
    // $el.replaceWith(tree); 
}


module.exports = VNode; 
