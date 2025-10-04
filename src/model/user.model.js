import mongoose  from "mongoose";
const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        min:3,
        max:50
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        min:6
    }
},{
    timestamps:true
})
const User = mongoose.model("User",userSchema);
export default User;