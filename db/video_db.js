const Video = require('../model/Video')
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
    updateVideo: async (data, id) => {
        await Video.update(data, { where: { id: id } });
    }
}