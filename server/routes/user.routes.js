import express  from "express"
import { login,newUser } from "../controller/user.controller.js";
import { multerUpload } from "../middlewares/multer.middleware.js";
const app=express.Router();



app.post("/login", login);
app.post("/new",multerUpload.single("avatar"),newUser)

export default app;