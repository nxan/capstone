const express = require('express');
const router = express.Router();
const Video = require('../../model/Video');
const video_db = require('../../db/video_db')
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
router.post('/sendVideo', async (req, res) => {
    var fileName = '';
    var string = JSON.stringify(req.body);
    console.log("Connecting tracking server !!! ");
    var json = JSON.parse(string);
    var condition = {
        where: {
            session_id: json.session_id,
            is_parent: true
        }
    };
    var video = await video_db.getVideo(condition);
    if (video == null) {
        var parentId;
        var newVideoFields = {};
        newVideoFields.session_id = json.session_id;
        newVideoFields.session_page_id = json.session_page_id;
        newVideoFields.folder_url = '';
        newVideoFields.url = json.url;
        newVideoFields.parent_id = null;
        newVideoFields.is_parent = true;
        newVideoFields.is_image = json.is_image;
        newVideoFields.page_order = 1;
        newVideoFields.next_page = 0;
        newVideoFields.is_next_page = json.is_change_page;
        newVideoFields.is_redirect = json.is_redirect;
        newVideo = new Video(newVideoFields);
        try {
            var item = await video_db.addVideo(newVideo);
            item.folder_url = item.id;
            parentId = item.id;
            function_path = './function/' + item.id + '.txt';
            if (!fs.existsSync(function_path)) {
                fs.writeFileSync(function_path, "", (err) => {
                    if (err) console.log(err);
                });
            }
            updateFolder = { folder_url: item.id };
            await Video.update(updateFolder, { where: { id: item.id } });
        } catch (error) {

        }
    } else {
        condition = {
            where: {
                session_id: json.session_id,
                is_next_page: false
            }
        };
        var childVideo = await video_db.getVideo(condition);
        var check_parent = false;
        if (childVideo == null) {
            var newVideoFields = {};
            newVideoFields.session_id = json.session_id;
            newVideoFields.session_page_id = json.session_page_id;
            newVideoFields.folder_url = '';
            newVideoFields.parent_id = video.id;
            newVideoFields.is_image = json.is_image;
            newVideoFields.is_parent = false;
            newVideoFields.page_order = 0;
            newVideoFields.next_page = 0;
            newVideoFields.url = json.url;
            newVideoFields.is_next_page = json.is_change_page;
            var newVideo = new Video(newVideoFields);
            try {
                condition = {
                    where: {
                        parent_id: video.id,
                        session_id: json.session_id,
                        is_next_page: true
                    }, order: [
                        ['id', 'DESC'],
                    ],
                    attributes: ['id']
                }
                var chidParent = await video_db.getVideo(condition);
                var item = await video_db.addVideo(newVideo);
                function_path = '../server_side_record/function/' + item.id + '.txt';

                let child_path = '../server_side_record/function/' + item.id + '.txt';
                if (!fs.existsSync(child_path)) {
                    fs.writeFileSync(child_path, "", (err) => {
                        if (err) console.log(err);
                    });
                }

                console.log("FUNCTION_PATH: " + function_path);


                var updateChild_Parent = {
                    next_page: item.id
                }
                var updateChild = {
                    folder_url: item.id
                }
                if (video.next_page == 0) {
                    await video_db.updateVideo(updateChild_Parent, video.id);
                } else {
                    await video_db.updateVideo(updateChild_Parent, chidParent.id);
                }
                await video_db.updateVideo(updateChild, item.id);
            } catch (err) {

            }
            // }

        }
        else if (childVideo != null || check_parent) {
            // positionData = readFunctionData(video.folder_url);
            condition = { where: { session_id: json.session_id, is_next_page: false } }, { order: [['createdAt', 'DESC']] };
            var getLastVideo = await video_db.getVideo(condition);
            //var getLastVideo = await Video.findOne({ where: { session_id: json.session_id, is_next_page: false } }, { order: [['createdAt', 'DESC']] });
            var path = '../server_side_record/function/' + getLastVideo.folder_url + '.txt'
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, positionData, (err) => {
                    if (err) console.log(err);
                    else console.log("Successfully Written to File.");
                });
            }
            if (json.is_change_page) {
                var updateLastVideo = {
                    is_next_page: true
                }
                await video_db.updateVideo(updateLastVideo, getLastVideo.id);
            }
            //positionData = fs.readFileSync(path);
            function_path = '../server_side_record/function/' + getLastVideo.folder_url + '.txt';
        }

    }
    positionData = fs.readFileSync(function_path);
    if (positionData == null || positionData == 'undefined') {
        positionData = "";
    }
    if (positionData.length > 0) {
        positionData += ',';
    }
    positionData += "{'x':" + json.positions[0].x + ", 'y':" + json.positions[0].y + ", 'scrollTop':" + json.positions[0].scrollTop + ", 'scrollLeft':" + json.positions[0].scrollLeft + ", 'action':" + json.positions[0].action + ", 's':" + "'" + json.positions[0].s + "'" + ", 'datetime':" + json.positions[0].datetime + ", 'page':" + "'" + json.positions[0].page + "'}";
    for (var i = 1; i < json.positions.length; i++) {
        positionData += ",{'x':" + json.positions[i].x + ", 'y':" + json.positions[i].y + ", 'scrollTop':" + json.positions[i].scrollTop + ", 'scrollLeft':" + json.positions[i].scrollLeft + ", 'action':" + json.positions[i].action + ", 's':" + "'" + json.positions[i].s + "'" + ", 'datetime':" + json.positions[i].datetime + ", 'page':" + "'" + json.positions[i].page + "'}";
    }
    //positionData += "]";

    //var path = '../server_side_record/function/test.txt';
    var dir = '../server_side_record/function/' + json.url;
    console.log("URL:" + json.url);
    var mkdirp = require('mkdirp');
    if (!fs.existsSync(dir)) {

        mkdirp(dir, function (err) {

            console.log('ok,');

        });
    }
    // if (!video) {
    //   var path = '../server_side_record/function/' + newVideo.folder_url + '.txt';
    // } else {

    // }
    // var path = '../server_side_record/function/' + json.url + ".txt";
    fs.writeFile(function_path, positionData, (err) => {
        if (err) console.log(err);
        else console.log("Successfully Written to File.");
    });
})
router.post('/sendCart', async (req, res) => {
    var json = req.body;
    var decodedImg = decodeBase64Image(json.img);
    var imageBuffer = decodedImg.data;
    // var type = decodedImg.type;
    var condition = {
        where: {
            session_id: json.session_id,
            is_parent: true
        }
    }
    var video = await video_db.getVideo(condition);
    var video_id = 0;
    if (video == null) {
        var parentId;
        var newVideoFields = {};
        newVideoFields.session_id = json.session_id;
        newVideoFields.session_page_id = json.session_page_id;
        newVideoFields.folder_url = '';
        newVideoFields.url = json.url;
        newVideoFields.parent_id = null;
        newVideoFields.is_parent = true;
        newVideoFields.page_order = 1;
        newVideoFields.next_page = 0;
        newVideoFields.is_image = json.is_image;
        newVideoFields.is_next_page = json.is_change_page;
        newVideoFields.is_redirect = json.is_redirect;
        newVideo = new Video(newVideoFields);
        try {
            var item = await video_db.addVideo(newVideo);
            video_id = item.id
            item.folder_url = item.id;
            parentId = item.id;
            function_path = '../server_side_record/function/' + item.id + '.txt';
            if (!fs.existsSync(function_path)) {
                fs.writeFileSync(function_path, "", (err) => {
                    if (err) console.log(err);
                });
            }
            updateFolder = { folder_url: item.id };
            await video_db.updateVideo(updateFolder, item.id);

        } catch (error) {

        }
    }
    else {
        condition = {
            where: {
                session_id: json.session_id,
                is_next_page: false
            }
        }
        var childVideo = await video_db.getVideo(condition);
        var check_parent = false;
        if (childVideo == null) {
            var newVideoFields = {};
            newVideoFields.session_id = json.session_id;
            newVideoFields.session_page_id = json.session_page_id;
            newVideoFields.folder_url = '';
            newVideoFields.parent_id = video.id;
            newVideoFields.is_parent = false;
            newVideoFields.page_order = 0;
            newVideoFields.next_page = 0;
            newVideoFields.url = json.url;
            newVideoFields.is_image = json.is_image;
            newVideoFields.is_next_page = json.is_change_page;
            var newVideo = new Video(newVideoFields);
            try {
                condition = {
                    where: {
                        parent_id: video.id,
                        session_id: json.session_id,
                        is_next_page: true
                    }, order: [
                        ['id', 'DESC'],
                    ],
                    attributes: ['id']
                }
                var chidParent = await video_db.getVideo(condition);
                var item = await video_db.addVideo(newVideo);
                video_id = item.id
                function_path = '../server_side_record/function/' + item.id + '.txt';

                let child_path = '../server_side_record/function/' + item.id + '.txt';
                if (!fs.existsSync(child_path)) {
                    fs.writeFileSync(child_path, "", (err) => {
                        if (err) console.log(err);
                    });
                }

                console.log("FUNCTION_PATH: " + function_path);


                var updateChild_Parent = {
                    next_page: item.id
                }
                var updateChild = {
                    folder_url: item.id
                }
                if (video.next_page == 0) {
                    await video_db.updateVideo(updateChild_Parent, video.id);
                } else {
                    await video_db.updateVideo(updateChild_Parent, chidParent.id);
                }
                await video_db.updateVideo(updateChild, item.id);
            } catch (err) {

            }
            // }

        }
        else if (childVideo != null || check_parent) {
            // positionData = readFunctionData(video.folder_url);
            condition = {
                where: { session_id: json.session_id, is_next_page: false }
            }, { order: [['createdAt', 'DESC']] };
            var getLastVideo = await video_db.getVideo(condition);
            var path = '../server_side_record/function/' + getLastVideo.folder_url + '.txt'
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, positionData, (err) => {
                    if (err) console.log(err);
                    else console.log("Successfully Written to File.");
                });
            }
            if (json.is_change_page) {
                var updateLastVideo = {
                    is_next_page: true
                }
                await video_db.updateVideo(updateLastVideo, getLastVideo.id);
            }
            //positionData = fs.readFileSync(path);
            function_path = '../server_side_record/function/' + getLastVideo.folder_url + '.txt';
        }
    }
    //positionData = readFunctionData(function_path);
    positionData = fs.readFileSync(function_path);
    if (positionData == null || positionData == 'undefined') {
        positionData = "";
    }
    if (positionData.length > 0) {
        positionData += ',';
    }
    positionData += "{'x':" + json.positions[0].x + ", 'y':" + json.positions[0].y + ", 'scrollTop':" + json.positions[0].scrollTop + ", 'scrollLeft':" + json.positions[0].scrollLeft + ", 'action':" + json.positions[0].action + ", 's':" + "'" + json.positions[0].s + "'" + ", 'datetime':" + json.positions[0].datetime + ", 'page':" + "'" + json.positions[0].page + "'}";
    for (var i = 1; i < json.positions.length; i++) {
        positionData += ",{'x':" + json.positions[i].x + ", 'y':" + json.positions[i].y + ", 'scrollTop':" + json.positions[i].scrollTop + ", 'scrollLeft':" + json.positions[i].scrollLeft + ", 'action':" + json.positions[i].action + ", 's':" + "'" + json.positions[i].s + "'" + ", 'datetime':" + json.positions[i].datetime + ", 'page':" + "'" + json.positions[i].page + "'}";
    }
    //positionData += "]";

    //var path = '../server_side_record/function/test.txt';
    var dir = '../server_side_record/function/' + json.url;
    console.log("URL:" + json.url);
    var mkdirp = require('mkdirp');
    if (!fs.existsSync(dir)) {

        mkdirp(dir, function (err) {

            console.log('ok,');

        });
    }
    // if (!video) {
    //   var path = '../server_side_record/function/' + newVideo.folder_url + '.txt';
    // } else {

    // }
    // var path = '../server_side_record/function/' + json.url + ".txt";
    fs.writeFile(function_path, positionData, (err) => {
        if (err) console.log(err);
        else console.log("Successfully Written to File.");
    });
    try {
        var fileName = "image-" + video_id + '.jpg';
        // takeScreenShot(fileName, json.fullPage);
        fs.writeFileSync("./img/" + fileName, imageBuffer, 'utf8');
    }
    catch (err) {
        console.error(err);
    }
    return fileName;
})
router.post('/sendImage', async (req, res) => {
    var json = req.body;
    // var imageBuffer = decodedImg.data;
    // var type = decodedImg.type;
    var condition = {
        where: {
            session_id: json.session_id,
            is_parent: true
        }
    };
    var video = await video_db.getVideo(condition);
    var video_id = 0;
    if (video == null) {
        var parentId;
        var newVideoFields = {};
        newVideoFields.session_id = json.session_id;
        newVideoFields.session_page_id = json.session_page_id;
        newVideoFields.folder_url = '';
        newVideoFields.url = json.url;
        newVideoFields.parent_id = null;
        newVideoFields.is_parent = true;
        newVideoFields.page_order = 1;
        newVideoFields.next_page = 0;
        newVideoFields.is_image = json.is_image;
        newVideoFields.is_next_page = json.is_change_page;
        newVideoFields.is_redirect = json.is_redirect;
        newVideo = new Video(newVideoFields);
        try {
            var item = await video_db.addVideo(newVideo);
            video_id = item.id
            item.folder_url = item.id;
            parentId = item.id;
            function_path = '../server_side_record/function/' + item.id + '.txt';
            if (!fs.existsSync(function_path)) {
                fs.writeFileSync(function_path, "", (err) => {
                    if (err) console.log(err);
                });
            }
            updateFolder = { folder_url: item.id };
            await video_db.updateVideo(updateFolder, item.id);
        } catch (error) {

        }
    }
    else {
        condition = {
            where: {
                session_id: json.session_id,
                is_next_page: false
            }
        };
        var childVideo = await video_db.getVideo(condition);
        var check_parent = false;
        if (childVideo == null) {
            var newVideoFields = {};
            newVideoFields.session_id = json.session_id;
            newVideoFields.session_page_id = json.session_page_id;
            newVideoFields.folder_url = '';
            newVideoFields.parent_id = video.id;
            newVideoFields.is_parent = false;
            newVideoFields.page_order = 0;
            newVideoFields.next_page = 0;
            newVideoFields.url = json.url;
            newVideoFields.is_image = json.is_image;
            newVideoFields.is_next_page = json.is_change_page;
            var newVideo = new Video(newVideoFields);
            try {
                condition = {
                    where: {
                        parent_id: video.id,
                        session_id: json.session_id,
                        is_next_page: true
                    }, order: [
                        ['id', 'DESC'],
                    ],
                    attributes: ['id']
                };
                var chidParent = await video_db.getVideo(condition);
                var item = await video_db.addVideo(newVideo);
                video_id = item.id
                function_path = '../server_side_record/function/' + item.id + '.txt';

                let child_path = '../server_side_record/function/' + item.id + '.txt';
                if (!fs.existsSync(child_path)) {
                    fs.writeFileSync(child_path, "", (err) => {
                        if (err) console.log(err);
                    });
                }

                console.log("FUNCTION_PATH: " + function_path);


                var updateChild_Parent = {
                    next_page: item.id
                }
                var updateChild = {
                    folder_url: item.id
                }
                if (video.next_page == 0) {
                    await video_db.updateVideo(updateChild_Parent, video.id);
                } else {
                    await video_db.updateVideo(updateChild_Parent, chidParent.id);
                }
                await video_db.updateVideo(updateChild, item.id);

            } catch (err) {

            }
            // }

        }
        else if (childVideo != null || check_parent) {
            // positionData = readFunctionData(video.folder_url);
            condition = {
                where:
                    { session_id: json.session_id, is_next_page: false }
            }, { order: [['createdAt', 'DESC']] }
            var getLastVideo = video_db.getVideo(condition);
            var path = '../server_side_record/function/' + getLastVideo.folder_url + '.txt'
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, positionData, (err) => {
                    if (err) console.log(err);
                    else console.log("Successfully Written to File.");
                });
            }
            if (json.is_change_page) {
                var updateLastVideo = {
                    is_next_page: true
                }
                await video_db.updateVideo(updateLastVideo, getLastVideo.id);
            }
            //positionData = fs.readFileSync(path);
            function_path = '../server_side_record/function/' + getLastVideo.folder_url + '.txt';
        }
    }
    //positionData = readFunctionData(function_path);
    positionData = fs.readFileSync(function_path);
    if (positionData == null || positionData == 'undefined') {
        positionData = "";
    }
    if (positionData.length > 0) {
        positionData += ',';
    }
    positionData += "{'x':" + json.positions[0].x + ", 'y':" + json.positions[0].y + ", 'scrollTop':" + json.positions[0].scrollTop + ", 'scrollLeft':" + json.positions[0].scrollLeft + ", 'action':" + json.positions[0].action + ", 's':" + "'" + json.positions[0].s + "'" + ", 'datetime':" + json.positions[0].datetime + ", 'page':" + "'" + json.positions[0].page + "'}";
    for (var i = 1; i < json.positions.length; i++) {
        positionData += ",{'x':" + json.positions[i].x + ", 'y':" + json.positions[i].y + ", 'scrollTop':" + json.positions[i].scrollTop + ", 'scrollLeft':" + json.positions[i].scrollLeft + ", 'action':" + json.positions[i].action + ", 's':" + "'" + json.positions[i].s + "'" + ", 'datetime':" + json.positions[i].datetime + ", 'page':" + "'" + json.positions[i].page + "'}";
    }
    //positionData += "]";

    //var path = '../server_side_record/function/test.txt';
    var dir = '../server_side_record/function/' + json.url;
    console.log("URL:" + json.url);
    var mkdirp = require('mkdirp');
    if (!fs.existsSync(dir)) {

        mkdirp(dir, function (err) {

            console.log('ok,');

        });
    }
    // if (!video) {
    //   var path = '../server_side_record/function/' + newVideo.folder_url + '.txt';
    // } else {

    // }
    // var path = '../server_side_record/function/' + json.url + ".txt";
    fs.writeFile(function_path, positionData, (err) => {
        if (err) console.log(err);
        else console.log("Successfully Written to File.");
    });
    try {
        var fileName = "../server_side_record/img/" + "image-" + video_id + '.jpg';
        takeScreenShot(fileName, json.fullPage);
        //fs.writeFileSync("./img/" + fileName, imageBuffer, 'utf8');
    }
    catch (err) {
        console.error(err);
    }
    return fileName;
})
async function takeScreenShot(pathWeb, pathServer) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const options = {
        path: pathWeb,
        fullPage: true,
        omitBackground: true
    }
    await page.goto(pathServer);
    await page.screenshot(options);
    await browser.close();
}
function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');
    //response.data = new Buffer(matches[2], 'base64');

    return response;
}
module.exports = router;