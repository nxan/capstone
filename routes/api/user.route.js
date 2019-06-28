const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../model/User');

const { check, validationResult } = require('express-validator/check');

/* ----- 
  @route  POST api/user
  @desc   Register User
-----*/
router.post(
  '/',
  [
    // check('name', 'Name is required')
    //   .not()
    //   .isEmpty(),
    // check('email', 'Please include a valid email').isEmail(),
    // check(
    //   'password',
    //   'Please enter a password with 6 or more character'
    // ).isLength({
    //   min: 6
    // })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    try {
      console.log(req.body);
      let user = await User.findOne({
        where: {
          email: email
        },
      });

      if (user) {
        return res.status(400).json({ errors: [{ message: 'User already exists' }] })
      }

      user = new User({
        email, password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      console.log(user.password);
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

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
