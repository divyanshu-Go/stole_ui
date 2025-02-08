import User from "@/models/user"
import mongoose from 'mongoose';

const ElementSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
    trim: true,
  },
  description: {
    type: String,
    // required: true,
    trim: true,
  },
  htmlCode: {
    type: String,
    required: true,
  },
  cssCode: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Button", "Card", "Loader", "Switch", "Form", "Pattern", "Other"],
    default: "Other",
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved','rejected'],
    default: 'pending',
  },
  tags: [{
    type: String,
    trim: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.models.Element || mongoose.model('Element', ElementSchema);