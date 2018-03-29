/** 考察this机制 */
/**绑定到new出来的对象 -》 apply、call制定的对象 -》 作为对象的方法调用则指向该对象 =》 上下文对象、包含环境对象 */
//
var name = 'A'

var obj = {
    name : 'B',
    props :{
        name : 'C',
        print : function(){
            return this.name
        }
    }
}


console.log(obj.props.print())

var print = obj.props.print
console.log(print())

/////
var obj = {
    a : 10 ,
    b : (i) => {
        console.log(this.a)
    },
    c : function(){
        console.log(this.a)
    }
}
obj.b() 
obj.c()

/////
var obj = {
    onething : (a) => {
        let b = a * 2
        this.otherthing(b)
    },
    otherthing : function(b){
        console.log(b)
    }
}
obj.onething(10)