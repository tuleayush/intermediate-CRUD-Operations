const mongoose=require('mongoose')

const purchaseSchema= new mongoose.Schema({
    // _id:{
    //     type:Number ,
    //     required:false,
    //     default:1

    // },
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    purchaseDate:{
        type:String,
        // required:true,
        trim:true
    },
    paid:{
        type:Boolean,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true

    },
    quantity:{
        type:Number,
        required:true,
        trim:true

    },
})




var Purchase= mongoose.model("purchase_Data",purchaseSchema)


module.exports=Purchase
