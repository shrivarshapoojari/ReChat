 
import mongoose, { Schema, model, Types } from "mongoose";
const otpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

 
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

 

export const Otp=mongoose.models.Otp || model("Otp",schema);