 
import mongoose, { Schema, model, Types } from "mongoose";
const schema= new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

 schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

 

export const Otp=mongoose.models.Otp || model("Otp",schema);