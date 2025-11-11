import { model, Schema } from "mongoose";

export const ColumnSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
  },
  { timestamps: true },
);

ColumnSchema.virtual("leads", {
  ref: "Lead",
  localField: "_id",
  foreignField: "column",
});

ColumnSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default model("Column", ColumnSchema);
