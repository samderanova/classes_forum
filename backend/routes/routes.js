const router = require('express').Router();
const User = require('../models/user.model');

// a test get route to test if mongodb connection works
router.route('/').get((req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

// when registering for an account 
router.route('/adduser').post((req, res) => {
    // taking the request body (which is in JSON) and then assigning value to variables
    const name = req.body.name;
    const pic = req.body.pic == '' ? 'default img' : req.body.pic;
    const major = req.body.major;
    const year = req.body.year;
    const classes = req.body.classes;
    const newUser = new User({name, pic, major, year, classes});
    newUser.save()
        .then(_ => res.json("User added!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

// delete an account
// When adding users, MongoDB adds a unique id to each one. This finds a user by their MongoDB id and deletes them.
router.route('/deleteuser/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(_ => res.json('Player deleted'))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

// updating profile info
router.route('/updateprofile/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name,
            user.pic = req.body.pic,
            user.major = req.body.major,
            user.year = req.body.year,
            user.classes = req.body.classes
            user.save()
                .then(_ => res.json('User updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// return json object of profile info after finding by id
router.route('/getprofile/:id').get((req, res) => {
    User.findById(req.params.id)
    .then(user => {
        console.log(user)
        res.json(user)
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router;