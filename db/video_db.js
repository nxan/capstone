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

        // await newVideo.save().then((item) => {
        //     return item;
        // })
        // let { session_id, session_page_id, folder_url, url, parent_id, is_parent, is_image, next_page, is_next_page, is_redirect } = newVideoFields;
        // await Video.create({
        //     session_id,
        //     session_page_id,
        //     folder_url,
        //     url,
        //     parent_id,
        //     is_parent,
        //     is_image,
        //     next_page,
        //     is_next_page,
        //     is_redirect,
        // }).then(item => {
        //     return item;
        // });

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
            condition
        ).then((result) => {
            return result
        })
    },
    updateVideo: async (data, id) => {
        await Video.update(data, { where: { id: id } });
    }
}