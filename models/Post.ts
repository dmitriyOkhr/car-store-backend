import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    engine: {
      type: String,
      required: true,
    },
    drivetrain: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },

    exterior: {
      type: String,
      required: true,
    },
    interior: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      default: [],
    },
    interiorFeatures: {
      type: String,
      required: true,
    },
    exteriorFeatures: {
      type: String,
      required: true,
    },
    functional: {
      type: String,
      required: true,
    },
    safetyConvenience: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
