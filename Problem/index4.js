/** scroll 事件本身会触发页面的重新渲染，同时 scroll 事件的 handler 又会被高频度的触发,
 *  因此事件的 handler 内部不应该有复杂操作，例如 DOM 操作就不应该放在事件处理中。
针对此类高频度触发事件问题（例如页面 scroll ，屏幕 resize，监听用户输入等），
下面介绍两种常用的解决方法，防抖和节流。 */ 
function debounce(func,time){
    var timeout
    return function(){
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func()
        }, time);
    }
}

function realfunc(){
    //...
}

document.addEventLister('scroll',debounce(realfunc,500))

