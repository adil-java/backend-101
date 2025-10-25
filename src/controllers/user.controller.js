import User from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadCloudinaryImage } from "../service/cloudinary.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const user = req.body;
    const { fullname, email, password, username } = user;

    // 1️⃣ Validate required fields
    if ([fullname, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    // 2️⃣ Check if user already exists
    const existedUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existedUser) {
      throw new ApiError(401, "User already exists");
    }

   
    const avatarLocal = req.files?.avatar?.[0]?.path;
    const coverImgLocal = req.files?.coverImg?.[0]?.path;

    if (!avatarLocal) {
      throw new ApiError(401, "Avatar is required");
    }

    // 4️⃣ Upload to Cloudinary
    const avatar = await uploadCloudinaryImage(avatarLocal);
    if (!avatar) {
      throw new ApiError(401, "Avatar upload failed");
    }

    const coverImg = coverImgLocal
      ? await uploadCloudinaryImage(coverImgLocal)
      : null;

    // 5️⃣ Create user
    const newUser = await User.create({
      username,
      email,
      password,
      fullname,
      avatar: avatar.url,
      coverImg: coverImg?.url || " "
    });

    // 6️⃣ Remove sensitive fields before sending
    const userCreated = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );

    if (!userCreated) {
      throw new ApiError(500, "Server Error");
    }

    res
      .status(200)
      .json(new ApiResponse(200, userCreated, "User registered successfully"));
  } catch (error) {
    res.status(400).json({
      message: "not ok",
      error: error.message
    });
  }
});

export { registerUser };
