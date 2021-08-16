const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

require('../db/conn')
const User = require('../model/userSchema')

router.get('/', (req, res) => {
    res.send('Homepage!');
})

router.post('/register', (req, res) => {

    const {
        name,
        email,
        phone,
        work,
        password,
        cpassword
    } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({
            error: "Please fill all the fields properly"
        });
    }

    User.findOne({
            email: email
        })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({
                    error: "User already Exists!"
                });
            }

            const user = new User({
                name,
                email,
                phone,
                work,
                password,
                cpassword
            });

            user.save().then(() => {
                res.status(201).json({
                    message: "User created successfully!"
                });
            }).catch((err) => res.status(500).json({
                error: "Failed to register"
            }))
        }).catch((err) => {
            console.log(err)
        })
})

router.post('/signin', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status('400').json({
                error: "Please enter your credentials properly"
            })
        }

        const userLogin = await User.findOne({
            email: email
        });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                return res.status(400).json({
                    error: "Invalid Credentials"
                })
            } else {
                return res.json({
                    message: "User Signin Successfully"
                })
            }
        } else {
            return res.status(400).json({
                error: "Invalid Credentials"
            })
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;