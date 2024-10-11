import express from "express";
import {
  adminLogin,
  adminLogout,
  
  allUsers,
  getAdminData,
  getDashboardStats,
} from "../controller/admin.controller.js";
 
import { adminOnly } from "../middlewares/auth.middleware.js";

const app = express.Router();

app.post("/verify",   adminLogin);

app.get("/logout", adminLogout);

 

app.use(adminOnly);

app.get("/", getAdminData);

app.get("/users", allUsers);
 

app.get("/stats", getDashboardStats);

export default app;