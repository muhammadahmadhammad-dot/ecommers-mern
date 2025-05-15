import mongoose from "mongoose";

const Categories = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Category", Categories);
