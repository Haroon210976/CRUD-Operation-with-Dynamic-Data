import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017/user")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
})


const User =  mongoose.model("user",userSchema);
export default User