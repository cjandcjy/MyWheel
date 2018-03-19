class ImagePicker{
    constructor(options){
        let defaultoptions = {
            element:'',
            url : '',
            filename:'',
            method:'post'
        }
        this.options = Object.assign({},defaultoptions,options)

        this.checkOptions().init().bindEvent()
    }

    checkOptions(){
        let options = this.options
        if(!options.element || !options.url || !options.filename || !options.method ||!options.parseResponse){
            let key = Object.keys(options).find( key => {
                return !options[key]
            })
            throw new Error(`${key} may be empty!`)
        }
        return this
    }

    init(){
        //document.createElement只能指定标签名
        let inputDom = dom.create('<input type="file"/>')
        this.domRefs = {
            img:this.options.element.querySelector('img'),
            inputDom:inputDom
        }
        dom.append(this.options.element,inputDom)
        if (this.options.initImage) {
            this.domRefs.img.src = this.options.initImage
        }
        return this
    }

    upload(data){
        let options = {...this.options,data}
        this.http(options).then(response => {
            let url = this.options.parseResponse(response)
            this.didUpload()
            this.willDownload()
            this.download(url)
        },
        ()=>{
            this.uploadFailed()
        })
    }

    download(url){
        this.prefetch(url).then(res => {
            this.didDownload()
        },() => {
            this.failDownload()
        })
    }

    willUpload(){
        this.options.element.classList.add('uploading')
        this.domRefs.inputDom.disabled = true
    }

    didUpload(){
        let {element} = this.options
        this.options.element.classList.remove("uploading")
        this.domRefs.inputDom.disabled = false
        dom.dispatchEvent(element,'didUpload')
    }

    uploadFailed(){
        let {element} = this.options
        element.classList.remove("uploading")
        dom.dispatchEvent(element,'uploadFailed')
    }

    willDownload(){
        this.options.element.classList.add("downloading")
    }

    didDownload(){
        let {element} = this.options
        this.options.element.classList.remove("downloading")
        this.domRefs.inputDom.disabled = false
        dom.dispatchEvent(element,'didDownload')
    }

    failDownload(){
        let {element} = this.options
        this.options.element.classList.remove("downloading")
        this.domRefs.inputDom.disabled = false
        dom.dispatchEvent(element,'downloadFailed')
    }

    prefetch(url){
        let image = new Image()
        image.onload = resolve
        image.onerror = reject
        image.src = url
    }

    http(options){
        let {method,url,responseType,data} = options
        return new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open(method,url,true)
            xhr.onload = resolve(xhr.responseText,xhr)
            xhr.onerror = reject(xhr)
            if(responseType){
                xhr.responseType = responseType
            }
            try{
                xhr.send(data)
            }catch(e){
               console.log("http error : "+e )
               reject(xhr)
            }
        })
    }
    
    bindEvent(){
        this.domRefs.inputDom.addEventListener('change',e=>{
            let data = new FormData()
            data.append(this.options.filename,e.target.value)
            this.willUpload()
            this.upload(data)
        })
        return this
    }
}