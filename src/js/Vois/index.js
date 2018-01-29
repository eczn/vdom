const VDOM = require('../VirualDOM')
    , { h, from$Node, from$Html, VNode } = VDOM
    , removeSomeTextNode = require('./removeSomeTextNode')
    , Vois = { of: null }

module.exports = Vois; 

/**
 * @description Alias 
 * @param   { * }  $1
 * @returns { VoisComponent }
 */
Vois.of = $1 => new VoisComponent($1); 

/**
 * @description Vois 组件类 
 * @param { * } ctx 
 */
function VoisComponent(ctx){
    let { tpl } = ctx; 

    Object.assign(this, ctx); 
   
    // Init VDOM 
    let V = from$Html(tpl); 
    this.V = V; 
}

/**
 * @description 绑定事件 
 * @param { VNode } V
 */
VoisComponent.prototype.binding = function(V, fn){
    let { nodeType, $ } = V; 

    fn && fn(V); 
   
    console.log(V); 
    window.__ = V; 

    if (nodeType === 3) {
        let preText = V.text; 
        if (/{{(.*?)}}/g.test(V.text)){
            var statements = []; 

            preText.replace(/{{(.*?)}}/g, (match, p1, offset) => {
                statements.push({
                    token: match, 
                    offset: offset
                }); 
                // return dataRaw[p1.trim()]; 
            }); 

            let render = () => statements.reduce((str, stat) => {
                let { token } = stat; 
                let bindName = token.slice(2, -2).trim(); 
                
                return str.replace(token, this[bindName]); 
            }, preText);

            
            
            statements.forEach(stat => {
                let { token } = stat; 
                let bindName = token.slice(2, -2).trim(); 
                let val = this[bindName]; 

                let property = Object.getOwnPropertyDescriptor(this, bindName); 
                
                Object.defineProperty(this, bindName, {
                    get(){
                        return val 
                    }, 
                    set(newVal){
                        val = newVal; 
                        V.text = render(); 
                        property.set && property.set(newVal); 
                    }
                })
            })


            V.text = render();

            // console.log(statements); 
        }

        return; 
    }


    Object.keys(V.props).forEach(key => {
        let bindName = V.props[key]; 
        let propName = key.substring(1); 
        let bindVal  = this[bindName]; 

        if (key[0] === '@'){
            $.addEventListener(propName, $event => {
                this[bindName].call(this); 
            }); 
        } else if (key[0] === ':'){
            V.props[propName] = this[bindName]; 

            Object.defineProperty(this, bindName, {
                get(){
                    return bindVal; 
                }, 
                set(new_val){
                    V.props[propName] = new_val; 
                    bindVal = newVal; 
                }
            })
        }
    })

    V.children.forEach(child => {
        this.binding(child); 
    })
}

/**
 * @description 挂在 DOM 上 
 * @param { Element }  $el
 */
VoisComponent.prototype.$mount = function($el_container){
    // $el.outerHTML = this.tpl; 
    let div = document.createElement('div'); 
    div.innerHTML = this.tpl; 
    let $el = div.children[0]; 
    this.$el = $el; 

    // 取代
    $el_container.parentNode.replaceChild($el, $el_container)
    
    this.$el = $el; 
    removeSomeTextNode($el); 

    this.V$el(this.V, $el); 

    this.binding(this.V); 
}

/**
 * @description 绑定虚拟 DOM 和真实 DOM 
 * @param { VNode } V 
 * @param { Node  } $node
 */
VoisComponent.prototype.V$el = function(V, $node){
    let { nodeType } = V; 
    V.$ = $node; 
    
    if (nodeType === 3) return; 
    
    let $children = $node.childNodes; 

    V.children.forEach((child, idx) => {
        let $child = $children[idx]; 
        this.V$el(child, $child); 
    }); 
}
