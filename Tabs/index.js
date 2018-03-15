class Tabs{
    constructor(options){
        let defaultoption = {
            element : '',
            navs : '[data-type="tabs-nav"]',
            panes: '[data-type="tabs-panes"]',
            activeClass = 'activeTab'
        }
        options = Object.assign({defaultoption,options})
        this.checkOptions(options).bindEvents().setDefaultTab()
    }

    checkOptions(options){
        if(!options || !options.element){
            return new Error("no element selected!")
        }
        return this
    }

    bindEvents(){
        dom.bind(this.options.element , 'clicks' , this.options.navs , function(e , el){
            
        })
    }

    setDefaultTab(){
        
    }
}

export default Tabs