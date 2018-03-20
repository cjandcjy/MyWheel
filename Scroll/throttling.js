/**在用户连续滚动的时候也按照固定的时间件间隔触发事件 */
/*节流函数的简单实现 */
function throttling(fn,wait,threshold){
    let timeout = null
    let lastTime = new Date()
    return function(){
        let args = arguments,
            context = this,
            curTime = new Date()
        if((curTime - lastTime)>threshold){
            fn.call(context,args)
            lastTime = curTime
        }else{
            clearTimeout(timeout)
            let later = function(){
                fn.call(context,args)
            }
            timeout = setTimeout(later, wait);
        }
    }
}

function realFunc(){
    console.log("happended")
}

window.addEventListener("scroll",throttling(realFunc,500,1000))


/**利用window.requestAnimationFrame方法， 该方法被调用的频率是每秒 60 次，也就是 1000/60 ，触发频率大概是 16.7ms，模拟定时器使用，只不过这个模拟的定时器的执行时间是固定的为16.7ms */
let lock = false  //rAF锁

function rAF(){
    if(!lock){
        window.requestAnimationFrame(realFunc)
        lock = true
    }
}

function realFunc(){
    console.log("happen")
    lock = false
}

window.addEventListener('scroll',rAF)