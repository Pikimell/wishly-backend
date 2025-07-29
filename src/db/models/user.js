import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false, // не обов’язково, якщо лише AppleID
    },
    avatar: {
      type: String, // URL до зображення
    },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
