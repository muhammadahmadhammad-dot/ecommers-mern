import mongoose from "mongoose"

const Users = new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:Boolean,
        required:true,
        default:false,
    },
})
export default mongoose.model("User", Users)