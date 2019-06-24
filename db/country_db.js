const Country = require('../model/Country')

module.exports = {
    addCountry:(location)=>{
        const create = {
            country_code: location.geonameId,
            country_name: location.country
        }
        Country.findOrCreate({
            where:{country_name: location.country}, defaults:create
        })
    },
    getCountry: async (country_name) =>{
        var res
        return Country.findOne({
            where: {
                country_name: country_name
            }
        })
        
    }
}
