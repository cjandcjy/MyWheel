/**对requestAnimationFrame方法做兼容性处理 */
(function(){
        let currentTime = 0;
        let verdors = ['webkit','moz','ms']
        for(let i=0;i<verdors.length && !window.requestAnimationFrame;i++){
            window.requestAnimationFrame = window[`${verdors[i]}RequestAnimationFrame`]
            window.cancelAnimationFrame = window[`${verdors[i]}CancelRequestAnimationFrame`]
        }
        if(!window.requestAnimationFrame){
            window.requestAnimationFrame = function(callback){
                let task = setTimeout(callback, 16.7);
                return task
            } 
        }
        
        if(!window.cancelAnimationFrame){
            window.cancelAnimationFrame = function(task){
                clearTimeout(task)
            }
        }
})()