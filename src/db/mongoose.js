const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false
})



// const me = new User({
//     name: '     Ali Can',
//     email: 'CGUNES52@GMAIL.COM           ',
//     password: 'password'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((err)=>{
//     console.log('error!', err)
// })

// const task = new Task({
//     description: '            Learn Nodejs cg1        ',
//     completed:true
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((err)=>{
//     console.log(err)
// })