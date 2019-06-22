const Page = require('../model/Page')
module.exports = {
    addPage : async (page_url,shop_id)=>{
        var page = Page.findOne({
            where:{
                page_url:page_url
            }
        })
        if(page==null){
            var pageFields = {}
            pageFields.page_url = page_url
            pageFields.shop_id = shop_id
            try {
                page = new Page(pageFields)
                await page.save()
            } catch (error) {
                
            }
            return page
        }
    }
}