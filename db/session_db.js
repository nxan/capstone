const Session = require('../model/Session');
const City = require('../model/City');
const Device = require('../model/Device');
const Os = require('../model/OperatingSystem');
const Browser = require('../model/Browser');
const axios = require('axios')
const sequelize = require('sequelize');

City.hasMany(Session, { foreignKey: 'city_id', sourceKey: 'id' });
Session.belongsTo(City, { foreignKey: 'city_id', targetKey: 'id' });

Device.hasMany(Session, { foreignKey: 'device_type_id', sourceKey: 'id' });
Session.belongsTo(Device, { foreignKey: 'device_type_id', targetKey: 'id' });

Os.hasMany(Session, { foreignKey: 'operating_system_id', sourceKey: 'id' });
Session.belongsTo(Os, { foreignKey: 'operating_system_id', targetKey: 'id' });

Browser.hasMany(Session, { foreignKey: 'browser_id', sourceKey: 'id' });
Session.belongsTo(Browser, { foreignKey: 'browser_id', targetKey: 'id' });
module.exports = {
    getAllSessions: async function () {
        const session = await Session.findAll({
            include: [{
                model: Browser
            },
            {
                model: Device
            },
            {
                model: City
            },
            {
                model: Os
            },
            ],
            attributes: {
                exclude: ['device_type_id', 'city_id', 'operating_system_id', 'browser_id']
            }
        });
        return session
    },
    create_user_id: async function () {
        Math.random().toString(36).substring(2)
    },
    updateSession: async function (data_update, session_id) {

        await Session.update(data_update, { where: { id: session_id } });
    },
    getAllDistinct: async function () {
        var result = await Session.findAll({
            attributes: [
                // specify an array where the first element is the SQL function and the second is the alias
                [sequelize.fn('DISTINCT', sequelize.col('acquistion_id')), 'acquistion_id'],

                // specify any additional columns, e.g. country_code
                // 'country_code'
            ]
        });
        // var result = await Session.aggregate('user_id', 'count', { distinct: true });

        return result;
    },
    getAllSessionsByCondition: async function (condition) {
        const session = await Session.findAll({
            include: [{
                model: Browser
            },
            {
                model: Device
            },
            {
                model: City
            },
            {
                model: Os
            },
            ],
            attributes: {
                exclude: ['device_type_id', 'city_id', 'operating_system_id', 'browser_id']
            }
        }, condition);
        return session
    }

}