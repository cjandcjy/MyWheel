/**js 原型链 */


var a = {a: 1}; 
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var b = ["a","b"]
// b ---> Array.prototype ---> Object.prototype ---> null 

var c = function(){
    
}
// c --->Function.prototype ---> Object.prototype ---> null

