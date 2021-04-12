const express = require('express')
const Controller = require('../controllers/controllers')
const jwt = require('jsonwebtoken')

const Router = express.Router()

Router.post('/createUser', Controller.createUser)

Router.post('/login', Controller.login)

Router.post('/addPassword', authenticateToken, Controller.addPassword)

Router.post('/deletePassword', authenticateToken, Controller.deletePassword)

Router.post('/editPassword', authenticateToken, Controller.editPassword)

Router.get('/getPasswordList', authenticateToken, Controller.getPasswordList)

Router.post('/saveLog', Controller.saveLog)

function authenticateToken (req, res, next) {
    const authHeaders = req.headers['authorization']
    if(authHeaders == null) return res.status(401).json({message: "No Authorization passed"})
    const accessToken = authHeaders.split(' ')[1]
    if(accessToken == null) return res.status(401).json({message: "No Access Token found"})

    jwt.verify(accessToken, process.env.JWT_KEY, (err) => {
        if(err) return res.status(401).json({message : 'access Token not matched'})
        next()
    })
}

module.exports = Router