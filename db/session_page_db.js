const Session_page = require('../model/Session_page')
const sequelize = require('sequelize')
const Session = require('../model/Session')

Session.hasMany(Session_page, { foreignKey: 'session_id', sourceKey: 'id' });
Session_page.belongsTo(Session, { foreignKey: 'session_id', targetKey: 'id' });

module.exports = {
    add_session_page: async (page_infor) => {
        let session_page
        let session_page_field = {}
        let record = await Session_page.max('page_order', {
            where: {
                session_id: page_infor.session_id
            }
        })
        console.log("AL: " + record)
        if (isNaN(record)) {
            session_page_field.page_order = 1
        }
        else {
            session_page_field.page_order = record + 1
        }

        session_page_field.page_id = page_infor.page_id
        session_page_field.session_id = page_infor.session_id
        session_page_field.start_time = new Date(Date.now()).toISOString()
        try {
            session_page = new Session_page(session_page_field)
            await session_page.save()
        } catch (error) {
            console.log(error)
        }
        return session_page
    },
    update_session_page: async (data, session_page_id) => {
        var dataUpdate = {
            end_time: data
        }
        await Session_page.update(dataUpdate, { where: { id: session_page_id } });
    },
    get_all_session_page: async function (shop_id) {
        // const tempSQL = await sequelize.dialect.QueryGenerator.selectQuery('session', {
        //     attributes: ['id'],
        //     where: {
        //         shop_id: shop_id,
        //     }
        // }).slice(0, -1); // to remove the ';' from the end of the SQL

        var session_page = await Session_page.findAll({
            include: [{
                model: Session
            }],
            attributes: {
                exclude: ['session_id'],

            },
            where: {
                session_id: [sequelize.literal('(select id from session where shop_id = ' + shop_id + ') ')],

            }
        });
        // const session_page = await Session_page.findAll({
        //     include: [{
        //         model: Session
        //     }],
        //     attributes: {
        //         exclude: ['session_id']
        //     }
        // });
        return session_page
    },
    getAllSessionPageFilterDate: async function (shop_id, from, to) {

        var session_page = await Session_page.findAll({
            include: [{
                model: Session
            }],
            attributes: {
                exclude: ['session_id'],

            },
            where: {
                session_id: [sequelize.literal("(select id from session where shop_id = " + shop_id + " AND session_start_time >= N'" + from + "' AND session_end_time <= N'" + to + "') ")],

            }
        });
        // const session_page = await Session_page.findAll({
        //     include: [{
        //         model: Session
        //     }],
        //     attributes: {
        //         exclude: ['session_id']
        //     }
        // });
        return session_page
    },
    getSessionPageWithCount: async function (shop_id, acquistion_id) {
        var session_page = await Session_page.findAll(
            {
                attributes: [sequelize.fn('COUNT', sequelize.col('session_id'))],
                group: 'session_id',
                where: {
                    session_id: [sequelize.literal('(select id from session where shop_id = ' + shop_id + ' and acquistion_id=' + acquistion_id + ' ) ')],
                },
                having: sequelize.where(sequelize.fn('COUNT', sequelize.col('session_id')), '=', 1)
            },
        );
        return session_page;
    },
    getSessionPageWithCountFilterDate: async function (shop_id, acquistion_id, from, to) {
        var session_page = await Session_page.findAll(
            {
                attributes: [sequelize.fn('COUNT', sequelize.col('session_id'))],
                group: 'session_id',
                where: {
                    session_id: [sequelize.literal("(select id from session where shop_id = " + shop_id + " AND session_start_time >= N'" + from + "' AND session_end_time <= N'" + to + "' and acquistion_id=" + acquistion_id + ") ")],
                },
                having: sequelize.where(sequelize.fn('COUNT', sequelize.col('session_id')), '=', 1)
            },
        );
        return session_page;
    },
    getSessionPageWithCountNoAcquisition: async function (shop_id) {
        var session_page = await Session_page.findAll(
            {
                attributes: [sequelize.fn('COUNT', sequelize.col('session_id'))],
                group: 'session_id',
                where: {
                    session_id: [sequelize.literal('(select id from session where shop_id = ' + shop_id + ' ) ')],
                },
                having: sequelize.where(sequelize.fn('COUNT', sequelize.col('session_id')), '=', 1)
            },
        );
        return session_page;
    },
    getSessionPageWithCountNoAcquisitionFilterDate: async function (shop_id, from, to) {
        var session_page = await Session_page.findAll(
            {
                attributes: [sequelize.fn('COUNT', sequelize.col('session_id'))],
                group: 'session_id',
                where: {
                    session_id: [sequelize.literal("(select id from session where shop_id = " + shop_id + " AND session_start_time >= N'" + from + "' AND session_end_time <= N'" + to + "') ")],
                },
                having: sequelize.where(sequelize.fn('COUNT', sequelize.col('session_id')), '=', 1)
            },
        );
        return session_page;
    }
}