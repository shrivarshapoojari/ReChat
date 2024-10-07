import express from "express"
import userRoutes from  "./routes/user.routes.js";
const app =express();


app.use("/user",userRoutes);

app.get("/",(req,res)=>{
    res.send("Alive at 3000")
})
app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})