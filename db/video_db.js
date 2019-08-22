const Video = require('../model/Video')
const sequelize = require('sequelize');


module.exports = {
    addVideo: async (newVideoFields) => {
        try {
            var itemVideo;
            var newVideo = new Video(newVideoFields);
            await newVideo.save().then((item) => {
                itemVideo = item;
            });
            return itemVideo;
        } catch (err) {
            console.log(err);
        }

    },
    getVideo: async (video_id) => {
        return Video.findOne(
            {
                where: {
                    id: video_id
                }
            }
        ).then((result) => {
            return result
        })

    },
    getAll: async (condition) => {
        return Video.findAll(
            condition,
        ).then((result) => {
            return result
        })
    },
    getAllByShop: async (shop_url) => {
        var sql = "select id, session_id, url_video, date_time from video where session_id in ( select id from session where shop_id = (select id from shop where shop_url = N'" + shop_url  + "')) order by id desc ";
        var video = await Video.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
           return result
        })
       return video;
    },
    updateVideo: async (data, id) => {
        await Video.update(data, { where: { id: id } });
    }
}