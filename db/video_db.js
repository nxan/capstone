const Video = require('../model/Video')
module.exports = {
    addVideo: async (newVideo) => {
        await newVideo.save().then(item => {
            return item;
        })
    },
    getVideo: async (condition) => {
        return Shop.findOne(
            condition
        ).then((result) => {
            return result
        })

    },
    updateVideo: async(data, id) => {
        await Session_page.update(dataUpdate, { where: { id: id } });
    }
}