import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    downloads: {
      type: Number,
      default: 0,
    },
    typeCollection: {
      type: String,
      enum: ['Private', 'Public'],
      default: 'Private',
    },
    viewUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    editUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Collection', collectionSchema);
