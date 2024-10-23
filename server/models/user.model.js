import mongoose,{Schema ,model} from 'mongoose'
import bcrypt from "bcrypt"

// const schema=new Schema({
//   name:{
//     type:String,
//     required:true,
//   },
//   bio:{
//     type:String,
//     required:true,
//   },
//   username:{
//     type:String,
//     required:true,
//     unique:true,
//   },
//   password:{
//     type:String,
//     required:true,
//     select:false
//   },
//   avatar:{
//     public_id:{
//         type:String,
//         required:true,
//     },
//     url:{
//         type:String,
//         required:true,
//     }
//   }




// },{
//     timestamps:true
// }
// )


// schema.pre("save",async function(next){
//   if(!this.isModified("password")){
//     return next();
//   }
//   this.password=await bcrypt.hash(this.password,10);
//   next();

// })

// export const User=mongoose.models.User || model("User",schema);













 

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
  // Only store the public key on the server
  publicKey: {
    type: String,
     // Public key in PEM format
  }
}, {
  timestamps: true
});


schema.pre("save",async function(next){
  if(!this.isModified("password")){
    return next();
  }
  this.password=await bcrypt.hash(this.password,10);
  next();

})

export const User = mongoose.models.User || model('User', schema);
