import { Schema, model } from "mongoose";

export const BoardSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

BoardSchema.virtual("columns", {
  ref: "Column",
  localField: "_id",
  foreignField: "board",
});

BoardSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default model("Board", BoardSchema);
