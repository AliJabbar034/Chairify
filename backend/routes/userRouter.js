import express from "express";
import { createUser, getmessage, logOut, loginUser, userProfile } from "../Controller/user.js";
import Authenticate from "../middleware/Authenticate.js";
import { isAuthorized } from "../middleware/isAuthorized.js";

const userRouter = express.Router();

userRouter.route("/createUser").post( createUser);
userRouter
  .route("/getUser")
  .get(Authenticate, isAuthorized("admin"), getmessage);

  userRouter.route('/user').get(Authenticate,userProfile);

userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(Authenticate,logOut);
export default userRouter;
