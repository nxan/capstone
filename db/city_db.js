const City = require('../model/City')
const country_db = require('./country_db')
module.exports = {
    addCity: async (location) => {
        country_db.addCountry(location)
        var country = await country_db.getCountry(location.country)
        const create = {
            city_name: location.city,
            postal_code: location.postalCode,
            country_id: country.id
        }
        City.findOrCreate({
            where: { city_name: location.city, country_id: country.id }, defaults: create
        })
    },
    getCity: async (location) => {
        var res
        var country = await country_db.getCountry(location.country)
        return City.findOne({
            where: {
                city_name: location.city,
                country_id: country.id
            }
        }).then((result) => {
            res = result
            return res
        })
        
    }
}