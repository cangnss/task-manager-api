require('../db/mongoose')
const User = require('../models/user')

// 6219ffc0919bc42fc09b7cb7

// User.findByIdAndUpdate('621a12efbe4f1754324f27af', { age: 1 }).then((user)=>{
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id,{ age })
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('621a12efbe4f1754324f27af',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})