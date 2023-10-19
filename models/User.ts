import mongoose from "mongoose";

export interface UserDoc extends Document {
  _doc: {
    fullName: string;
    email: string;
    passwordHash: string;
  };
}

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<UserDoc>("User", UserSchema);
