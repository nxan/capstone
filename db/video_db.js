const Video = require('../model/Video')
module.exports = {
    addVideo: async (newVideo) => {
        await newVideo.save().then(item => {
            return item;
        })
    },
    getVideo: async (condition) => {
        return Video.findOne(
            condition
        ).then((result) => {
            return result
        })

    },
    updateVideo: async(data, id) => {
        await Video.update(data, { where: { id: id } });
    }
}