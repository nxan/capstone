const express = require('express');
const router = express.Router();
const Video = require('../../model/Video');

Session.hasMany(Video, { foreignKey: 'video_id', sourceKey: 'id' });
Video.belongsTo(Session, { foreignKey: 'video_id', targetKey: 'id' });

router.get('/:session_id', async (req, res) => {
    session_id = req.params.session_id
    try {
        let video = await Video.findOne({
            where: {
                session_id: session_id,
            }
        })
        res.json(video);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})
router.get('/getVideoParent/:session_id', async (req, res) => {
    session_id = req.params.session_id
    try {
        let video = await Video.findOne({
            where: {
                session_id: session_id,
                is_parent: true
            }
        })
        res.json(video);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})
router.get('/getChild', async (req, res) => {
    var childVideo = await Video.findOne({
        where: {
            session_id: json.session_id,
            is_next_page: false
        },
    }, { order: [['createdAt', 'DESC']] });
    res.json(childVideo);
})
router.post('/createChild', async (req, res) => {
    var newVideoFields = {};
    newVideoFields.session_id = req.body.session_id;
    newVideoFields.session_page_id = req.body.session_page_id;
    newVideoFields.folder_url = '';
    newVideoFields.parent_id = req.body.video_id;
    newVideoFields.is_image = req.body.is_image;
    newVideoFields.is_parent = false;
    newVideoFields.page_order = 0;
    newVideoFields.next_page = 0;
    newVideoFields.url = json.url;
    newVideoFields.is_next_page = req.body.is_change_page;
    var newVideo = new Video(newVideoFields);
    var childParent = await Video.findOne({
        where: {
            parent_id: video.id,
            session_id: json.session_id,
            is_next_page: true
        }, order: [
            ['id', 'DESC'],
        ],
        attributes: ['id']
    })
    await newVideo.save().then(async item => {
        var updateChild_Parent = {
            next_page: item.id
        }
        var updateChild = {
            folder_url: item.id
        }
        if (video.next_page == 0) {
            await Video.update(updateChild_Parent, { where: { id: video.id } });
        } else {
            await Video.update(updateChild_Parent, { where: { id: childParent.id } });
        }
        await Video.update(updateChild, { where: { id: item.id } });
        res.json(item);
    })
})
router.post('/createParent', async (req, res) => {
    var newVideoFields = {};
    newVideoFields.session_id = req.body.session_id;
    newVideoFields.session_page_id = req.body.session_page_id;
    newVideoFields.folder_url = '';
    newVideoFields.url = req.body.url;
    newVideoFields.parent_id = null;
    newVideoFields.is_parent = true;
    newVideoFields.is_image = req.body.is_image;
    newVideoFields.page_order = 1;
    newVideoFields.next_page = 0;
    newVideoFields.is_next_page = req.body.is_change_page;
    newVideoFields.is_redirect = req.body.is_redirect;
    newVideo = new Video(newVideoFields);
    await newVideo.save().then(async item => {
        item.folder_url = item.id;
        parentId = item.id;
        updateFolder = { folder_url: item.id };
        await Video.update(updateFolder, { where: { id: item.id } });
        res.json(parentId);
    })
})
router.put('/', async (req, res) => {
    var data_update = req.body.data;
    var video_id = req.body.video_id;
    await Video.update(data_update, { where: { id: video_id } }).then(async item => { res.json(item) });

})