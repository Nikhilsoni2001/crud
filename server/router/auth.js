const express = require('express');
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
                return res.status(404).json({
                    error: "User already Exists!"
                });
            }

            const user = User({
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


    res.json({
        message: req.body
    });
})

module.exports = router;