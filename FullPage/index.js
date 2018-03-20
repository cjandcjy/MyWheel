class FullPage{
    constructor(options){
        let defaultoptions = {
            element:null
        }
        this.targetIndex = 1
        this.animating = false
        this.tX = 0;
        this.tY = 0;
        this.options = Object.assign({},defaultoptions,options)
        this.checkOptions().init().bindEvent()
    }

    checkOptions(){
        if(!this.options.element){
            throw new Error('params error')
        }
        return this
    }

    init(){
        return this
    }

    gotoSection(index){
        return new Promise((resolve,reject) => {
            if(index<=0 || index>4){
                reject("超过界限了")
            }else{
                let that = this
                this.options.element.children[0].addEventListener('transitionend',function callback(e){
                    this.remove('transitionend',callback)
                    resolve()
                })
                dom.every(this.options.element.children,function(section){
                    section.style.transform = `translateY(-${index*100}%)`
                })

            }
        })
    }

    bindEvent(){
        let {element} = this.options
        element.addEventListener('wheel',e => {
            if(!this.animating){
                this.animating = true
                let index = this.targetIndex + (e.deltaY>0?1:-1)
                this.gotoSection(index).then(()=>{
                    this.targetIndex = index
                    this.animating = false
                },(error)=>{
                    console.log(error)
                })
            }
        })
        element.addEventListener('touchstart',e=>{
            console.log('touchstart')
            this.tX = e.target.clientX
            this.tY = e.target.clientY
        })
        element.addEventListener('touchmove',e => {
            console.log('touchmove')
            let xp = e.target.clientX - this.tX
            let yp = e.target.clientY - this.tY
            let index = this.targetIndex
            if(Math.abs(xp) > Math.abs(yp)){
                //donothing
            }else{
                if(yp>0){
                    index += 1
                }else{
                    index += -1
                }
            }
            this.gotoSection(index).then(()=>{
                this.targetIndex = index
            })
        })
        return this
    }
}