class Tabs{
    constructor(options){
        let defaultoption = {
            element : '',
            navs : '[data-type="tabs-nav"]',
            panes: '[data-type="tabs-panes"]',
            activeClass : 'activeTab'
        }
        this.options = Object.assign({},defaultoption,options)
        this.checkOptions(options).bindEvents().setDefaultTab()
    }

    checkOptions(options){
        if(!options || !options.element){
            return new Error("no element selected!")
        }
        return this
    }

    bindEvents(){
        dom.bind(this.options.element , 'clicks' , `${this.options.navs}>div` , (e , el) => {
            let index = dom.index(el)
            let children = this.options.element.querySelector(this.options.panes).children
            dom.uniqueClass(el,this.options.activeClass)
            dom.uniqueClass(children[index],this.options.activeClass)
        })
        return this
    }

    setDefaultTab(){
        this.options.element.querySelector(`${this.options.navs}>div:first-child`).click()
        return this
    }
}

