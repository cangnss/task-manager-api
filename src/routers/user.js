const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
//const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()

router.post('/users', async (req,res) => {
    const user = new User(req.body)
    try {
        await user.save()
        //sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send()
    }

    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((err)=>{
    //     res.status(400).send(err)
    // })
})

router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


router.post('/users/logoutAll', auth, async (req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req,res) => {

    res.send(req.user)



    // try {
    //     const users = await User.find({})
    //     res.status(200).send(users)
    // } catch (error) {
    //     res.status(500).send(e)
    // }

    // User.find({}).then((users)=>{
    //     res.status(200).send(users)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

// router.get('/users/:id', async (req,res)=>{
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }

//         res.status(200).send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }

//     // User.findById(_id).then((user)=>{
//     //     if (!user) {
//     //         return res.status(404).send()
//     //     }

//     //     res.status(201).send(user)
//     // }).catch((e)=>{ 
//     //     res.status(400).send(e)
//     // })
// })

router.patch('/users/me', auth, async (req,res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password','age']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })
        
        await req.user.save()
        res.status(201).send(req.user)
        
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        // if (!user) {
        //     return res.status(404).send()
        // }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req,res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove()
        //sendCancelationEmail(req.user.email, req.user.name)
        res.status(201).send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        // cb(new Error('File must be a PDF'))
        // cb(undefined, true)
        // cb(undefined, false)

        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a JPG, JPEG or PNG'))
        }
        
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({ width:250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next)=>{
    res.status(400).send({ error: error.message})
})


router.delete('/users/me/avatar', auth, async (req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next)=>{
    res.status(400).send({ error: error.message })
})

router.get('/users/:id/avatar', async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }

        res.status(200).set('Content-Type','image/png').send(user.avatar)
    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router