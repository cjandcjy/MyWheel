/**在用户连续滚动的时候不触发事件，停止滚动之后的一定事件内触发 */
/*防抖动函数的简单实现 */
function debounce(fn,wait){
    let timeout = null
    return function(){
        clearTimeout(timeout)
        timeout = setTimeout(fn, wait);
    }
}

function realFunc(){
    console.log("srcoll happen")
}

window.addEventListener('scroll',debounce(realFunc,500))



/*防抖动函数的复杂实现 */
function debounce2(fn,wait,imediate){
    let timeout = null
    return function(){
        let args = arguments
        let that = this
        if(imediate){
            fn.call(that,args)
        }else{
            clearTimeout(timeout)
            timeout = setTimeout(fn, wait);
        }
    }
}

function realFunc2(str){
    console.log("srcoll happen : ",str)
}

window.addEventListener('scroll',debounce2(realFunc2,500))
