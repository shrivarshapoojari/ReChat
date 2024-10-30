import express  from "express"
import { getMyProfile, login,newUser, searchUser,sendRequest,acceptRequest,getMyNotifications, getMyFriends, sendOtp, verifyOtp } from "../controller/user.controller.js";
import { multerUpload } from "../middlewares/multer.middleware.js";
import { isAuthentificated } from "../middlewares/auth.middleware.js";
import { logout } from "../controller/user.controller.js";
import { updateProfile } from "../controller/user.controller.js";
const app=express.Router();



app.post("/login", login);
app.post("/sendotp",sendOtp)
app.post("/verifyotp",verifyOtp)
app.post("/new",multerUpload.single("avatar"),newUser)
app.get("/me",isAuthentificated,getMyProfile)
app.use(isAuthentificated);
app.post("/update",multerUpload.single("avatar"),updateProfile)
app.get("/logout",logout);
app.get("/search",searchUser)

app.put("/sendrequest",sendRequest)
app.put("/acceptrequest",acceptRequest)

app.get("/notifications",getMyNotifications)
app.get("/friends",getMyFriends)

export default app;