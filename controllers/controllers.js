const User = require('../models/userModel')
const Bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const NodeRSA = require('node-rsa')

const userName = 'public'

const createUser = async (req, res, next) => {
    const { name, password } = req.body
    let hashedPassword = ''
    try {
        hashedPassword = await Bcrypt.hash(password, 10)
        const user = await new User({
            name,
            password: hashedPassword
        })
        await user.save()
    } catch(err) {
        console.log(err)
    }
    
    res.status(200).json({message: "working"})
} 

const publicKey = '-----BEGIN PUBLIC KEY-----\n'+
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEpS+XZCfhdBVl8EcyjF5zSyUN\n'+
'y51cgWywD/qCV8+JPzz1vj5vdc3jhAd+dLd/jEoo1WnTA+HFRS2VLQqzW1uQ2sDX\n'+
'1MGuqJOOixx74obLg4ss6o5fpQsYmkzJRsuTtFMyg/mekhuL5S6F+28vO6j0SCXd\n'+
'LHPfK2JB34OlVSIWLwIDAQAB\n'+
'-----END PUBLIC KEY-----'

const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n'+
'MIICXAIBAAKBgQCEpS+XZCfhdBVl8EcyjF5zSyUNy51cgWywD/qCV8+JPzz1vj5v\n'+
'dc3jhAd+dLd/jEoo1WnTA+HFRS2VLQqzW1uQ2sDX1MGuqJOOixx74obLg4ss6o5f\n'+
'pQsYmkzJRsuTtFMyg/mekhuL5S6F+28vO6j0SCXdLHPfK2JB34OlVSIWLwIDAQAB\n'+
'AoGAL8SQ8/MEjaNRRWmXKjP0m453JJWr8LFHI8xNSX035tQYLuM49si0wXc9f6Om\n'+
'pU8vMa9RMcWXG4SDGtKipN6EhYUAC4lMAvgFm0v9/U0qP8DqErvv8tO8nqjUyNyY\n'+
'QW5SpZJml3iXJy4royFo4IWeoo1yP0RqOzPnaBvsx858aMECQQD/Lv36ZI9rUYlq\n'+
'rpV1o/nW9v1AQS2QPPowlRJbacRatdMA14SmUwRy3vtKcpSxtsrMmeGYEPz3alDd\n'+
'c8axbs6hAkEAhRHUMq9W4k93gztDXFlmONUZM3RViyQcCFbdcaJT31Xvl6dpiTiB\n'+
'UICqIB04qTdU297Ne8psHwFpJVOnzhPCzwJARBT4g+6CaSKG5CSSEaHfDWA2Lwd0\n'+
'rY/nPED5ddQhJAZwtj/Jz0pE3JTrPHCXhVZ8gtvnWVfm9eeyjXLPJxWmIQJAPWYX\n'+
'kfdjUHK4Qz3x+8doKirxQNOZsOTNZm+mJ4ttxaviLAhb4qvGxv1HAiBZh4J3TigE\n'+
'iezBbKD7AfUShTyK8wJBALEpsWrzLG0DxC7SPakeEhR7CJyBhqXCubbLGe4oGjrz\n'+
'0OK6OGpcDk2rsSa31frIeFqYwKfiwJrXZfsedQGpqjU=\n'+
'-----END RSA PRIVATE KEY-----'

const login = async (req, res, next) => {
    const {password} = req.body
    let user 
    try {
        user = await User.findOne({name : userName})  
    }catch(err) {
        console.log(err)
    }
    if(!user) {
        res.status(400).json({message: "User not found"})
        return
    }
    
    try {
        if(await Bcrypt.compare(password, user.password)) {
            const yz = {
                name: 'public'
            }
            const accessToken = jwt.sign(yz, process.env.JWT_KEY)
            return res.status(200).json({
                    message: "Logged In",
                    accessToken
                })
        }
        else {
            res.status(400).json({message: "Wrong password"})
        }
    }catch(err) {
        res.status(400).json({message: "login failed"})
        console.log(err)
    }
}

const addPassword = async (req, res, next) => {
    const {title, username, password} = req.body

    const key_public = new NodeRSA(publicKey)
    const encryptedPassword = key_public.encrypt(password, 'base64')

    try {
        const user = await User.findOne({name : userName})
        const list = user.passwordList
        const temp = list.filter((p) => {
            if(p.title === title && p.username === username)
                return true
            return false
        })
        if(temp.length > 0) 
            return res.status(409).json({message: "password exists"})
        
        user.passwordList.push({
            title,
            username,
            password: encryptedPassword
        })
        user.save()
        res.status(200).json({message: "Password added successfully !"})
        return
    }catch(err) {
        console.log(err)
    }
}

const deletePassword = async (req, res, next) => {
    const {title, username} = req.body
    const user = await User.findOne({name: userName})
    if(!user) return res.status(400).json({message: "User not found"})

    try {
        await user.updateOne({$pull :{'passwordList': {title: title, username: username}}})
        user.save()
        return res.status(200).json({message: 'Password Deleted successfully !'})
    }catch(err) {
        console.log(err)
    } 
    return res.status(400).json({message: 'Password Delete failed'})
}

const editPassword = async (req, res, next) => {
    const {title, oldUsername, oldPassword, newUsername, password} = req.body

    const key_public = new NodeRSA(publicKey)
    const key_private = new NodeRSA(privateKey)
    const encryptedPassword = key_public.encrypt(password, 'base64')

    try {
        const user = await User.findOne({name: userName})
        if(!user) return res.status(400).json({message: "User not found"})

        const list = user.passwordList
        const temp = list.filter((p) => {
            if(p.title === title && p.username === newUsername)
                return true
            return false
        })
        
         //Another password has same username with same title so username can't be changed
        if(temp.length > 0) {

             //newPassword is similar to the old password so password can't be changed
            if(oldPassword === password) {  
                return res.status(409).json({message: "No Changes", list})
            }

            //newPassword is different from old password
            await User.updateOne(
                    {name: 'public', 'passwordList.title' : title, 'passwordList.username': oldUsername},
                    {$set: {'passwordList.$.password': encryptedPassword}}
                )
            
            const item = {
                username: oldUsername,
                password: password
            }
            list.map(p => p.password = key_private.decrypt(p.password, 'utf8'))
            return res.status(200).json({message: 'userPassword Edited', item, list})
        }

        //newUsername and newPassword both are different
        //detailed: no other password has same username as newUsername and current userpassword of 
        //requested password is different from newUserpassword 
        await User.updateOne(
            {name: 'public', 'passwordList.title' : title, 'passwordList.username': oldUsername},
            {$set: {'passwordList.$.username': newUsername, 'passwordList.$.password': encryptedPassword}}
        )

        const item = {
            username: newUsername,
            password: password
        }
        res.status(200).json({message: "Edited", item, list})
        return
    }catch(err) {
        console.log(err)
    }

    res.status(400).json({message: "Editing password failed"})
    return
}

const getPasswordList = async (req, res, next) => {
    const user = await User.findOne({name: userName})
    if(!user) return res.status(400).json({message: "User not found"})

    const key_private = new NodeRSA(privateKey)

    let list = user.passwordList
    list.map(p => p.password = key_private.decrypt(p.password, 'utf8'))

    res.status(200).json({list})
}

exports.createUser = createUser
exports.login = login
exports.addPassword = addPassword
exports.deletePassword = deletePassword
exports.editPassword = editPassword
exports.getPasswordList = getPasswordList
