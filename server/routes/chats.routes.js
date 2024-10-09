import express  from "express"
 
import { multerUpload } from "../middlewares/multer.middleware.js";
import { isAuthentificated } from "../middlewares/auth.middleware.js";
import { newGroupChat } from "../controller/chat.controller.js";
import { getMyChats } from "../controller/chat.controller.js";
const app=express.Router();




app.use(isAuthentificated);
app.post("/new",newGroupChat)
app.get("/my",getMyChats)
export default app;