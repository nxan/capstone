module.exports = {
    getDomain:(url)=>{
        var indexSlash = url.indexOf("/")    
        var domainShop = url.substring(0,indexSlash)
        return domainShop
    }
}