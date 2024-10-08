import express  from "express"
import { getMyProfile, login,newUser } from "../controller/user.controller.js";
import { multerUpload } from "../middlewares/multer.middleware.js";
import { isAuthentificated } from "../middlewares/auth.middleware.js";
import { logout } from "../controller/user.controller.js";
const app=express.Router();



app.post("/login", login);
app.post("/new",multerUpload.single("avatar"),newUser)
app.get("/me",isAuthentificated,getMyProfile)
app.get("/logout",logout);
export default app;