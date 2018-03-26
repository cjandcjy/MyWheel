//1、用过react吗?生命周期函数？每个函数在哪儿个阶段调用 https://www.jianshu.com/p/4784216b8194
     //react暴露给我们安全访问dom节点的句柄是什么？哪儿个阶段才可以使用？

//2、react中的key有什么用？
   //https://zhuanlan.zhihu.com/p/24856035

//3、传入 setState 函数的第二个参数的作用是什么？
//该函数会在setState函数调用完成并且组件开始重渲染的时候被调用，我们可以用该函数来监听渲染是否完成：
// this.setState(
//   { username: 'tylermcginnis33' },
//   () => console.log('setState has finished and the component has re-rendered.')
// )

//4、现在定义了如下的Facebook组件，把类定义补充完整
<FaceBook username='zake'>
    {(username) => {
        username===null?<Loading/>:<Badge info={username}/>
    }}
</FaceBook> 

import React,{Component,PropTypes} from 'react'
import fetchUser from 'fetchUser'
class FaceBook extends Component{
    static propTypes = {
        username:PropTypes.string.isRequired
    }

    constructor(props){
        this.state = {
            username:null
        }
    }

    componentDidMount(){
        fetchUser(this.props.username).then(name => {
            this.setState({
                username:name
            })
        })
    }

    render(){
        return this.props.children(this.state.username)
    }
}