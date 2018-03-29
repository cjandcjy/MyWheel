import { resolve } from "dns";

//这段代码输出什么？以 符号-> 代表两次输出之间有1秒的时间间隔 ，以逗号表示两次输出之间的间隔时间可以忽略 
    for (var i = 0; i < 5; i++) {
        setTimeout(() => {
            console.log(i)
        }, 1000);   
    }
    console.log(i)

    

//如果期望代码的输出是 5 -> 0,1,2,3,4
    //声明及执行的表达式  
    for (var i = 0; i < 5; i++) {
        (function(j){
            setTimeout(() => {
                console.log(j)
            }, 1000);
        })(i)   
    }
    console.log(i)
   //js中基本类型是按值传递
    var output = function(i){
        setTimeout(() => {
            console.log(i)
        }, 1000);
    }
    for (var i = 0; i <5; i++) {
        output(i)
    }
    console.log(i)
    //let ,最后一句会报错
    for (var i = 0; i < 5; i++) {
        (function(j){
            setTimeout(() => {
                console.log(j)
            }, 1000);
        })(i)   
    }
    console.log(i)


//希望输出是 0 -> 1 -> 2 -> 3 -> 4 -> 5
    //暴力方法
    for (var i = 0; i < 5; i++) {
        (function(j){
            setTimeout(() => {
                console.log(j)
            }, 1000*j);
        })(i)   
    }
    setTimeout(() => {
        console.log(i)
    }, 1000*i);

    //promise
    var tasks = []
    var output = function(i){
        return new Promise((resolve) =>{
            setTimeout(() => {
                console.log(i)
            }, 1000*i);
        })
    }
    for (var i = 0; i < 5; i++) {
        tasks.push(output(i))
    }
    Promise.all(tasks).then(() => {
        setTimeout(() => {
            console.log(i)
        }, 1000);
    })
    //使用es7的await 、 async函数实现
    var sleep = function(time){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, time); 
        })
    }
    (async ()=>{
        for(var i=0;i<5;i++){
            await sleep(1000)
            console.log(i)
        }
        await sleep(1000)
        console.log(i)
    })()