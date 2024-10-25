import express  from "express"
 
import { attachmentsMulter, multerUpload } from "../middlewares/multer.middleware.js";
import { isAuthentificated } from "../middlewares/auth.middleware.js";
import { getMyGroups, newGroupChat ,addMembers, removeMember,leaveGroup,sendAttachments, getChatDetails, renameGroup, deleteChat,getMessages} from "../controller/chat.controller.js";
import { getMyChats } from "../controller/chat.controller.js";

const app=express.Router();




app.use(isAuthentificated);
app.post("/new",newGroupChat)

app.get("/my",getMyChats)
app.get("/my/groups",getMyGroups)
app.put("/my/addMembers",addMembers)
app.put("/my/removeMember",removeMember)
app.delete("/leave/:id",leaveGroup)
app.post("/message",attachmentsMulter,sendAttachments)

app.get("/message/:id",getMessages);

app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat)
export default app;