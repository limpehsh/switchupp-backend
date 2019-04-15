
const express = require('express')
const router = express.Router()

const User = require('../models/User')

/**
GET /user - gets a user
POST /user - creates a user
*/

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    User.findUserById(userId, (err, user) => {
        if (!user) return res.status(400).send("There's no user here.")
        return res.send(user)
    })
})

router.get('/email/:userEmail', (req, res) => {

    const userEmail = req.params.userEmail;
    User.findUser(userEmail, (err, user) => {
        if (!user) return res.status(400).send("There's no user here.")
        return res.send(user)
    })
})

router.get('/username/:userName', (req, res) => {

    const userName = req.params.userName;
    User.findUserByUsername(userName, (err, user) => {
        if (!user) return res.status(400).send("There's no user here.")
        return res.send(user)
    })
})

router.put('/:userID', (req, res) => {
    const userID = req.params.userID;
    User.updateUser(userID, {$set: req.body}, (err, data) => {
        if (err) return res.status(400).send(err)
        return res.send(data)
    })
})

//post should create with upsert
//put should update

router.post('/', (req, res) => {
    const user = req.body
    User.createUser(user, (err, data) => {
        if (err) return res.status(400).send(err)
        return res.send(data)
    })
})



module.exports = router
