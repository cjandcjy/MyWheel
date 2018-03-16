let dom = {
    bind:function(element,eventType,selector,fn){
        element.addEventListener('click',function(e){
            let el = e.target
            while(!el.matches(selector)){
                if(el === element){
                    el = null
                    break
                }
                el = el.parentNode
            }
            el && fn(e,el)
        })
    },
    index:function(element){
        let index = -1
        let siblings = element.parentNode.children
        for(let i=0;i<siblings.length;i++){
            if(siblings[i] === element){
                index = i
            }
        }
        return index
    },
    uniqueClass:function(el,activeClass){
        dom.every(el.parentNode.children, function(element){
            element.classList.remove(activeClass)
        })
        el.classList.add(activeClass)
    },
    every:function(nodeList,fn){
        for (let i  = 0; i  < nodeList.length; i ++) {
            fn.call(null,nodeList[i])
        }
    }   
}