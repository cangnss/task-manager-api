require('../db/mongoose')
const Task = require('../models/task')

// Task.findByIdAndDelete('621a0197c1aaf7360769f5a5').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({ completed:false })
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount('621a01a8ec63973680a40f65').then((res)=>{
    console.log(res)
}).catch((e)=>{
    console.log(e)
})