import User from "../model/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";


const registerUser= asyncHandler(async(req,res)=>{
    try{
        const user = req.body;
        if(user.email!=User.findOne(user.email)){
            User.create({
    username:user.username,
    email:user.email,
    password:user.password,
    fullname:user.fullname,
    // avatar:user.avatar,
    // coverImg:user.coverImg,
    // watchHistory:user.watchHistory,
    // refreshToken:user.refreshToken

        }
    )
    res.status(200).json({
        message:"Ok"
    })

        
        }

    }catch(error){
        res.status(400).json({
            message:"not ok",error
        })

    }
})
export {registerUser}