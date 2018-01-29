// removeSomeTextNode.js
module.exports = removeSomeTextNode;

/**
 * @description 去除多余的空的文本节点
 * @param { Element } $el
 */
function removeSomeTextNode($el){
    let $children = $el.childNodes; 

    Array.from($children).forEach($child => {
        if ($child.nodeType === 3){
            if (!$child.nodeValue.trim()) {
                $el.removeChild($child); 
            }
        } else if ($child.nodeType === 1) {
            removeSomeTextNode($child); 
        }
    })
}


