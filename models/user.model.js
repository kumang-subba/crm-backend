import { Schema, model } from "mongoose";

export const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "sales", "manager"],
      default: "sales",
    },
  },
  { timestamps: true },
);

UserSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default model("User", UserSchema);
