const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.middleware')
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator/check');

const User = require('../../model/User');


/* ----- 
  @route  GET api/auth
  @desc   Test 
-----*/

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                email: req.user.email
            },
            attributes: ['id', 'email', 'name']
        });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  POST api/auth
  @desc   Authenticate user & get token
-----*/
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more character'
        ).exists()
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

            if (!user) {
                return res.status(400).json({ errors: [{ message: 'Invalid email or password' }] })
            }
            
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ message: 'Invalid email or password' }] })
            }

            const payload = {
                user: {
                    id: user.id
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

module.exports = router