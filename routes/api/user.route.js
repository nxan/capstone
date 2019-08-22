const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../model/User');
const Shop = require('../../model/Shop');
const { check, validationResult } = require('express-validator/check');

/* ----- 
  @route  POST api/user
  @desc   Register User
-----*/
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more character'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors.isEmpty())
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password, shopName, name, shop } = req.body;

    try {
      console.log(req.body);
      let user = await User.findOne({
        where: {
          email: email
        },
      });
      let shop_infor = await Shop.findOne({
        where:{
          shop_url: shop
        }
      })
      if (user) {
        return res.status(400).json({ errors: [{ message: 'User already exists' }] })
      }
      if (shop_infor){
        return res.status(400).json({ errors: [{ message: 'Shop already exists' }] })
      }
      user = new User({
        email, password, name
      });
      
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          email: user.email
        }
      }
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
      shop_infor = new Shop({
        user_id:user.id,
        shop_url: shop,
        name_shop: shopName,
      })
      await shop_infor.save()
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.put(
  '/', async (req, res) => {

    const { name, password, email } = req.body;
    console.log(name)
    try {
      let user = await User.findOne({
        where: {
          email: email
        },
      });
      if (name != null) {
        user.name = name
      }
      if (password != null) {
        user.password = password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      await user.save();

      const payload = {
        user: {
          email: user.email
        }
      }
      res.json(user)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
