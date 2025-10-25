import User from "../model/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {uploadCloudinaryImage} from "../service/cloudinary.service.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser= asyncHandler(async(req,res)=>{
    try{
        const user = req.body;
        if([user.fullname,user.email,user.password].some((Field)=>Field?.trim()==="")){
            throw new ApiError(400,"All field are required")
        }
        const existedUser = User.findOne({
            $or:[{username},{email}]
        })
        if(existedUser){
            throw new ApiError(401,"User already exist")
        }
        const avatarLocal= req.files?.avatar[0]?.path;
        const coverImgLocal=req.files?.coverImage[0]?.path;
        if(!avatarLocal){
            throw new ApiError(401,"Avatar is required")
        }       
        
        const avatar=await uploadCloudinaryImage(avatarLocal)
        if(!avatar){
             throw new ApiError(401,"Avatar is required")
        }
        const coverImg =await uploadCloudinaryImage(coverImgLocal)
       const users = await User.create({
    username:user.username,
    email:user.email,
    password:user.password,
    fullname:user.fullname,
    avatar:avatar.url,
    coverImg:coverImg?.url | " ",
    // watchHistory:user.watchHistory,
    // refreshToken:user.refreshToken

        }

    )
    const userCreated = await User.findById(users._id).select("-password -refreshToken")
    if(!userCreated){
        throw new ApiError(500 ,"Server Error")
    }
    res.status(200).json(
        new ApiResponse(200,userCreated,"user register sucessfully")
    )

        
        

    }catch(error){
        res.status(400).json({
            message:"not ok",error
        })

    }
})
export {registerUser}