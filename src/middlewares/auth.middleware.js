import User from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
export const verifyJwt=asyncHandler(async(req,res,next)=>{
    try {
        const token =req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        console.log("Access Token:", token);

        if(!token){
        
            throw new ApiError(401,"unauthorized Token")
            
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user =await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(401,"Invalid Token");
            
        }
        req.user = user;
        next()
    } catch (error) {

  throw new ApiError(401, error?.message || "Invalid or expired token");


    }
})