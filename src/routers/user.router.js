import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  updateAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const UserRouter = Router();

UserRouter.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImg", maxCount: 1 },
  ]),
  registerUser
);
UserRouter.route("/login").post(loginUser);
UserRouter.route("/logout").post(verifyJwt, logoutUser);
UserRouter.route("/refresh-Token").post(refreshAccessToken);
UserRouter.route("/changePassword").post(verifyJwt, changeCurrentPassword);
UserRouter.route("/updateAvatar").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  verifyJwt,
  updateAvatar
);

export default UserRouter;
