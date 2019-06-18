const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.middleware');
const { check, validationResult } = require('express-validator/check');


const Profile = require('../../model/Profile');
const User = require('../../model/User');


/* ----- 
  @route  GET api/profile
  @desc   Get logged in profile
-----*/
Profile.hasOne(User, { foreignKey: 'id', sourceKey: 'user_id' });

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            include: [{
                model: User,
                where: { id: req.user.id }
            }]
        });
        if (!profile) {
            return res.status(400).json({ message: 'There is no profile for this user' });
        }
        res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  POST api/shop
  @desc   Create or update user shop
-----*/

router.post('/', [auth, [
    check('shop_url', 'Shop URL is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { shop_url, shop_name } = req.body;

    //Build profile object
    var profileFields = {};
    profileFields.user_id = req.user.id;
    if (shop_url) profileFields.shop_url = shop_url;
    if (shop_name) profileFields.shop_name = shop_name;
    try {
        var profile = await Profile.findOne({
            include: [{
                model: User,
                where: { id: req.user.id }
            }]
        });
        if (profile) {
            profile.update({
                attributes: ['id', 'shop_url', 'shop_name'],
                shop_url: profileFields.shop_url,
                shop_name: profileFields.shop_name
            });
            return res.json(profile);
        } else {
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

/* ----- 
  @route  GET api/profile
  @desc   Get all profile
-----*/
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.findAll({
            include: [{
                model: User
            }]
        });
        res.json(profiles)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  GET api/profile//user/:user_id
  @desc   Get user profile
-----*/
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            include: [{
                model: User,
                where: { id: req.params.user_id }
            }]
        });
        if (!profile) {
            return res.status(400).json({ message: 'Profile not found' });
        }
        res.json(profile)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;