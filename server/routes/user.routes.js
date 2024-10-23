import express  from "express"
import { getMyProfile, login,newUser, searchUser,sendRequest,acceptRequest,getMyNotifications, getMyFriends,storePublicKey, getPublicKey} from "../controller/user.controller.js";
import { multerUpload } from "../middlewares/multer.middleware.js";
import { isAuthentificated } from "../middlewares/auth.middleware.js";
import { logout } from "../controller/user.controller.js";
const app=express.Router();



app.post("/login", login);
app.post("/storePublicKey",storePublicKey)

app.post("/new",multerUpload.single("avatar"),newUser)
app.use(isAuthentificated);
app.get("/getPublicKey",getPublicKey)
app.get("/me",isAuthentificated,getMyProfile)
app.get("/logout",logout);
app.get("/search",searchUser)

app.put("/sendrequest",sendRequest)
app.put("/acceptrequest",acceptRequest)

app.get("/notifications",getMyNotifications)
app.get("/friends",getMyFriends)

export default app;