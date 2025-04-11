import User from "@/models/user";
import mongoose from "mongoose";


const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true } // each comment will have its own _id for deletion
);



// Element Model
const ElementSchema = new mongoose.Schema(
  {
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
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
  },
  { timestamps: true }
);

// Add virtual fields for counts
ElementSchema.virtual("likesCount").get(function () {
  return this.likes?.length || 0;
});


// Ensure virtuals are included when converting to JSON
ElementSchema.set("toJSON", { virtuals: true });
ElementSchema.set("toObject", { virtuals: true });

export default mongoose.models.Element ||
  mongoose.model("Element", ElementSchema);




 
  // comments: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
  //     text: {
  //       type: String,
  //       required: true,
  //       trim: true,
  //     },
  //     createdAt: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ],


  
// ElementSchema.virtual("savesCount").get(function () {
//   return this.saves?.length || 0;
// });

// ElementSchema.virtual("commentsCount").get(function () {
//   return this.comments?.length || 0;
// });