const mongoose=require('mongoose')
// const jwt = require('jsonwebtoken')
// const res = require('express/lib/response')

const mongoosePaginate= require('mongoose-paginate-v2')


var userSchema= mongoose.Schema({

name:{
    type:String,
    require:true
},

email:{
    type:String,
    require:true,
    unique:true
},

mobile:{
    type:Number,
    require:true,
    unique:true
},

technology:{
    type:String,
    require:true
},
password:{
    type:String,
    require:true
},
status:{
    type:Number,
    enum: [0, 1],
    default:0
},
role:{
    type:String,
require:true,
default:0 // u-0, a-1
},

img:{
    type:Buffer,
    contentType:String
}

})

// userSchema.methods.generateAuthToken= async function(){
// try {
//     const token= await jwt.sign({_id:this._id},"mynameisluckyayushtuleygurjar")


// console.log(token);

// } catch (error) {
//     res.send(`error${error}`)
// console.log(error)
// }

// }

   userSchema.plugin(mongoosePaginate)


const User= mongoose.model('Details',userSchema)

module.exports= User



