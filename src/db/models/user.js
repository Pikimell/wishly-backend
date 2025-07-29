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
      required: false,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
